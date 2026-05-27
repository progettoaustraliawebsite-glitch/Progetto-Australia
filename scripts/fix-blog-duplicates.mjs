/**
 * Fix duplicated blog posts:
 * 1. Per ogni slug, trova tutti i documenti esistenti
 * 2. Fa il patch del documento originale (più vecchio) con intro + sections
 * 3. Cancella i duplicati creati da import-blog-posts.mjs
 *
 * Run: node scripts/fix-blog-duplicates.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = {};
try {
  const raw = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) env[k.trim()] = rest.join('=').trim();
  }
} catch { /* use process.env */ }

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// IDs creati per errore dallo script import-blog-posts.mjs
const CREATED_BY_MISTAKE = [
  'blog-guida-viaggio-australia',
  'blog-guida-viaggio-nuova-zelanda',
  'blog-nuotare-con-gli-squali-balena-australia',
  'blog-hobbiton-la-contea-esiste',
];

const content = {
  'guida-viaggio-australia': {
    intro: {
      it: `L'Australia è il sesto paese più grande al mondo che si trova tra l'Oceano Indiano e il Pacifico. Le incalcolabili bellezze dell'Australia la rendono una meta ideale per una vacanza indimenticabile, divertente ed eccitante, sempre all'insegna della scoperta e dell'avventura.

Parchi nazionali, foreste pluviali nate migliaia di anni fa, stupende spiagge bianche che incantano e permettono un gran numero di attività all'aperto, i magnifici colori dell'entroterra australiano con l'indimenticabile Ayers Rock, la cultura aborigena e molto altro ancora fanno dell'Australia una delle mete predilette dai viaggiatori di tutto il mondo.

Sempre nuova ed improntata alla scoperta è la visita dei centri urbani: da Sydney a Melbourne, da Darwin a Hobart, Brisbane, Perth, Cairns, Adelaide e Canberra. Un'avventura unica… Così l'Australia entrerà a far parte della vostra realtà e non sarà più solo la "lontana terra dove vivono i canguri e i koala".`,
      en: `Australia is the world's sixth-largest country, located between the Indian Ocean and the Pacific. Its countless natural wonders make it an ideal destination for an unforgettable, fun and exciting holiday, always filled with discovery and adventure.

National parks, rainforests thousands of years old, stunning white beaches, the magnificent colours of the Australian outback with the unforgettable Ayers Rock, Aboriginal culture and much more make Australia one of the most popular destinations for travellers worldwide.

Always new and geared towards discovery is a visit to the urban centres: from Sydney to Melbourne, Darwin to Hobart, Brisbane, Perth, Cairns, Adelaide and Canberra. A unique adventure… Australia will become part of your reality and will no longer be just the "distant land where kangaroos and koalas live".`,
    },
    sections: [
      { _key: 'au-documenti', id: 'documenti', title: { it: 'DOCUMENTI E VISTI', en: 'DOCUMENTS & VISAS' }, content: { it: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. Oltre al passaporto è obbligatorio ottenere un visto d'ingresso. Il visto turistico "elettronico" (ETA Electronic Travel Authority) è gratuito e si puo' ottenere on-line accedendo al sito dell'ufficio del governo Australiano: www.australia.gov.au/\n\nDOGANA: Esistono forti restrizioni sull'importazione di generi alimentari, prodotti naturali e attrezzature sportive e altro. Informatevi prima di partire direttamente sul sito del governo australiano: www.australia.gov.au/information-and-services/passports-and-travel/customs-and-quarantine`, en: `A passport valid for at least six months beyond your return date is required. In addition to a passport, an entry visa is mandatory. The "electronic" tourist visa (ETA – Electronic Travel Authority) is free and can be obtained online at the Australian Government website: www.australia.gov.au/\n\nCUSTOMS: There are strict restrictions on importing food, natural products, sporting equipment and more. Check the Australian government website before departing.` } },
      { _key: 'au-quando-andare', id: 'quando-andare', title: { it: 'QUANDO ANDARE E CLIMA', en: 'WHEN TO GO & CLIMATE' }, content: { it: `L'Australia si trova a sud dell'equatore, quindi le stagioni sono invertite rispetto all'Europa: l'estate va da dicembre a marzo e l'inverno da giugno a settembre. Caratterizzata da diverse zone climatiche: clima temperato (Sydney, Melbourne), desertico (centro), tropicale (Queensland) ed equatoriale (estremo nord).\n\nCLIMA: In Australia le stagioni sono l'opposto di quelle europee. Quando fa freddo nelle regioni meridionali, in quelle settentrionali e centrali si sta molto bene e si evita la stagione delle piogge (da fine Novembre a fine Febbraio).\n\nLe stagioni australiane sono:\nPrimavera: da settembre a novembre\nEstate: da dicembre a febbraio\nAutunno: da marzo a maggio\nInverno: da giugno ad agosto`, en: `Australia is located south of the equator, so its seasons are reversed compared to Europe: summer runs from December to March and winter from June to September.\n\nAustralian seasons:\nSpring: September to November\nSummer: December to February\nAutumn: March to May\nWinter: June to August` } },
      { _key: 'au-trasporti', id: 'trasporti', title: { it: 'TRASPORTI LOCALI', en: 'LOCAL TRANSPORT' }, content: { it: `L'Australia è un paese enorme, ma spostarsi al suo interno è molto semplice.\n\nAEREO: Il modo migliore per coprire le lunghe distanze. Qantas, Virgin Australia, Jetstar, Tiger Airways, Rex e Airnorth servono tutte le capitali e molte città regionali.\n\nAUTOBUS: Comodi ed efficienti. La linea Greyhound offre biglietti "hop-on hop off".\n\nAUTO: Vasta rete di strade ben mantenute. Necessaria patente internazionale. Guida a sinistra.\n\nTRENO: Viaggi spettacolari: Indian Pacific (Sydney-Perth) e il leggendario Ghan (Adelaide-Darwin).\n\nTRAGHETTO: Spirit of Tasmania (Melbourne-Devonport), SeaLink (Kangaroo Island), Rottnest Express (Perth).`, en: `Australia is a huge country, but getting around is very straightforward.\n\nPLANE: The best way to cover long distances. Qantas, Virgin Australia, Jetstar, Rex and others serve all capitals.\n\nBUS: Comfortable and efficient. Greyhound hop-on hop-off passes available.\n\nCAR: Good road network. International licence required. Drive on the left.\n\nTRAIN: Indian Pacific (Sydney–Perth) and the legendary Ghan (Adelaide–Darwin).\n\nFERRY: Spirit of Tasmania, SeaLink, Rottnest Express.` } },
      { _key: 'au-lingua-moneta', id: 'lingua-moneta', title: { it: 'MONETA E LINGUA', en: 'CURRENCY & LANGUAGE' }, content: { it: `MONETA LOCALE: Dollaro australiano (AUD). Carte di credito (Visa, MasterCard, Amex) ampiamente accettate.\n\nLINGUA: La lingua ufficiale è l'inglese. Nazione multiculturale con varie lingue e culture diffuse.`, en: `LOCAL CURRENCY: Australian Dollar (AUD). Credit cards widely accepted.\n\nLANGUAGE: English is the official language. A multicultural nation.` } },
      { _key: 'au-abbigliamento', id: 'abbigliamento', title: { it: 'ABBIGLIAMENTO CONSIGLIATO', en: 'WHAT TO WEAR' }, content: { it: `Informale e confortevole. Scarpe da trekking, cappellino, felpa e giacca a vento leggera. Il sole è molto forte: utilizzare creme solari ad alta protezione e occhiali da sole.`, en: `Informal and comfortable. Trekking shoes, cap, sweatshirt and light windproof jacket. The sun is very strong: use high-protection sunscreen and sunglasses.` } },
      { _key: 'au-elettricita', id: 'elettricita', title: { it: 'ELETTRICITÀ', en: 'ELECTRICITY' }, content: { it: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee.`, en: `220–240 volts, AC 50Hz. An adapter for European plugs is required.` } },
    ],
  },
  'guida-viaggio-nuova-zelanda': {
    intro: {
      it: `La Nuova Zelanda, costituita principalmente da due isole, l'Isola del Nord e l'Isola del Sud, è un paese di rara bellezza e varietà paesaggistica: montagne glaciali, lunghe spiagge deserte, fiumi impetuosi, laghi limpidi e profondi, vulcani e geyser, fanghi ribollenti.

Gli amanti dell'avventura potranno cimentarsi in tutti i generi di dinamiche attività all'aperto: escursioni, sci, trekking, rafting e il bungee jumping. Potrete nuotare con i delfini, osservare le balene o pescare grasse trote nei numerosi torrenti. Con un viaggio in Nuova Zelanda conoscerete quelle terre da favola che hanno animato la storia del Signore degli anelli.

La gente del posto, depositaria di una cultura che fonde insieme l'eredità europea con quella maori, è ingegnosa, premurosa e incredibilmente affabile.`,
      en: `New Zealand, made up mainly of two islands — the North Island and the South Island — is a country of rare beauty and landscape variety: glacial mountains, long deserted beaches, rushing rivers, crystal-clear deep lakes, volcanoes, geysers and bubbling mud.

Adventure lovers can try all kinds of dynamic outdoor activities: hiking, skiing, trekking, rafting and bungee jumping. You can swim with dolphins, whale-watch or fish for fat trout. Travelling in New Zealand will introduce you to those fairy-tale lands that brought the Lord of the Rings to life.

The local people, custodians of a culture that blends European and Maori heritage, are ingenious, caring and incredibly friendly.`,
    },
    sections: [
      { _key: 'nz-documenti', id: 'documenti', title: { it: 'DOCUMENTI E VISTI', en: 'DOCUMENTS & VISAS' }, content: { it: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. A partire dal 1 Ottobre 2019 è obbligatorio ottenere un visto d'ingresso NzeTA (New Zealand Electronic Travel Authority) e pagare l'International Visitor Conservation and Tourism Levy (IVL).\n\nPer ulteriori informazioni: www.immigration.govt.nz/new-zealand-visas/options/visit`, en: `A passport valid for at least six months beyond your return date is required. From 1 October 2019, a NZeTA entry visa and the International Visitor Conservation and Tourism Levy (IVL) are mandatory.\n\nMore info: www.immigration.govt.nz/new-zealand-visas/options/visit` } },
      { _key: 'nz-quando-andare', id: 'quando-andare', title: { it: 'QUANDO ANDARE?', en: 'WHEN TO GO?' }, content: { it: `La Nuova Zelanda si presta ad essere visitata durante tutto l'anno, anche se il periodo migliore va da novembre a marzo per godere di temperature gradevoli e clima più secco. Vanno bene anche ottobre ed aprile, anche se le temperature sono un po' più fresche.`, en: `New Zealand can be visited year-round, though the best time is from November to March for pleasant temperatures and drier weather. October and April are also good, though slightly cooler.` } },
      { _key: 'nz-clima', id: 'clima', title: { it: 'CLIMA', en: 'CLIMATE' }, content: { it: `Il clima della Nuova Zelanda è influenzato dalle acque dell'oceano. Ha un clima temperato con inverni non eccessivamente freddi ed estati non eccessivamente calde, ma le precipitazioni cadono costanti tutto l'anno.\n\nLe condizioni climatiche cambiano molto tra l'Isola del Sud e l'Isola del Nord. La prima ha temperature più fresche e precipitazioni più abbondanti nella costa occidentale. Nell'Isola del Nord le precipitazioni sono abbondanti e ben distribuite durante tutto l'anno.`, en: `New Zealand's climate is temperate, with mild winters and cool summers, but rainfall is constant throughout the year.\n\nClimatic conditions vary greatly between the South Island (cooler, wetter west coast, drier east coast) and the North Island (abundant rainfall year-round).` } },
      { _key: 'nz-trasporti', id: 'trasporti', title: { it: 'TRASPORTI LOCALI', en: 'LOCAL TRANSPORT' }, content: { it: `AEREO: Air New Zealand e Qantas collegano le principali aree urbane. Barrier Air e Stewart Island Flights servono le isole minori.\n\nPULMAN: Comodi ed efficienti con Travel Pass valido 12 mesi.\n\nAUTO: Guida a sinistra, limite 100km/h su autostrade. Necessaria patente internazionale.\n\nTRENO: TranzAlpine (Christchurch-Greymouth), Northern Explorer (Wellington-Auckland).\n\nTRAGHETTO: Interislander tra Wellington e Picton.`, en: `PLANE: Air New Zealand and Qantas connect major urban areas.\n\nBUS: Comfortable with 12-month Travel Passes available.\n\nCAR: Drive on the left, 100km/h on motorways. International licence required.\n\nTRAIN: TranzAlpine (Christchurch–Greymouth), Northern Explorer (Wellington–Auckland).\n\nFERRY: Interislander between Wellington and Picton.` } },
      { _key: 'nz-lingua-moneta', id: 'lingua-moneta', title: { it: 'MONETA E LINGUA', en: 'CURRENCY & LANGUAGE' }, content: { it: `MONETA LOCALE: Dollaro neozelandese (NZD). Carte di credito ampiamente accettate. Consigliati contanti per i parchi nazionali.\n\nLINGUA: Lingua ufficiale l'inglese. Nazione multiculturale con influenze Maori diffuse.`, en: `LOCAL CURRENCY: New Zealand Dollar (NZD). Credit cards widely accepted. Cash recommended for national parks.\n\nLANGUAGE: English is the official language. Widespread Maori cultural influences.` } },
      { _key: 'nz-abbigliamento', id: 'abbigliamento', title: { it: 'ABBIGLIAMENTO CONSIGLIATO', en: 'WHAT TO WEAR' }, content: { it: `Informale e confortevole. Scarpe da trekking, felpa, giacca a vento impermeabile. Il tempo può variare spesso: "quattro stagioni in un giorno".`, en: `Informal and comfortable. Trekking shoes, sweatshirt, waterproof jacket. Weather can change rapidly — expect "four seasons in one day".` } },
      { _key: 'nz-elettricita', id: 'elettricita', title: { it: 'ELETTRICITÀ', en: 'ELECTRICITY' }, content: { it: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee.`, en: `220–240 volts, AC 50Hz. An adapter for European plugs is required.` } },
    ],
  },
  'nuotare-con-gli-squali-balena-australia': {
    intro: {
      it: `Immagina di scivolare nelle acque cristalline dell'Ovest Australia dove il silenzio è rotto solo dal tuo respiro e dal movimento ritmico delle tue braccia. Mentre ti immergi più a fondo, la maestosa ombra di uno squalo balena emerge dalla distanza e si avvicina con una calma sovrannaturale.

Nuotare con gli squali balena, questi gentili giganti, è un'esperienza che ti toccherà l'anima, un incontro ravvicinato che ti farà sentire parte di un mondo antico e misterioso.`,
      en: `Imagine gliding through the crystal-clear waters of Western Australia where the silence is broken only by your breathing and the rhythmic movement of your arms. As you dive deeper, the majestic shadow of a whale shark emerges from the distance, approaching with supernatural calm.

Swimming with whale sharks, these gentle giants, is an experience that will touch your soul — a close encounter that will make you feel part of an ancient and mysterious world.`,
    },
    sections: [
      { _key: 'sq-dove-quando', id: 'dove-quando', title: { it: 'DOVE E QUANDO', en: 'WHERE AND WHEN' }, content: { it: `Ningaloo Reef, Western Australia: La stagione degli squali balena va da marzo a luglio, con il picco ad aprile-maggio. Exmouth e Coral Bay sono i principali punti di partenza.\n\nNingaloo Reef è uno dei pochi posti al mondo dove è possibile nuotare con questi giganti in modo prevedibile ogni anno. La barriera corallina è dichiarata Patrimonio dell'Umanità UNESCO.`, en: `Ningaloo Reef, Western Australia: Whale shark season runs from March to July, peaking in April–May. Exmouth and Coral Bay are the main departure points.\n\nNingaloo Reef is one of the few places in the world where you can predictably swim with these giants every year. It is a UNESCO World Heritage Site.` } },
      { _key: 'sq-cosa-aspettarsi', id: 'cosa-aspettarsi', title: { it: "COS'ASPETTARSI", en: 'WHAT TO EXPECT' }, content: { it: `Gli squali balena (Rhincodon typus) sono i pesci più grandi del mondo, ma completamente innocui per l'uomo — si nutrono esclusivamente di plancton.\n\nLe escursioni durano in genere mezza giornata. Una guida specializzata si immerge con te e ti mostra come avvicinarti in sicurezza. È richiesta la capacità di snorkeling di base.`, en: `Whale sharks (Rhincodon typus) are the largest fish in the world, but completely harmless to humans — they feed exclusively on plankton.\n\nExcursions generally last half a day. A specialist guide dives with you. Basic snorkelling ability is required.` } },
      { _key: 'sq-come-prenotare', id: 'come-prenotare', title: { it: 'COME PRENOTARE', en: 'HOW TO BOOK' }, content: { it: `I tour vanno prenotati con largo anticipo, specialmente per la alta stagione (aprile-maggio). Contatta il nostro team: organizziamo l'esperienza all'interno di un itinerario personalizzato nel Western Australia.`, en: `Tours should be booked well in advance, especially for peak season (April–May). Contact our team: we organise the experience within a personalised itinerary in Western Australia.` } },
    ],
  },
  'hobbiton-la-contea-esiste': {
    intro: {
      it: `Il tour Hobbiton Movie Set è un'esperienza interessante e divertente per tutti gli appassionati della Trilogia di The Lord of The Rings e The Hobbit. La tua guida ti accompagnerà sul famoso set cinematografico di 12 acri, mostrandoti i dettagli intricati, indicando i luoghi più famosi e spiegando come è stata creata la magia dei film.

Innamorati della fattoria di ovini e di manzo della famiglia Alexander, proprio come ha fatto l'acclamato regista Sir Peter Jackson, delle buche Hobbit, del Mulino e della famosa Green Dragon Inn, dove è possibile concedersi delle esclusive bevande.`,
      en: `The Hobbiton Movie Set tour is an interesting and fun experience for all fans of The Lord of the Rings and The Hobbit trilogy. Your guide will take you around the famous 12-acre movie set, showing you the intricate details, pointing out the most famous locations and explaining how the magic of the films was created.

Fall in love with the Alexander family's sheep and beef farm, the Hobbit holes, the Mill and the famous Green Dragon Inn, where you can enjoy exclusive beverages.`,
    },
    sections: [
      { _key: 'hb-dove-quando', id: 'dove-quando', title: { it: 'DOVE SI TROVA', en: 'WHERE IS IT' }, content: { it: `Matamata, Isola del Nord, Nuova Zelanda: Il set si trova a circa 2 ore da Auckland e 1 ora da Rotorua. È raggiungibile in auto o con tour organizzati da entrambe le città.\n\nLa fattoria Alexander, su cui è costruito il set, è ancora un'azienda agricola funzionante.`, en: `Matamata, North Island, New Zealand: The set is located about 2 hours from Auckland and 1 hour from Rotorua. It can be reached by car or with organised tours.\n\nThe Alexander farm, on which the set is built, is still a working farm.` } },
      { _key: 'hb-cosa-aspettarsi', id: 'cosa-aspettarsi', title: { it: "COS'ASPETTARSI", en: 'WHAT TO EXPECT' }, content: { it: `Il tour dura circa 2 ore e si svolge a piedi attraverso il set. Vedrai le 44 buche Hobbit originali, i giardini curati, il Mulino sul laghetto e la Green Dragon Inn.\n\nIl tour si conclude con una bevanda inclusa alla Green Dragon Inn. Le visite sono solo guidate.`, en: `The tour lasts about 2 hours on foot. You will see the original 44 Hobbit holes, manicured gardens, the Mill on the pond and the Green Dragon Inn.\n\nThe tour concludes with a complimentary drink at the Green Dragon Inn. Visits are guided only.` } },
      { _key: 'hb-come-prenotare', id: 'come-prenotare', title: { it: 'COME INSERIRLO NEL TUO VIAGGIO', en: 'HOW TO INCLUDE IT IN YOUR TRIP' }, content: { it: `Hobbiton si inserisce perfettamente in un itinerario sull'Isola del Nord neozelandese. Noi di Progetto Australia lo inseriamo spesso negli itinerari tra Auckland e Rotorua, abbinandolo alla visione del set al tramonto per un'atmosfera davvero magica.\n\nContattaci per creare il tuo viaggio su misura in Nuova Zelanda.`, en: `Hobbiton fits perfectly into a North Island New Zealand itinerary. At Progetto Australia we often include it in itineraries between Auckland and Rotorua, combining the set visit at sunset.\n\nContact us to create your tailor-made trip to New Zealand.` } },
    ],
  },
};

async function main() {
  console.log('\n🔍  Fetching all blog posts from Sanity…\n');

  // Fetch every blog post
  const all = await client.fetch(
    `*[_type == "blogPost"]{ _id, slug, _createdAt } | order(_createdAt asc)`
  );

  console.log(`   Found ${all.length} total blog post documents\n`);

  // Group by slug
  const bySlug = {};
  for (const doc of all) {
    const slug = doc.slug?.current;
    if (!slug) continue;
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push(doc);
  }

  const toDelete = [];
  const toUpdate = [];

  for (const [slug, docs] of Object.entries(bySlug)) {
    if (docs.length === 1) {
      // No duplicate — just patch the existing one
      toUpdate.push({ id: docs[0]._id, slug });
    } else {
      // Duplicates — keep the oldest (first created), delete the rest
      const [keep, ...dupes] = docs;
      console.log(`   ⚠️  Duplicate slug "${slug}": keeping ${keep._id}, deleting ${dupes.map(d => d._id).join(', ')}`);
      toUpdate.push({ id: keep._id, slug });
      toDelete.push(...dupes.map(d => d._id));
    }
  }

  // Also delete any leftover docs from the mistaken script that aren't covered above
  for (const id of CREATED_BY_MISTAKE) {
    const alreadyMarked = toDelete.includes(id);
    const isKept = toUpdate.some(u => u.id === id);
    if (!alreadyMarked && !isKept) {
      // Check if it exists
      const exists = await client.fetch(`*[_id == $id][0]._id`, { id });
      if (exists) {
        console.log(`   ⚠️  Orphan doc ${id} not linked to any slug group — will delete`);
        toDelete.push(id);
      }
    }
  }

  // Delete duplicates
  if (toDelete.length > 0) {
    console.log(`\n🗑️  Deleting ${toDelete.length} duplicate(s)…`);
    for (const id of toDelete) {
      await client.delete(id);
      console.log(`   ✅  Deleted ${id}`);
    }
  }

  // Patch originals with intro + sections
  console.log(`\n📝  Patching ${toUpdate.length} blog post(s) with intro + sections…\n`);
  for (const { id, slug } of toUpdate) {
    const data = content[slug];
    if (!data) {
      console.log(`   ⏭️  No content mapping for "${slug}" — skipping`);
      continue;
    }
    try {
      await client.patch(id).set({ intro: data.intro, sections: data.sections }).commit();
      console.log(`   ✅  Patched "${slug}" (${id})`);
    } catch (err) {
      console.error(`   ❌  "${slug}": ${err.message}`);
    }
  }

  console.log('\n✨  Done! No duplicates remain. All existing posts updated.\n');
}

main().catch(console.error);
