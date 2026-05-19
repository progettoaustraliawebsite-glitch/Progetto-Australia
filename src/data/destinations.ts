export interface Destination {
  id: string;
  slug: string;
  name: { it: string; en: string };
  tagline: { it: string; en: string };
  description: { it: string; en: string };
  gradient: string;
  accentColor: string;
  photo: string;       // used for homepage cards
  heroPhoto?: string;  // used for /destinations page hero
  highlights: { it: string[]; en: string[] };
}

export const destinations: Destination[] = [
  {
    id: 'australia',
    slug: 'australia',
    name: { it: 'Australia', en: 'Australia' },
    tagline: {
      it: 'Infinita e meravigliosa',
      en: 'Boundless and beautiful',
    },
    description: {
      it: 'Dal Great Barrier Reef alle ultime frontiere del Territorio del Nord, l\'Australia è un continente di contrasti straordinari. Spiagge dorate, entroterra rosso fuoco, foreste pluviali tropicali e metropoli cosmopolite.',
      en: 'From the Great Barrier Reef to the remote Northern Territory, Australia is a continent of extraordinary contrasts. Golden beaches, fiery red outback, tropical rainforests and cosmopolitan cities.',
    },
    gradient: 'from-amber-900 via-orange-800 to-stone-700',
    accentColor: '#813318',
    photo: '/images/dest-card-australia.png',
    heroPhoto: '/images/dest-hero-australia.png',
    highlights: {
      it: ['Great Barrier Reef', 'Uluru & Red Centre', 'Sydney & Melbourne', 'Daintree Rainforest'],
      en: ['Great Barrier Reef', 'Uluru & Red Centre', 'Sydney & Melbourne', 'Daintree Rainforest'],
    },
  },
  {
    id: 'new-zealand',
    slug: 'new-zealand',
    name: { it: 'Nuova Zelanda', en: 'New Zealand' },
    tagline: {
      it: 'Terra di meraviglie',
      en: 'Land of wonders',
    },
    description: {
      it: 'Fiordi maestosi, vulcani attivi, ghiacciai e spiagge incontaminate: la Nuova Zelanda è un paradiso per gli amanti della natura e dell\'avventura.',
      en: 'Majestic fjords, active volcanoes, glaciers and pristine beaches: New Zealand is a paradise for nature and adventure lovers.',
    },
    gradient: 'from-emerald-900 via-teal-800 to-slate-700',
    accentColor: '#2d6a4f',
    photo: '/images/dest-card-nz.png',
    heroPhoto: '/images/dest-hero-nz.png',
    highlights: {
      it: ['Fiordland & Milford Sound', 'Rotorua & Geotermalismo', 'Franz Josef Glacier', 'Bay of Islands'],
      en: ['Fiordland & Milford Sound', 'Rotorua & Geothermal', 'Franz Josef Glacier', 'Bay of Islands'],
    },
  },
  {
    id: 'fiji',
    slug: 'fiji',
    name: { it: 'Fiji', en: 'Fiji' },
    tagline: {
      it: 'Il sorriso del Pacifico',
      en: 'The smile of the Pacific',
    },
    description: {
      it: 'Acque cristalline color smeraldo, barriere coralline brulicanti di vita, spiagge di sabbia bianca e la famosa ospitalità Fijiana. Un paradiso tropicale senza confronti.',
      en: 'Crystal-clear emerald waters, reef teeming with life, white sandy beaches and the famous Fijian hospitality. An unparalleled tropical paradise.',
    },
    gradient: 'from-cyan-900 via-blue-800 to-teal-700',
    accentColor: '#0a7fa3',
    photo: '/images/dest-card-fiji.png',
    heroPhoto: '/images/dest-hero-fiji.png',
    highlights: {
      it: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Giardino di Fiji', 'Snorkeling & Diving'],
      en: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Garden of Fiji', 'Snorkeling & Diving'],
    },
  },
  {
    id: 'cook-islands',
    slug: 'cook-islands',
    name: { it: 'Isole Cook', en: 'Cook Islands' },
    tagline: {
      it: 'Autenticità tropicale',
      en: 'Tropical authenticity',
    },
    description: {
      it: 'Le Isole Cook sono il segreto meglio custodito del Pacifico. Raggiungibili ma ancora genuine, offrono lagune spettacolari, cultura polinesiana autentica e un ritmo di vita che invita a rallentare.',
      en: 'The Cook Islands are the best-kept secret of the Pacific. Accessible yet still genuine, they offer spectacular lagoons, authentic Polynesian culture and a pace of life that invites you to slow down.',
    },
    gradient: 'from-teal-900 via-emerald-800 to-cyan-700',
    accentColor: '#0d6e6e',
    photo: '/images/dest-card-cook.png',
    heroPhoto: '/images/dest-hero-cook.png',
    highlights: {
      it: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Cultura Maori Polinesiana'],
      en: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Polynesian Maori Culture'],
    },
  },
  {
    id: 'samoa',
    slug: 'samoa',
    name: { it: 'Isole Samoa', en: 'Samoa Islands' },
    tagline: {
      it: 'Il Pacifico autentico',
      en: 'The authentic Pacific',
    },
    description: {
      it: 'Le Isole Samoa conservano intatta la cultura polinesiana Fa\'a Samoa. Cascate spettacolari, lagune cristalline, villaggi tradizionali e la To Sua Ocean Trench, una delle piscine naturali più belle al mondo.',
      en: 'The Samoa Islands preserve the authentic Fa\'a Samoa Polynesian culture. Spectacular waterfalls, crystal lagoons, traditional villages and the To Sua Ocean Trench, one of the most beautiful natural pools in the world.',
    },
    gradient: 'from-green-900 via-teal-800 to-emerald-700',
    accentColor: '#065f46',
    photo: '/images/dest-card-samoa.png',
    heroPhoto: '/images/dest-hero-samoa.png',
    highlights: {
      it: ['To Sua Ocean Trench', 'Papase\'ea Sliding Rocks', 'Savai\'i – Isola Vulcanica', 'Cerimonia del Kava'],
      en: ['To Sua Ocean Trench', 'Papase\'ea Sliding Rocks', 'Savai\'i – Volcanic Island', 'Kava Ceremony'],
    },
  },
  {
    id: 'french-polynesia',
    slug: 'french-polynesia',
    name: { it: 'Polinesia Francese', en: 'French Polynesia' },
    tagline: {
      it: 'Il paradiso del Pacifico',
      en: 'The paradise of the Pacific',
    },
    description: {
      it: 'Bora Bora, Moorea, Tahiti e gli atolli delle Tuamotu: la Polinesia Francese è il sogno per eccellenza. Acque color turchese, bungalow sull\'acqua, lagune cristalline e un\'atmosfera romantica senza pari nel mondo.',
      en: 'Bora Bora, Moorea, Tahiti and the Tuamotu atolls: French Polynesia is the ultimate dream. Turquoise waters, overwater bungalows, crystal lagoons and an unrivalled romantic atmosphere.',
    },
    gradient: 'from-sky-900 via-blue-800 to-cyan-700',
    accentColor: '#0369a1',
    photo: '/images/dest-card-polynesia.png',
    heroPhoto: '/images/dest-hero-polynesia.png',
    highlights: {
      it: ['Bora Bora', 'Moorea', 'Atolli delle Tuamotu', 'Bungalow sull\'Acqua'],
      en: ['Bora Bora', 'Moorea', 'Tuamotu Atolls', 'Overwater Bungalows'],
    },
  },
  {
    id: 'new-caledonia',
    slug: 'new-caledonia',
    name: { it: 'Nuova Caledonia', en: 'New Caledonia' },
    tagline: {
      it: 'Un angolo di Francia nel Pacifico',
      en: 'A corner of France in the Pacific',
    },
    description: {
      it: 'La laguna della Nuova Caledonia è patrimonio UNESCO ed è considerata la più bella del mondo. Noumea, la Côte Oubliée e l\'incantevole Île des Pins offrono un mix unico di cultura francese e natura tropicale.',
      en: 'New Caledonia\'s lagoon is a UNESCO World Heritage Site and considered the most beautiful in the world. Noumea, the Forgotten Coast and the enchanting Île des Pins offer a unique blend of French culture and tropical nature.',
    },
    gradient: 'from-blue-900 via-cyan-800 to-teal-700',
    accentColor: '#0e7490',
    photo: '/images/dest-card-caledonia.png',
    heroPhoto: '/images/dest-hero-caledonia.png',
    highlights: {
      it: ['Laguna UNESCO', 'Île des Pins', 'Noumea', 'Côte Oubliée'],
      en: ['UNESCO Lagoon', 'Île des Pins', 'Noumea', 'Forgotten Coast'],
    },
  },
];
