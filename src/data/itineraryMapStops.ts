export type Transport = 'plane' | 'car' | 'boat';

export interface MapStop {
  name: string;
  coords: [number, number]; // [longitude, latitude]
  transport?: Transport; // from this stop to the next
}

export interface MapConfig {
  stops: MapStop[];
  // Mercator projection params
  center: [number, number];
  scale: number;
  width: number;
  height: number;
}

export const ITINERARY_MAP_CONFIGS: Record<string, MapConfig> = {

  'australia-self-drive': {
    center: [133, -28], scale: 480, width: 800, height: 600,
    stops: [
      { name: 'Perth', coords: [115.86, -31.95], transport: 'car' },
      { name: 'Rottnest Is.', coords: [115.52, -32.00], transport: 'car' },
      { name: 'Pinnacles', coords: [115.15, -30.60], transport: 'plane' },
      { name: 'Adelaide', coords: [138.60, -34.93], transport: 'boat' },
      { name: 'Kangaroo Is.', coords: [137.25, -35.80], transport: 'plane' },
      { name: 'Sydney', coords: [151.21, -33.87], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92] },
    ],
  },

  'magica-australia': {
    center: [135, -28], scale: 460, width: 800, height: 600,
    stops: [
      { name: 'Melbourne', coords: [144.96, -37.81], transport: 'car' },
      { name: 'Great Ocean Rd', coords: [143.50, -38.70], transport: 'plane' },
      { name: 'Adelaide', coords: [138.60, -34.93], transport: 'boat' },
      { name: 'Kangaroo Is.', coords: [137.25, -35.80], transport: 'plane' },
      { name: 'Darwin', coords: [130.84, -12.46], transport: 'car' },
      { name: 'Kakadu', coords: [132.50, -13.00], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92], transport: 'car' },
      { name: 'Cape Tribulation', coords: [145.47, -16.10], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Sydney', coords: [151.21, -33.87] },
    ],
  },

  'australia-on-the-road-isole-cook': {
    center: [158, -25], scale: 260, width: 900, height: 600,
    stops: [
      { name: 'Melbourne', coords: [144.96, -37.81], transport: 'car' },
      { name: 'Great Ocean Rd', coords: [143.50, -38.70], transport: 'plane' },
      { name: 'Sydney', coords: [151.21, -33.87], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92], transport: 'plane' },
      { name: 'Rarotonga', coords: [-159.77, -21.23], transport: 'boat' },
      { name: 'Aitutaki', coords: [-159.79, -18.87] },
    ],
  },

  'fiji-self-drive': {
    center: [178, -17.5], scale: 3000, width: 800, height: 550,
    stops: [
      { name: 'Nadi / Viti Levu', coords: [177.44, -17.78], transport: 'car' },
      { name: 'Coral Coast', coords: [177.90, -18.10], transport: 'plane' },
      { name: 'Taveuni', coords: [179.98, -16.83], transport: 'plane' },
      { name: 'Mamanuca Is.', coords: [177.10, -17.65], transport: 'car' },
      { name: 'Nadi', coords: [177.44, -17.78] },
    ],
  },

  'nuova-zelanda-nuova-caledonia': {
    center: [170, -36], scale: 550, width: 800, height: 650,
    stops: [
      { name: 'Auckland', coords: [174.76, -36.86], transport: 'car' },
      { name: 'Waitomo', coords: [175.10, -38.26], transport: 'car' },
      { name: 'Rotorua', coords: [176.25, -38.14], transport: 'car' },
      { name: 'Wellington', coords: [174.78, -41.29], transport: 'plane' },
      { name: 'Christchurch', coords: [172.63, -43.53], transport: 'car' },
      { name: 'Franz Josef', coords: [170.18, -43.38], transport: 'car' },
      { name: 'Queenstown', coords: [168.66, -45.03], transport: 'car' },
      { name: 'Milford Sound', coords: [167.93, -44.67], transport: 'plane' },
      { name: 'Noumea', coords: [166.45, -22.27], transport: 'boat' },
      { name: 'Île des Pins', coords: [167.47, -22.65] },
    ],
  },

  'australia-deluxe-isole-cook': {
    center: [155, -25], scale: 260, width: 900, height: 600,
    stops: [
      { name: 'Sydney', coords: [151.21, -33.87], transport: 'car' },
      { name: 'Blue Mountains', coords: [150.31, -33.71], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Darwin', coords: [130.84, -12.46], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92], transport: 'plane' },
      { name: 'Rarotonga', coords: [-159.77, -21.23], transport: 'boat' },
      { name: 'Aitutaki', coords: [-159.79, -18.87] },
    ],
  },

  'australia-rossa-selvaggia': {
    center: [133, -26], scale: 430, width: 800, height: 620,
    stops: [
      { name: 'Perth', coords: [115.86, -31.95], transport: 'car' },
      { name: 'Pinnacles', coords: [115.15, -30.60], transport: 'car' },
      { name: 'Monkey Mia', coords: [113.72, -25.99], transport: 'car' },
      { name: 'Coral Bay', coords: [113.77, -23.14], transport: 'car' },
      { name: 'Exmouth', coords: [114.12, -21.93], transport: 'car' },
      { name: 'Broome', coords: [122.23, -17.96], transport: 'plane' },
      { name: 'Darwin', coords: [130.84, -12.46], transport: 'car' },
      { name: 'Kakadu', coords: [132.50, -13.00], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92], transport: 'plane' },
      { name: 'Sydney', coords: [151.21, -33.87] },
    ],
  },

  'nuova-zelanda-isole-samoa': {
    center: [172, -32], scale: 400, width: 800, height: 650,
    stops: [
      { name: 'Auckland', coords: [174.76, -36.86], transport: 'car' },
      { name: 'Rotorua', coords: [176.25, -38.14], transport: 'plane' },
      { name: 'Christchurch', coords: [172.63, -43.53], transport: 'car' },
      { name: 'Queenstown', coords: [168.66, -45.03], transport: 'car' },
      { name: 'Milford Sound', coords: [167.93, -44.67], transport: 'plane' },
      { name: 'Apia, Samoa', coords: [-171.77, -13.83], transport: 'boat' },
      { name: "Savai'i", coords: [-172.63, -13.59] },
    ],
  },

  'australia-classica': {
    center: [135, -28], scale: 460, width: 800, height: 600,
    stops: [
      { name: 'Adelaide', coords: [138.60, -34.93], transport: 'boat' },
      { name: 'Kangaroo Is.', coords: [137.25, -35.80], transport: 'plane' },
      { name: 'Melbourne', coords: [144.96, -37.81], transport: 'car' },
      { name: 'Great Ocean Rd', coords: [143.50, -38.70], transport: 'plane' },
      { name: 'Sydney', coords: [151.21, -33.87], transport: 'plane' },
      { name: 'Uluru', coords: [131.03, -25.34], transport: 'plane' },
      { name: 'Darwin / Kakadu', coords: [130.84, -12.46], transport: 'plane' },
      { name: 'Cairns', coords: [145.77, -16.92] },
    ],
  },

  'grande-terre-nuova-caledonia': {
    center: [166.5, -21.5], scale: 3000, width: 800, height: 600,
    stops: [
      { name: 'Noumea', coords: [166.45, -22.27], transport: 'car' },
      { name: 'Côte Oubliée', coords: [165.80, -21.20], transport: 'boat' },
      { name: 'Île des Pins', coords: [167.47, -22.65], transport: 'boat' },
      { name: 'Noumea', coords: [166.45, -22.27] },
    ],
  },

  'nuova-zelanda-gruppo': {
    center: [172, -41], scale: 900, width: 800, height: 700,
    stops: [
      { name: 'Auckland', coords: [174.76, -36.86], transport: 'car' },
      { name: 'Rotorua', coords: [176.25, -38.14], transport: 'car' },
      { name: 'Napier', coords: [176.92, -39.49], transport: 'car' },
      { name: 'Wellington', coords: [174.78, -41.29], transport: 'plane' },
      { name: 'Kaikōura', coords: [173.68, -42.40], transport: 'car' },
      { name: 'Christchurch', coords: [172.63, -43.53], transport: 'car' },
      { name: 'Franz Josef', coords: [170.18, -43.38], transport: 'car' },
      { name: 'Queenstown', coords: [168.66, -45.03], transport: 'car' },
      { name: 'Milford Sound', coords: [167.93, -44.67] },
    ],
  },
};
