export interface Itinerary {
  id: string;
  slug: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  duration: number;
  destination: string;
  type: string;
  gradient: string;
  image: string;
  price: { currency: string; amount: number };
  highlights: { it: string[]; en: string[] };
}

export const itineraries: Itinerary[] = [
  {
    id: 'east-coast-classic',
    slug: 'east-coast-classic',
    title: {
      it: 'East Coast Classic',
      en: 'East Coast Classic',
    },
    description: {
      it: 'Un viaggio indimenticabile lungo la costa orientale australiana: da Sydney a Cairns, passando per Fraser Island, le Whitsundays e il Grande Reef.',
      en: 'An unforgettable journey along the Australian East Coast: from Sydney to Cairns, via Fraser Island, the Whitsundays and the Great Reef.',
    },
    duration: 14,
    destination: 'Australia',
    type: 'adventure',
    gradient: 'from-amber-800 to-orange-900',
    image: '/images/itin-east-coast.jpg',
    price: { currency: 'EUR', amount: 3200 },
    highlights: {
      it: ['Sydney Opera House', 'Great Barrier Reef', 'Whitsundays', 'Fraser Island'],
      en: ['Sydney Opera House', 'Great Barrier Reef', 'Whitsundays', 'Fraser Island'],
    },
  },
  {
    id: 'new-zealand-explorer',
    slug: 'new-zealand-explorer',
    title: {
      it: 'New Zealand Explorer',
      en: 'New Zealand Explorer',
    },
    description: {
      it: 'Scopri il meglio della Nuova Zelanda: Auckland, Rotorua, i ghiacciai, Queenstown e il maestoso Milford Sound.',
      en: 'Discover the best of New Zealand: Auckland, Rotorua, the glaciers, Queenstown and the majestic Milford Sound.',
    },
    duration: 12,
    destination: 'New Zealand',
    type: 'adventure',
    gradient: 'from-emerald-800 to-teal-900',
    image: '/images/hero-nz.jpg',
    price: { currency: 'EUR', amount: 2900 },
    highlights: {
      it: ['Milford Sound', 'Queenstown', 'Franz Josef Glacier', 'Rotorua'],
      en: ['Milford Sound', 'Queenstown', 'Franz Josef Glacier', 'Rotorua'],
    },
  },
  {
    id: 'pacific-paradise',
    slug: 'pacific-paradise',
    title: {
      it: 'Pacific Paradise',
      en: 'Pacific Paradise',
    },
    description: {
      it: 'Fiji e Bora Bora in un unico viaggio: lagune cristalline, bungalow sull\'acqua, snorkeling e tramonti da sogno.',
      en: 'Fiji and Bora Bora in one journey: crystal lagoons, overwater bungalows, snorkeling and dream sunsets.',
    },
    duration: 10,
    destination: 'Pacific',
    type: 'luxury',
    gradient: 'from-cyan-800 to-blue-900',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=70&auto=format',
    price: { currency: 'EUR', amount: 4500 },
    highlights: {
      it: ['Mamanuca Islands', 'Bora Bora Lagoon', 'Bungalow sull\'acqua', 'Snorkeling & Diving'],
      en: ['Mamanuca Islands', 'Bora Bora Lagoon', 'Overwater Bungalow', 'Snorkeling & Diving'],
    },
  },
  {
    id: 'uluru-red-centre',
    slug: 'uluru-red-centre',
    title: {
      it: 'Uluru & Red Centre',
      en: 'Uluru & Red Centre',
    },
    description: {
      it: 'Un\'esperienza spirituale nel cuore rosso dell\'Australia: Uluru, Kata Tjuta, il Kings Canyon e i cieli stellati dell\'outback.',
      en: 'A spiritual experience in the red heart of Australia: Uluru, Kata Tjuta, Kings Canyon and the starry skies of the outback.',
    },
    duration: 7,
    destination: 'Australia',
    type: 'adventure',
    gradient: 'from-red-900 to-amber-900',
    image: '/images/itin-western.jpg',
    price: { currency: 'EUR', amount: 1800 },
    highlights: {
      it: ['Uluru al tramonto', 'Kata Tjuta', 'Kings Canyon', 'Stargazing nell\'outback'],
      en: ['Uluru at Sunset', 'Kata Tjuta', 'Kings Canyon', 'Outback Stargazing'],
    },
  },
];

export const travelTypes = [
  { id: 'honeymoon', icon: 'Heart', labelKey: 'honeymoon' },
  { id: 'luxury', icon: 'Gem', labelKey: 'luxury' },
  { id: 'family', icon: 'Users', labelKey: 'family' },
  { id: 'adventure', icon: 'Mountain', labelKey: 'adventure' },
  { id: 'selfDrive', icon: 'Car', labelKey: 'selfDrive' },
  { id: 'group', icon: 'Globe', labelKey: 'group' },
  { id: 'backpacking', icon: 'Backpack', labelKey: 'backpacking' },
] as const;
