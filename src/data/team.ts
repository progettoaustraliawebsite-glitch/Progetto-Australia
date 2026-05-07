export interface TeamMember {
  id: string;
  name: string;
  role: { it: string; en: string };
  bio: { it: string; en: string };
  photo: string;
  specialization: string[];
}

export const team: TeamMember[] = [
  {
    id: 'marco',
    name: 'Marco Rossi',
    role: { it: 'Fondatore & Direttore', en: 'Founder & Director' },
    bio: { 
      it: `In Australia dal 2007, Marco ha esplorato ogni angolo dell'Oceania. La sua missione è far vivere ai viaggiatori l'anima autentica del Pacifico.`,
      en: `In Australia since 2007, Marco has explored every corner of Oceania. His mission is to make travelers experience the authentic soul of the Pacific.`
    },
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    specialization: ['Australia Specialist', 'Pacific Islands Expert']
  },
  {
    id: 'giulia',
    name: 'Giulia Bianchi',
    role: { it: 'Senior Travel Designer', en: 'Senior Travel Designer' },
    bio: {
      it: `Specialista in viaggi di nozze e itinerari di lusso. Giulia trasforma i sogni in realtà curando ogni minimo dettaglio con passione.`,
      en: `Specialist in honeymoons and luxury itineraries. Giulia turns dreams into reality by taking care of every detail with passion.`
    },
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    specialization: ['Honeymoon Specialist', 'Luxury Travel']
  },
  {
    id: 'luca',
    name: 'Luca Esposito',
    role: { it: 'Esperto Outdoor & Avventura', en: 'Outdoor & Adventure Expert' },
    bio: {
      it: `Amante del surf e del trekking, Luca conosce i sentieri meno battuti e i luoghi più selvaggi dell'Australia e della Nuova Zelanda.`,
      en: `Surf and trekking lover, Luca knows the less traveled paths and the wildest places in Australia and New Zealand.`
    },
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    specialization: ['Adventure Guide', 'New Zealand Specialist']
  }
];
