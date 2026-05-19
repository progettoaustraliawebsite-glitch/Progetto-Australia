export interface TeamMember {
  id: string;
  name: string;
  role: { it: string; en: string };
  bio: { it: string; en: string };
  photo: string;
  email: string;
  logos: { src: string; alt: string }[];
}

export const team: TeamMember[] = [
  {
    id: 'paola-secoli',
    name: 'Paola Secoli',
    role: { it: 'Fondatrice & Titolare', en: 'Founder & Owner' },
    bio: {
      it: `Laureata in Scienze Politiche, originaria di Milano, ha sempre avuto la passione per i viaggi ed ha frequentato diversi corsi di lingue all'estero. Tra le varie esperienze lavorative ha lavorato anche con Alpitours, Going, Studio 7A, Boscolo Tours e altri. È la fondatrice e titolare di Progetto Australia. Dal 2006 vive a Brisbane e si occupa dell'organizzazione di viaggi su misura in Australia, Nuova Zelanda e Isole del Pacifico. Il suo scopo è selezionare i migliori tour operators locali per realizzare viaggi che regalino grandi emozioni.`,
      en: `A Political Science graduate originally from Milan, she has always had a passion for travel. She is the founder and owner of Progetto Australia. Since 2006 she has lived in Brisbane and organises tailor-made trips to Australia, New Zealand and the Pacific Islands. Her goal is to select the best local tour operators to create trips that give unforgettable emotions.`,
    },
    photo: '/images/team/paola-secoli.jpg',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.png', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.png', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.png', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.png', alt: 'Cook Islands Specialist' },
    ],
  },
  {
    id: 'sara-trezzi',
    name: 'Sara Trezzi',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `Originaria di Milano, la sua più grande passione è sempre stata viaggiare. Ha visitato l'Asia, gli Stati Uniti, parte dell'Africa, gran parte dell'Europa e dell'America Latina. Laureata in Lingue e Letterature Straniere, ha vissuto e viaggiato per tutta l'Australia per 2 anni e poi si è dedicata alla Nuova Zelanda. L'amore per queste terre si è trasformato in un'opportunità lavorativa: ha iniziato a collaborare con Progetto Australia ampliando le sue conoscenze anche sulle isole del Pacifico.`,
      en: `Originally from Milan, her greatest passion has always been travel. She has visited Asia, the US, parts of Africa, most of Europe and Latin America. A Languages graduate, she lived and travelled all over Australia for 2 years, then dedicated herself to New Zealand. Her love for these lands turned into a career: she started working with Progetto Australia, expanding her knowledge to include the Pacific Islands.`,
    },
    photo: '/images/team/sara-trezzi.jpg',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.png', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.png', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.png', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.png', alt: 'Cook Islands Specialist' },
      { src: '/images/logos/west-aussie-specialist.png', alt: 'Western Australia Specialist' },
    ],
  },
  {
    id: 'lucia-bonizzato',
    name: 'Lucia Bonizzato',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `G'day! Sono originaria di Verona, ma fin da piccola i miei genitori mi hanno trasmesso la passione per i viaggi. A 18 anni mi sono trasferita in Australia… per "soli" 9 mesi. Oltre 10 anni, tanti visti, avventure e risate dopo, continuo a chiamare l'Australia casa. Lavoro nel turismo dal 2013 e ho avuto la fortuna di viaggiare in oltre 80 Paesi. La mia zona preferita del mondo? Le isole del Pacifico: natura selvaggia, spiagge incontaminate, mare cristallino e vulcani attivi. Per me ogni viaggio è una storia da vivere e raccontare.`,
      en: `G'day! I'm originally from Verona, but from a young age my parents passed on a passion for travel. At 18 I moved to Australia… for "just" 9 months. Over 10 years later, I still call Australia home. I've worked in tourism since 2013 and have been lucky enough to travel to over 80 countries. My favourite part of the world? The Pacific Islands: wild nature, pristine beaches, crystal-clear sea and active volcanoes.`,
    },
    photo: '/images/team/lucia-bonizzato.jpg',
    email: 'info@progettoaustralia.com',
    logos: [],
  },
  {
    id: 'daria-bove',
    name: 'Daria Bove',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `Originaria di Roma, Daria si considera una cittadina del mondo. Cresciuta con la valigia in mano, ha avuto fin da piccola l'opportunità di scoprire nuove culture e destinazioni. Vive in Australia da oltre 20 anni, la sua seconda casa, dove si è specializzata nella creazione di itinerari su misura per esplorare Australia, Nuova Zelanda e le isole del Pacifico. Quando non sta pianificando avventure, la troverete a cavalcare le onde cristalline dell'Oceano o in viaggio con la famiglia.`,
      en: `Originally from Rome, Daria considers herself a citizen of the world. She has lived in Australia for over 20 years, her second home, where she specialised in creating tailor-made itineraries for Australia, New Zealand and the Pacific Islands. When she's not planning adventures, you'll find her riding the crystal-clear ocean waves or travelling with her family.`,
    },
    photo: '/images/team/daria-bove.jpg',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.png', alt: 'Australia Specialist' },
      { src: '/images/logos/fiji-specialist.png', alt: 'Fiji Specialist' },
      { src: '/images/logos/nz-advanced-specialist.jpg', alt: 'New Zealand Advanced Specialist' },
    ],
  },
  {
    id: 'graciela-salazar',
    name: 'Graciela Salazar',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `Nata in Uruguay, madre di tre figli e guida turistica. Ha attraversato il Sud America con i suoi genitori, esplorato l'Europa e si è poi trasferita in Italia, ottenendo la cittadinanza. La passione per i viaggi l'ha portata a visitare oltre 35 Paesi. Si è specializzata ottenendo le Certificazioni per: Australia, Nuova Zelanda, Isole Cook, Figi, Samoa e Polinesia. Ora lavora come guida di gruppo, tour leader e consulente di viaggio.`,
      en: `Born in Uruguay, mother of three and a tour guide. She has travelled through South America, explored Europe and moved to Italy where she obtained citizenship. Her passion for travel has taken her to over 35 countries. She holds specialist certifications for Australia, New Zealand, Cook Islands, Fiji, Samoa and Polynesia. She now works as a group guide, tour leader and travel consultant.`,
    },
    photo: '/images/team/graciela-salazar.jpg',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.png', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.png', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.png', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.png', alt: 'Cook Islands Specialist' },
    ],
  },
];
