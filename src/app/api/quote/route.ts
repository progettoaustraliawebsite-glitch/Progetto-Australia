import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'HubSpot Token mancante' }, { status: 500 });
    }

    // ── Normalizza destinazioni (supporta sia single che multi-dest) ──────────
    const destArray: { id: string; nights: number }[] =
      data.multiDest && Array.isArray(data.destinations)
        ? data.destinations
        : data.destination && data.destination !== 'undecided'
          ? [{ id: data.destination, nights: 0 }]
          : [{ id: 'non deciso', nights: 0 }];

    const totalTravelers =
      Number(data.adulti) + Number(data.teen) + Number(data.bambini) + Number(data.infants || 0);
    const totalNights = destArray.reduce((sum, d) => sum + (d.nights || 0), 0);
    const budgetNumeric = data.budget ? parseInt(data.budget.replace(/[^0-9]/g, '')) : 0;

    const destList = destArray.map((d) => d.id).join(', ');
    const destListWithNights = destArray
      .map((d) => (d.nights ? `${d.id} (${d.nights}n)` : d.id))
      .join(', ');

    // ── Data partenza ─────────────────────────────────────────────────────────
    let departureTimestamp = 0;
    if (data.dataInizio) {
      const departureDate = new Date(data.dataInizio);
      departureDate.setUTCHours(0, 0, 0, 0);
      departureTimestamp = departureDate.getTime();
    }

    // ── 1. Crea / aggiorna contatto ───────────────────────────────────────────
    const contactProperties: Record<string, unknown> = {
      email: data.email,
      firstname: data.nome,
      lastname: data.cognome,
      phone: data.telefono || '',
      destinazione: destList,
      data_partenza: departureTimestamp || '',
      budget: budgetNumeric,
      numero_viaggiatori: totalTravelers,
      hs_lead_status: 'NEW',
    };

    const contactResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: contactProperties }),
    });

    let contactId: string | undefined;
    if (contactResponse.ok) {
      const contactData = await contactResponse.json();
      contactId = contactData.id;
    } else {
      // Contatto già esistente — recupera e aggiorna
      const searchResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${data.email}?idProperty=email`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        contactId = searchData.id;
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              destinazione: destList,
              data_partenza: departureTimestamp || '',
              budget: budgetNumeric,
              numero_viaggiatori: totalTravelers,
              hs_lead_status: 'NEW',
            },
          }),
        });
      }
    }

    if (!contactId) throw new Error('Impossibile identificare il contatto');

    // ── 2. Crea il Deal ───────────────────────────────────────────────────────
    const tripTypeLabel = [
      data.tripType,
      data.isHoneymoon ? 'Luna di miele' : '',
    ]
      .filter(Boolean)
      .join(' + ');

    const flightLabel: Record<string, string> = {
      includi: 'Includi nel preventivo',
      'ho-gia': 'Ho già i voli',
      autonomo: 'Li organizzo autonomamente',
    };
    const accomLabel: Record<string, string> = {
      standard: 'Standard',
      superior: 'Superior',
      lusso: 'Lusso',
    };

    const dealDescription = `
DETTAGLI VIAGGIO:
---------------------------
Destinazioni: ${destListWithNights}
${totalNights > 0 ? `Totale Notti: ${totalNights}` : ''}
Data Partenza: ${data.dataInizio || 'da definire'}
Data Fine: ${data.dataFine || 'da definire'}
Flessibilità: ${data.flessibilita || '—'}
Tipo di Viaggio: ${tripTypeLabel || '—'}
Luna di Miele: ${data.isHoneymoon ? 'Sì' : 'No'}
Sistemazione: ${accomLabel[data.accom] || data.accom || '—'}
Voli: ${flightLabel[data.flightOpt] || data.flightOpt || '—'}${data.flightOpt === 'includi' ? ` | Partenza da: ${data.departureCity || '—'}` : ''}
Budget Selezionato: ${data.budget || '—'}

VIAGGIATORI:
---------------------------
Totale: ${totalTravelers}
  Adulti: ${data.adulti}
  Teen (12-17): ${data.teen || 0}
  Bambini (2-11): ${data.bambini || 0}
  Neonati: ${data.infants || 0}

CONTATTO PREFERITO: ${data.contactPref || '—'}

NOTE:
---------------------------
${data.note || 'Nessuna nota'}
    `.trim();

    const dealResponse = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          dealname: `Viaggio: ${data.nome} ${data.cognome} – ${destList}`,
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
          amount: budgetNumeric.toString(),
          destinazione_deals: destList,
          data_partenza_deals: departureTimestamp || '',
          budget_deals: budgetNumeric,
          description: dealDescription,
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
          },
        ],
      }),
    });

    if (!dealResponse.ok) {
      const errorData = await dealResponse.json();
      throw new Error(`Errore Creazione Deal: ${errorData.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    console.error('HubSpot Sync Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
