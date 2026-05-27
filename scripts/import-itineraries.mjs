/**
 * Import 4 itineraries from static data into Sanity CMS.
 * Run: node scripts/import-itineraries.mjs
 *
 * Notes:
 * - Uses createOrReplace → idempotent, safe to run multiple times
 * - Images are NOT imported (must be added manually via Sanity Studio)
 * - priceEn is computed on-the-fly by the normalizer (not stored in Sanity)
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Read .env.local manually (no dotenv dependency needed) ───────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const env = {};
try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) env[k.trim()] = rest.join('=').trim();
  }
} catch {
  console.warn('⚠️  Could not read .env.local — using process.env');
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET    || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token     = env.SANITY_API_TOKEN              || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ── Itinerary data ────────────────────────────────────────────────────────────

const standardNotIncluded = {
  it: [
    'Voli internazionali ed interni',
    'Assicurazione di viaggio',
    'Tutto ciò che non è espressamente indicato nei servizi inclusi',
  ],
  en: [
    'International and domestic flights',
    'Travel insurance',
    'Anything not expressly listed in the included services',
  ],
};

const itineraries = [
  // ── 1. AUSTRALIA + BORA BORA — 23 giorni ────────────────────────────────
  {
    _id: 'itinerary-australia-bora-bora',
    _type: 'itinerary',
    title: {
      it: "Australia e Polinesia — Dal cuore rosso dell'Australia alle lagune turchesi del Pacifico",
      en: 'Australia & Polynesia — From the Red Heart of Australia to the Turquoise Lagoons of the Pacific',
    },
    slug: { _type: 'slug', current: 'australia-bora-bora' },
    duration: 23,
    price: { amount: 8000, currency: 'EUR' },
    category: 'luxury',
    description: {
      it: "Un viaggio che unisce la vastità selvaggia dell'Australia — dalla Great Ocean Road all'Uluru — alla magia cristallina di Bora Bora. Da Melbourne alle lagune della Polinesia Francese, passando per il Territorio del Nord e Sydney: un itinerario per chi vuole tutto.",
      en: "A journey combining Australia's wild vastness — from the Great Ocean Road to Uluru — with the crystal magic of Bora Bora. From Melbourne to the lagoons of French Polynesia via the Northern Territory and Sydney: an itinerary for those who want it all.",
    },
    highlights: {
      it: ['Great Ocean Road e i 12 Apostoli', 'Uluru al tramonto', 'Sydney Opera House', 'Laguna di Bora Bora', 'Snorkeling tra i coralli del Pacifico'],
      en: ['Great Ocean Road & the 12 Apostles', 'Uluru at sunset', 'Sydney Opera House', 'Bora Bora lagoon', 'Snorkelling among Pacific coral reefs'],
    },
    program: [
      { _key: 'd1',  day: 1,  title: { it: 'Arrivo a Melbourne',                    en: 'Arrival in Melbourne' },                   description: { it: 'Atterraggio a Melbourne e trasferimento in hotel. Prima serata libera per ambientarsi nella più europea delle città australiane, con una passeggiata lungo il Yarra River e le sue street art.', en: 'Land in Melbourne and transfer to hotel. First evening free to settle into the most European of Australian cities, with a stroll along the Yarra River and its street art.' } },
      { _key: 'd2',  day: 2,  title: { it: 'Melbourne — Città e cultura',            en: 'Melbourne — City & culture' },             description: { it: 'Giornata dedicata alla scoperta di Melbourne: i mercati di Queen Victoria, i vicoli artistici di Hosier Lane e Flinders Lane, il quartiere di Fitzroy con i suoi café speciality coffee. Pranzo in un wine bar a Southbank.', en: 'A day discovering Melbourne: Queen Victoria Markets, the artistic laneways of Hosier and Flinders Lane, the Fitzroy neighbourhood with its specialty coffee cafés. Lunch at a Southbank wine bar.' } },
      { _key: 'd3',  day: 3,  title: { it: 'Great Ocean Road — Giorno 1',           en: 'Great Ocean Road — Day 1' },              description: { it: 'Partenza in auto verso ovest. Prima tappa a Torquay, culla del surf australiano. Sosta a Lorne per il pranzo con vista sull\'oceano. Arrivo ad Apollo Bay a sera, dove il bosco di eucalipto incontra il mare.', en: 'Drive west. First stop at Torquay, the cradle of Australian surfing. Lunch stop at Lorne overlooking the ocean. Evening arrival at Apollo Bay, where eucalyptus forest meets the sea.' } },
      { _key: 'd4',  day: 4,  title: { it: 'Great Ocean Road — I 12 Apostoli',      en: 'Great Ocean Road — The 12 Apostles' },    description: { it: 'Il momento più spettacolare del percorso: i Twelve Apostles all\'alba, quando la luce dorata tinge le colonne di calcare. Poi Loch Ard Gorge, London Arch, e pranzo a Port Campbell. Rientro a Melbourne in tarda serata.', en: 'The most spectacular moment of the route: the Twelve Apostles at dawn, when golden light tints the limestone columns. Then Loch Ard Gorge, London Arch, and lunch at Port Campbell. Return to Melbourne late evening.' } },
      { _key: 'd5',  day: 5,  title: { it: 'Volo Melbourne → Darwin',               en: 'Flight Melbourne → Darwin' },             description: { it: 'Mattina libera a Melbourne. Volo pomeridiano verso Darwin, capitale del Territorio del Nord, porta d\'accesso al Top End australiano. Cena sul lungomare di Stokes Hill Wharf con vista sul Timor Sea.', en: 'Free morning in Melbourne. Afternoon flight to Darwin, capital of the Northern Territory, gateway to the Australian Top End. Dinner on the Stokes Hill Wharf waterfront overlooking the Timor Sea.' } },
      { _key: 'd6',  day: 6,  title: { it: 'Kakadu National Park',                  en: 'Kakadu National Park' },                  description: { it: 'Escursione nel Kakadu, Patrimonio UNESCO e il più grande parco nazionale australiano. Arte rupestre degli aborigeni a Ubirr, crociera sul Yellow Water Billabong al tramonto tra coccodrilli, aironi e jacana africane.', en: 'Excursion into Kakadu, a UNESCO World Heritage site and Australia\'s largest national park. Aboriginal rock art at Ubirr, sunset cruise on Yellow Water Billabong among crocodiles, herons, and jacanas.' } },
      { _key: 'd7',  day: 7,  title: { it: 'Volo Darwin → Uluru (Ayers Rock)',      en: 'Flight Darwin → Uluru (Ayers Rock)' },    description: { it: 'Volo verso il cuore rosso del continente. Nel pomeriggio, primo incontro con Uluru: il monolite sacro degli Anangu cambia colore mentre il sole scende. Cena under the stars con vista sul Kata Tjuta.', en: 'Flight to the red heart of the continent. In the afternoon, first encounter with Uluru: the Anangu sacred monolith changes colour as the sun sets. Dinner under the stars with Kata Tjuta views.' } },
      { _key: 'd8',  day: 8,  title: { it: 'Uluru e Kata Tjuta',                    en: 'Uluru & Kata Tjuta' },                    description: { it: 'Alba su Uluru dal belvedere con colazione inclusa. Poi escursione guidata a Kata Tjuta (le 36 cupole di arenaria) attraverso la Valle dei Venti. Pomeriggio libero al resort per rilassarsi prima del secondo tramonto su Uluru.', en: 'Uluru sunrise from the viewing area with breakfast. Then guided walk at Kata Tjuta (the 36 sandstone domes) through the Valley of the Winds. Free afternoon at the resort before a second Uluru sunset.' } },
      { _key: 'd9',  day: 9,  title: { it: 'Volo Uluru → Sydney',                   en: 'Flight Uluru → Sydney' },                 description: { it: 'Ultimo mattino nell\'Outback con passeggiata alla base di Uluru. Volo verso Sydney. Arrivo in tarda mattinata, check-in in hotel nel centro. Prima passeggiata al Circular Quay con vista sul porto e sulla Opera House.', en: 'Last morning in the Outback with a walk at the base of Uluru. Flight to Sydney. Late morning arrival, hotel check-in in the city centre. First walk around Circular Quay with harbour and Opera House views.' } },
      { _key: 'd10', day: 10, title: { it: 'Sydney — Iconic highlights',            en: 'Sydney — Iconic highlights' },            description: { it: 'Tour mattutino con Opera House e Harbour Bridge. Pranzo a The Rocks, il quartiere storico dove è nata Sydney. Pomeriggio a Bondi Beach, la spiaggia simbolo dell\'Australia, con la passeggiata costiera fino a Coogee.', en: 'Morning tour of the Opera House and Harbour Bridge. Lunch at The Rocks, the historic neighbourhood where Sydney was born. Afternoon at Bondi Beach, Australia\'s iconic beach, with the coastal walk to Coogee.' } },
      { _key: 'd11', day: 11, title: { it: 'Sydney — Manly e Blue Mountains',       en: 'Sydney — Manly & Blue Mountains' },        description: { it: 'Mattina con traghetto per Manly, la spiaggia nord del porto. Nel pomeriggio, escursione alle Blue Mountains: Three Sisters a Katoomba, vapori di olio di eucalipto che danno il caratteristico blu alla vallata. Cena a Sydney.', en: 'Morning ferry to Manly, the harbour\'s northern beach. Afternoon excursion to the Blue Mountains: Three Sisters at Katoomba, eucalyptus oil vapour giving the valley its distinctive blue hue. Dinner in Sydney.' } },
      { _key: 'd12', day: 12, title: { it: 'Volo Sydney → Papeete → Bora Bora',    en: 'Flight Sydney → Papeete → Bora Bora' }, description: { it: 'Volo internazionale per Tahiti/Papeete, poi volo breve per Bora Bora. Trasferimento in motoscafo al resort sull\'isola del motú. La laguna smeraldo e il profilo del Mont Otemanu vi accolgono — questo è il Pacifico nel suo stato più puro.', en: 'International flight to Tahiti/Papeete, then short flight to Bora Bora. Transfer by speedboat to the motu resort. The emerald lagoon and the profile of Mont Otemanu welcome you — this is the Pacific in its purest state.' } },
      { _key: 'd13', day: 13, title: { it: 'Bora Bora — Laguna e coralli',         en: 'Bora Bora — Lagoon & coral' },           description: { it: 'Giornata dedicata alla laguna: escursione guidata in barca con snorkeling tra i coralli, nuoto con mante e razze, visita agli isolotti del motú. Pranzo in pirogua con chef privato. Tramonto dalla terrazza del bungalow sull\'acqua.', en: 'A day dedicated to the lagoon: guided boat excursion with coral snorkelling, swimming with manta rays and stingrays, visit to motu islets. Pirogua lunch with a private chef. Sunset from the overwater bungalow terrace.' } },
      { _key: 'd14', day: 14, title: { it: 'Bora Bora — Escursione a Mont Otemanu', en: 'Bora Bora — Mt Otemanu hike' },         description: { it: 'Mattina con jeep 4×4 verso le colline verdi dell\'isola principale per raggiungere i punti panoramici su Mont Otemanu. Pomeriggio libero in resort tra piscina e hammam. Cena romantica a lume di candela fronte laguna.', en: 'Morning 4×4 jeep ride to the green hills of the main island to reach panoramic viewpoints over Mont Otemanu. Free afternoon at the resort between pool and hammam. Romantic candlelit dinner by the lagoon.' } },
      { _key: 'd15', day: 15, title: { it: 'Bora Bora → Papeete → Rientro',       en: 'Bora Bora → Papeete → Return' },         description: { it: 'Mattina libera nella laguna di Bora Bora. Trasferimento in aeroporto, volo per Papeete e volo intercontinentale di rientro in Italia via Los Angeles o Parigi. Fine del viaggio con il cuore pieno di meraviglia.', en: 'Free morning on Bora Bora lagoon. Transfer to the airport, flight to Papeete, and intercontinental return flight to Italy via Los Angeles or Paris. Journey ends with hearts full of wonder.' } },
    ],
    included: {
      it: [
        'Pernottamenti in hotel 4★/5★ e resort overwater selezionati',
        'Colazioni incluse in tutti gli hotel',
        'Noleggio auto per Great Ocean Road',
        'Tour guidati: Kakadu, Uluru/Kata Tjuta',
        'Trasferimento in motoscafo a Bora Bora',
        'Escursione in laguna a Bora Bora con pranzo',
        'Tutti i trasferimenti aeroportuali locali',
        'Assistenza continua del nostro team a Brisbane',
      ],
      en: [
        'Accommodation in selected 4★/5★ hotels and overwater resorts',
        'Breakfast included at all hotels',
        'Car hire for the Great Ocean Road',
        'Guided tours: Kakadu, Uluru/Kata Tjuta',
        'Speedboat transfer in Bora Bora',
        'Bora Bora lagoon excursion with lunch',
        'All local airport transfers',
        'Ongoing support from our Brisbane team',
      ],
    },
    notIncluded: standardNotIncluded,
    featured: true,
  },

  // ── 2. POLINESIA IN CATAMARANO — 15 giorni ──────────────────────────────
  {
    _id: 'itinerary-meravigliosa-polinesia',
    _type: 'itinerary',
    title: {
      it: "Polinesia in catamarano — meraviglioso viaggio tra Raiatea, Taha'a, Bora Bora e Moorea",
      en: "French Polynesia by catamaran — a wonderful voyage between Raiatea, Taha'a, Bora Bora and Moorea",
    },
    slug: { _type: 'slug', current: 'meravigliosa-polinesia' },
    duration: 15,
    price: { amount: 9730, currency: 'EUR' },
    category: 'luxury',
    description: {
      it: "Navigare tra le isole della Polinesia Francese su un catamarano privato: Raiatea, Taha'a profumata di vaniglia, Bora Bora e Moorea. Lagune, coralli, balene e tramonti senza eguali. Un sogno che diventa itinerario.",
      en: "Sailing between the islands of French Polynesia aboard a private catamaran: Raiatea, vanilla-scented Taha'a, Bora Bora and Moorea. Lagoons, coral, whales and matchless sunsets. A dream made into an itinerary.",
    },
    highlights: {
      it: ["Catamarano privato tra le isole", "Laguna di Bora Bora in barca", "Profumo di vaniglia a Taha'a", "Snorkeling con razze e squali di barriera", "Balene megattera (stagionale)"],
      en: ['Private catamaran between islands', 'Bora Bora lagoon by boat', "Vanilla scent on Taha'a", 'Snorkelling with stingrays and reef sharks', 'Humpback whales (seasonal)'],
    },
    program: [
      { _key: 'd1',  day: 1,  title: { it: 'Arrivo a Papeete',                  en: 'Arrival in Papeete' },                description: { it: 'Atterraggio a Tahiti Faa\'a. Trasferimento in hotel a Papeete. Sera libera per esplorare il mercato di Papeete e assaggiare i primi piatti polinesiani. Breve visita al lungomare.', en: "Landing at Tahiti Faa'a. Transfer to hotel in Papeete. Free evening to explore Papeete market and taste the first Polynesian dishes. Short waterfront stroll." } },
      { _key: 'd2',  day: 2,  title: { it: 'Volo Papeete → Raiatea — Imbarco sul catamarano', en: 'Flight Papeete → Raiatea — Catamaran boarding' }, description: { it: 'Volo mattutino per Raiatea. Imbarco sul catamarano privato nel pomeriggio. Briefing con il capitano e prima uscita in baia per testare le attrezzature da snorkeling. Cena a bordo al tramonto.', en: 'Morning flight to Raiatea. Board the private catamaran in the afternoon. Briefing with the captain and first outing into the bay to test snorkelling gear. Dinner on board at sunset.' } },
      { _key: 'd3',  day: 3,  title: { it: "Raiatea — Tempio Marae Taputapuatea", en: 'Raiatea — Marae Taputapuatea temple' }, description: { it: "Visita al marae Taputapuatea, antico luogo sacro polinesiano e Patrimonio UNESCO. Snorkeling nella laguna di Raiatea con i suoi coralli colorati. Pranzo a bordo all'ancora in una baia isolata. Navigazione verso Taha'a in tarda giornata.", en: "Visit to Marae Taputapuatea, an ancient Polynesian sacred site and UNESCO World Heritage site. Snorkelling in Raiatea's colourful lagoon. Lunch on board at anchor in a secluded bay. Navigation to Taha'a in the late afternoon." } },
      { _key: 'd4',  day: 4,  title: { it: "Taha'a — L'isola della vaniglia",    en: "Taha'a — The vanilla island" },        description: { it: "Giornata a Taha'a, la 'Perla della Polinesia'. Visita a una piantagione di vaniglia per scoprire il processo di essiccazione e fermentazione. Snorkeling nel coral garden, uno dei più ricchi del Pacifico. Cena con aragosta a bordo.", en: "Full day on Taha'a, the 'Pearl of Polynesia'. Visit a vanilla plantation to discover the drying and fermentation process. Snorkelling in the coral garden, one of the richest in the Pacific. Lobster dinner on board." } },
      { _key: 'd5',  day: 5,  title: { it: "Navigazione verso Bora Bora",        en: 'Sailing to Bora Bora' },               description: { it: "Navigazione mattutina verso Bora Bora. Ingresso nel pass della laguna con il Mont Otemanu che si staglia all'orizzonte. Pranzo in rada con vista sul profilo vulcanico. Pomeriggio libero per esplorare il villaggio di Vaitape in dinghy.", en: "Morning sail to Bora Bora. Entry through the lagoon pass with Mont Otemanu rising on the horizon. Lunch at anchor with views of the volcanic profile. Free afternoon to explore Vaitape village by dinghy." } },
      { _key: 'd6',  day: 6,  title: { it: 'Bora Bora — Laguna e razze',         en: 'Bora Bora — Lagoon & stingrays' },    description: { it: "Escursione guidata in laguna: snorkeling con squali pinna nera e nuoto con le razze in acque bassissime. Pranzo su motú privato. Tramonto sulla laguna dal catamarano con aperitivo di frutta fresca.", en: "Guided lagoon excursion: snorkelling with blacktip reef sharks and swimming with stingrays in shallow water. Lunch on a private motu. Lagoon sunset from the catamaran with fresh fruit aperitif." } },
      { _key: 'd7',  day: 7,  title: { it: 'Bora Bora — Giornata libera',        en: 'Bora Bora — Free day' },               description: { it: "Giornata a disposizione: chi vuole può fare jet ski, parasailing, kite surf o semplicemente oziare in laguna. Opzione escursione a Mont Otemanu con guida locale. Cena a terra in uno dei ristoranti fronte laguna dell'isola.", en: "Day at leisure: jet ski, parasailing, kite surfing or simply relaxing in the lagoon. Optional guided hike on Mont Otemanu. Evening dinner ashore at one of the island's lagoon-front restaurants." } },
      { _key: 'd8',  day: 8,  title: { it: 'Navigazione → Huahine',              en: 'Sail to Huahine' },                    description: { it: "Lunga navigazione verso Huahine, la più selvaggia e autentica delle isole Sopravvento. Arrivo nel tardo pomeriggio. Prima immersione nella laguna di Huahine, ancora quasi incontaminata. Notte all'ancora in una baia silenziosa.", en: "Long sail to Huahine, the wildest and most authentic of the Windward Islands. Arrival in the late afternoon. First dive into Huahine's lagoon, still nearly pristine. Night at anchor in a quiet bay." } },
      { _key: 'd9',  day: 9,  title: { it: 'Huahine — Archeologia e natura',     en: 'Huahine — Archaeology & nature' },    description: { it: "Esplorazione in bicicletta dei marae (templi) di Huahine, tra i più conservati della Polinesia. Visita al villaggio di pesca di Fare. Snorkeling nella barriera corallina esterna. Pomeriggio libero a bordo con lettura e relax.", en: "Bicycle exploration of Huahine's marae (temples), among the best-preserved in Polynesia. Visit to the fishing village of Fare. Snorkelling on the outer reef. Free afternoon on board for reading and relaxation." } },
      { _key: 'd10', day: 10, title: { it: 'Navigazione di rientro → Moorea',   en: 'Return sail → Moorea' },               description: { it: "Navigazione verso Moorea, l'isola che diede ispirazione al paradiso del Pacifico immaginato da James Michener. Ingresso nella baia di Cook o di Opunohu al tramonto — momenti di bellezza assoluta. Cena a bordo in baia.", en: "Sail to Moorea, the island that inspired James Michener's Pacific paradise. Entry into Cook's Bay or Opunohu Bay at sunset — moments of absolute beauty. Dinner on board in the bay." } },
      { _key: 'd11', day: 11, title: { it: 'Moorea — Avventura e panorami',     en: 'Moorea — Adventure & panoramas' },    description: { it: "Escursione 4×4 sulle alture di Moorea: belvedere su entrambe le baie, piantagioni di ananas e vaniglia. Pomeriggio con snorkeling nella laguna di Moorea, famosa per le balene megattere (luglio-novembre). Cena a terra in un roulotte gastronomica.", en: "4×4 excursion into Moorea's highlands: viewpoints over both bays, pineapple and vanilla plantations. Afternoon snorkelling in Moorea's lagoon, famous for humpback whales (July–November). Street food dinner ashore." } },
      { _key: 'd12', day: 12, title: { it: 'Moorea → Rientro a Papeete — Sbarco', en: 'Moorea → Return to Papeete — Disembark' }, description: { it: "Mattina libera in laguna. Navigazione verso Papeete nel pomeriggio. Sbarco dal catamarano. Check-in in hotel a Papeete. Serata libera per gli ultimi acquisti al mercato artigianale.", en: "Free morning in the lagoon. Sail to Papeete in the afternoon. Disembark from the catamaran. Hotel check-in in Papeete. Free evening for last-minute shopping at the craft market." } },
      { _key: 'd13', day: 13, title: { it: 'Papeete → Rientro',                 en: 'Papeete → Return home' },              description: { it: "Trasferimento all'aeroporto e volo di rientro in Italia via Los Angeles o Parigi. Fine di un viaggio che resterà impresso nella memoria per sempre.", en: "Transfer to the airport and return flight to Italy via Los Angeles or Paris. The end of a journey that will stay in your memory forever." } },
    ],
    included: {
      it: [
        'Catamarano privato con skipper professionista',
        'Pernottamenti a bordo in cabine doppie con bagno privato',
        'Colazioni, pranzi e cene a bordo inclusi',
        'Volo Papeete → Raiatea (interno)',
        'Escursione guidata in laguna a Bora Bora',
        'Visita piantagione vaniglia a Taha\'a',
        'Snorkeling kit completo a bordo',
        'Mezza giornata 4×4 a Moorea',
        'Hotel 1 notte a Papeete (prima e ultima)',
      ],
      en: [
        'Private catamaran with professional skipper',
        'Overnight stays in double cabins with private bathroom',
        'Breakfasts, lunches and dinners on board',
        'Papeete → Raiatea domestic flight',
        'Guided lagoon excursion in Bora Bora',
        "Vanilla plantation visit on Taha'a",
        'Full snorkelling kit on board',
        'Half-day 4×4 in Moorea',
        '1-night hotel in Papeete (first and last night)',
      ],
    },
    notIncluded: standardNotIncluded,
    featured: true,
  },

  // ── 3. NUOVA ZELANDA + POLINESIA — 22 giorni ────────────────────────────
  {
    _id: 'itinerary-nuova-zelanda-polinesia',
    _type: 'itinerary',
    title: {
      it: 'Nuova Zelanda e Polinesia — viaggio tra i paesaggi più Spettacolari del Mondo',
      en: 'New Zealand & French Polynesia — a journey through the most spectacular landscapes on Earth',
    },
    slug: { _type: 'slug', current: 'nuova-zelanda-polinesia' },
    duration: 22,
    price: { amount: 9710, currency: 'EUR' },
    category: 'adventure',
    description: {
      it: "Dalla Nuova Zelanda alla Polinesia Francese: fiordi spettacolari, vulcani attivi e hobbiton nell'isola del nord, poi le acque turchesi di Bora Bora e Moorea. Due mondi agli antipodi dello stesso oceano, uniti in un unico viaggio indimenticabile.",
      en: "From New Zealand to French Polynesia: spectacular fjords, active volcanoes and Hobbiton on the North Island, then the turquoise waters of Bora Bora and Moorea. Two worlds at the opposite ends of the same ocean, united in one unforgettable journey.",
    },
    highlights: {
      it: ['Milford Sound all\'alba', 'Waitomo — grotte con vermi luminosi', 'Hobbiton, la contea di Frodo', 'Franz Josef Glacier', 'Laguna di Bora Bora'],
      en: ['Milford Sound at dawn', 'Waitomo — glowworm caves', "Hobbiton, Frodo's Shire", 'Franz Josef Glacier', 'Bora Bora lagoon'],
    },
    program: [
      { _key: 'd1',  day: 1,  title: { it: 'Arrivo a Auckland',                  en: 'Arrival in Auckland' },                description: { it: "Atterraggio ad Auckland. Trasferimento in hotel nel centro città. Prima serata sul lungomare di Viaduct Harbour, con vista sulla Waitemata Harbour e le molte barche a vela che hanno reso Auckland la 'City of Sails'.", en: "Land in Auckland. Transfer to city-centre hotel. First evening on the Viaduct Harbour waterfront, looking out over Waitemata Harbour and the many yachts that earned Auckland the title 'City of Sails'." } },
      { _key: 'd2',  day: 2,  title: { it: 'Auckland e Waiheke Island',          en: 'Auckland & Waiheke Island' },          description: { it: "Traghetto per Waiheke Island: vigneti, spiagge isolate e vista panoramica sul Golfo di Hauraki. Visita a due cantine con degustazione. Rientro ad Auckland nel tardo pomeriggio. Cena nel quartiere di Ponsonby.", en: "Ferry to Waiheke Island: vineyards, secluded beaches and panoramic views over Hauraki Gulf. Visit two wineries with tasting. Return to Auckland in the late afternoon. Dinner in the Ponsonby district." } },
      { _key: 'd3',  day: 3,  title: { it: 'Rotorua — Maori e geotermale',       en: 'Rotorua — Māori & geothermal' },        description: { it: "Guida verso Rotorua attraverso la regione del Waikato. Sosta a Cambridge. Arrivo a Rotorua, città maori per eccellenza, con i suoi geyser, fanghi bollenti e piscine geotermali. Serata con haka e hangi (pranzo maori tradizionale cotto sottoterra).", en: "Drive to Rotorua through the Waikato region. Stop at Cambridge. Arrival in Rotorua, the quintessential Māori city, with its geysers, boiling mud and geothermal pools. Evening with haka and hāngī (traditional Māori meal cooked underground)." } },
      { _key: 'd4',  day: 4,  title: { it: 'Waitomo e Hobbiton',                 en: 'Waitomo & Hobbiton' },                 description: { it: "Mattina nelle grotte di Waitomo: un'avventura in barca lungo il fiume sotterraneo illuminato da migliaia di vermi luminosi (Arachnocampa luminosa). Pranzo ad Otorohanga. Pomeriggio a Hobbiton, la Contea costruita per il film Il Signore degli Anelli.", en: "Morning in Waitomo Caves: a boat adventure along the underground river lit by thousands of glowworms (Arachnocampa luminosa). Lunch at Otorohanga. Afternoon at Hobbiton, the Shire built for The Lord of the Rings film." } },
      { _key: 'd5',  day: 5,  title: { it: 'Volo Auckland → Queenstown',         en: 'Flight Auckland → Queenstown' },       description: { it: "Volo sull'Isola del Sud verso Queenstown, la capitale dell'avventura. Atterraggio con vista sul lago Wakatipu e le Remarkables. Pomeriggio libero per esplorare il lungomare di Queenstown. Cena con vista sul lago.", en: "Fly to the South Island to Queenstown, the adventure capital. Land with views of Lake Wakatipu and the Remarkables. Free afternoon exploring Queenstown's lakefront. Dinner overlooking the lake." } },
      { _key: 'd6',  day: 6,  title: { it: 'Milford Sound',                      en: 'Milford Sound' },                      description: { it: "Giornata escursione a Milford Sound attraverso il Fiordland. Crociera nel fiordo tra cascate, delfini e foche. Il Mitre Peak riflesso nell'acqua scura è una delle visioni più memorabili del Pacifico del Sud. Rientro a Queenstown in serata.", en: "Full-day excursion to Milford Sound through Fiordland. Cruise in the fjord past waterfalls, dolphins and seals. Mitre Peak reflected in dark water is one of the most memorable sights in the South Pacific. Return to Queenstown in the evening." } },
      { _key: 'd7',  day: 7,  title: { it: 'Queenstown — Avventura e vino',     en: 'Queenstown — Adventure & wine' },      description: { it: "Mattina con attività a scelta: bungee jumping al Kawarau Bridge (il primo al mondo), jetboat sullo Shotover River, o visita alle cantine di Gibbston Valley. Pomeriggio libero. Cena in uno dei ristoranti stellati del centro.", en: "Morning activity of your choice: bungee jumping at Kawarau Bridge (the world's first), jetboat on the Shotover River, or wine tasting in Gibbston Valley. Free afternoon. Dinner at one of the town-centre fine-dining restaurants." } },
      { _key: 'd8',  day: 8,  title: { it: 'Wanaka e Franz Josef Glacier',       en: 'Wanaka & Franz Josef Glacier' },       description: { it: "Drive attraverso la Crown Range verso Wanaka. Breve sosta al lago Wanaka con il famoso albero solitario nell'acqua. Poi verso la costa ovest e Franz Josef, il ghiacciaio che scende fino quasi al livello del mare tra foreste tropicali.", en: "Drive over Crown Range to Wanaka. Brief stop at Lake Wanaka with the famous lone tree in the water. Then on to the West Coast and Franz Josef, the glacier that descends almost to sea level through rainforest." } },
      { _key: 'd9',  day: 9,  title: { it: 'Franz Josef Glacier — Heli-hike',   en: 'Franz Josef Glacier — Heli-hike' },    description: { it: "Esperienza unica: elicottero che atterra sul ghiacciaio, poi trekking guidato tra seracchi e crepacci di ghiaccio blu. Nel pomeriggio, drive verso Hokitika con sosta alle Hokitika Gorge, dalle acque turchesi impossibili. Cena con seafood locale.", en: "Unique experience: helicopter landing on the glacier, then guided trekking among seracs and blue ice crevasses. Afternoon drive to Hokitika with a stop at Hokitika Gorge with its impossibly turquoise water. Dinner with local seafood." } },
      { _key: 'd10', day: 10, title: { it: 'Abel Tasman e Picton',               en: 'Abel Tasman & Picton' },               description: { it: "Volo verso Nelson. Escursione mattutina nell'Abel Tasman National Park, con kayak o water taxi tra spiagge dorate e baie incontaminate. Pomeriggio a Picton, porta di accesso ai Marlborough Sounds.", en: "Fly to Nelson. Morning excursion in Abel Tasman National Park, by kayak or water taxi between golden beaches and pristine bays. Afternoon in Picton, gateway to the Marlborough Sounds." } },
      { _key: 'd11', day: 11, title: { it: 'Marlborough Sounds e vini',          en: 'Marlborough Sounds & wine' },          description: { it: "Crociera mattutina nei Marlborough Sounds, il labirinto di baie e insenature dell'Isola del Sud. Pomeriggio nella regione del Marlborough per degustazione di Sauvignon Blanc nelle cantine più famose della Nuova Zelanda. Volo verso Auckland.", en: "Morning cruise in the Marlborough Sounds, the South Island's labyrinth of bays and inlets. Afternoon in Marlborough wine country for Sauvignon Blanc tasting at New Zealand's most famous wineries. Flight to Auckland." } },
      { _key: 'd12', day: 12, title: { it: 'Volo Auckland → Papeete → Bora Bora', en: 'Flight Auckland → Papeete → Bora Bora' }, description: { it: "Volo internazionale da Auckland a Tahiti/Papeete, poi volo breve per Bora Bora. Arrivo in resort con trasferimento in motoscafo. La laguna smeraldo vi accoglie dopo gli spettacoli naturali della Nuova Zelanda.", en: "International flight from Auckland to Tahiti/Papeete, then short flight to Bora Bora. Arrive at resort by speedboat transfer. The emerald lagoon welcomes you after New Zealand's natural wonders." } },
      { _key: 'd13', day: 13, title: { it: 'Bora Bora — Laguna e coralli',       en: 'Bora Bora — Lagoon & coral' },         description: { it: "Giornata nella laguna di Bora Bora: escursione guidata con snorkeling tra coralli, mante, razze e squali pinna nera. Pranzo su motú privato. Tramonto sul Mont Otemanu dalla terrazza del bungalow sull'acqua.", en: "Day in Bora Bora's lagoon: guided excursion snorkelling with coral, manta rays, stingrays and blacktip reef sharks. Lunch on a private motu. Sunset over Mont Otemanu from the overwater bungalow terrace." } },
      { _key: 'd14', day: 14, title: { it: 'Moorea — Baia di Cook',              en: "Moorea — Cook's Bay" },                description: { it: "Volo breve per Moorea. Check-in in resort fronte laguna. Pomeriggio in kayak nella baia di Cook, con i profili dentati dei picchi vulcanici che si riflettono nell'acqua blu. Cena con menu degustazione di pesce locale.", en: "Short flight to Moorea. Check-in at lagoon-front resort. Afternoon kayaking in Cook's Bay, with the jagged volcanic peaks reflected in the blue water. Dinner with a local fish tasting menu." } },
      { _key: 'd15', day: 15, title: { it: 'Moorea → Papeete → Rientro',        en: 'Moorea → Papeete → Return home' },     description: { it: "Mattina libera nell'isola di Moorea. Trasferimento a Papeete e volo intercontinentale di rientro in Italia. Fine del viaggio con immagini che durano tutta la vita.", en: "Free morning on Moorea. Transfer to Papeete and intercontinental return flight to Italy. The journey ends with images that last a lifetime." } },
    ],
    included: {
      it: [
        'Pernottamenti in hotel 4★/5★ e resort overwater selezionati',
        'Colazioni incluse in tutti gli hotel',
        'Noleggio auto Queenstown → Franz Josef → Nelson',
        'Tour guidati: Waitomo, Hobbiton, Milford Sound',
        'Heli-hike sul ghiacciaio Franz Josef',
        'Volo Papeete → Bora Bora → Moorea (interni)',
        'Escursione in laguna a Bora Bora con pranzo',
        'Tutti i trasferimenti aeroportuali locali',
      ],
      en: [
        'Accommodation in selected 4★/5★ hotels and overwater resorts',
        'Breakfast included at all hotels',
        'Car hire Queenstown → Franz Josef → Nelson',
        'Guided tours: Waitomo, Hobbiton, Milford Sound',
        'Franz Josef Glacier heli-hike',
        'Papeete → Bora Bora → Moorea domestic flights',
        'Bora Bora lagoon excursion with lunch',
        'All local airport transfers',
      ],
    },
    notIncluded: standardNotIncluded,
    featured: true,
  },

  // ── 4. GRUPPO NUOVA ZELANDA — 18 giorni ─────────────────────────────────
  {
    _id: 'itinerary-gruppo-nuova-zelanda',
    _type: 'itinerary',
    title: {
      it: 'Nuova Zelanda: Viaggio di gruppo esclusivo in italiano',
      en: 'New Zealand: Exclusive Italian-speaking group tour',
    },
    slug: { _type: 'slug', current: 'gruppo-nuova-zelanda' },
    duration: 18,
    price: { amount: 5700, currency: 'EUR' },
    category: 'group',
    description: {
      it: "Un viaggio di gruppo guidato interamente in italiano, dalla Baia delle Isole al Fiordland. Piccolo gruppo (max 12 persone), guida italiana esperta, sistemazioni curate e un ritmo di viaggio pensato per godere ogni paesaggio senza correre. La Nuova Zelanda come la vivono i viaggiatori appassionati.",
      en: "A group tour guided entirely in Italian, from the Bay of Islands to Fiordland. Small group (max 12), expert Italian-speaking guide, handpicked accommodation and a travel pace designed to savour every landscape without rushing. New Zealand as passionate travellers experience it.",
    },
    highlights: {
      it: ['Piccolo gruppo max 12 persone', 'Guida italiana esperta', 'Milford Sound', 'Hobbiton', 'Fiordland e Doubtful Sound'],
      en: ['Small group max 12 people', 'Expert Italian-speaking guide', 'Milford Sound', 'Hobbiton', 'Fiordland & Doubtful Sound'],
    },
    program: [
      { _key: 'd1',  day: 1,  title: { it: 'Arrivo a Auckland — Incontro del gruppo', en: 'Arrival in Auckland — Group meeting' }, description: { it: "Atterraggio ad Auckland. Trasferimento in hotel e cena di benvenuto con tutto il gruppo. Prima serata conviviale per conoscersi, con aperitivo sul rooftop del Viaduct Harbour e cena in un ristorante con cucina fusion New Zealand.", en: "Landing in Auckland. Hotel transfer and welcome dinner with the whole group. First convivial evening to get to know each other, with aperitivo on the Viaduct Harbour rooftop and dinner at a New Zealand fusion restaurant." } },
      { _key: 'd2',  day: 2,  title: { it: 'Auckland — Sky Tower e Waiheke',     en: 'Auckland — Sky Tower & Waiheke' },    description: { it: "Mattina in città: Auckland Museum con le collezioni maori e la collezione Pacific. Salita alla Sky Tower. Pranzo nel quartiere di Ponsonby. Pomeriggio a Waiheke Island con degustazione di vini locali.", en: "Morning in the city: Auckland Museum with Māori collections and Pacific collection. Climb the Sky Tower. Lunch in the Ponsonby district. Afternoon on Waiheke Island with local wine tasting." } },
      { _key: 'd3',  day: 3,  title: { it: 'Baia delle Isole',                   en: 'Bay of Islands' },                    description: { it: "Drive verso nord attraverso le colline del Northland. Arrivo alla Baia delle Isole: 144 isole, acque cristalline e delfini. Crociera pomeridiana tra le isole con sosta a Russell, la prima capitale coloniale della Nuova Zelanda.", en: "Drive north through the Northland hills. Arrival at the Bay of Islands: 144 islands, crystal waters and dolphins. Afternoon cruise between the islands with a stop at Russell, New Zealand's first colonial capital." } },
      { _key: 'd4',  day: 4,  title: { it: 'Whangarei — Rientro verso sud',      en: 'Whangarei — Return south' },          description: { it: "Mattina nella Baia delle Isole, poi drive verso sud con sosta a Whangarei Falls, una delle cascate più accessibili della Nuova Zelanda. Pranzo a Whangarei. Rientro ad Auckland nel tardo pomeriggio.", en: "Morning in the Bay of Islands, then drive south with a stop at Whangarei Falls, one of New Zealand's most accessible waterfalls. Lunch at Whangarei. Return to Auckland in the late afternoon." } },
      { _key: 'd5',  day: 5,  title: { it: 'Waitomo e Hobbiton',                 en: 'Waitomo & Hobbiton' },                description: { it: "Giornata piena tra le due attrazioni più iconiche dell'Isola del Nord. Mattina nelle grotte di Waitomo con la crociera dei vermi luminosi. Pranzo sul percorso. Pomeriggio a Hobbiton — la Contea di Frodo — con visita guidata inclusa.", en: "Full day at the North Island's two most iconic attractions. Morning in Waitomo Caves with the glowworm boat cruise. Lunch en route. Afternoon at Hobbiton — Frodo's Shire — with guided tour included." } },
      { _key: 'd6',  day: 6,  title: { it: 'Rotorua — Maori e geotermale',       en: 'Rotorua — Māori & geothermal' },      description: { it: "Arrivo a Rotorua. Visita a Te Puia con geyser Pohutu e il villaggio maori. Pomeriggio alle Wai-O-Tapu Thermal Wonderland — i colori irreali delle piscine geotermali. Serata con spettacolo maori e cena hangi tradizionale.", en: "Arrival in Rotorua. Visit Te Puia with the Pohutu geyser and Māori village. Afternoon at Wai-O-Tapu Thermal Wonderland — the unreal colours of geothermal pools. Evening with Māori cultural performance and traditional hāngī dinner." } },
      { _key: 'd7',  day: 7,  title: { it: 'Lake Taupo e Tongariro',             en: 'Lake Taupo & Tongariro' },            description: { it: "Drive verso il lago Taupo, il più grande della Nuova Zelanda, formato da un'eruzione vulcanica. Sosta alle cascate Huka. Nel pomeriggio, avvicinamento al Tongariro National Park — i vulcani usati come Mordor nel Signore degli Anelli.", en: "Drive to Lake Taupo, New Zealand's largest lake, formed by a volcanic eruption. Stop at Huka Falls. In the afternoon, approach to Tongariro National Park — the volcanoes used as Mordor in The Lord of the Rings." } },
      { _key: 'd8',  day: 8,  title: { it: 'Tongariro Alpine Crossing (opz.)',   en: 'Tongariro Alpine Crossing (opt.)' },  description: { it: "Possibilità di fare il Tongariro Alpine Crossing (19 km, giornata intera), considerato uno dei day hike più belli del mondo: crateri, laghi smeraldo e paesaggi vulcanici lunari. Alternativa: relax all'hotel spa con vista sui vulcani.", en: "Option to complete the Tongariro Alpine Crossing (19 km, full day), considered one of the world's most beautiful day hikes: craters, emerald lakes and lunar volcanic landscapes. Alternative: relax at the hotel spa with volcano views." } },
      { _key: 'd9',  day: 9,  title: { it: 'Volo verso l\'Isola del Sud — Queenstown', en: "Flight to the South Island — Queenstown" }, description: { it: "Volo da Wellington o Auckland verso Queenstown, la capitale dell'avventura dell'Isola del Sud. Pomeriggio libero per esplorare il centro e il lungomare del lago Wakatipu. Cena di gruppo in un ristorante panoramico.", en: "Fly from Wellington or Auckland to Queenstown, the South Island's adventure capital. Free afternoon to explore the centre and Lake Wakatipu waterfront. Group dinner at a panoramic restaurant." } },
      { _key: 'd10', day: 10, title: { it: 'Glenorchy e Paradise',               en: 'Glenorchy & Paradise' },              description: { it: "Drive lungo il lago Wakatipu verso Glenorchy e Paradise — location usata per il Signore degli Anelli. Paesaggi di montagna e pianure di ghiaia ai piedi delle Alpi del Sud. Pranzo a Glenorchy. Ritorno a Queenstown nel pomeriggio.", en: "Drive along Lake Wakatipu to Glenorchy and Paradise — locations used in The Lord of the Rings. Mountain scenery and gravel plains at the foot of the Southern Alps. Lunch at Glenorchy. Return to Queenstown in the afternoon." } },
      { _key: 'd11', day: 11, title: { it: 'Milford Sound',                      en: 'Milford Sound' },                     description: { it: "Giornata escursione a Milford Sound: drive attraverso il Fiordland con sosta a Mirror Lake e all'ingresso del Homer Tunnel. Crociera nel fiordo con pranzo a bordo. Il Mitre Peak e le cascate che precipitano nel fiordo — paesaggi impossibili.", en: "Full-day Milford Sound excursion: drive through Fiordland with stops at Mirror Lake and the Homer Tunnel entrance. Cruise in the fjord with lunch on board. Mitre Peak and cascading waterfalls — impossible landscapes." } },
      { _key: 'd12', day: 12, title: { it: 'Doubtful Sound — Escursione',        en: 'Doubtful Sound — Excursion' },        description: { it: "Escursione al Doubtful Sound — il fiordo più remoto e silenzioso, tre volte più lungo del Milford. Si raggiunge via traghetto sul lago Manapouri, poi bus 4×4 sul Wilmot Pass. Crociera tra foche, delfini e cascate immense.", en: "Excursion to Doubtful Sound — the most remote and silent fjord, three times longer than Milford. Reached by ferry on Lake Manapouri, then 4×4 bus over Wilmot Pass. Cruise among seals, dolphins and immense waterfalls." } },
      { _key: 'd13', day: 13, title: { it: 'Cromwell e Wanaka',                  en: 'Cromwell & Wanaka' },                 description: { it: "Drive attraverso la Central Otago — la regione dei vigneti e delle ciliege — verso Cromwell. Degustazione di vini Pinot Noir, il migliore della Nuova Zelanda. Arrivo a Wanaka nel tardo pomeriggio, con vista sul lago e sul monte Aspiring.", en: "Drive through Central Otago — the region of vineyards and cherries — to Cromwell. Pinot Noir wine tasting, New Zealand's finest. Arrival in Wanaka in the late afternoon, with views of the lake and Mt Aspiring." } },
      { _key: 'd14', day: 14, title: { it: 'Franz Josef Glacier',                en: 'Franz Josef Glacier' },               description: { it: "Drive sulla costa ovest attraverso le foreste pluviali temperate. Arrivo a Franz Josef. Escursione al ghiacciaio: walk nella terminal valley con vista sui serracchi. Opzione elicottero per sorvolare il ghiacciaio. Notte in hotel con vista sulla foresta.", en: "Drive along the West Coast through temperate rainforest. Arrival at Franz Josef. Glacier walk: explore the terminal valley with views of the ice seracs. Helicopter option to fly over the glacier. Overnight in a hotel with forest views." } },
      { _key: 'd15', day: 15, title: { it: 'Greymouth e Arthurs Pass',           en: "Greymouth & Arthur's Pass" },         description: { it: "Drive verso Greymouth, poi sul treno panoramico TranzAlpine attraverso le Alpi del Sud fino a Christchurch. Il percorso ferroviario più bello della Nuova Zelanda: valli glaciali, viadotti e gallerie nelle montagne.", en: "Drive to Greymouth, then board the scenic TranzAlpine train through the Southern Alps to Christchurch. New Zealand's most beautiful rail journey: glacial valleys, viaducts and tunnels through the mountains." } },
      { _key: 'd16', day: 16, title: { it: 'Christchurch',                       en: 'Christchurch' },                      description: { it: "Giornata nella città delle rose: il Botanic Gardens in fiore, la Cattedrale di Cardboard (il simbolo della ricostruzione post-terremoto), il tramway storico. Cena di arrivederci con tutto il gruppo.", en: "A day in the garden city: blooming Botanic Gardens, the Cardboard Cathedral (symbol of post-earthquake reconstruction), the historic tram. Farewell dinner with the whole group." } },
      { _key: 'd17', day: 17, title: { it: 'Volo di rientro',                    en: 'Return flight' },                     description: { it: "Trasferimento all'aeroporto di Christchurch. Volo di rientro in Italia via Singapore, Dubai, Abu Dhabi o Sydney. Fine del viaggio con i nuovi amici di un'esperienza indimenticabile.", en: "Transfer to Christchurch Airport. Return flight to Italy via Singapore, Dubai, Abu Dhabi or Sydney. The journey ends with new friends from an unforgettable experience." } },
    ],
    included: {
      it: [
        'Guida italiana esperta per tutta la durata del viaggio',
        'Pernottamenti in hotel 3★/4★ selezionati (doppia)',
        'Colazioni incluse in tutti gli hotel',
        'Minibus privato con autista per tutti i transfer terrestri',
        'Tour guidati: Waitomo, Hobbiton, Milford Sound, Doubtful Sound',
        'Crociere: Baia delle Isole, Milford Sound, Doubtful Sound',
        'Treno panoramico TranzAlpine (Greymouth → Christchurch)',
        'Degustazione vini Marlborough/Central Otago',
        'Cena di benvenuto e cena di arrivederci',
      ],
      en: [
        'Expert Italian-speaking guide for the entire trip',
        'Accommodation in selected 3★/4★ hotels (twin)',
        'Breakfast included at all hotels',
        'Private minibus with driver for all land transfers',
        'Guided tours: Waitomo, Hobbiton, Milford Sound, Doubtful Sound',
        'Cruises: Bay of Islands, Milford Sound, Doubtful Sound',
        'TranzAlpine scenic train (Greymouth → Christchurch)',
        'Marlborough/Central Otago wine tasting',
        'Welcome dinner and farewell dinner',
      ],
    },
    notIncluded: standardNotIncluded,
    featured: true,
  },

  // ── 5. AUSTRALIA SELVAGGIA — 28 giorni ──────────────────────────────────────
  {
    _id: 'itinerary-australia-selvaggia',
    _type: 'itinerary',
    title: {
      it: 'Australia Selvaggia — Darwin, Kakadu, Reef, Sydney, Uluru, Melbourne e Kangaroo Island',
      en: 'Wild Australia — Darwin, Kakadu, the Reef, Sydney, Uluru, Melbourne & Kangaroo Island',
    },
    slug: { _type: 'slug', current: 'australia-selvaggia' },
    duration: 28,
    price: { amount: 5600, currency: 'EUR' },
    category: 'avventura',
    description: {
      it: "Un grand tour dell'Australia autentica: dalle foreste pluviali del Territorio del Nord e la Grande Barriera Corallina, passando per Sydney e il Red Centre con Uluru e Kings Canyon, fino alla Great Ocean Road, Phillip Island e il selvaggio road trip su Kangaroo Island. Ventotto giorni per toccare l'anima di un continente.",
      en: "A grand tour of authentic Australia: from the Northern Territory rainforests and the Great Barrier Reef, through Sydney and the Red Centre with Uluru and Kings Canyon, to the Great Ocean Road, Phillip Island and a wild road trip on Kangaroo Island. Twenty-eight days to touch the soul of a continent.",
    },
    highlights: {
      it: ['Kakadu e Litchfield — 3 giorni nel Territorio del Nord', 'Grande Barriera Corallina in catamarano', 'Uluru al tramonto + cena Field of Lights', 'Great Ocean Road con guida italiana', 'Road trip di 4 giorni su Kangaroo Island'],
      en: ['Kakadu & Litchfield — 3-day Northern Territory tour', 'Great Barrier Reef by catamaran', 'Uluru at sunset + Field of Lights dinner', 'Great Ocean Road with Italian guide', '4-day Kangaroo Island road trip'],
    },
    program: [
      { _key: 'd1',  day: 1,  title: { it: 'Volo Milano – Darwin via Singapore', en: 'Flight Milan – Darwin via Singapore' }, description: { it: 'Partenza da Milano con Singapore Airlines. Scalo a Singapore e volo per Darwin. Arrivo il giorno seguente.', en: 'Departure from Milan with Singapore Airlines. Stopover in Singapore and onward flight to Darwin. Arrival the following day.' } },
      { _key: 'd2',  day: 2,  title: { it: 'Arrivo a Darwin', en: 'Arrival in Darwin' }, description: { it: 'Arrivo a Darwin e trasferimento privato al The Vibe Hotel. Darwin è la vivace capitale del Territorio del Nord, punto d\'incontro tra cultura urbana e natura selvaggia. Da non perdere il Waterfront Precinct e i Sunset Markets.', en: 'Arrival in Darwin and private transfer to The Vibe Hotel. Darwin is the vibrant capital of the Northern Territory, where urban culture meets wild nature. Not to be missed: the Waterfront Precinct and Sunset Markets.' } },
      { _key: 'd3',  day: 3,  title: { it: 'Tour Kakadu e Litchfield — Giorno 1', en: 'Kakadu & Litchfield Tour — Day 1' }, description: { it: 'Partenza per il Kakadu National Park. Crociera nella Corroboree Billabong tra coccodrilli e uccelli del Top End. Arte rupestre aborigena al Burrungkuy (Nourlangie Rock). Tramonto sulla pianura alluvionale di Nadab. Pernottamento nel Jabiru Campground in tende safari.', en: 'Departure to Kakadu National Park. Corroboree Billabong boat cruise among crocodiles and Top End birdlife. Aboriginal rock art at Burrungkuy (Nourlangie Rock). Sunset over Nadab floodplain. Overnight at Jabiru Campground in safari tents.' } },
      { _key: 'd4',  day: 4,  title: { it: 'Tour Kakadu — Giorno 2: cascate e arte rupestre', en: 'Kakadu Tour — Day 2: Waterfalls & Rock Art' }, description: { it: 'Giornata immersi nella natura di Litchfield National Park tra foreste monsoniche, cascate incontaminate (Florence Falls, Wangi Falls, Buley Rockholes) e piscine naturali. Arte rupestre risalente a 20.000 anni fa.', en: 'Day immersed in Litchfield National Park: monsoon forests, pristine waterfalls (Florence Falls, Wangi Falls, Buley Rockholes) and natural pools. Rock art dating back 20,000 years.' } },
      { _key: 'd5',  day: 5,  title: { it: 'Litchfield — Cathedral Mounds e volo per Port Douglas', en: 'Litchfield — Cathedral Mounds & Flight to Port Douglas' }, description: { it: 'Mattina tra le Cathedral Termite Mounds di Litchfield. Pomeriggio rientro a Darwin e volo per Cairns. Trasferimento privato a Port Douglas, ridente località balneare affacciata sulla Grande Barriera Corallina e la Daintree Rainforest.', en: 'Morning at Litchfield\'s Cathedral Termite Mounds. Afternoon return to Darwin and flight to Cairns. Private transfer to Port Douglas, a charming resort town overlooking the Great Barrier Reef and Daintree Rainforest.' } },
      { _key: 'd6',  day: 6,  title: { it: 'Giornata libera a Port Douglas', en: 'Free Day in Port Douglas' }, description: { it: 'Relax sulla Four Mile Beach, passeggiata panoramica sul Flagstaff Hill o lungo il Cliff Walk. Tempo libero per esplorare il porto e la Marina.', en: 'Relax on Four Mile Beach, panoramic walk on Flagstaff Hill or along the Cliff Walk. Free time to explore the port and Marina.' } },
      { _key: 'd7',  day: 7,  title: { it: 'Grande Barriera Corallina in catamarano', en: 'Great Barrier Reef by Catamaran' }, description: { it: 'Intera giornata nella Grande Barriera Corallina a bordo del Sailaway VI, catamarano di lusso Lagoon 560. Snorkeling alle Low Isles con biologo marino, nuoto con tartarughe, passeggiata naturalistica sull\'isola. Pranzo a buffet incluso.', en: 'Full day on the Great Barrier Reef aboard the Sailaway VI luxury Lagoon 560 catamaran. Snorkelling at the Low Isles with a marine biologist, swimming with turtles, guided island nature walk. Buffet lunch included.' } },
      { _key: 'd8',  day: 8,  title: { it: 'Cape Tribulation e Daintree Forest', en: 'Cape Tribulation & Daintree Forest' }, description: { it: 'Tour guidato nella foresta pluviale di Daintree. Visita al Mossman Gorge, crociera sul fiume Daintree per osservare i coccodrilli, arrivo a Cape Tribulation dove la foresta pluviale incontra la barriera corallina. Pranzo incluso.', en: 'Guided tour through the Daintree Rainforest. Mossman Gorge visit, Daintree River cruise to spot crocodiles, Cape Tribulation where the rainforest meets the reef. Lunch included.' } },
      { _key: 'd9',  day: 9,  title: { it: 'Giornata libera a Port Douglas', en: 'Free Day in Port Douglas' }, description: { it: 'Giornata libera per attività facoltative o relax in spiaggia.', en: 'Free day for optional activities or beach relaxation.' } },
      { _key: 'd10', day: 10, title: { it: 'Kuranda — seggiovia e treno panoramico', en: 'Kuranda — Skyrail & Scenic Railway' }, description: { it: 'Sorvola la foresta pluviale sulla seggiovia Skyrail. Visita libera al villaggio di Kuranda e al Koala Garden Sanctuary. Discesa con il Kuranda Scenic Railway con audio guida in italiano.', en: 'Soar above the rainforest on the Skyrail gondola. Free time in Kuranda village and Koala Garden Sanctuary. Descent by Kuranda Scenic Railway with Italian audio guide.' } },
      { _key: 'd11', day: 11, title: { it: 'Volo Cairns – Sydney', en: 'Flight Cairns – Sydney' }, description: { it: 'Trasferimento da Port Douglas a Cairns. Volo per Sydney e check-in al Furama Darling Harbour.', en: 'Transfer from Port Douglas to Cairns Airport. Flight to Sydney and check-in at the Furama Darling Harbour.' } },
      { _key: 'd12', day: 12, title: { it: 'Sydney — Bondi Beach e città', en: 'Sydney — Bondi Beach & City' }, description: { it: 'Giornata libera a Sydney. Bondi Beach e il Bondi to Coogee Coastal Walk. Esplorazione del centro storico e del Circular Quay.', en: 'Free day in Sydney. Bondi Beach and the Bondi to Coogee Coastal Walk. Explore the historic centre and Circular Quay.' } },
      { _key: 'd13', day: 13, title: { it: 'Blue Mountains in italiano', en: 'Blue Mountains Italian Tour' }, description: { it: 'Tour in italiano alle Blue Mountains (Patrimonio UNESCO): Three Sisters, sosta a Leura, colazione australiana inclusa.', en: 'Italian-language Blue Mountains tour (UNESCO): Three Sisters, Leura stop, morning tea included.' } },
      { _key: 'd14', day: 14, title: { it: 'Crociera nel porto di Sydney con pranzo', en: 'Sydney Harbour Lunch Cruise' }, description: { it: 'Crociera di due ore nel porto con pranzo a buffet. Viste su Opera House, Harbour Bridge e Luna Park.', en: 'Two-hour harbour cruise with buffet lunch. Views of the Opera House, Harbour Bridge and Luna Park.' } },
      { _key: 'd15', day: 15, title: { it: 'Volo Sydney – Uluru e tramonto a Uluru', en: 'Flight Sydney – Uluru & Sunset Tour' }, description: { it: 'Volo per Ayers Rock. Tour al tramonto con audio guida in italiano: base di Uluru, Mutitjulu Waterhole, storie del Tjukurpa (Tempo del Sogno). Vista panoramica da Talinguru Nyakun Tjaku.', en: 'Flight to Ayers Rock. Italian audio guide sunset tour: Uluru base, Mutitjulu Waterhole, Tjukurpa (Dreamtime) stories. Panoramic viewpoint at Talinguru Nyakun Tjaku.' } },
      { _key: 'd16', day: 16, title: { it: 'Kings Canyon', en: 'Kings Canyon' }, description: { it: 'Tour a Kings Canyon: colazione a Kings Creek Station, rim walk con vista sul Watarrka National Park e discesa nel Garden of Eden. Oltre 3 ore di escursione.', en: 'Kings Canyon tour: hot breakfast at Kings Creek Station, rim walk overlooking Watarrka National Park and descent into the Garden of Eden. Over 3 hours of hiking.' } },
      { _key: 'd17', day: 17, title: { it: 'Kata Tjuta all\'alba e cena Field of Lights', en: 'Kata Tjuta at Dawn & Field of Lights Dinner' }, description: { it: 'Tour all\'alba a Kata Tjuta con colazione e audio guida in italiano. Passeggiata nella Gola di Walpa. La sera: cena sotto le stelle con accesso al Field of Lights (installazione artistica con migliaia di sfere luminose) e narratore di stelle.', en: 'Kata Tjuta dawn tour with breakfast and Italian audio guide. Walk through Walpa Gorge. Evening: dinner under the stars with Field of Lights access (art installation with thousands of light spheres) and stargazing storyteller.' } },
      { _key: 'd18', day: 18, title: { it: 'Volo Uluru – Melbourne', en: 'Flight Uluru – Melbourne' }, description: { it: 'Trasferimento all\'aeroporto e volo per Melbourne. Check-in al Crowne Promenade. Prima serata libera tra vicoli di street art e ristoranti.', en: 'Transfer to the airport and flight to Melbourne. Check-in at the Crowne Promenade. First evening free among street art laneways and restaurants.' } },
      { _key: 'd19', day: 19, title: { it: 'Great Ocean Road con guida italiana', en: 'Great Ocean Road with Italian Guide' }, description: { it: 'Tour guidato in italiano: Twelve Apostles, Loch Ard Gorge, koala selvatici a Kennett River, Apollo Bay. Pranzo incluso.', en: 'Italian-guided tour: Twelve Apostles, Loch Ard Gorge, wild koalas at Kennett River, Apollo Bay. Lunch included.' } },
      { _key: 'd20', day: 20, title: { it: 'Phillip Island — Penguin Parade', en: 'Phillip Island — Penguin Parade' }, description: { it: 'Tour in giornata con guida italiana: Moonlit Sanctuary, Woolamai Surf Beach, The Nobbies. Serata: Penguin Plus — la Parata dei Pinguini dalla tribuna esclusiva.', en: 'Full-day tour with Italian guide: Moonlit Sanctuary, Woolamai Surf Beach, The Nobbies. Evening: Penguin Plus from the exclusive viewing stand.' } },
      { _key: 'd21', day: 21, title: { it: 'Giornata libera a Melbourne', en: 'Free Day in Melbourne' }, description: { it: 'Giornata libera per esplorare Melbourne: Queen Victoria Market, Fitzroy, musei o semplice relax.', en: 'Free day to explore Melbourne: Queen Victoria Market, Fitzroy, museums or simply relaxing.' } },
      { _key: 'd22', day: 22, title: { it: 'Volo Melbourne – Kangaroo Island e inizio road trip', en: 'Flight Melbourne – Kangaroo Island & Road Trip Start' }, description: { it: 'Volo Melbourne–Adelaide con coincidenza per Kangaroo Island. Ritiro auto a noleggio (Mazda CX5, km illimitati, assicurazione inclusa). Inizio del road trip sull\'isola.', en: 'Flight Melbourne–Adelaide with connection to Kangaroo Island. Car hire pick-up (Mazda CX5, unlimited km, insurance included). Start of the island road trip.' } },
      { _key: 'd23', day: 23, title: { it: 'Kangaroo Island — Seal Bay e Vivonne Bay', en: 'Kangaroo Island — Seal Bay & Vivonne Bay' }, description: { it: 'Seal Bay Conservation Park: passeggiata guidata tra i leoni marini australiani sulla spiaggia. Vivonne Bay (una delle spiagge più belle d\'Australia) e dune di sabbia di Little Sahara.', en: 'Seal Bay Conservation Park: guided walk among Australian sea lions on the beach. Vivonne Bay (one of Australia\'s most beautiful beaches) and Little Sahara sand dunes.' } },
      { _key: 'd24', day: 24, title: { it: 'Kangaroo Island — Flinders Chase National Park', en: 'Kangaroo Island — Flinders Chase National Park' }, description: { it: 'Flinders Chase: Remarkable Rocks (formazioni granitiche modellate dal vento) e Admirals Arch con le foche della Nuova Zelanda. Canguri, wallaby e koala selvatici lungo i sentieri.', en: 'Flinders Chase: Remarkable Rocks (wind-sculpted granite formations) and Admirals Arch with New Zealand fur seals. Wild kangaroos, wallabies and koalas on the trails.' } },
      { _key: 'd25', day: 25, title: { it: 'Kangaroo Island — mattina libera e volo per Adelaide', en: 'Kangaroo Island — Free Morning & Flight to Adelaide' }, description: { it: 'Ultima mattina sull\'isola: fattoria di miele o degustazione di gin artigianale alla KI Spirits. Volo Kingscote–Adelaide. Trasferimento al The Vibe Hotel.', en: 'Last morning on the island: honey farm or artisan gin tasting at KI Spirits. Flight Kingscote–Adelaide. Transfer to The Vibe Hotel.' } },
      { _key: 'd26', day: 26, title: { it: 'Barossa Valley — degustazione vini', en: 'Barossa Valley — Wine Tasting' }, description: { it: 'Intera giornata nella Barossa Valley: degustazioni in cantine storiche (Kies Family Wines, Turkey Flat, Rosenvale), sosta a Tanunda e al belvedere di Menglers Hill. Pranzo con prodotti regionali incluso.', en: 'Full day in the Barossa Valley: tastings at historic wineries (Kies Family Wines, Turkey Flat, Rosenvale), stop in Tanunda and Menglers Hill lookout. Regional lunch included.' } },
      { _key: 'd27', day: 27, title: { it: 'Volo Adelaide – Singapore – Milano', en: 'Flight Adelaide – Singapore – Milan' }, description: { it: 'Trasferimento all\'aeroporto di Adelaide. Volo per Singapore e coincidenza notturna per Milano.', en: 'Transfer to Adelaide Airport. Flight to Singapore with overnight connection to Milan.' } },
      { _key: 'd28', day: 28, title: { it: 'Arrivo a Milano', en: 'Arrival in Milan' }, description: { it: 'Arrivo a Milano in mattinata. Fine dei servizi.', en: 'Morning arrival in Milan. End of services.' } },
    ],
    included: {
      it: [
        'Tutti i trasferimenti privati aeroporto/hotel',
        '2 notti a Darwin — The Vibe Hotel',
        'Tour 3 giorni Kakadu e Litchfield (pasti e tende safari inclusi)',
        '6 notti a Port Douglas — Shantara Resort (Studio Pool View)',
        'Tour in catamarano nella Grande Barriera Corallina (pranzo incluso)',
        'Tour Cape Tribulation e Daintree con audio guida italiano (pranzo incluso)',
        'Tour Kuranda con Skyrail e Scenic Railway, audio guida italiano',
        '4 notti a Sydney — Furama Darling Harbour (colazione inclusa)',
        'Tour Blue Mountains con guida in italiano',
        'Crociera nel porto di Sydney con pranzo a bordo',
        '3 notti Ayers Rock — Desert Gardens Hotel',
        'Tour tramonto Uluru con audio guida italiano',
        'Tour alba Kata Tjuta con colazione e audio guida italiano',
        'Tour Kings Canyon con guida in inglese',
        'Cena sotto le stelle con accesso al Field of Lights',
        '5 notti a Melbourne — Crowne Promenade',
        'Tour Great Ocean Road con guida italiana (pranzo incluso)',
        'Tour Phillip Island con Penguin Plus e guida italiana',
        '3 notti Adelaide — The Vibe Hotel (Deluxe King con colazione)',
        'Tour Barossa Valley con guida inglese (pranzo e assaggi inclusi)',
        '4 giorni noleggio auto con assicurazione a Kangaroo Island',
        '3 notti Kangaroo Island — Kangaroo Island Seaside Inn',
      ],
      en: [
        'All private airport/hotel transfers',
        '2 nights Darwin — The Vibe Hotel',
        '3-day Kakadu & Litchfield tour (meals and safari tents included)',
        '6 nights Port Douglas — Shantara Resort (Studio Pool View)',
        'Great Barrier Reef catamaran tour (lunch included)',
        'Cape Tribulation & Daintree tour Italian audio guide (lunch included)',
        'Kuranda tour with Skyrail and Scenic Railway, Italian audio guide',
        '4 nights Sydney — Furama Darling Harbour (breakfast included)',
        'Blue Mountains tour with Italian guide',
        'Sydney Harbour lunch cruise',
        '3 nights Ayers Rock — Desert Gardens Hotel',
        'Uluru sunset tour Italian audio guide',
        'Kata Tjuta dawn tour with breakfast and Italian audio guide',
        'Kings Canyon tour English guide',
        'Field of Lights dinner under the stars',
        '5 nights Melbourne — Crowne Promenade',
        'Great Ocean Road tour Italian guide (lunch included)',
        'Phillip Island Penguin Parade tour Italian guide',
        '3 nights Adelaide — The Vibe Hotel (Deluxe King breakfast included)',
        'Barossa Valley tour English guide (lunch and tastings included)',
        '4-day car hire with insurance on Kangaroo Island',
        '3 nights Kangaroo Island — Kangaroo Island Seaside Inn',
      ],
    },
    notIncluded: standardNotIncluded,
    featured: true,
  },
];

// ── Run import ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌏 Importing ${itineraries.length} itineraries to Sanity (${projectId}/${dataset})…\n`);

  for (const doc of itineraries) {
    try {
      const result = await client.createOrReplace(doc);
      console.log(`  ✅  ${result._id} — "${doc.title.it.slice(0, 60)}…"`);
    } catch (err) {
      console.error(`  ❌  ${doc._id}:`, err.message);
    }
  }

  console.log('\n✅  Import complete.\n');
  console.log('⚠️   Remember to add hero images and map images manually via Sanity Studio.');
  console.log('📎  Studio URL: https://progettoaustralia.sanity.studio/structure/itinerary\n');
}

main();
