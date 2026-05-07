export interface Destination {
  id: string;
  slug: string;
  name: { it: string; en: string };
  tagline: { it: string; en: string };
  description: { it: string; en: string };
  gradient: string;
  accentColor: string;
  photo: string;
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
    photo: '/images/dest-australia.png',
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
    photo: '/images/dest-nz.jpg',
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
    photo: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1400&q=85',
    highlights: {
      it: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Giardino di Fiji', 'Snorkeling & Diving'],
      en: ['Mamanuca Islands', 'Yasawa Islands', 'Taveuni – Garden of Fiji', 'Snorkeling & Diving'],
    },
  },
  {
    id: 'french-polynesia',
    slug: 'french-polynesia',
    name: { it: 'Polinesia Francese', en: 'French Polynesia' },
    tagline: {
      it: 'Il paradiso in terra',
      en: 'Paradise on earth',
    },
    description: {
      it: 'Bora Bora, Moorea, Tahiti: nomi che evocano lagune turchesi, bungalow sull\'acqua e tramonti indimenticabili. La Polinesia Francese è la quintessenza del lusso tropicale.',
      en: 'Bora Bora, Moorea, Tahiti: names that evoke turquoise lagoons, overwater bungalows and unforgettable sunsets. French Polynesia is the quintessence of tropical luxury.',
    },
    gradient: 'from-blue-900 via-indigo-800 to-cyan-700',
    accentColor: '#1a3a5c',
    photo: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=1400&q=85',
    highlights: {
      it: ['Bora Bora & Laguna', 'Moorea', 'Tahiti – Papeete', 'Bungalow sull\'acqua'],
      en: ['Bora Bora & Lagoon', 'Moorea', 'Tahiti – Papeete', 'Overwater Bungalows'],
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
    photo: 'https://images.unsplash.com/photo-1552250575-e508473b090f?w=1400&q=85',
    highlights: {
      it: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Cultura Maori Polinesiana'],
      en: ['Rarotonga', 'Aitutaki Lagoon', 'Snorkeling & Kayak', 'Polynesian Maori Culture'],
    },
  },
  {
    id: 'vanuatu',
    slug: 'vanuatu',
    name: { it: 'Vanuatu', en: 'Vanuatu' },
    tagline: {
      it: 'Avventura autentica',
      en: 'Authentic adventure',
    },
    description: {
      it: 'Un arcipelago di 80 isole vulcaniche dove l\'avventura è di casa. Dal vulcano Yasur che erutta spettacolari fontane di lava, alle acque turchesi della laguna di Port Vila.',
      en: 'An archipelago of 80 volcanic islands where adventure is at home. From the erupting Yasur volcano with spectacular lava fountains, to the turquoise waters of Port Vila lagoon.',
    },
    gradient: 'from-green-900 via-lime-800 to-emerald-700',
    accentColor: '#2d5a1b',
    photo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1400&q=85',
    highlights: {
      it: ['Vulcano Yasur', 'Blue Lagoon', 'Port Vila', 'Isola Efate'],
      en: ['Yasur Volcano', 'Blue Lagoon', 'Port Vila', 'Efate Island'],
    },
  },
  {
    id: 'hawaii',
    slug: 'hawaii',
    name: { it: 'Hawaii', en: 'Hawaii' },
    tagline: {
      it: 'L\'anima del Pacifico',
      en: 'The soul of the Pacific',
    },
    description: {
      it: 'Dall\'energia vulcanica della Big Island alle onde leggendarie di Oahu, dalle spiagge di sabbia nera alle valli lussureggianti di Kauai. Le Hawaii sono un caleidoscopio di esperienze uniche.',
      en: 'From the volcanic energy of the Big Island to the legendary waves of Oahu, from black sand beaches to the lush valleys of Kauai. Hawaii is a kaleidoscope of unique experiences.',
    },
    gradient: 'from-orange-900 via-red-800 to-amber-700',
    accentColor: '#8b2500',
    photo: 'https://images.unsplash.com/photo-1542048917-90f3de90dd0d?w=1400&q=85',
    highlights: {
      it: ['Big Island & Vulcani', 'Maui', 'Oahu & Honolulu', 'Kauai – Na Pali Coast'],
      en: ['Big Island & Volcanoes', 'Maui', 'Oahu & Honolulu', 'Kauai – Na Pali Coast'],
    },
  },
];
