/**
 * Migrate all static blog posts to Sanity CMS.
 * Creates or replaces each blog post with full bilingual content
 * (intro + sections) so editors can manage everything from Sanity Studio.
 *
 * Run: node scripts/import-blog-posts.mjs
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
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const posts = [
  {
    _id: 'blog-guida-viaggio-australia',
    _type: 'blogPost',
    title: {
      it: 'Australia: La Guida Completa al Down Under',
      en: 'Australia: The Complete Guide to Down Under',
    },
    slug: { _type: 'slug', current: 'guida-viaggio-australia' },
    publishedAt: '2026-03-03T00:00:00.000Z',
    category: { it: 'Guide Destinazioni', en: 'Destination Guides' },
    excerpt: {
      it: 'Tutto quello che devi sapere per un viaggio indimenticabile in Australia: visti, trasporti, clima e consigli pratici.',
      en: 'Everything you need to know for an unforgettable trip to Australia: visas, transport, climate and practical advice.',
    },
    intro: {
      it: `L'Australia è il sesto paese più grande al mondo che si trova tra l'Oceano Indiano e il Pacifico. Le incalcolabili bellezze dell'Australia la rendono una meta ideale per una vacanza indimenticabile, divertente ed eccitante, sempre all'insegna della scoperta e dell'avventura.

Parchi nazionali, foreste pluviali nate migliaia di anni fa, stupende spiagge bianche che incantano e permettono un gran numero di attività all'aperto, i magnifici colori dell'entroterra australiano con l'indimenticabile Ayers Rock, la cultura aborigena e molto altro ancora fanno dell'Australia una delle mete predilette dai viaggiatori di tutto il mondo.

Sempre nuova ed improntata alla scoperta è la visita dei centri urbani: da Sydney a Melbourne, da Darwin a Hobart, Brisbane, Perth, Cairns, Adelaide e Canberra. Un'avventura unica… Così l'Australia entrerà a far parte della vostra realtà e non sarà più solo la "lontana terra dove vivono i canguri e i koala".`,
      en: `Australia is the world's sixth-largest country, located between the Indian Ocean and the Pacific. Its countless natural wonders make it an ideal destination for an unforgettable, fun and exciting holiday, always filled with discovery and adventure.

National parks, rainforests thousands of years old, stunning white beaches, the magnificent colours of the Australian outback with the unforgettable Ayers Rock, Aboriginal culture and much more make Australia one of the most popular destinations for travellers worldwide.

Always new and geared towards discovery is a visit to the urban centres: from Sydney to Melbourne, Darwin to Hobart, Brisbane, Perth, Cairns, Adelaide and Canberra. A unique adventure… Australia will become part of your reality and will no longer be just the "distant land where kangaroos and koalas live".`,
    },
    sections: [
      {
        _key: 'au-documenti',
        id: 'documenti',
        title: { it: 'DOCUMENTI E VISTI', en: 'DOCUMENTS & VISAS' },
        content: {
          it: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. Oltre al passaporto è obbligatorio ottenere un visto d'ingresso. Il visto turistico "elettronico" (ETA Electronic Travel Authority) è gratuito e si puo' ottenere on-line accedendo al sito dell'ufficio del governo Australiano: www.australia.gov.au/

DOGANA: Esistono forti restrizioni sull'importazione di generi alimentari, prodotti naturali e attrezzature sportive e altro. Informatevi prima di partire direttamente sul sito del governo australiano: www.australia.gov.au/information-and-services/passports-and-travel/customs-and-quarantine`,
          en: `A passport valid for at least six months beyond your return date is required. In addition to a passport, an entry visa is mandatory. The "electronic" tourist visa (ETA – Electronic Travel Authority) is free and can be obtained online at the Australian Government website: www.australia.gov.au/

CUSTOMS: There are strict restrictions on importing food, natural products, sporting equipment and more. Check the Australian government website before departing: www.australia.gov.au/information-and-services/passports-and-travel/customs-and-quarantine`,
        },
      },
      {
        _key: 'au-quando-andare',
        id: 'quando-andare',
        title: { it: 'QUANDO ANDARE E CLIMA', en: 'WHEN TO GO & CLIMATE' },
        content: {
          it: `L'Australia si trova a sud dell'equatore, quindi le stagioni sono invertite rispetto all'Europa: l'estate va da dicembre a marzo e l'inverno da giugno a settembre. Caratterizzata da diverse zone climatiche: clima temperato (Sydney, Melbourne), desertico (centro), tropicale (Queensland) ed equatoriale (estremo nord).

CLIMA: In Australia le stagioni sono l'opposto di quelle europee. Quando fa freddo nelle regioni meridionali, in quelle settentrionali e centrali si sta molto bene e si evita la stagione delle piogge (da fine Novembre a fine Febbraio).

Le stagioni australiane sono:
Primavera: da settembre a novembre
Estate: da dicembre a febbraio
Autunno: da marzo a maggio
Inverno: da giugno ad agosto`,
          en: `Australia is located south of the equator, so its seasons are reversed compared to Europe: summer runs from December to March and winter from June to September. It features several climate zones: temperate (Sydney, Melbourne), desert (interior), tropical (Queensland) and equatorial (far north).

CLIMATE: Australian seasons are the opposite of European ones. When it is cold in the southern regions, the northern and central areas enjoy very pleasant weather — avoiding the wet season (late November to late February).

Australian seasons:
Spring: September to November
Summer: December to February
Autumn: March to May
Winter: June to August`,
        },
      },
      {
        _key: 'au-trasporti',
        id: 'trasporti',
        title: { it: 'TRASPORTI LOCALI', en: 'LOCAL TRANSPORT' },
        content: {
          it: `L'Australia è un paese enorme, ma spostarsi al suo interno è molto semplice.

AEREO: Il modo migliore per coprire le lunghe distanze. Qantas, Virgin Australia, Jetstar, Tiger Airways, Rex e Airnorth servono tutte le capitali e molte città regionali. La concorrenza garantisce tariffe convenienti se si prenota in anticipo.

AUTOBUS: Comodi ed efficienti. La linea Greyhound offre biglietti "hop-on hop off" per i circuiti più famosi, flessibili in base ai chilometri da percorrere.

AUTO: Vasta rete di strade ben mantenute. Percorsi consigliati: Great Ocean Road, Kangaroo Island, Red Center, costa Brisbane-Cairns, Northern Territory (Kakadu, Litchfield). Necessaria patente internazionale o traduzione certificata. Guida a sinistra. Sconsigliato guidare dopo il tramonto in zone remote.

TRENO: Modo comodo e panoramico. TrainLink, V-Line, Queensland Rail e TransWA. Viaggi spettacolari: Indian Pacific (Sydney-Perth) e il leggendario Ghan (Adelaide-Darwin).

TRAGHETTO: Spirit of Tasmania (Melbourne-Devonport), SeaLink (Kangaroo Island), Rottnest Express (Perth) e traghetti urbani a Sydney e Brisbane.

DISABILITÀ: Aerei, treni, autobus e traghetti sono tutti accessibili. Gli aeroporti forniscono servizi di assistenza completi.`,
          en: `Australia is a huge country, but getting around is very straightforward.

PLANE: The best way to cover long distances. Qantas, Virgin Australia, Jetstar, Tiger Airways, Rex and Airnorth serve all capitals and many regional cities. Competition ensures affordable fares if you book in advance.

BUS: Comfortable and efficient. The Greyhound network offers hop-on hop-off passes for the most popular circuits, flexible by distance.

CAR: Extensive network of well-maintained roads. Recommended routes: Great Ocean Road, Kangaroo Island, Red Centre, Brisbane–Cairns coast, Northern Territory (Kakadu, Litchfield). International driving licence or certified translation required. Drive on the left. Not recommended to drive after dark in remote areas.

TRAIN: Comfortable and scenic. TrainLink, V-Line, Queensland Rail and TransWA. Spectacular journeys: Indian Pacific (Sydney–Perth) and the legendary Ghan (Adelaide–Darwin).

FERRY: Spirit of Tasmania (Melbourne–Devonport), SeaLink (Kangaroo Island), Rottnest Express (Perth) and urban ferries in Sydney and Brisbane.

DISABILITY: Planes, trains, buses and ferries are all accessible. Airports provide comprehensive assistance services.`,
        },
      },
      {
        _key: 'au-lingua-moneta',
        id: 'lingua-moneta',
        title: { it: 'MONETA E LINGUA', en: 'CURRENCY & LANGUAGE' },
        content: {
          it: `MONETA LOCALE: Dollaro australiano (AUD). Carte di credito (Visa, MasterCard, Amex) ampiamente accettate. Più conveniente acquistare dollari in Italia prima della partenza.

LINGUA: La lingua ufficiale è l'inglese. Nazione multiculturale con varie lingue e culture diffuse.`,
          en: `LOCAL CURRENCY: Australian Dollar (AUD). Credit cards (Visa, MasterCard, Amex) widely accepted. It is more convenient to purchase Australian dollars before departure.

LANGUAGE: The official language is English. A multicultural nation with a wide variety of languages and cultures.`,
        },
      },
      {
        _key: 'au-abbigliamento',
        id: 'abbigliamento',
        title: { it: 'ABBIGLIAMENTO CONSIGLIATO', en: 'WHAT TO WEAR' },
        content: {
          it: `Informale e confortevole. Scarpe da trekking, cappellino, felpa e giacca a vento leggera. Abbigliamento a strati essenziale. Il sole è molto forte: utilizzare creme solari ad alta protezione e occhiali da sole.`,
          en: `Informal and comfortable. Trekking shoes, cap, sweatshirt and a light windproof jacket. Layering is essential. The sun is very strong: use high-protection sunscreen and sunglasses.`,
        },
      },
      {
        _key: 'au-elettricita',
        id: 'elettricita',
        title: { it: 'ELETTRICITÀ', en: 'ELECTRICITY' },
        content: {
          it: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee, disponibile in aeroporti e hotel.`,
          en: `220–240 volts, AC 50Hz. An adapter for European plugs is required, available at airports and hotels.`,
        },
      },
    ],
  },

  {
    _id: 'blog-guida-viaggio-nuova-zelanda',
    _type: 'blogPost',
    title: {
      it: 'Nuova Zelanda: Tutto quello che devi sapere',
      en: 'New Zealand: Everything you need to know',
    },
    slug: { _type: 'slug', current: 'guida-viaggio-nuova-zelanda' },
    publishedAt: '2026-03-03T00:00:00.000Z',
    category: { it: 'Guide Destinazioni', en: 'Destination Guides' },
    excerpt: {
      it: 'Una guida completa sulla Nuova Zelanda: documenti, clima, trasporti e consigli per vivere al meglio la Terra di Mezzo.',
      en: 'A complete guide to New Zealand: documents, climate, transport and tips to best experience Middle-earth.',
    },
    intro: {
      it: `La Nuova Zelanda, costituita principalmente da due isole, l'Isola del Nord e l'Isola del Sud, è un paese di rara bellezza e varietà paesaggistica: montagne glaciali, lunghe spiagge deserte, fiumi impetuosi, laghi limpidi e profondi, vulcani e geyser, fanghi ribollenti. Tra felci e piante di mimosa, numerosi sono i parchi nazionali dove cogliere le migliori ricchezze naturalistiche del Paese. Attraverso la protezione delle specie, all'interno dei parchi forestali e delle riserve marine, la Nuova Zelanda è riuscita a conservare molti esemplari unici per l'ecosistema, tra cui il kiwi, l'uccello simbolo del Paese.

Gli amanti dell'avventura potranno cimentarsi in tutti i generi di dinamiche attività all'aperto: escursioni, sci, trekking, rafting e, naturalmente, lo sport preferito di sempre, il bungee jumping (salto con l'elastico). Potrete nuotare con i delfini, osservare le balene o pescare grasse trote nei numerosi torrenti. Con un viaggio in Nuova Zelanda conoscerete quelle terre da favola che hanno animato la storia del Signore degli anelli, ossia la "terra di mezzo".

La gente del posto, depositaria di una cultura che fonde insieme l'eredità europea con quella maori, è ingegnosa, premurosa e incredibilmente affabile. Viaggiare in Nuova Zelanda è semplice e veloce. E la promessa di delizie gastronomiche a base di cacciagione, frutti di mare freschi, squisito gelato e vini da primo premio dovrebbe essere sufficiente a far venire l'acquolina in bocca.`,
      en: `New Zealand, made up mainly of two islands — the North Island and the South Island — is a country of rare beauty and landscape variety: glacial mountains, long deserted beaches, rushing rivers, crystal-clear deep lakes, volcanoes, geysers and bubbling mud. Amidst ferns and mimosa plants, numerous national parks showcase the country's finest natural riches. Through species protection in forest parks and marine reserves, New Zealand has managed to preserve many unique ecosystem specimens, including the kiwi, the country's national bird.

Adventure lovers can try all kinds of dynamic outdoor activities: hiking, skiing, trekking, rafting and, of course, the ever-popular bungee jumping. You can swim with dolphins, whale-watch or fish for fat trout in the many streams. Travelling in New Zealand will introduce you to those fairy-tale lands that brought the Lord of the Rings story to life — the "Middle-earth".

The local people, custodians of a culture that blends European and Maori heritage, are ingenious, caring and incredibly friendly. Travel in New Zealand is simple and fast. And the promise of culinary delights — game, fresh seafood, exquisite ice cream and award-winning wines — should be enough to whet anyone's appetite.`,
    },
    sections: [
      {
        _key: 'nz-documenti',
        id: 'documenti',
        title: { it: 'DOCUMENTI E VISTI', en: 'DOCUMENTS & VISAS' },
        content: {
          it: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. A partire dal 1 Ottobre 2019 è obbligatorio ottenere un visto d'ingresso NzeTA (New Zealand Electronic Travel Authority) e pagare l'International Visitor Conservation and Tourism Levy (IVL).

Per ulteriori informazioni visitate il sito dell'immigrazione della Nuova Zelanda:
www.immigration.govt.nz/new-zealand-visas/options/visit`,
          en: `A passport valid for at least six months beyond your return date is required. From 1 October 2019, it is mandatory to obtain a NZeTA (New Zealand Electronic Travel Authority) entry visa and pay the International Visitor Conservation and Tourism Levy (IVL).

For more information, visit the New Zealand immigration website:
www.immigration.govt.nz/new-zealand-visas/options/visit`,
        },
      },
      {
        _key: 'nz-quando-andare',
        id: 'quando-andare',
        title: { it: 'QUANDO ANDARE?', en: 'WHEN TO GO?' },
        content: {
          it: `La Nuova Zelanda si presta ad essere visitata durante tutto l'anno, anche se il periodo migliore per viaggiare in Nuova Zelanda va da novembre a marzo, che coincide con la nostra primavera-estate, per godere di temperature gradevoli e clima più secco. Vanno bene anche ottobre ed aprile, anche se le temperature sono un po' più fresche e c'è qualche giornata annuvolata ed umida in più. Negli altri mesi dell'anno tenete presente che le precipitazioni potrebbero essere più frequenti e che potrebbe nevicare in alcune zone.`,
          en: `New Zealand can be visited year-round, though the best time to travel is from November to March — coinciding with spring–summer in the northern hemisphere — for pleasant temperatures and drier weather. October and April are also good options, although temperatures are slightly cooler and there are more cloudy, wet days. In other months, be aware that rainfall may be more frequent and snow can fall in some areas.`,
        },
      },
      {
        _key: 'nz-clima',
        id: 'clima',
        title: { it: 'CLIMA', en: 'CLIMATE' },
        content: {
          it: `Il clima della Nuova Zelanda è influenzato dalle acque dell'oceano che le stanno intorno. Ha un clima temperato con inverni non eccessivamente freddi ed estati non eccessivamente calde, ma le precipitazioni cadono costanti, e a tratti abbondanti, tutto l'anno.

Premettendo che le stagioni sono invertite rispetto alle nostre, durante l'inverno da giugno ad agosto le precipitazioni sono molto più intense in quasi tutto il paese e nei rilievi montuosi cade spesso la neve, mentre i mesi meno piovosi sono quelli estivi tra ottobre ed aprile.

Le condizioni climatiche cambiano molto tra l'Isola del Sud e l'Isola del Nord. La prima ha temperature più fresche e precipitazioni più abbondanti nella costa occidentale, un clima più secco invece nella costa orientale. Nell'Isola del Nord le precipitazioni sono abbondanti e ben distribuite durante tutto l'arco dell'anno.`,
          en: `New Zealand's climate is influenced by the surrounding ocean waters. It has a temperate climate with winters that are not excessively cold and summers that are not excessively hot, but rainfall is constant and at times abundant throughout the year.

Note that seasons are reversed compared to the northern hemisphere. During winter (June to August), rainfall is much more intense across most of the country and snow often falls in mountainous areas, while the driest months are summer between October and April.

Climatic conditions vary greatly between the South Island and the North Island. The South Island has cooler temperatures and heavier rainfall on the west coast, but drier conditions on the east coast. On the North Island, rainfall is abundant and well-distributed throughout the year.`,
        },
      },
      {
        _key: 'nz-trasporti',
        id: 'trasporti',
        title: { it: 'TRASPORTI LOCALI', en: 'LOCAL TRANSPORT' },
        content: {
          it: `La Nuova Zelanda è un paese tranquillo ed in genere molto sicuro, spostarsi al suo interno è molto semplice e ci sono diversi modi per farlo.

AEREO: Adatto se si ha poco tempo a disposizione o/e se ci si vuole spostare dall'Isola del Nord a quella del Sud e viceversa. Air New Zealand e Qantas collegano le principali aree urbane. Barrier Air, Stewart Island Flights e Air Chathams servono le isole minori.

PULMAN: Viaggi comodi, efficienti e a prezzi ragionevoli. Mezzi con aria condizionata, sedili reclinabili e wi-fi. Possibilità di Travel Pass valido 12 mesi per viaggiare liberamente.

AUTO: Distanze brevi e strade in buone condizioni (tranne traffico ad Auckland). Strade collinose e ventose. Limite 50km/h in città, 100km/h su autostrade. Guida a sinistra. Necessaria patente internazionale o traduzione certificata. Età minima 21 anni.

TRENO: Rotte limitate ma veloci e confortevoli. Percorsi spettacolari: TranzAlpine (Christchurch-Greymouth), Northern Explorer (Wellington-Auckland) e Coastal Pacific.

TRAGHETTO: Interislander tra Wellington e Picton. Navi per Hauraki Gulf da Auckland e per Stewart Island (Bluff-Oban).`,
          en: `New Zealand is a calm and generally very safe country; getting around is simple and there are several ways to do so.

PLANE: Best if time is limited or for travel between the North and South Island. Air New Zealand and Qantas connect major urban areas. Barrier Air, Stewart Island Flights and Air Chathams serve the smaller islands.

BUS: Comfortable, efficient and reasonably priced. Air-conditioned vehicles with reclining seats and wi-fi. Travel Passes valid for 12 months allow unlimited travel.

CAR: Short distances and good road conditions (except Auckland traffic). Hilly and windy roads. Speed limit: 50km/h in cities, 100km/h on motorways. Drive on the left. International driving licence or certified translation required. Minimum age 21.

TRAIN: Limited but fast and comfortable routes. Spectacular journeys: TranzAlpine (Christchurch–Greymouth), Northern Explorer (Wellington–Auckland) and Coastal Pacific.

FERRY: Interislander between Wellington and Picton. Ferries to Hauraki Gulf from Auckland and to Stewart Island (Bluff–Oban).`,
        },
      },
      {
        _key: 'nz-lingua-moneta',
        id: 'lingua-moneta',
        title: { it: 'MONETA E LINGUA', en: 'CURRENCY & LANGUAGE' },
        content: {
          it: `MONETA LOCALE: Dollaro neozelandese (NZD). Carte di credito ampiamente accettate. Consigliati contanti per i parchi nazionali.

LINGUA: Lingua ufficiale l'inglese. Nazione multiculturale con influenze Maori diffuse.`,
          en: `LOCAL CURRENCY: New Zealand Dollar (NZD). Credit cards widely accepted. Cash recommended for national parks.

LANGUAGE: Official language is English. A multicultural nation with widespread Maori cultural influences.`,
        },
      },
      {
        _key: 'nz-abbigliamento',
        id: 'abbigliamento',
        title: { it: 'ABBIGLIAMENTO CONSIGLIATO', en: 'WHAT TO WEAR' },
        content: {
          it: `Informale e confortevole. Scarpe da trekking, felpa, giacca a vento impermeabile. Abbigliamento a strati essenziale: il tempo può variare spesso, vivendo "quattro stagioni in un giorno".`,
          en: `Informal and comfortable. Trekking shoes, sweatshirt, waterproof windproof jacket. Layering is essential: weather can change rapidly — expect "four seasons in one day".`,
        },
      },
      {
        _key: 'nz-elettricita',
        id: 'elettricita',
        title: { it: 'ELETTRICITÀ', en: 'ELECTRICITY' },
        content: {
          it: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee.`,
          en: `220–240 volts, AC 50Hz. An adapter for European plugs is required.`,
        },
      },
    ],
  },

  {
    _id: 'blog-nuotare-con-gli-squali-balena-australia',
    _type: 'blogPost',
    title: {
      it: 'Incontra i Giganti del Mare: Nuotare con gli Squali Balena in Australia',
      en: 'Meet the Giants of the Sea: Swimming with Whale Sharks in Australia',
    },
    slug: { _type: 'slug', current: 'nuotare-con-gli-squali-balena-australia' },
    publishedAt: '2026-02-10T00:00:00.000Z',
    category: { it: 'Esperienze', en: 'Experiences' },
    excerpt: {
      it: "Un'esperienza che ti toccherà l'anima: nuotare a fianco degli squali balena nelle acque cristalline del Western Australia.",
      en: "An experience that will touch your soul: swimming alongside whale sharks in the crystal-clear waters of Western Australia.",
    },
    intro: {
      it: `Immagina di scivolare nelle acque cristalline dell'Ovest Australia dove il silenzio è rotto solo dal tuo respiro e dal movimento ritmico delle tue braccia. Mentre ti immergi più a fondo, la maestosa ombra di uno squalo balena emerge dalla distanza e si avvicina con una calma sovrannaturale.

Nuotare con gli squali balena, questi gentili giganti, è un'esperienza che ti toccherà l'anima, un incontro ravvicinato che ti farà sentire parte di un mondo antico e misterioso. È un momento di connessione con la natura australiana e un ricordo del tuo viaggio in Australia che rimarrà impresso nel tuo cuore per sempre.`,
      en: `Imagine gliding through the crystal-clear waters of Western Australia where the silence is broken only by your breathing and the rhythmic movement of your arms. As you dive deeper, the majestic shadow of a whale shark emerges from the distance, approaching with supernatural calm.

Swimming with whale sharks, these gentle giants, is an experience that will touch your soul — a close encounter that will make you feel part of an ancient and mysterious world. It is a moment of connection with Australian nature and a memory of your trip to Australia that will remain etched in your heart forever.`,
    },
    sections: [
      {
        _key: 'sq-dove-quando',
        id: 'dove-quando',
        title: { it: 'DOVE E QUANDO', en: 'WHERE AND WHEN' },
        content: {
          it: `Ningaloo Reef, Western Australia: La stagione degli squali balena va da marzo a luglio, con il picco ad aprile-maggio. Exmouth e Coral Bay sono i principali punti di partenza per le escursioni.

Ningaloo Reef è uno dei pochi posti al mondo dove è possibile nuotare con questi giganti in modo prevedibile ogni anno. La barriera corallina è dichiarata Patrimonio dell'Umanità UNESCO.`,
          en: `Ningaloo Reef, Western Australia: Whale shark season runs from March to July, peaking in April–May. Exmouth and Coral Bay are the main departure points for excursions.

Ningaloo Reef is one of the few places in the world where you can predictably swim with these giants every year. The coral reef is a UNESCO World Heritage Site.`,
        },
      },
      {
        _key: 'sq-cosa-aspettarsi',
        id: 'cosa-aspettarsi',
        title: { it: "COS'ASPETTARSI", en: 'WHAT TO EXPECT' },
        content: {
          it: `Gli squali balena (Rhincodon typus) sono i pesci più grandi del mondo, ma completamente innocui per l'uomo — si nutrono esclusivamente di plancton.

Le escursioni durano in genere mezza giornata. Una guida specializzata si immerge con te e ti mostra come avvicinarti in sicurezza. È richiesta la capacità di snorkeling di base; non serve essere sub esperti.`,
          en: `Whale sharks (Rhincodon typus) are the largest fish in the world, but completely harmless to humans — they feed exclusively on plankton.

Excursions generally last half a day. A specialist guide dives with you and shows you how to approach safely. Basic snorkelling ability is required; you don't need to be an experienced diver.`,
        },
      },
      {
        _key: 'sq-come-prenotare',
        id: 'come-prenotare',
        title: { it: 'COME PRENOTARE', en: 'HOW TO BOOK' },
        content: {
          it: `I tour vanno prenotati con largo anticipo, specialmente per la alta stagione (aprile-maggio). Contatta il nostro team: organizziamo l'esperienza all'interno di un itinerario personalizzato nel Western Australia, abbinando l'incontro con gli squali balena ad altre meraviglie di questa regione unica.`,
          en: `Tours should be booked well in advance, especially for peak season (April–May). Contact our team: we organise the experience within a personalised itinerary in Western Australia, combining the whale shark encounter with other wonders of this unique region.`,
        },
      },
    ],
  },

  {
    _id: 'blog-hobbiton-la-contea-esiste',
    _type: 'blogPost',
    title: {
      it: 'Hobbiton: la "Contea" Esiste!',
      en: 'Hobbiton: The "Shire" Really Exists!',
    },
    slug: { _type: 'slug', current: 'hobbiton-la-contea-esiste' },
    publishedAt: '2026-01-20T00:00:00.000Z',
    category: { it: 'Esperienze', en: 'Experiences' },
    excerpt: {
      it: 'Il set cinematografico di Hobbiton in Nuova Zelanda è un\'esperienza magica per tutti gli appassionati de Il Signore degli Anelli e Lo Hobbit.',
      en: 'The Hobbiton movie set in New Zealand is a magical experience for all fans of The Lord of the Rings and The Hobbit.',
    },
    intro: {
      it: `Il tour Hobbiton Movie Set è un'esperienza interessante e divertente per tutti gli appassionati della Trilogia di The Lord of The Rings e The Hobbit. La tua guida ti accompagnerà sul famoso set cinematografico di 12 acri, mostrandoti i dettagli intricati, indicando i luoghi più famosi e spiegando come è stata creata la magia dei film.

Innamorati della fattoria di ovini e di manzo della famiglia Alexander, proprio come ha fatto l'acclamato regista Sir Peter Jackson, delle buche Hobbit, del Mulino e della famosa Green Dragon Inn, dove è possibile concedersi delle esclusive bevande.`,
      en: `The Hobbiton Movie Set tour is an interesting and fun experience for all fans of The Lord of the Rings and The Hobbit trilogy. Your guide will take you around the famous 12-acre movie set, showing you the intricate details, pointing out the most famous locations and explaining how the magic of the films was created.

Fall in love with the Alexander family's sheep and beef farm, just as acclaimed director Sir Peter Jackson did, the Hobbit holes, the Mill and the famous Green Dragon Inn, where you can enjoy exclusive beverages.`,
    },
    sections: [
      {
        _key: 'hb-dove-quando',
        id: 'dove-quando',
        title: { it: 'DOVE SI TROVA', en: 'WHERE IS IT' },
        content: {
          it: `Matamata, Isola del Nord, Nuova Zelanda: Il set si trova a circa 2 ore da Auckland e 1 ora da Rotorua. È raggiungibile in auto o con tour organizzati da entrambe le città.

La fattoria Alexander, su cui è costruito il set, è ancora un'azienda agricola funzionante — il che rende il tutto ancora più autentico e affascinante.`,
          en: `Matamata, North Island, New Zealand: The set is located about 2 hours from Auckland and 1 hour from Rotorua. It can be reached by car or with organised tours from both cities.

The Alexander farm, on which the set is built, is still a working farm — which makes everything even more authentic and fascinating.`,
        },
      },
      {
        _key: 'hb-cosa-aspettarsi',
        id: 'cosa-aspettarsi',
        title: { it: "COS'ASPETTARSI", en: 'WHAT TO EXPECT' },
        content: {
          it: `Il tour dura circa 2 ore e si svolge a piedi attraverso il set. Vedrai le 44 buche Hobbit originali, i giardini curati, il Mulino sul laghetto e naturalmente la Green Dragon Inn.

Il tour si conclude con una bevanda inclusa alla Green Dragon Inn — birra artigianale, sidro o una bevanda analcolica. Le visite sono solo guidate, non è possibile esplorare da soli.`,
          en: `The tour lasts about 2 hours and takes place on foot through the set. You will see the original 44 Hobbit holes, the manicured gardens, the Mill on the pond and of course the Green Dragon Inn.

The tour concludes with a complimentary drink at the Green Dragon Inn — craft beer, cider or a non-alcoholic beverage. Visits are guided only; you cannot explore on your own.`,
        },
      },
      {
        _key: 'hb-come-prenotare',
        id: 'come-prenotare',
        title: { it: 'COME INSERIRLO NEL TUO VIAGGIO', en: 'HOW TO INCLUDE IT IN YOUR TRIP' },
        content: {
          it: `Hobbiton si inserisce perfettamente in un itinerario sull'Isola del Nord neozelandese. Noi di Progetto Australia lo inseriamo spesso negli itinerari tra Auckland e Rotorua, abbinandolo alla visione del set al tramonto per un'atmosfera davvero magica.

Contattaci per creare il tuo viaggio su misura in Nuova Zelanda.`,
          en: `Hobbiton fits perfectly into a North Island New Zealand itinerary. At Progetto Australia we often include it in itineraries between Auckland and Rotorua, combining the set visit at sunset for a truly magical atmosphere.

Contact us to create your tailor-made trip to New Zealand.`,
        },
      },
    ],
  },
];

async function main() {
  console.log('\n📝  Importing blog posts to Sanity…\n');

  for (const post of posts) {
    try {
      await client.createOrReplace(post);
      console.log(`  ✅  ${post.slug.current}`);
    } catch (err) {
      console.error(`  ❌  ${post.slug.current}: ${err.message}`);
    }
  }

  console.log('\n✨  Done! All blog posts are now in Sanity Studio.\n');
  console.log('   Remember to upload the hero images in Sanity Studio:');
  console.log('   - guida-viaggio-australia      → /images/dest-australia.png');
  console.log('   - guida-viaggio-nuova-zelanda  → /images/blog-nz.jpg');
  console.log('   - nuotare-con-gli-squali-balena-australia → /images/blog-squali.jpg');
  console.log('   - hobbiton-la-contea-esiste    → /images/blog-hobbiton.jpg\n');
}

main().catch(console.error);
