import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'HubSpot Token mancante' }, { status: 500 });
    }

    // Calcolo valori numerici puliti
    const totalTravelers = Number(data.adulti) + Number(data.teen) + Number(data.bambini);
    const totalNights = data.destinazioni.reduce((sum: number, d: any) => sum + d.nights, 0);
    const budgetNumeric = data.budget ? parseInt(data.budget.replace(/[^0-9]/g, '')) : 0;

    // Conversione Data per HubSpot (Timestamp ms a mezzanotte UTC)
    const departureDate = new Date(data.dataInizio);
    departureDate.setUTCHours(0, 0, 0, 0);
    const departureTimestamp = departureDate.getTime();

    const destList = data.destinazioni.map((d: any) => d.id).join(', ');
    const destListWithNights = data.destinazioni.map((d: any) => `${d.id} (${d.nights}n)`).join(', ');

    // 1. Creazione/Aggiornamento Contatto
    const contactProperties: any = {
      email: data.email,
      firstname: data.nome,
      lastname: data.cognome,
      phone: data.telefono || '',
      destinazione: destList,
      data_partenzaa: departureTimestamp,
      budget: budgetNumeric,
      numero_viaggiatori: totalTravelers,
      hs_lead_status: 'NEW'
    };

    const contactResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ properties: contactProperties })
    });

    let contactId;
    if (contactResponse.ok) {
      const contactData = await contactResponse.json();
      contactId = contactData.id;
    } else {
      const searchResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${data.email}?idProperty=email`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        contactId = searchData.id;
        
        // Aggiorniamo il contatto esistente
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            properties: {
              destinazione: destList,
              data_partenzaa: departureTimestamp,
              budget: budgetNumeric,
              numero_viaggiatori: totalTravelers,
              hs_lead_status: 'NEW'
            } 
          })
        });
      }
    }

    if (!contactId) throw new Error('Impossibile identificare il contatto');

    // 2. Creazione del Deal (Affare) con nuove proprietà personalizzate
    const dealResponse = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          dealname: `Viaggio: ${data.nome} ${data.cognome} - ${destList}`,
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
          amount: budgetNumeric.toString(),
          
          // Mappatura nuove Proprietà Personalizzate Deal
          destinazione_deals: destList,
          data_partenza_deals: departureTimestamp,
          budget_deals: budgetNumeric,
          
          description: `
DETTAGLI VIAGGIO:
---------------------------
Destinazioni: ${destListWithNights}
Totale Notti: ${totalNights}
Data Partenza: ${data.dataInizio}
Data Fine: ${data.dataFine}
Flessibilità: ${data.flessibilita}
Tipologia: ${data.tipologia}
Budget Selezionato: ${data.budget}

VIAGGIATORI:
---------------------------
Totale: ${totalTravelers} (${data.adulti} Adulti, ${data.teen} Teen, ${data.bambini} Bambini)

NOTE:
---------------------------
${data.note || 'Nessuna nota'}
          `.trim()
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
          }
        ]
      })
    });

    if (!dealResponse.ok) {
      const errorData = await dealResponse.json();
      throw new Error(`Errore Creazione Deal: ${errorData.message}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('HubSpot Sync Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
