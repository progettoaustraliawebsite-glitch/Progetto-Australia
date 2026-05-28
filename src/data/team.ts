export interface TeamMember {
  id: string;
  name: string;
  role: { it: string; en: string };
  bio: { it: string; en: string };
  photo: string;
  photoPosition?: string;
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
    photo: '/images/team/paola-secoli.webp',
    photoPosition: '50% 35%',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.webp', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.webp', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.webp', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.webp', alt: 'Cook Islands Specialist' },
    ],
  },
  {
    id: 'sara-trezzi',
    name: 'Sara Trezzi',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `Viaggiare è sempre stato il filo conduttore della mia vita. Nel corso degli anni ho esplorato Asia, Stati Uniti, Africa, America Latina ed Europa, ma è stato l'incontro con l'Australia a cambiarmi davvero il modo di vedere il viaggio. Dopo aver vissuto e viaggiato per anni in Australia e Nuova Zelanda, ho deciso di trasformare questa esperienza in una professione. Dal 2016 mi occupo della creazione di itinerari su misura in Australia, Nuova Zelanda e isole del Pacifico. Grazie all'esperienza diretta sul territorio, accompagno ogni viaggiatore nella costruzione di un itinerario studiato nei dettagli, perché ogni viaggio deve essere molto più di una semplice vacanza: deve avere il ritmo giusto, equilibrio perfetto e deve far vivere davvero ciò che si è sempre immaginato.`,
      en: `Travel has always been the common thread of my life. Over the years I have explored Asia, the US, Africa, Latin America and Europe, but it was my encounter with Australia that truly changed the way I see travel. After living and travelling across Australia and New Zealand for years, I decided to turn that experience into a profession. Since 2016 I have been creating tailor-made itineraries for Australia, New Zealand and the Pacific Islands. Drawing on first-hand knowledge of the territory, I help every traveller build a trip planned down to the last detail — because every journey should be far more than a holiday: it should have the right rhythm, perfect balance, and make you truly live what you have always imagined.`,
    },
    photo: '/images/team/sara-trezzi.webp',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.webp', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.webp', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.webp', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.webp', alt: 'Cook Islands Specialist' },
      { src: '/images/logos/west-aussie-specialist.webp', alt: 'Western Australia Specialist' },
    ],
  },
  {
    id: 'daria-bove',
    name: 'Daria Bove',
    role: { it: 'Consulente di Viaggio', en: 'Travel Consultant' },
    bio: {
      it: `Originaria di Roma, Daria si considera una cittadina del mondo. Cresciuta con la valigia in mano, ha avuto fin da piccola l'opportunità di scoprire nuove culture e destinazioni. Vive in Australia da oltre 20 anni, la sua seconda casa, dove si è specializzata nella creazione di itinerari su misura per esplorare Australia, Nuova Zelanda e le isole del Pacifico. Quando non sta pianificando avventure, la troverete a cavalcare le onde cristalline dell'Oceano o in viaggio con la famiglia.`,
      en: `Originally from Rome, Daria considers herself a citizen of the world. She has lived in Australia for over 20 years, her second home, where she specialised in creating tailor-made itineraries for Australia, New Zealand and the Pacific Islands. When she's not planning adventures, you'll find her riding the crystal-clear ocean waves or travelling with her family.`,
    },
    photo: '/images/team/daria-bove.webp',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.webp', alt: 'Australia Specialist' },
      { src: '/images/logos/fiji-specialist.webp', alt: 'Fiji Specialist' },
      { src: '/images/logos/nz-advanced-specialist.webp', alt: 'New Zealand Advanced Specialist' },
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
    photo: '/images/team/graciela-salazar.webp',
    photoPosition: '50% 35%',
    email: 'info@progettoaustralia.com',
    logos: [
      { src: '/images/logos/aussie-specialist.webp', alt: 'Australia Specialist' },
      { src: '/images/logos/nz-specialist.webp', alt: 'New Zealand Specialist' },
      { src: '/images/logos/fiji-specialist.webp', alt: 'Fiji Specialist' },
      { src: '/images/logos/cook-specialist.webp', alt: 'Cook Islands Specialist' },
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
    photo: '/images/team/lucia-bonizzato.webp',
    email: 'info@progettoaustralia.com',
    logos: [],
  },
  {
    id: 'antonio-tucci',
    name: 'Antonio Elia Tucci',
    role: { it: 'Assistenza in loco', en: 'On-site Assistance' },
    bio: {
      it: `Napoletano di nascita, originario di Castellammare di Stabia. Da sempre appassionato di viaggi, nuove culture ed esperienze all'estero, ha avuto la possibilità di visitare diversi Paesi e vivere realtà molto diverse tra loro. Dopo 4 anni trascorsi a Londra, vive in Australia da oltre 6 anni, dove ha costruito la sua vita personale e professionale. Ha maturato esperienza in diversi settori: dalla gestione alberghiera come General Manager, alla ristorazione, avendo avuto un suo ristorante, fino al mondo dell'import-export. Ama cucinare, viaggiare e conoscere persone da ogni parte del mondo. È anche papà di un bambino australiano di 5 anni. All'interno del team si occupa di supportare i viaggiatori nella scelta di pacchetti completi e assistenze personalizzate in loco.`,
      en: `Born in Naples, from Castellammare di Stabia. Always passionate about travel, new cultures and international experiences, he has visited many countries and lived in very different environments. After 4 years in London, he has been living in Australia for over 6 years, where he has built both his personal and professional life. He has gained experience across several sectors: hotel management as General Manager, the restaurant industry (with his own restaurant), and import-export. He loves cooking, travelling and meeting people from all over the world. He is also the proud father of a 5-year-old Australian boy. Within the team he supports travellers in choosing complete packages and personalised on-site assistance.`,
    },
    photo: '/images/team/antonio.webp',
    email: 'info@progettoaustralia.com',
    logos: [],
  },
  {
    id: 'norma',
    name: 'Norma Porceddu',
    role: { it: 'Assistenza in loco', en: 'On-site Assistance' },
    bio: {
      it: `Sarda di nascita, cittadina del mondo per scelta. Fin da piccola appassionata di lingue e culture straniere, poco più che ventenne lascia la Sardegna per un percorso internazionale che la porta a vivere in Germania e Spagna, prima di fare il grande salto verso le Americhe. Dopo una breve esperienza negli Stati Uniti, si innamora del Messico, dove avvia diversi business nel turismo e si laurea in Psicologia. Quando diventa mamma, sceglie l'Australia per crescere i suoi bambini in libertà e sicurezza. Da oltre 12 anni vive sulla East Coast australiana. Attraverso Progetto Australia mette a disposizione la sua esperienza internazionale e la profonda conoscenza del territorio per assistere i clienti direttamente in Australia, aiutandoli a vivere una vacanza serena, autentica e senza pensieri.`,
      en: `Born in Sardinia, a citizen of the world by choice. From a young age passionate about languages and foreign cultures, she left Sardinia in her early twenties for an international journey that took her through Germany and Spain before the big leap to the Americas. After a brief experience in the United States, she fell in love with Mexico, where she launched several tourism businesses and completed a degree in Psychology. When she became a mother, she chose Australia for its freedom and safety. She has lived on the Australian East Coast for over 12 years. Through Progetto Australia she brings her international experience and deep knowledge of the territory to assist clients directly in Australia.`,
    },
    photo: '/images/team/norma.webp',
    photoPosition: '50% 15%',
    email: 'info@progettoaustralia.com',
    logos: [],
  },
];
