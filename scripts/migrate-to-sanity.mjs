/**
 * Sanity Migration Script
 * Migrates static data from src/data/ into Sanity CMS.
 *
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 *
 * Reads credentials from .env.local.
 * Idempotent: checks for existing docs before creating.
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── Load .env.local ─────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local not found. Copy .env.example and fill in credentials.');
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    process.env[key] = process.env[key] ?? value;
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';

if (!projectId || !token) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local'
  );
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

console.log(`\n🚀 Migrating to Sanity — project: ${projectId} / dataset: ${dataset}\n`);

// ─── Image upload helper ──────────────────────────────────────────────────────

const imageCache = new Map();

async function uploadImage(relativePath) {
  if (!relativePath) return null;
  if (imageCache.has(relativePath)) return imageCache.get(relativePath);

  const fullPath = path.join(ROOT, 'public', relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  Image not found: ${fullPath}`);
    return null;
  }

  const buffer = fs.readFileSync(fullPath);
  const filename = path.basename(fullPath);
  try {
    const asset = await client.assets.upload('image', buffer, { filename });
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    imageCache.set(relativePath, ref);
    console.log(`  📸 Uploaded: ${filename}`);
    return ref;
  } catch (err) {
    console.warn(`  ⚠️  Failed to upload ${filename}: ${err.message}`);
    return null;
  }
}

// ─── Existence check (idempotency) ───────────────────────────────────────────

async function findExisting(type, slug) {
  return client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug }
  );
}

async function upsert(type, slug, doc) {
  const existingId = await findExisting(type, slug);
  if (existingId) {
    await client.patch(existingId).set(doc).commit();
    console.log(`  ✏️  Updated ${type}: ${slug}`);
  } else {
    await client.create({ _type: type, ...doc });
    console.log(`  ✅ Created ${type}: ${slug}`);
  }
}

// ─── Static data ─────────────────────────────────────────────────────────────
// We inline the data here so the script has no TS/bundler dependency.
// Keep in sync with src/data/*.ts if data changes.

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

const destinations = [
  {
    slug: 'australia',
    title: { it: 'Australia', en: 'Australia' },
    country: 'Australia',
    tagline: { it: 'Infinita e meravigliosa', en: 'Boundless and beautiful' },
    description: {
      it: "Dal Great Barrier Reef alle ultime frontiere del Territorio del Nord, l'Australia è un continente di contrasti straordinari. Spiagge dorate, entroterra rosso fuoco, foreste pluviali tropicali e metropoli cosmopolite.",
      en: 'From the Great Barrier Reef to the remote Northern Territory, Australia is a continent of extraordinary contrasts. Golden beaches, fiery red outback, tropical rainforests and cosmopolitan cities.',
    },
    highlights: {
      it: ['Great Barrier Reef', 'Uluru & Red Centre', 'Sydney & Melbourne', 'Daintree Rainforest'],
      en: ['Great Barrier Reef', 'Uluru & Red Centre', 'Sydney & Melbourne', 'Daintree Rainforest'],
    },
    photo: '/images/dest-card-australia.png',
    featured: true,
  },
  {
    slug: 'new-zealand',
    title: { it: 'Nuova Zelanda', en: 'New Zealand' },
    country: 'New Zealand',
    tagline: { it: 'Terra di meraviglie', en: 'Land of wonders' },
    description: {
      it: "Fiordi maestosi, vulcani attivi, ghiacciai e spiagge incontaminate: la Nuova Zelanda è un paradiso per gli amanti della natura e dell'avventura.",
      en: 'Majestic fjords, active volcanoes, glaciers and pristine beaches: New Zealand is a paradise for nature and adventure lovers.',
    },
    highlights: {
      it: ['Fiordland & Milford Sound', 'Rotorua & Geotermalismo', 'Franz Josef Glacier', 'Bay of Islands'],
      en: ['Fiordland & Milford Sound', 'Rotorua & Geothermal', 'Franz Josef Glacier', 'Bay of Islands'],
    },
    photo: '/images/dest-card-nz.png',
    featured: true,
  },
  {
    slug: 'fiji',
    title: { it: 'Fiji', en: 'Fiji' },
    country: 'Fiji',
    tagline: { it: 'Il sorriso del Pacifico', en: 'The smile of the Pacific' },
    description: {
      it: 'Acque cristalline color smeraldo, barriere coralline brulicanti di vita, spiagge di sabbia bianca e la famosa ospitalità Fijiana. Un paradiso tropicale senza confronti.',
      en: 'Crystal-clear emerald waters, reef teeming with life, white sandy beaches and the famous Fijian hospitality. An unparalleled tropical paradise.',
    },
    highlights: {
      it: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Giardino di Fiji', 'Snorkeling & Diving'],
      en: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Garden of Fiji', 'Snorkeling & Diving'],
    },
    photo: '/images/dest-card-fiji.png',
    featured: false,
  },
  {
    slug: 'cook-islands',
    title: { it: 'Isole Cook', en: 'Cook Islands' },
    country: 'Cook Islands',
    tagline: { it: 'Autenticità tropicale', en: 'Tropical authenticity' },
    description: {
      it: "Le Isole Cook sono il segreto meglio custodito del Pacifico. Raggiungibili ma ancora genuine, offrono lagune spettacolari, cultura polinesiana autentica e un ritmo di vita che invita a rallentare.",
      en: 'The Cook Islands are the best-kept secret of the Pacific. Accessible yet still genuine, they offer spectacular lagoons, authentic Polynesian culture and a pace of life that invites you to slow down.',
    },
    highlights: {
      it: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Cultura Maori Polinesiana'],
      en: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Polynesian Maori Culture'],
    },
    photo: '/images/dest-card-cook.png',
    featured: false,
  },
  {
    slug: 'samoa',
    title: { it: 'Isole Samoa', en: 'Samoa Islands' },
    country: 'Samoa',
    tagline: { it: 'Il Pacifico autentico', en: 'The authentic Pacific' },
    description: {
      it: "Le Isole Samoa conservano intatta la cultura polinesiana Fa'a Samoa. Cascate spettacolari, lagune cristalline, villaggi tradizionali e la To Sua Ocean Trench.",
      en: "The Samoa Islands preserve the authentic Fa'a Samoa Polynesian culture. Spectacular waterfalls, crystal lagoons, traditional villages and the To Sua Ocean Trench.",
    },
    highlights: {
      it: ["To Sua Ocean Trench", "Papase'ea Sliding Rocks", "Savai'i – Isola Vulcanica", 'Cerimonia del Kava'],
      en: ["To Sua Ocean Trench", "Papase'ea Sliding Rocks", "Savai'i – Volcanic Island", 'Kava Ceremony'],
    },
    photo: '/images/dest-card-samoa.png',
    featured: false,
  },
  {
    slug: 'new-caledonia',
    title: { it: 'Nuova Caledonia', en: 'New Caledonia' },
    country: 'New Caledonia',
    tagline: { it: 'Un angolo di Francia nel Pacifico', en: 'A corner of France in the Pacific' },
    description: {
      it: "La laguna della Nuova Caledonia è patrimonio UNESCO ed è considerata la più bella del mondo. Noumea, la Côte Oubliée e l'incantevole Île des Pins offrono un mix unico.",
      en: "New Caledonia's lagoon is a UNESCO World Heritage Site and considered the most beautiful in the world. Noumea, the Forgotten Coast and the enchanting Île des Pins offer a unique blend.",
    },
    highlights: {
      it: ['Laguna UNESCO', 'Île des Pins', 'Noumea', 'Côte Oubliée'],
      en: ['UNESCO Lagoon', 'Île des Pins', 'Noumea', 'Forgotten Coast'],
    },
    photo: '/images/dest-card-caledonia.png',
    featured: false,
  },
];

const itineraries = [
  {
    slug: 'australia-self-drive',
    title: { it: 'Australia Self-Drive', en: 'Australia Self-Drive' },
    description: {
      it: "L'Australia è un paese molto ben organizzato per i viaggi in libertà con un'auto a noleggio. Strade sicure, incontri ravvicinati con fauna unica e paesaggi mozzafiato da Perth a Cairns.",
      en: 'Australia is perfectly organised for self-drive trips. Safe roads, up-close wildlife encounters and breathtaking landscapes from Perth to Cairns.',
    },
    duration: 18,
    destinationSlug: 'australia',
    category: 'family',
    image: '/images/itin-self-drive.jpg',
    price: { currency: 'EUR', amount: 1790 },
    featured: true,
    highlights: {
      it: ['Rottnest Island & Quokka', 'Kangaroo Island', 'Uluru al tramonto', 'Great Barrier Reef'],
      en: ['Rottnest Island & Quokka', 'Kangaroo Island', 'Uluru at Sunset', 'Great Barrier Reef'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo a Perth', en: 'Arrival in Perth' }, description: { it: 'Arrivo a Perth. Pernottamento in hotel 3.5★ (4 notti).', en: 'Arrival in Perth. Overnight at 3.5★ hotel (4 nights).' } },
      { day: 2, title: { it: 'Perth & Fremantle', en: 'Perth & Fremantle' }, description: { it: 'Giornata libera per la visita della città e di Fremantle.', en: 'Free day to explore the city and Fremantle.' } },
      { day: 3, title: { it: 'Rottnest Island', en: 'Rottnest Island' }, description: { it: 'Tour organizzato a Rottnest Island in bicicletta – incontro con i quokka.', en: 'Organised cycling tour of Rottnest Island – meet the quokkas.' } },
      { day: 4, title: { it: 'Pinnacles Desert', en: 'Pinnacles Desert' }, description: { it: 'Tour al Pinnacles Desert + sandboarding (pranzo incluso).', en: 'Pinnacles Desert tour + sandboarding (lunch included).' } },
      { day: 5, title: { it: 'Volo Perth – Adelaide · Kangaroo Island', en: 'Flight Perth – Adelaide · Kangaroo Island' }, description: { it: 'Volo per Adelaide, ritiro auto, traghetto per Kangaroo Island (3 notti).', en: 'Flight to Adelaide, car hire, ferry to Kangaroo Island (3 nights).' } },
      { day: 6, title: { it: 'Kangaroo Island', en: 'Kangaroo Island' }, description: { it: "Giornata libera per la visita dell'isola: koala, leoni marini, pinguini.", en: 'Free day on the island: koalas, sea lions, penguins.' } },
      { day: 7, title: { it: 'Quad & Fauna', en: 'Quad & Wildlife' }, description: { it: 'Mattina libera, pomeriggio tour in Quad (2 ore).', en: 'Free morning, afternoon quad-bike tour (2 hours).' } },
      { day: 8, title: { it: 'Traghetto – Volo Adelaide · Sydney', en: 'Ferry – Flight Adelaide · Sydney' }, description: { it: 'Traghetto da Kangaroo Island, volo per Sydney. Pernottamento (3 notti).', en: 'Ferry from Kangaroo Island, flight to Sydney. Overnight (3 nights).' } },
      { day: 9, title: { it: 'Sydney in bicicletta', en: 'Sydney by bike' }, description: { it: 'Tour organizzato in bicicletta per Sydney: Opera House, Harbour Bridge, Bondi.', en: 'Organised cycling tour of Sydney: Opera House, Harbour Bridge, Bondi.' } },
      { day: 10, title: { it: 'Whale Watching', en: 'Whale Watching' }, description: { it: 'Tour organizzato avvistamento balene (soggetto a stagionalità).', en: 'Organised whale-watching tour (subject to seasonality).' } },
      { day: 11, title: { it: 'Volo Sydney – Ayers Rock', en: 'Flight Sydney – Ayers Rock' }, description: { it: 'Volo per Ayers Rock. Ritiro auto a noleggio. Pernottamento (2 notti).', en: 'Flight to Ayers Rock. Car hire. Overnight (2 nights).' } },
      { day: 12, title: { it: 'Uluru & Kata Tjuta', en: 'Uluru & Kata Tjuta' }, description: { it: 'Passeggiata intorno a Uluru, visita dei Monti Olgas, tramonto in cammello.', en: 'Walk around Uluru, visit Kata Tjuta, sunset camel ride.' } },
      { day: 13, title: { it: 'Volo Ayers Rock – Cairns', en: 'Flight Ayers Rock – Cairns' }, description: { it: 'Volo per Cairns. Ritiro auto e pernottamento (5 notti).', en: 'Flight to Cairns. Car hire and overnight (5 nights).' } },
      { day: 14, title: { it: 'Cape Tribulation', en: 'Cape Tribulation' }, description: { it: 'Guida fino a Cape Tribulation (140 km), foresta pluviale e oceano.', en: 'Drive to Cape Tribulation (140 km), rainforest meets ocean.' } },
      { day: 15, title: { it: 'Daintree River', en: 'Daintree River' }, description: { it: 'Crociera sul Daintree River per avvistare coccodrilli e fauna tropicale.', en: 'Daintree River cruise to spot crocodiles and tropical wildlife.' } },
      { day: 16, title: { it: 'Foresta pluviale notturna', en: 'Rainforest Night Tour' }, description: { it: 'Tour notturno nella foresta pluviale e Jungle Surfing.', en: 'Rainforest night tour and Jungle Surfing.' } },
      { day: 17, title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' }, description: { it: 'Tour sulla barriera corallina: snorkeling con tartarughe e pesci tropicali (pranzo incluso).', en: 'Great Barrier Reef tour: snorkelling with turtles and tropical fish (lunch included).' } },
      { day: 18, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Consegna auto a noleggio all'aeroporto. Volo internazionale.", en: 'Return car hire at the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Tour Rottnest Island in bicicletta', 'Tour Pinnacles Desert + sandboarding', 'Noleggio auto Adelaide–Adelaide e Ayers Rock–Ayers Rock', 'Traghetto a/r Kangaroo Island (1 auto + 4 pax)', 'Tour in Quad a Kangaroo Island', 'Tour Sydney in bicicletta', 'Tour avvistamento balene', 'Tour tramonto in cammello ad Uluru (Field of Lights)', 'Noleggio auto Cairns–Cairns', 'Tour notturno foresta pluviale', 'Tour sulla barriera corallina (pranzo incluso)', 'SIM australiana + credito', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Rottnest Island cycling tour', 'Pinnacles Desert tour + sandboarding', 'Car hire Adelaide–Adelaide and Ayers Rock–Ayers Rock', 'Return ferry Kangaroo Island (1 car + 4 pax)', 'Quad-bike tour on Kangaroo Island', 'Sydney cycling tour', 'Whale-watching tour', 'Uluru camel sunset tour (Field of Lights)', 'Car hire Cairns–Cairns', 'Rainforest night tour', 'Great Barrier Reef tour (lunch included)', 'Australian SIM card + credit', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'magica-australia',
    title: { it: 'Magica Australia Luxury', en: 'Magical Australia Luxury' },
    description: {
      it: 'Viaggio in libertà in strutture deluxe immerse nella natura: Great Ocean Road, Kangaroo Island in lodge 5 stelle, Kakadu National Park, foresta pluviale e cena nel deserto sotto le stelle.',
      en: 'A freedom journey in deluxe nature lodges: Great Ocean Road, Kangaroo Island 5-star lodge, Kakadu National Park, rainforest and a desert dinner under the stars.',
    },
    duration: 23,
    destinationSlug: 'australia',
    category: 'luxury',
    image: '/images/itin-magica-au.jpg',
    price: { currency: 'EUR', amount: 5980 },
    featured: true,
    highlights: {
      it: ['Great Ocean Road', 'Kangaroo Island Lodge 5★', 'Kakadu National Park', 'Cena nel deserto ad Uluru'],
      en: ['Great Ocean Road', 'Kangaroo Island 5★ Lodge', 'Kakadu National Park', 'Desert Dinner at Uluru'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo a Melbourne', en: 'Arrival in Melbourne' }, description: { it: 'Transfer privato aeroporto–hotel. Pernottamento in hotel 5★ (3 notti).', en: 'Private airport–hotel transfer. Overnight at 5★ hotel (3 nights).' } },
      { day: 2, title: { it: 'Melbourne', en: 'Melbourne' }, description: { it: 'Giornata libera per visitare la città: Federation Square, Southbank, mercati.', en: 'Free day to explore: Federation Square, Southbank, markets.' } },
      { day: 3, title: { it: 'Great Ocean Road', en: 'Great Ocean Road' }, description: { it: 'Tour deluxe della Great Ocean Road con le Twelve Apostles (pranzo incluso).', en: 'Deluxe Great Ocean Road tour with the Twelve Apostles (lunch included).' } },
      { day: 4, title: { it: 'Melbourne – Adelaide – Kangaroo Island', en: 'Melbourne – Adelaide – Kangaroo Island' }, description: { it: 'Transfer privato, volo per Adelaide, auto 4×4, traghetto per Kangaroo Island. Lodge 5★ (2 notti).', en: 'Private transfer, flight to Adelaide, 4×4 hire, ferry to Kangaroo Island. 5★ lodge (2 nights).' } },
      { day: 5, title: { it: 'Kangaroo Island', en: 'Kangaroo Island' }, description: { it: 'Visita libera dell\'isola. Fauna selvatica: koala, canguri, foche, leoni marini.', en: 'Free exploration of the island. Wildlife: koalas, kangaroos, seals, sea lions.' } },
      { day: 6, title: { it: 'Traghetto – Volo Adelaide · Darwin', en: 'Ferry – Flight Adelaide · Darwin' }, description: { it: 'Traghetto da Kangaroo Island, volo per Darwin via Adelaide.', en: 'Ferry from Kangaroo Island, flight to Darwin via Adelaide.' } },
      { day: 7, title: { it: 'Darwin – Kakadu', en: 'Darwin – Kakadu' }, description: { it: 'Transfer ad Arnhem Land e inizio esplorazione del Kakadu National Park. Tende deluxe (3 notti).', en: 'Transfer to Arnhem Land and start of Kakadu National Park exploration. Deluxe tents (3 nights).' } },
      { day: 8, title: { it: 'Kakadu National Park', en: 'Kakadu National Park' }, description: { it: 'Crociera al Billabong, arte rupestre aborigena, fauna selvatica.', en: 'Billabong cruise, Aboriginal rock art, wildlife spotting.' } },
      { day: 9, title: { it: 'Kakadu National Park', en: 'Kakadu National Park' }, description: { it: 'Jim Jim Falls, Twin Falls e Yellow Water Wetlands.', en: 'Jim Jim Falls, Twin Falls and Yellow Water Wetlands.' } },
      { day: 10, title: { it: 'Volo Darwin – Cairns', en: 'Flight Darwin – Cairns' }, description: { it: 'Volo per Cairns. Pernottamento presso lodge nella foresta pluviale (4 notti).', en: 'Flight to Cairns. Overnight at a rainforest lodge (4 nights).' } },
      { day: 11, title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' }, description: { it: 'Crociera sulla barriera corallina (3 notti/4 giorni): snorkeling e diving.', en: 'Great Barrier Reef cruise (3 nights/4 days): snorkelling and diving.' } },
      { day: 14, title: { it: 'Cape Tribulation con guida aborigena', en: 'Cape Tribulation with Aboriginal guide' }, description: { it: 'Tour privato con guida aborigena a Cape Tribulation: cultura, flora e fauna.', en: 'Private tour with Aboriginal guide at Cape Tribulation: culture, flora and fauna.' } },
      { day: 16, title: { it: 'Volo Cairns – Ayers Rock', en: 'Flight Cairns – Ayers Rock' }, description: { it: 'Volo per Ayers Rock. Auto a noleggio. Pernottamento (3 notti).', en: 'Flight to Ayers Rock. Car hire. Overnight (3 nights).' } },
      { day: 17, title: { it: 'Uluru & Kata Tjuta', en: 'Uluru & Kata Tjuta' }, description: { it: 'Passeggiata all\'alba e al tramonto intorno a Uluru. Visita di Kata Tjuta.', en: 'Sunrise and sunset walks around Uluru. Visit to Kata Tjuta.' } },
      { day: 18, title: { it: 'Cena nel deserto', en: 'Desert Dinner' }, description: { it: 'Cena esclusiva nel deserto sotto le stelle (Sounds of Silence).', en: 'Exclusive dinner in the desert under the stars (Sounds of Silence).' } },
      { day: 20, title: { it: 'Volo Ayers Rock – Sydney', en: 'Flight Ayers Rock – Sydney' }, description: { it: 'Volo per Sydney. Transfer privato. Pernottamento (3 notti).', en: 'Flight to Sydney. Private transfer. Overnight (3 nights).' } },
      { day: 21, title: { it: 'Sydney – Tour privato', en: 'Sydney – Private Tour' }, description: { it: 'Tour privato della città: Opera House, Harbour Bridge, Bondi Beach.', en: 'Private city tour: Opera House, Harbour Bridge, Bondi Beach.' } },
      { day: 22, title: { it: 'Blue Mountains', en: 'Blue Mountains' }, description: { it: 'Tour privato delle Blue Mountains: Three Sisters, Scenic Railway, Leura.', en: 'Private Blue Mountains tour: Three Sisters, Scenic Railway, Leura.' } },
      { day: 23, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Transfer privato all'aeroporto. Volo internazionale.", en: 'Private transfer to the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Tutti i pasti come da itinerario', 'Tutti i transfer privati da/a hotel', 'Tour deluxe Great Ocean Road', 'Noleggio auto 4×4 Adelaide–Adelaide', 'Traghetto a/r Kangaroo Island', 'Minicrociera al Billabong (Kakadu)', 'Crociera sulla barriera corallina (3 notti/4 giorni)', 'Tour privato con guida aborigena a Cape Tribulation', 'Noleggio auto Ayers Rock–Ayers Rock', 'Cena nel deserto (Sounds of Silence)', 'Tour privato Sydney e minicrociera in baia', 'Tour privato Blue Mountains', 'SIM australiana + credito', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'All meals as per itinerary', 'All private hotel transfers', 'Deluxe Great Ocean Road tour', 'Car hire 4×4 Adelaide–Adelaide', 'Return ferry Kangaroo Island', 'Billabong cruise (Kakadu)', 'Great Barrier Reef cruise (3 nights/4 days)', 'Private tour with Aboriginal guide at Cape Tribulation', 'Car hire Ayers Rock–Ayers Rock', 'Desert dinner (Sounds of Silence)', 'Private Sydney tour and harbour cruise', 'Private Blue Mountains tour', 'Australian SIM card + credit', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'australia-on-the-road-isole-cook',
    title: { it: 'Australia On The Road + Isole Cook', en: 'Australia On The Road + Cook Islands' },
    description: {
      it: 'Da Melbourne lungo la costa australiana fino alle magiche Isole Cook, una delle mete di mare più belle del mondo. Il perfetto mix tra avventura in libertà e relax tropicale.',
      en: 'From Melbourne along the Australian coast to the magical Cook Islands, one of the most beautiful tropical destinations in the world. The perfect mix of adventure and relaxation.',
    },
    duration: 24,
    destinationSlug: 'australia',
    category: 'honeymoon',
    image: '/images/itin-au-cook.jpg',
    price: { currency: 'EUR', amount: 2850 },
    featured: false,
    highlights: {
      it: ['Melbourne & Great Ocean Road', 'Sydney Opera House', 'Isole Cook', 'Aitutaki Lagoon'],
      en: ['Melbourne & Great Ocean Road', 'Sydney Opera House', 'Cook Islands', 'Aitutaki Lagoon'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo a Melbourne', en: 'Arrival in Melbourne' }, description: { it: "Arrivo a Melbourne, la città più europea dell'Australia. Pernottamento hotel 4★ (2 notti).", en: "Arrival in Melbourne, Australia's most European city. Overnight 4★ hotel (2 nights)." } },
      { day: 2, title: { it: 'Melbourne', en: 'Melbourne' }, description: { it: 'Visita libera: Federation Square, Carlton Gardens, St Kilda Beach.', en: 'Free exploration: Federation Square, Carlton Gardens, St Kilda Beach.' } },
      { day: 3, title: { it: 'Great Ocean Road', en: 'Great Ocean Road' }, description: { it: 'Tour organizzato Great Ocean Road: Twelve Apostles, Loch Ard Gorge.', en: 'Great Ocean Road tour: Twelve Apostles, Loch Ard Gorge.' } },
      { day: 4, title: { it: 'Volo Melbourne – Sydney', en: 'Flight Melbourne – Sydney' }, description: { it: 'Volo per Sydney. Pernottamento hotel 4★ (4 notti).', en: 'Flight to Sydney. Overnight 4★ hotel (4 nights).' } },
      { day: 5, title: { it: 'Sydney', en: 'Sydney' }, description: { it: 'Visita della città: Opera House, Harbour Bridge, Rocks, Darling Harbour.', en: 'City tour: Opera House, Harbour Bridge, The Rocks, Darling Harbour.' } },
      { day: 6, title: { it: 'Blue Mountains', en: 'Blue Mountains' }, description: { it: 'Tour organizzato Blue Mountains: Three Sisters, Scenic Railway.', en: 'Blue Mountains tour: Three Sisters, Scenic Railway.' } },
      { day: 7, title: { it: 'Bondi & Hunter Valley', en: 'Bondi & Hunter Valley' }, description: { it: 'Mattina a Bondi Beach, pomeriggio tour vini Hunter Valley.', en: 'Morning at Bondi Beach, afternoon Hunter Valley wine tour.' } },
      { day: 8, title: { it: 'Volo Sydney – Ayers Rock', en: 'Flight Sydney – Ayers Rock' }, description: { it: 'Volo per Ayers Rock. Ritiro auto, pernottamento (3 notti).', en: 'Flight to Ayers Rock. Car hire, overnight (3 nights).' } },
      { day: 9, title: { it: 'Uluru', en: 'Uluru' }, description: { it: 'Passeggiata intorno a Uluru, tour al tramonto con cena nel deserto.', en: 'Walk around Uluru, sunset tour with desert dinner.' } },
      { day: 10, title: { it: 'Kata Tjuta & Kings Canyon', en: 'Kata Tjuta & Kings Canyon' }, description: { it: 'Visita di Kata Tjuta (Monti Olgas) e Kings Canyon.', en: 'Visit Kata Tjuta (Olgas) and Kings Canyon.' } },
      { day: 11, title: { it: 'Volo Ayers Rock – Cairns', en: 'Flight Ayers Rock – Cairns' }, description: { it: 'Volo per Cairns. Pernottamento hotel 4★ (5 notti).', en: 'Flight to Cairns. Overnight 4★ hotel (5 nights).' } },
      { day: 12, title: { it: 'Daintree & Cape Tribulation', en: 'Daintree & Cape Tribulation' }, description: { it: 'Tour foresta pluviale: Daintree River, Cape Tribulation, fauna tropicale.', en: 'Rainforest tour: Daintree River, Cape Tribulation, tropical wildlife.' } },
      { day: 13, title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' }, description: { it: 'Tour sulla barriera corallina: snorkeling con tartarughe e pesci tropicali.', en: 'Great Barrier Reef tour: snorkelling with turtles and tropical fish.' } },
      { day: 15, title: { it: 'Volo Cairns – Rarotonga (Isole Cook)', en: 'Flight Cairns – Rarotonga (Cook Islands)' }, description: { it: 'Volo per Rarotonga, Isole Cook. Hotel 4★ (3 notti).', en: 'Flight to Rarotonga, Cook Islands. 4★ hotel (3 nights).' } },
      { day: 16, title: { it: 'Rarotonga', en: 'Rarotonga' }, description: { it: 'Visita libera dell\'isola: laguna turchese, snorkeling, mercato artigianale.', en: 'Free exploration: turquoise lagoon, snorkelling, craft market.' } },
      { day: 17, title: { it: 'Aitutaki', en: 'Aitutaki' }, description: { it: 'Escursione giornaliera ad Aitutaki: laguna considerata la più bella del mondo.', en: 'Day trip to Aitutaki: lagoon considered the most beautiful in the world.' } },
      { day: 24, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto. Volo internazionale.", en: 'Transfer to the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Tour Great Ocean Road', 'Tour Blue Mountains', 'Tour vini Hunter Valley', 'Noleggio auto Ayers Rock–Ayers Rock', 'Tour tramonto Uluru + cena nel deserto', 'Tour barriera corallina', 'Tour Daintree & Cape Tribulation', 'Escursione Aitutaki', 'SIM australiana + credito', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Great Ocean Road tour', 'Blue Mountains tour', 'Hunter Valley wine tour', 'Car hire Ayers Rock–Ayers Rock', 'Uluru sunset tour + desert dinner', 'Great Barrier Reef tour', 'Daintree & Cape Tribulation tour', 'Aitutaki day trip', 'Australian SIM card + credit', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'fiji-self-drive',
    title: { it: 'Fiji Self-Drive: Avventura & Relax', en: 'Fiji Self-Drive: Adventure & Relax' },
    description: {
      it: "Un viaggio in libertà attraverso le isole Fiji: Viti Levu, Coral Coast, la magica Taveuni e le Isole Mamanuca. Spiagge paradisiache, foreste pluviali e barriera corallina.",
      en: 'A freedom journey through the Fiji Islands: Viti Levu, Coral Coast, magical Taveuni and the Mamanuca Islands. Paradisiacal beaches, rainforests and coral reef.',
    },
    duration: 13,
    destinationSlug: 'fiji',
    category: 'adventure',
    image: '/images/itin-fiji.jpg',
    price: { currency: 'EUR', amount: 2590 },
    featured: true,
    highlights: {
      it: ['Coral Coast', 'Taveuni – Isola dei Giardini', 'Isole Mamanuca', 'Snorkeling & Diving'],
      en: ['Coral Coast', 'Taveuni – Garden Island', 'Mamanuca Islands', 'Snorkeling & Diving'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo a Nadi (Viti Levu)', en: 'Arrival in Nadi (Viti Levu)' }, description: { it: 'Arrivo a Nadi. Pernottamento hotel 4★ Ocean View (3 notti).', en: 'Arrival in Nadi. Overnight 4★ Ocean View hotel (3 nights).' } },
      { day: 2, title: { it: 'Coral Coast', en: 'Coral Coast' }, description: { it: 'Visita della Coral Coast: spiagge bianche, barriera corallina accessibile dalla riva.', en: 'Explore the Coral Coast: white beaches, reef accessible from shore.' } },
      { day: 3, title: { it: 'Garden of the Sleeping Giant', en: 'Garden of the Sleeping Giant' }, description: { it: 'Visita del giardino delle orchidee e villaggio tradizionale Fijiano.', en: 'Visit the orchid garden and a traditional Fijian village.' } },
      { day: 4, title: { it: 'Volo Nadi – Taveuni', en: 'Flight Nadi – Taveuni' }, description: { it: '"L\'Isola dei Giardini": cascate Bouma, immersioni e snorkeling (3 notti).', en: '"The Garden Island": Bouma Falls, diving and snorkelling (3 nights).' } },
      { day: 5, title: { it: 'Taveuni – Parco Nazionale', en: 'Taveuni – National Park' }, description: { it: 'Trekking al Parco Nazionale: cascate Bouma, foresta pluviale, uccelli esotici.', en: 'Trek in the National Park: Bouma Falls, rainforest, exotic birds.' } },
      { day: 6, title: { it: 'Diving & Snorkeling', en: 'Diving & Snorkelling' }, description: { it: "Giornata di immersioni sui reef più belli di Taveuni (Rainbow Reef).", en: "Full day diving on Taveuni's best reefs (Rainbow Reef)." } },
      { day: 7, title: { it: 'Volo Taveuni – Malolo (Isole Mamanuca)', en: 'Flight Taveuni – Malolo (Mamanuca Islands)' }, description: { it: 'Volo per le Isole Mamanuca. Resort 4★ Beachfront (3 notti), colazione inclusa.', en: 'Flight to the Mamanuca Islands. 4★ Beachfront resort (3 nights), breakfast included.' } },
      { day: 8, title: { it: 'Mamanuca – Snorkeling & Kayak', en: 'Mamanuca – Snorkelling & Kayak' }, description: { it: 'Giornata libera tra snorkeling, kayak e spiagge paradisiache.', en: 'Free day for snorkelling, kayaking and pristine beaches.' } },
      { day: 9, title: { it: 'Mamanuca – Island Hopping', en: 'Mamanuca – Island Hopping' }, description: { it: "Tour tra le isole minori dell'arcipelago Mamanuca.", en: 'Tour of the smaller Mamanuca archipelago islands.' } },
      { day: 10, title: { it: 'Volo Malolo – Nadi · Sawa-i-Lau', en: 'Flight Malolo – Nadi · Sawa-i-Lau' }, description: { it: 'Volo di rientro a Nadi. Resort 4★ Deluxe Beachfront (3 notti).', en: 'Return flight to Nadi. 4★ Deluxe Beachfront resort (3 nights).' } },
      { day: 11, title: { it: 'Sawa-i-Lau Caves', en: 'Sawa-i-Lau Caves' }, description: { it: 'Escursione alle grotte calcaree di Sawa-i-Lau. Acque termali.', en: 'Excursion to the Sawa-i-Lau limestone caves. Thermal waters.' } },
      { day: 12, title: { it: 'Relax & Kava Ceremony', en: 'Relax & Kava Ceremony' }, description: { it: 'Relax in spiaggia. Sera: cerimonia tradizionale del Kava.', en: 'Beach relaxation. Evening: traditional Kava ceremony.' } },
      { day: 13, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto di Nadi. Volo internazionale.", en: 'Transfer to Nadi airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario (con colazione)', 'Tour Coral Coast', 'Tour Garden of the Sleeping Giant', 'Trekking Bouma Falls (Taveuni)', 'Escursione diving Rainbow Reef', 'Tour island-hopping Mamanuca', 'Escursione Sawa-i-Lau Caves', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary (with breakfast)', 'Coral Coast tour', 'Garden of the Sleeping Giant tour', 'Bouma Falls trekking (Taveuni)', 'Rainbow Reef diving excursion', 'Mamanuca island-hopping tour', 'Sawa-i-Lau Caves excursion', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'nuova-zelanda-nuova-caledonia',
    title: { it: 'Nuova Zelanda + Nuova Caledonia', en: 'New Zealand + New Caledonia' },
    description: {
      it: 'Tour accompagnato con guida in italiano della Nuova Zelanda per chi ha poco tempo, seguito da una settimana di relax sulla Grande Terre neocaledone con le sue spiagge turchesi.',
      en: 'Guided tour of New Zealand with Italian-speaking guide for those with limited time, followed by a relaxing week on Grande Terre with its turquoise beaches.',
    },
    duration: 21,
    destinationSlug: 'new-zealand',
    category: 'group',
    image: '/images/itin-nz-caledonia.jpg',
    price: { currency: 'EUR', amount: 5300 },
    featured: false,
    highlights: {
      it: ['Auckland & Waitomo Caves', 'Queenstown', 'Milford Sound', 'Noumea – Nuova Caledonia'],
      en: ['Auckland & Waitomo Caves', 'Queenstown', 'Milford Sound', 'Noumea – New Caledonia'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' }, description: { it: 'Arrivo ad Auckland. Hotel 4★ (2 notti).', en: 'Arrival in Auckland. 4★ hotel (2 nights).' } },
      { day: 2, title: { it: 'Auckland', en: 'Auckland' }, description: { it: 'Tour della città: Sky Tower, Viaduct Harbour, One Tree Hill.', en: 'City tour: Sky Tower, Viaduct Harbour, One Tree Hill.' } },
      { day: 3, title: { it: 'Waitomo – Rotorua', en: 'Waitomo – Rotorua' }, description: { it: 'Grotte di Waitomo con le lucciole, poi Rotorua. Hotel 4★ (3 notti).', en: 'Waitomo glowworm caves, then Rotorua. 4★ hotel (3 nights).' } },
      { day: 4, title: { it: 'Rotorua', en: 'Rotorua' }, description: { it: 'Cultura Maori, geyser di Whakarewarewa, hangi tradizionale.', en: 'Maori culture, Whakarewarewa geysers, traditional hangi meal.' } },
      { day: 5, title: { it: 'Lago Taupo & Huka Falls', en: 'Lake Taupo & Huka Falls' }, description: { it: 'Huka Falls, Lago Taupo e Tongariro National Park (vista).', en: 'Huka Falls, Lake Taupo and Tongariro National Park (view).' } },
      { day: 6, title: { it: 'Wellington', en: 'Wellington' }, description: { it: 'Viaggio a Wellington: Te Papa Museum, waterfront, Cuba Street.', en: 'Travel to Wellington: Te Papa Museum, waterfront, Cuba Street.' } },
      { day: 7, title: { it: 'Volo Wellington – Christchurch', en: 'Flight Wellington – Christchurch' }, description: { it: "Volo all'Isola del Sud. Christchurch. Hotel 3.5★ (2 notti).", en: 'Flight to the South Island. Christchurch. 3.5★ hotel (2 nights).' } },
      { day: 8, title: { it: 'Christchurch', en: 'Christchurch' }, description: { it: 'Christchurch ricca di street art, giardini botanici e cultura.', en: 'Christchurch with street art, botanical gardens and culture.' } },
      { day: 9, title: { it: 'Franz Josef Glacier – Queenstown', en: 'Franz Josef Glacier – Queenstown' }, description: { it: 'Visita del ghiacciaio Franz Josef, poi guida verso Queenstown.', en: 'Visit Franz Josef Glacier, then drive to Queenstown.' } },
      { day: 10, title: { it: 'Queenstown', en: 'Queenstown' }, description: { it: 'Capitale mondiale dell\'avventura: bungee, skydiving, jet boat sul Shotover.', en: 'World adventure capital: bungee, skydiving, Shotover jet boat.' } },
      { day: 11, title: { it: 'Milford Sound', en: 'Milford Sound' }, description: { it: 'Escursione a Milford Sound: crociera tra cascate e delfini (pranzo incluso).', en: 'Milford Sound excursion: cruise among waterfalls and dolphins (lunch included).' } },
      { day: 13, title: { it: 'Volo NZ – Noumea (Nuova Caledonia)', en: 'Flight NZ – Noumea (New Caledonia)' }, description: { it: 'Volo per Noumea, Nuova Caledonia. Hotel 3.5★ (3 notti).', en: 'Flight to Noumea, New Caledonia. 3.5★ hotel (3 nights).' } },
      { day: 14, title: { it: 'Noumea', en: 'Noumea' }, description: { it: 'Visita di Noumea: Quartiere Latino, mostre Kanak, laguna UNESCO.', en: 'Visit Noumea: Latin Quarter, Kanak exhibitions, UNESCO lagoon.' } },
      { day: 15, title: { it: "Île des Pins", en: "Île des Pins" }, description: { it: "Escursione all'Île des Pins: la \"più vicina isola al paradiso\", baie cristalline.", en: 'Day trip to Île des Pins: the "nearest island to paradise", crystal bays.' } },
      { day: 21, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto. Volo internazionale.", en: 'Transfer to the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Tour di Auckland e guida in italiano', 'Grotte di Waitomo', 'Rotorua Maori + Hangi', 'Escursione Milford Sound (pranzo incluso)', "Escursione Île des Pins", 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Auckland city tour with Italian-speaking guide', 'Waitomo glowworm caves', 'Rotorua Maori + Hangi', 'Milford Sound cruise (lunch included)', "Île des Pins day trip", 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'australia-deluxe-isole-cook',
    title: { it: 'Australia Deluxe + Isole Cook', en: 'Australia Deluxe + Cook Islands' },
    description: {
      it: "Il meglio dell'Australia classica in hotel 4 stelle, da Sydney a Cairns con la Grande Barriera Corallina e Uluru, concluso da una settimana di puro relax alle Isole Cook.",
      en: 'The best of classic Australia in 4-star hotels, from Sydney to Cairns with the Great Barrier Reef and Uluru, ending with a week of pure relaxation in the Cook Islands.',
    },
    duration: 23,
    destinationSlug: 'australia',
    category: 'luxury',
    image: '/images/itin-au-deluxe.jpg',
    price: { currency: 'EUR', amount: 4130 },
    featured: false,
    highlights: {
      it: ['Sydney & Blue Mountains', 'Great Barrier Reef', 'Uluru', 'Isole Cook'],
      en: ['Sydney & Blue Mountains', 'Great Barrier Reef', 'Uluru', 'Cook Islands'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo a Sydney', en: 'Arrival in Sydney' }, description: { it: 'Arrivo a Sydney. Hotel 4★ (2 notti).', en: 'Arrival in Sydney. 4★ hotel (2 nights).' } },
      { day: 2, title: { it: 'Sydney', en: 'Sydney' }, description: { it: 'Tour della città: Opera House, Harbour Bridge, Bondi Beach, Rocks.', en: 'City tour: Opera House, Harbour Bridge, Bondi Beach, The Rocks.' } },
      { day: 3, title: { it: 'Blue Mountains', en: 'Blue Mountains' }, description: { it: 'Tour organizzato Blue Mountains: Three Sisters, Scenic Railway.', en: 'Blue Mountains tour: Three Sisters, Scenic Railway.' } },
      { day: 4, title: { it: 'Volo Sydney – Ayers Rock', en: 'Flight Sydney – Ayers Rock' }, description: { it: 'Volo per Ayers Rock. Hotel 4★ (2 notti).', en: 'Flight to Ayers Rock. 4★ hotel (2 nights).' } },
      { day: 5, title: { it: 'Uluru & Kata Tjuta', en: 'Uluru & Kata Tjuta' }, description: { it: 'Passeggiata intorno a Uluru, Kata Tjuta al tramonto, cena nel deserto.', en: 'Walk around Uluru, Kata Tjuta at sunset, desert dinner.' } },
      { day: 6, title: { it: 'Volo Ayers Rock – Darwin', en: 'Flight Ayers Rock – Darwin' }, description: { it: 'Volo per Darwin. Hotel 4★ (2 notti).', en: 'Flight to Darwin. 4★ hotel (2 nights).' } },
      { day: 7, title: { it: 'Darwin & Litchfield', en: 'Darwin & Litchfield' }, description: { it: 'Litchfield National Park: Buley Rockhole, cascate, nuoto.', en: 'Litchfield National Park: Buley Rockhole, waterfalls, swimming.' } },
      { day: 8, title: { it: 'Volo Darwin – Cairns', en: 'Flight Darwin – Cairns' }, description: { it: 'Volo per Cairns. Hotel 4★ (4 notti).', en: 'Flight to Cairns. 4★ hotel (4 nights).' } },
      { day: 9, title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' }, description: { it: 'Tour di un giorno sulla barriera corallina: snorkeling, diving.', en: 'Full-day Great Barrier Reef tour: snorkelling, diving.' } },
      { day: 10, title: { it: 'Daintree & Cape Tribulation', en: 'Daintree & Cape Tribulation' }, description: { it: 'Tour foresta pluviale: Daintree River, Cape Tribulation.', en: 'Rainforest tour: Daintree River, Cape Tribulation.' } },
      { day: 11, title: { it: 'Kuranda Scenic Railway', en: 'Kuranda Scenic Railway' }, description: { it: 'Treno storico Kuranda Scenic Railway + Skyrail Rainforest Cableway.', en: 'Historic Kuranda Scenic Railway + Skyrail Rainforest Cableway.' } },
      { day: 12, title: { it: 'Volo Cairns – Rarotonga (Isole Cook)', en: 'Flight Cairns – Rarotonga (Cook Islands)' }, description: { it: 'Volo per Rarotonga. Studio 4★ (3 notti).', en: 'Flight to Rarotonga. 4★ studio (3 nights).' } },
      { day: 13, title: { it: 'Rarotonga', en: 'Rarotonga' }, description: { it: 'Giro dell\'isola, snorkeling nella laguna, mercato artigianale.', en: 'Island tour, lagoon snorkelling, craft market.' } },
      { day: 14, title: { it: 'Aitutaki Lagoon', en: 'Aitutaki Lagoon' }, description: { it: "Escursione all'incredibile laguna di Aitutaki: one foot island, acque turchesi.", en: 'Day trip to the breathtaking Aitutaki Lagoon: one foot island, turquoise waters.' } },
      { day: 23, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto. Volo internazionale.", en: 'Transfer to the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Tour Blue Mountains', 'Tour Uluru + Kata Tjuta + cena nel deserto', 'Tour Litchfield National Park', 'Tour Grande Barriera Corallina', 'Tour Daintree & Cape Tribulation', 'Kuranda Scenic Railway + Skyrail', 'Escursione Aitutaki Lagoon', 'SIM australiana + credito', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Blue Mountains tour', 'Uluru + Kata Tjuta + desert dinner', 'Litchfield National Park tour', 'Great Barrier Reef tour', 'Daintree & Cape Tribulation tour', 'Kuranda Scenic Railway + Skyrail', 'Aitutaki Lagoon day trip', 'Australian SIM card + credit', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'nuova-zelanda-isole-samoa',
    title: { it: 'Nuova Zelanda + Isole Samoa', en: 'New Zealand + Samoa Islands' },
    description: {
      it: "L'Isola del Nord e l'Isola del Sud della Nuova Zelanda in libertà, seguite da 4 notti di puro relax alle Isole Samoa, il paradiso tropicale autentico del Pacifico.",
      en: 'The North and South Islands of New Zealand at your own pace, followed by 4 nights of pure relaxation in the Samoa Islands, the authentic tropical paradise of the Pacific.',
    },
    duration: 18,
    destinationSlug: 'new-zealand',
    category: 'family',
    image: '/images/itin-nz-samoa.jpg',
    price: { currency: 'EUR', amount: 1930 },
    featured: false,
    highlights: {
      it: ['Auckland & Rotorua', 'Queenstown & Milford Sound', 'Isole Samoa', 'Spiagge tropicali'],
      en: ['Auckland & Rotorua', 'Queenstown & Milford Sound', 'Samoa Islands', 'Tropical Beaches'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' }, description: { it: 'Arrivo ad Auckland. Hotel 3★ (2 notti). Ritiro auto a noleggio.', en: 'Arrival in Auckland. 3★ hotel (2 nights). Car hire.' } },
      { day: 2, title: { it: 'Auckland', en: 'Auckland' }, description: { it: 'Visita di Auckland: Sky Tower, Viaduct Harbour, One Tree Hill.', en: 'Explore Auckland: Sky Tower, Viaduct Harbour, One Tree Hill.' } },
      { day: 3, title: { it: 'Rotorua', en: 'Rotorua' }, description: { it: 'Guidare verso Rotorua: geyser, cultura Maori, Haka. Hotel 3★ (2 notti).', en: 'Drive to Rotorua: geysers, Maori culture, Haka. 3★ hotel (2 nights).' } },
      { day: 4, title: { it: 'Rotorua & Lago Taupo', en: 'Rotorua & Lake Taupo' }, description: { it: 'Whakarewarewa, Huka Falls, Lago Taupo.', en: 'Whakarewarewa, Huka Falls, Lake Taupo.' } },
      { day: 5, title: { it: "Volo Auckland – Christchurch", en: 'Flight Auckland – Christchurch' }, description: { it: "Volo per l'Isola del Sud. Christchurch. Hotel 3.5★ (2 notti).", en: 'Flight to the South Island. Christchurch. 3.5★ hotel (2 nights).' } },
      { day: 6, title: { it: 'Christchurch & Canterbury Plains', en: 'Christchurch & Canterbury Plains' }, description: { it: 'Visita di Christchurch e delle Canterbury Plains fino a Kaikōura.', en: 'Visit Christchurch and the Canterbury Plains to Kaikōura.' } },
      { day: 7, title: { it: 'Guida verso Queenstown', en: 'Drive to Queenstown' }, description: { it: 'Guida panoramica verso Queenstown attraverso le Alpi del Sud. Hotel 3.5★ (2 notti).', en: 'Scenic drive to Queenstown through the Southern Alps. 3.5★ hotel (2 nights).' } },
      { day: 8, title: { it: 'Queenstown', en: 'Queenstown' }, description: { it: 'Tempo libero: bungee jumping, skydiving, jet boat Shotover o Skyline Gondola.', en: 'Free time: bungee jumping, skydiving, Shotover jet boat or Skyline Gondola.' } },
      { day: 9, title: { it: 'Milford Sound', en: 'Milford Sound' }, description: { it: 'Escursione a Milford Sound: crociera tra cascate e delfini (pranzo incluso).', en: 'Milford Sound excursion: cruise among waterfalls and dolphins (lunch included).' } },
      { day: 10, title: { it: 'Volo Queenstown – Apia (Samoa)', en: 'Flight Queenstown – Apia (Samoa)' }, description: { it: 'Volo per Apia, Isole Samoa. Resort 4★ colazione inclusa (4 notti).', en: 'Flight to Apia, Samoa Islands. 4★ resort with breakfast (4 nights).' } },
      { day: 11, title: { it: 'Samoa – Paradiso Tropicale', en: 'Samoa – Tropical Paradise' }, description: { it: "Spiagge bianche, lagune cristalline, snorkeling e cultura locale Fa'a Samoa.", en: "White beaches, crystal lagoons, snorkelling and local Fa'a Samoa culture." } },
      { day: 12, title: { it: 'Samoa – Cascate & Lava Lava', en: 'Samoa – Waterfalls & Lava Lava' }, description: { it: "To Sua Ocean Trench, cascate Papase'ea Sliding Rocks, cerimonia Ava.", en: "To Sua Ocean Trench, Papase'ea Sliding Rocks waterfalls, Ava ceremony." } },
      { day: 13, title: { it: "Savai'i – Isola Vulcanica", en: "Savai'i – Volcanic Island" }, description: { it: "Escursione a Savai'i: campi lavici, villaggi tradizionali, reef tropicale.", en: "Day trip to Savai'i: lava fields, traditional villages, tropical reef." } },
      { day: 18, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto. Volo internazionale.", en: 'Transfer to the airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Noleggio auto Auckland–Auckland', 'Tour Rotorua Maori', 'Escursione Milford Sound (pranzo incluso)', "Escursione a Savai'i", 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Car hire Auckland–Auckland', 'Rotorua Maori tour', 'Milford Sound cruise (lunch included)', "Savai'i day trip", 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
  {
    slug: 'australia-classica',
    title: { it: 'Australia Classica', en: 'Classic Australia' },
    description: {
      it: "Il grande classico: Sydney, la Grande Barriera Corallina, il Red Center con Uluru e il Kakadu National Park. Tutto ciò che l'Australia sa offrire in un solo indimenticabile viaggio.",
      en: 'The ultimate classic: Sydney, the Great Barrier Reef, the Red Centre with Uluru and Kakadu National Park. Everything Australia has to offer in one unforgettable journey.',
    },
    duration: 20,
    destinationSlug: 'australia',
    category: 'adventure',
    image: '/images/itin-classica-au.jpg',
    price: { currency: 'EUR', amount: 2260 },
    featured: true,
    highlights: {
      it: ['Sydney & Opera House', 'Great Barrier Reef', 'Uluru & Kata Tjuta', 'Kakadu National Park'],
      en: ['Sydney & Opera House', 'Great Barrier Reef', 'Uluru & Kata Tjuta', 'Kakadu National Park'],
    },
    program: [
      { day: 1, title: { it: 'Arrivo ad Adelaide', en: 'Arrival in Adelaide' }, description: { it: 'Arrivo ad Adelaide. Hotel 3.5★ (1 notte).', en: 'Arrival in Adelaide. 3.5★ hotel (1 night).' } },
      { day: 2, title: { it: 'Tour Kangaroo Island', en: 'Kangaroo Island Tour' }, description: { it: 'Inizio tour organizzato a Kangaroo Island (2 notti). Fauna e paesaggi unici.', en: 'Start of organised Kangaroo Island tour (2 nights). Unique wildlife and landscapes.' } },
      { day: 4, title: { it: 'Volo Adelaide – Melbourne', en: 'Flight Adelaide – Melbourne' }, description: { it: 'Rientro da Kangaroo Island, volo per Melbourne. Hotel 3.5★ (3 notti).', en: 'Return from Kangaroo Island, flight to Melbourne. 3.5★ hotel (3 nights).' } },
      { day: 6, title: { it: 'Great Ocean Road', en: 'Great Ocean Road' }, description: { it: 'Tour organizzato Great Ocean Road: Twelve Apostles e Loch Ard Gorge.', en: 'Great Ocean Road tour: Twelve Apostles and Loch Ard Gorge.' } },
      { day: 7, title: { it: 'Volo Melbourne – Sydney', en: 'Flight Melbourne – Sydney' }, description: { it: 'Volo per Sydney. Hotel 3.5★ (2 notti).', en: 'Flight to Sydney. 3.5★ hotel (2 nights).' } },
      { day: 8, title: { it: 'Sydney', en: 'Sydney' }, description: { it: 'Opera House, Harbour Bridge, Bondi Beach, Darling Harbour.', en: 'Opera House, Harbour Bridge, Bondi Beach, Darling Harbour.' } },
      { day: 9, title: { it: 'Blue Mountains', en: 'Blue Mountains' }, description: { it: 'Tour Blue Mountains: Three Sisters, Scenic Railway, Leura.', en: 'Blue Mountains tour: Three Sisters, Scenic Railway, Leura.' } },
      { day: 10, title: { it: 'Volo Sydney – Ayers Rock', en: 'Flight Sydney – Ayers Rock' }, description: { it: 'Volo per Ayers Rock. Tour Red Center 3gg (tende permanenti, pasti inclusi).', en: 'Flight to Ayers Rock. Red Centre tour 3 days (permanent tents, meals included).' } },
      { day: 11, title: { it: 'Uluru', en: 'Uluru' }, description: { it: 'Passeggiata intorno a Uluru all\'alba e al tramonto. Field of Lights.', en: 'Walk around Uluru at sunrise and sunset. Field of Lights.' } },
      { day: 12, title: { it: 'Kata Tjuta & Kings Canyon', en: 'Kata Tjuta & Kings Canyon' }, description: { it: 'Kata Tjuta (Monti Olgas) e Kings Canyon Rim Walk.', en: 'Kata Tjuta (The Olgas) and Kings Canyon Rim Walk.' } },
      { day: 14, title: { it: 'Tour Kakadu National Park', en: 'Kakadu National Park Tour' }, description: { it: 'Inizio tour Kakadu + Litchfield 3gg/2 notti (tende permanenti, pasti inclusi).', en: 'Start of Kakadu + Litchfield tour, 3 days/2 nights (permanent tents, meals included).' } },
      { day: 17, title: { it: 'Volo Darwin – Cairns', en: 'Flight Darwin – Cairns' }, description: { it: 'Volo per Cairns. Hotel 3.5★ (3 notti).', en: 'Flight to Cairns. 3.5★ hotel (3 nights).' } },
      { day: 18, title: { it: 'Daintree & Cape Tribulation', en: 'Daintree & Cape Tribulation' }, description: { it: 'Tour foresta pluviale: Daintree River, Cape Tribulation.', en: 'Rainforest tour: Daintree River, Cape Tribulation.' } },
      { day: 19, title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' }, description: { it: 'Tour sulla barriera corallina: snorkeling con tartarughe (pranzo incluso).', en: 'Great Barrier Reef tour: snorkelling with turtles (lunch included).' } },
      { day: 20, title: { it: 'Partenza', en: 'Departure' }, description: { it: "Trasferimento all'aeroporto di Cairns. Volo internazionale.", en: 'Transfer to Cairns airport. International flight.' } },
    ],
    included: {
      it: ['Tutti i pernottamenti come da itinerario', 'Colazioni dove indicate nel programma', 'Tour organizzato Kangaroo Island (2gg)', 'Tour Great Ocean Road', 'Tour Blue Mountains', 'Tour Red Center 3gg (pasti inclusi)', 'Tour Kakadu + Litchfield 3gg (pasti inclusi)', 'Tour barriera corallina (pranzo incluso)', 'Tour Daintree & Cape Tribulation', 'SIM australiana + credito', 'Assistenza in italiano per tutta la durata del soggiorno'],
      en: ['All accommodation as per itinerary', 'Breakfasts where indicated in the programme', 'Kangaroo Island tour (2 days)', 'Great Ocean Road tour', 'Blue Mountains tour', 'Red Centre tour 3 days (meals included)', 'Kakadu + Litchfield tour 3 days (meals included)', 'Great Barrier Reef tour (lunch included)', 'Daintree & Cape Tribulation tour', 'Australian SIM card + credit', 'Italian-language assistance throughout'],
    },
    notIncluded: standardNotIncluded,
  },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────

/**
 * Converts a BlogSection array to Sanity Portable Text blocks.
 * Produces: h2 block for title, normal blocks for each paragraph.
 */
function sectionsToPortableText(sections) {
  const blocks = [];
  for (const section of sections) {
    // Section title → h2
    blocks.push({
      _type: 'block',
      _key: `${section.id}-title`,
      style: 'h2',
      children: [{ _type: 'span', _key: `${section.id}-title-span`, text: section.title, marks: [] }],
      markDefs: [],
    });
    // Section content: split by double newlines into paragraphs
    const paragraphs = section.content.split(/\n\n+/).filter(Boolean);
    paragraphs.forEach((para, pi) => {
      blocks.push({
        _type: 'block',
        _key: `${section.id}-para-${pi}`,
        style: 'normal',
        children: [{ _type: 'span', _key: `${section.id}-para-${pi}-span`, text: para.trim(), marks: [] }],
        markDefs: [],
      });
    });
  }
  return blocks;
}

function introToPortableText(intro, id) {
  const paragraphs = intro.split(/\n\n+/).filter(Boolean);
  return paragraphs.map((para, pi) => ({
    _type: 'block',
    _key: `${id}-intro-${pi}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `${id}-intro-${pi}-span`, text: para.trim(), marks: [] }],
    markDefs: [],
  }));
}

const blogPosts = [
  {
    slug: 'guida-viaggio-australia',
    title: { it: 'Australia: La Guida Completa al Down Under', en: 'Australia: The Complete Guide to Down Under' },
    excerpt: { it: 'Tutto quello che devi sapere per un viaggio indimenticabile in Australia: visti, trasporti, clima e consigli pratici.', en: 'Everything you need to know for an unforgettable trip to Australia: visas, transport, climate and practical advice.' },
    category: { it: 'Guide Destinazioni', en: 'Destination Guides' },
    author: 'Progetto Australia',
    publishedAt: '2026-03-03',
    image: '/images/dest-australia.png',
    contentIt: {
      intro: `L'Australia è il sesto paese più grande al mondo che si trova tra l'Oceano Indiano e il Pacifico. Le incalcolabili bellezze dell'Australia la rendono una meta ideale per una vacanza indimenticabile, divertente ed eccitante, sempre all'insegna della scoperta e dell'avventura.

Parchi nazionali, foreste pluviali nate migliaia di anni fa, stupende spiagge bianche che incantano e permettono un gran numero di attività all'aperto, i magnifici colori dell'entroterra australiano con l'indimenticabile Ayers Rock, la cultura aborigena e molto altro ancora fanno dell'Australia una delle mete predilette dai viaggiatori di tutto il mondo.`,
      sections: [
        { id: 'documenti', title: 'DOCUMENTI E VISTI', content: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. Oltre al passaporto è obbligatorio ottenere un visto d'ingresso. Il visto turistico "elettronico" (ETA Electronic Travel Authority) è gratuito e si puo' ottenere on-line accedendo al sito dell'ufficio del governo Australiano: www.australia.gov.au/` },
        { id: 'quando-andare', title: 'QUANDO ANDARE E CLIMA', content: `L'Australia si trova a sud dell'equatore, quindi le stagioni sono invertite rispetto all'Europa: l'estate va da dicembre a marzo e l'inverno da giugno a settembre. Caratterizzata da diverse zone climatiche: clima temperato (Sydney, Melbourne), desertico (centro), tropicale (Queensland) ed equatoriale (estremo nord).` },
        { id: 'trasporti', title: 'TRASPORTI LOCALI', content: `L'Australia è un paese enorme, ma spostarsi al suo interno è molto semplice.\n\nAEREO: Il modo migliore per coprire le lunghe distanze. Qantas, Virgin Australia, Jetstar, Tiger Airways, Rex e Airnorth servono tutte le capitali e molte città regionali.\n\nAUTO: Vasta rete di strade ben mantenute. Percorsi consigliati: Great Ocean Road, Kangaroo Island, Red Center, costa Brisbane-Cairns, Northern Territory. Necessaria patente internazionale. Guida a sinistra.` },
        { id: 'lingua-moneta', title: 'MONETA E LINGUA', content: `MONETA LOCALE: Dollaro australiano (AUD). Carte di credito ampiamente accettate.\n\nLINGUA: La lingua ufficiale è l'inglese.` },
      ],
    },
    contentEn: {
      intro: `Australia is the world's sixth-largest country, located between the Indian Ocean and the Pacific. Its countless natural wonders make it an ideal destination for an unforgettable, exciting and adventurous holiday.`,
      sections: [
        { id: 'docs', title: 'DOCUMENTS & VISAS', content: 'A passport valid for at least six months after your return date is required. The electronic tourist visa (ETA – Electronic Travel Authority) is free and can be obtained online at the Australian Government website.' },
      ],
    },
  },
  {
    slug: 'guida-viaggio-nuova-zelanda',
    title: { it: 'Nuova Zelanda: Tutto quello che devi sapere', en: 'New Zealand: Everything you need to know' },
    excerpt: { it: 'Una guida completa sulla Nuova Zelanda: documenti, clima, trasporti e consigli per vivere al meglio la Terra di Mezzo.', en: 'A complete guide to New Zealand: documents, climate, transport and tips to best experience Middle-earth.' },
    category: { it: 'Guide Destinazioni', en: 'Destination Guides' },
    author: 'Progetto Australia',
    publishedAt: '2026-03-03',
    image: '/images/blog-nz.jpg',
    contentIt: {
      intro: `La Nuova Zelanda, costituita principalmente da due isole, l'Isola del Nord e l'Isola del Sud, è un paese di rara bellezza e varietà paesaggistica: montagne glaciali, lunghe spiagge deserte, fiumi impetuosi, laghi limpidi e profondi, vulcani e geyser, fanghi ribollenti.`,
      sections: [
        { id: 'documenti', title: 'DOCUMENTI E VISTI', content: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. A partire dal 1 Ottobre 2019 è obbligatorio ottenere un visto d'ingresso NzeTA (New Zealand Electronic Travel Authority).` },
        { id: 'quando-andare', title: 'QUANDO ANDARE?', content: `La Nuova Zelanda si presta ad essere visitata durante tutto l'anno, anche se il periodo migliore va da novembre a marzo, che coincide con la nostra primavera-estate, per godere di temperature gradevoli e clima più secco.` },
        { id: 'trasporti', title: 'TRASPORTI LOCALI', content: `AEREO: Adatto se si ha poco tempo o ci si vuole spostare tra le isole. Air New Zealand e Qantas collegano le principali aree urbane.\n\nAUTO: Distanze brevi e strade in buone condizioni. Guida a sinistra. Necessaria patente internazionale. Età minima 21 anni.\n\nTRENO: Rotte limitate ma spettacolari: TranzAlpine (Christchurch-Greymouth), Northern Explorer (Wellington-Auckland).` },
        { id: 'lingua-moneta', title: 'MONETA E LINGUA', content: `MONETA LOCALE: Dollaro neozelandese (NZD). Carte di credito ampiamente accettate.\n\nLINGUA: Lingua ufficiale l'inglese. Nazione multiculturale con influenze Maori diffuse.` },
      ],
    },
    contentEn: {
      intro: `New Zealand, made up mainly of the North Island and the South Island, is a country of rare beauty and landscape variety: glacial mountains, long deserted beaches, rushing rivers, clear deep lakes, volcanoes and geysers.`,
      sections: [
        { id: 'docs', title: 'DOCUMENTS', content: 'NzeTA required since 1 October 2019, obtainable online from the New Zealand Immigration website.' },
      ],
    },
  },
  {
    slug: 'nuotare-con-gli-squali-balena-australia',
    title: { it: "Incontra i Giganti del Mare: Nuotare con gli Squali Balena in Australia", en: 'Meet the Giants of the Sea: Swimming with Whale Sharks in Australia' },
    excerpt: { it: "Un'esperienza che ti toccherà l'anima: nuotare a fianco degli squali balena nelle acque cristalline del Western Australia.", en: "An experience that will touch your soul: swimming alongside whale sharks in the crystal-clear waters of Western Australia." },
    category: { it: 'Esperienze', en: 'Experiences' },
    author: 'Progetto Australia',
    publishedAt: '2026-02-10',
    image: '/images/blog-squali.jpg',
    contentIt: {
      intro: `Immagina di scivolare nelle acque cristalline dell'Ovest Australia dove il silenzio è rotto solo dal tuo respiro e dal movimento ritmico delle tue braccia. Mentre ti immergi più a fondo, la maestosa ombra di uno squalo balena emerge dalla distanza e si avvicina con una calma sovrannaturale.`,
      sections: [
        { id: 'dove-quando', title: 'DOVE E QUANDO', content: `Ningaloo Reef, Western Australia: La stagione degli squali balena va da marzo a luglio, con il picco ad aprile-maggio. Exmouth e Coral Bay sono i principali punti di partenza per le escursioni.\n\nNingaloo Reef è uno dei pochi posti al mondo dove è possibile nuotare con questi giganti in modo prevedibile ogni anno. La barriera corallina è dichiarata Patrimonio dell'Umanità UNESCO.` },
        { id: 'cosa-aspettarsi', title: "COS'ASPETTARSI", content: `Gli squali balena (Rhincodon typus) sono i pesci più grandi del mondo, ma completamente innocui per l'uomo — si nutrono esclusivamente di plancton.\n\nLe escursioni durano in genere mezza giornata. Una guida specializzata si immerge con te e ti mostra come avvicinarti in sicurezza.` },
        { id: 'come-prenotare', title: 'COME PRENOTARE', content: `I tour vanno prenotati con largo anticipo, specialmente per la alta stagione (aprile-maggio). Contatta il nostro team: organizziamo l'esperienza all'interno di un itinerario personalizzato nel Western Australia.` },
      ],
    },
    contentEn: {
      intro: `Imagine gliding through the crystal-clear waters of Western Australia where the silence is broken only by your breathing and the rhythmic movement of your arms.`,
      sections: [
        { id: 'where-when', title: 'WHERE AND WHEN', content: `Ningaloo Reef, Western Australia: Whale shark season runs from March to July, peaking in April-May. Exmouth and Coral Bay are the main departure points.` },
        { id: 'what-to-expect', title: 'WHAT TO EXPECT', content: `Whale sharks are the largest fish in the world, but completely harmless to humans. Excursions generally last half a day with a specialist guide.` },
        { id: 'how-to-book', title: 'HOW TO BOOK', content: `Tours should be booked well in advance. Contact our team to organise the experience within a personalised Western Australia itinerary.` },
      ],
    },
  },
  {
    slug: 'hobbiton-la-contea-esiste',
    title: { it: 'Hobbiton: la "Contea" Esiste!', en: 'Hobbiton: The "Shire" Really Exists!' },
    excerpt: { it: 'Il set cinematografico di Hobbiton in Nuova Zelanda è un\'esperienza magica per tutti gli appassionati de Il Signore degli Anelli e Lo Hobbit.', en: 'The Hobbiton movie set in New Zealand is a magical experience for all fans of The Lord of the Rings and The Hobbit.' },
    category: { it: 'Esperienze', en: 'Experiences' },
    author: 'Progetto Australia',
    publishedAt: '2026-01-20',
    image: '/images/blog-hobbiton.jpg',
    contentIt: {
      intro: `Il tour Hobbiton Movie Set è un'esperienza interessante e divertente per tutti gli appassionati della Trilogia di The Lord of The Rings e The Hobbit. La tua guida ti accompagnerà sul famoso set cinematografico di 12 acri.`,
      sections: [
        { id: 'dove-si-trova', title: 'DOVE SI TROVA', content: `Matamata, Isola del Nord, Nuova Zelanda: Il set si trova a circa 2 ore da Auckland e 1 ora da Rotorua. È raggiungibile in auto o con tour organizzati da entrambe le città.` },
        { id: 'cosa-aspettarsi', title: "COS'ASPETTARSI", content: `Il tour dura circa 2 ore e si svolge a piedi attraverso il set. Vedrai le 44 buche Hobbit originali, i giardini curati, il Mulino sul laghetto e naturalmente la Green Dragon Inn.\n\nIl tour si conclude con una bevanda inclusa alla Green Dragon Inn.` },
        { id: 'come-inserirlo', title: 'COME INSERIRLO NEL TUO VIAGGIO', content: `Hobbiton si inserisce perfettamente in un itinerario sull'Isola del Nord neozelandese. Noi di Progetto Australia lo inseriamo spesso negli itinerari tra Auckland e Rotorua.` },
      ],
    },
    contentEn: {
      intro: `The Hobbiton Movie Set tour is an interesting and fun experience for all fans of The Lord of the Rings and The Hobbit trilogy.`,
      sections: [
        { id: 'where-is-it', title: 'WHERE IS IT', content: `Matamata, North Island, New Zealand: The set is located about 2 hours from Auckland and 1 hour from Rotorua.` },
        { id: 'what-to-expect', title: 'WHAT TO EXPECT', content: `The tour lasts about 2 hours and takes place on foot. You will see the original 44 Hobbit holes, the Mill and the Green Dragon Inn. The tour concludes with a complimentary drink.` },
        { id: 'how-to-include', title: 'HOW TO INCLUDE IT IN YOUR TRIP', content: `Hobbiton fits perfectly into a North Island New Zealand itinerary. Contact us to create your tailor-made trip to New Zealand.` },
      ],
    },
  },
];

// ─── Migration runners ────────────────────────────────────────────────────────

async function migrateDestinations() {
  console.log('\n📍 Migrating destinations...');
  const destIdMap = {}; // slug → Sanity _id

  for (const dest of destinations) {
    const heroImage = await uploadImage(dest.photo);
    const doc = {
      title: dest.title,
      slug: { _type: 'slug', current: dest.slug },
      country: dest.country,
      tagline: dest.tagline,
      description: dest.description,
      highlights: dest.highlights,
      featured: dest.featured,
      ...(heroImage && { heroImage }),
    };

    await upsert('destination', dest.slug, doc);

    // Fetch the created/updated _id for linking itineraries
    const id = await client.fetch(
      `*[_type == "destination" && slug.current == $slug][0]._id`,
      { slug: dest.slug }
    );
    destIdMap[dest.slug] = id;
  }

  return destIdMap;
}

async function migrateItineraries(destIdMap) {
  console.log('\n🗺️  Migrating itineraries...');

  for (const itin of itineraries) {
    const heroImage = await uploadImage(itin.image);
    const destinationRef = destIdMap[itin.destinationSlug]
      ? { _type: 'reference', _ref: destIdMap[itin.destinationSlug] }
      : undefined;

    const doc = {
      title: itin.title,
      slug: { _type: 'slug', current: itin.slug },
      duration: itin.duration,
      price: itin.price,
      category: itin.category,
      description: itin.description,
      highlights: itin.highlights,
      program: itin.program,
      included: itin.included,
      notIncluded: itin.notIncluded,
      featured: itin.featured,
      ...(destinationRef && { destination: destinationRef }),
      ...(heroImage && { heroImage }),
    };

    await upsert('itinerary', itin.slug, doc);
  }
}

async function migrateBlogPosts() {
  console.log('\n📝 Migrating blog posts...');

  for (const post of blogPosts) {
    const heroImage = await uploadImage(post.image);

    const bodyIt = [
      ...introToPortableText(post.contentIt.intro, `${post.slug}-it`),
      ...sectionsToPortableText(post.contentIt.sections),
    ];
    const bodyEn = [
      ...introToPortableText(post.contentEn.intro, `${post.slug}-en`),
      ...sectionsToPortableText(post.contentEn.sections),
    ];

    const doc = {
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      publishedAt: post.publishedAt,
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      body: { it: bodyIt, en: bodyEn },
      ...(heroImage && { heroImage }),
    };

    await upsert('blogPost', post.slug, doc);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const destIdMap = await migrateDestinations();
  await migrateItineraries(destIdMap);
  await migrateBlogPosts();
  console.log('\n✨ Migration complete!\n');
  console.log('Next steps:');
  console.log('  1. Open /studio and verify the content looks correct');
  console.log('  2. Set USE_SANITY=true in Vercel environment variables');
  console.log('  3. Redeploy → pages will fetch from Sanity CDN\n');
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err.message);
  process.exit(1);
});
