export interface Destination {
  id: string;
  slug: string;
  name: { it: string; en: string };
  tagline: { it: string; en: string };
  description: { it: string; en: string };
  gradient: string;
  accentColor: string;
  photo: string;
  photoFit?: 'cover' | 'contain';
  heroPhoto?: string;
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
      it: 'Dalle spiagge tropicali del Queensland agli spazi immensi dell\'Outback, l\'Australia è un viaggio che cambia continuamente paesaggi, ritmi ed emozioni. Un paese da vivere con il tempo giusto, attraverso itinerari costruiti su misura e pensati nei minimi dettagli.',
      en: 'From Queensland\'s tropical beaches to the vast spaces of the Outback, Australia is a journey of ever-changing landscapes, rhythms and emotions. A country to experience at the right pace, through tailor-made itineraries planned to the finest detail.',
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
      it: 'Fiordi, vulcani, ghiacciai, oceani e montagne che cambiano continuamente il paesaggio lungo la strada. La Nuova Zelanda è uno di quei viaggi che danno la sensazione di trovarsi lontanissimi da tutto, immersi in una natura ancora autentica e sorprendentemente accessibile.',
      en: 'Fjords, volcanoes, glaciers, oceans and mountains that continuously change the landscape along the road. New Zealand is one of those journeys that give the feeling of being far away from everything, immersed in a nature that is still authentic and surprisingly accessible.',
    },
    gradient: 'from-emerald-900 via-teal-800 to-slate-700',
    accentColor: '#2d6a4f',
    photo: '/images/dest-card-nz-v2.png',
    photoFit: 'contain',
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
      it: 'Lagune trasparenti, isole tropicali circondate dalla barriera corallina e un ritmo di vita che sembra rallentare tutto. Le Fiji sono uno di quei luoghi in cui il mare, la natura e l\'accoglienza delle persone diventano parte stessa del viaggio.',
      en: 'Crystal-clear lagoons, tropical islands surrounded by coral reef and a pace of life that seems to slow everything down. Fiji is one of those places where the sea, nature and the warmth of the people become part of the journey itself.',
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
      it: 'Le Isole Cook sono uno degli angoli più autentici del Pacifico. Lagune spettacolari, piccole isole circondate dall\'oceano e una cultura polinesiana ancora profondamente presente creano un\'atmosfera rilassata e genuina, lontana dalle destinazioni tropicali più costruite.',
      en: 'The Cook Islands are one of the most authentic corners of the Pacific. Spectacular lagoons, small islands surrounded by ocean and a Polynesian culture still deeply alive create a relaxed, genuine atmosphere, far from the more built-up tropical destinations.',
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
      it: 'Villaggi tradizionali, natura tropicale e una cultura polinesiana ancora profondamente presente nella vita quotidiana. Le Samoa sono una delle destinazioni più autentiche del Pacifico, dove il tempo segue ancora i ritmi della comunità, dell\'oceano e della natura.',
      en: 'Traditional villages, tropical nature and a Polynesian culture still deeply present in everyday life. Samoa is one of the most authentic destinations in the Pacific, where time still follows the rhythms of community, ocean and nature.',
    },
    gradient: 'from-green-900 via-teal-800 to-emerald-700',
    accentColor: '#065f46',
    photo: '/images/dest-card-samoa.png',
    heroPhoto: '/images/dest-hero-samoa-v2.png',
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
      it: 'Il sogno del Pacifico',
      en: 'The dream of the Pacific',
    },
    description: {
      it: 'Lagune dai colori irreali, montagne vulcaniche che emergono dall\'oceano e piccoli atolli dove il tempo sembra rallentare davvero. La Polinesia Francese è molto più di un viaggio tropicale: è un\'esperienza fatta di luce, silenzio, mare e atmosfera.',
      en: 'Lagoons of unreal colours, volcanic mountains rising from the ocean and small atolls where time seems to truly slow down. French Polynesia is much more than a tropical trip: it is an experience made of light, silence, sea and atmosphere.',
    },
    gradient: 'from-sky-900 via-blue-800 to-cyan-700',
    accentColor: '#0369a1',
    photo: '/images/dest-card-polynesia.png',
    heroPhoto: '/images/dest-hero-polynesia-v2.png',
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
      it: 'Lagune immense, isole tropicali e un\'atmosfera che unisce cultura francese e tradizioni melanesiane. La Nuova Caledonia è una delle destinazioni più particolari del Pacifico, ancora poco conosciuta ma capace di sorprendere per la varietà dei paesaggi e l\'eleganza rilassata che si respira ovunque.',
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
