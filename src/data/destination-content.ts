export type MonthRating = 'best' | 'good' | 'avoid';

export interface MonthInfo {
  it: string;
  en: string;
  rating: MonthRating;
}

export interface DestinationContent {
  slug: string;
  mustSeeImage?: string;
  intro: { it: string; en: string };
  whenToGo: {
    months: MonthInfo[];
    description: { it: string; en: string };
  };
  mustSee: { title: { it: string; en: string }; description: { it: string; en: string }; image?: string }[];
  practical: {
    visa: { it: string; en: string };
    flights: { it: string; en: string };
    currency: { it: string; en: string };
    language: { it: string; en: string };
    timezone: { it: string; en: string };
  };
  experiences: { it: string; en: string }[];
}

const MONTHS_IT = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function months(ratings: MonthRating[]): MonthInfo[] {
  return ratings.map((rating, i) => ({ it: MONTHS_IT[i], en: MONTHS_EN[i], rating }));
}

export const destinationContent: DestinationContent[] = [
  {
    slug: 'australia',
    mustSeeImage: '/images/must-australia-reef.png',
    intro: {
      it: 'L\'Australia è un <strong>continente intero tutto per te</strong>. Che tu voglia esplorare la <strong>Grande Barriera Corallina</strong>, guidare nell\'<strong>Outback rosso fuoco</strong>, immergerti nella vita cosmopolita di <strong>Sydney</strong> o scoprire la foresta pluviale di <strong>Daintree</strong>, ogni angolo di questo paese nasconde un\'<strong>esperienza indimenticabile</strong>. I nostri <strong>esperti italiani in loco</strong> ti accompagnano in un <strong>viaggio su misura</strong>, pensato nei minimi dettagli.',
      en: 'Australia is an <strong>entire continent all for you</strong>. Whether you want to explore the <strong>Great Barrier Reef</strong>, drive through the <strong>fiery red Outback</strong>, dive into <strong>Sydney\'s cosmopolitan life</strong>, or discover the <strong>Daintree rainforest</strong>, every corner of this country hides an <strong>unforgettable experience</strong>. Our <strong>Italian experts on the ground</strong> guide you through a <strong>tailor-made journey</strong>, planned down to the finest details.',
    },
    whenToGo: {
      months: months(['good', 'good', 'best', 'best', 'best', 'good', 'avoid', 'avoid', 'good', 'best', 'best', 'good']),
      description: {
        it: 'Il periodo migliore per visitare l\'Australia è tra marzo e maggio (autunno australe) e settembre-novembre (primavera). L\'estate australiana (dic–feb) è caldissima nell\'entroterra. Il Nord Tropicale è meglio visitarlo in stagione secca (mag–ott).',
        en: 'The best time to visit Australia is March–May (southern autumn) and September–November (spring). The Australian summer (Dec–Feb) is extremely hot inland. The Tropical North is best visited in the dry season (May–Oct).',
      },
    },
    mustSee: [
      {
        title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' },
        description: { it: 'La più grande struttura vivente del pianeta, con oltre 2.900 reef e 900 isole. Snorkeling e diving da sogno accessibili da Cairns e Port Douglas.', en: 'The largest living structure on the planet, with over 2,900 reefs and 900 islands. Dream snorkeling and diving accessible from Cairns and Port Douglas.' },
        image: 'https://images.unsplash.com/photo-1587139223877-04bd6df79b79?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Uluru & Red Centre', en: 'Uluru & Red Centre' },
        description: { it: 'Il monolite sacro degli Anangu al tramonto è un\'esperienza spirituale senza pari. Il cuore rosso dell\'Australia, con i field di roccia di Kata Tjuta e il deserto infinito.', en: 'The sacred monolith of the Anangu at sunset is an unparalleled spiritual experience. The red heart of Australia, with the rock domes of Kata Tjuta and the endless desert.' },
        image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Sydney & Opera House', en: 'Sydney & Opera House' },
        description: { it: 'La Harbour Bridge, l\'Opera House, Bondi Beach e i mercati di Newtown: Sydney è una delle città più iconiche e vivibili al mondo.', en: 'The Harbour Bridge, Opera House, Bondi Beach and Newtown\'s markets: Sydney is one of the most iconic and liveable cities in the world.' },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Daintree Rainforest', en: 'Daintree Rainforest' },
        description: { it: 'La foresta pluviale più antica del mondo incontra il Coral Sea nel Queensland tropicale. Crociere sul fiume, coccodrilli, uccelli del paradiso e spiagge deserte.', en: 'The world\'s oldest rainforest meets the Coral Sea in tropical Queensland. River cruises, crocodiles, birds of paradise and deserted beaches.' },
        image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Great Ocean Road & Dodici Apostoli', en: 'Great Ocean Road & Twelve Apostles' },
        description: { it: 'Uno dei road trip più spettacolari al mondo: scogliere calcaree a picco sull\'oceano, foreste di eucalipti e i leggendari Dodici Apostoli tra le onde.', en: 'One of the world\'s most spectacular road trips: limestone cliffs plunging into the ocean, eucalyptus forests and the legendary Twelve Apostles amid the waves.' },
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80&auto=format',
      },
    ],
    practical: {
      visa: { it: 'ETA (Electronic Travel Authority) obbligatoria, richiedibile online in pochi minuti. Costo ca. 20 AUD.', en: 'ETA (Electronic Travel Authority) required, applicable online in minutes. Cost approx. 20 AUD.' },
      flights: { it: 'Voli diretti da Roma e Milano con scali (Singapore, Dubai, Hong Kong). Durata media 22–26 ore. Compagnie: Emirates, Singapore Airlines, Cathay Pacific, Qantas.', en: 'Flights from Italy with stopovers (Singapore, Dubai, Hong Kong). Average duration 22–26 hours. Airlines: Emirates, Singapore Airlines, Cathay Pacific, Qantas.' },
      currency: { it: 'Dollaro Australiano (AUD). Carte di credito accettate ovunque. ATM disponibili in ogni città.', en: 'Australian Dollar (AUD). Credit cards accepted everywhere. ATMs available in every city.' },
      language: { it: 'Inglese australiano. Nessuna barriera con l\'inglese standard.', en: 'Australian English. No barrier with standard English.' },
      timezone: { it: 'Australia ha 3 fusi orari: AEST (UTC+10), ACST (UTC+9:30), AWST (UTC+8). Jet lag significativo dall\'Italia (8–10 ore avanti).', en: 'Australia has 3 time zones: AEST (UTC+10), ACST (UTC+9:30), AWST (UTC+8). Significant jet lag from Europe (8–10 hours ahead).' },
    },
    experiences: [
      { it: 'Snorkeling alla Grande Barriera Corallina', en: 'Snorkeling at the Great Barrier Reef' },
      { it: 'Safari nel Kakadu National Park', en: 'Safari in Kakadu National Park' },
      { it: 'Road trip sulla Great Ocean Road', en: 'Road trip along the Great Ocean Road' },
      { it: 'Tramonto a Uluru', en: 'Sunset at Uluru' },
      { it: 'Surf a Bondi Beach', en: 'Surfing at Bondi Beach' },
      { it: 'Whale watching a Hervey Bay', en: 'Whale watching at Hervey Bay' },
    ],
  },
  {
    slug: 'new-zealand',
    mustSeeImage: '/images/must-nz-hobbiton.png',
    intro: {
      it: 'La Nuova Zelanda è il paese dove la <strong>natura regna sovrana</strong>. <strong>Fiordi</strong> che tagliano le montagne, <strong>vulcani ancora attivi</strong>, ghiacciai millenari e spiagge incontaminate: tutto in uno spazio sorprendentemente accessibile. È la destinazione perfetta per chi vuole <strong>avventura autentica</strong>, paesaggi mozzafiato e la gentilezza dei Kiwi. I nostri <strong>esperti italiani</strong> ti guidano in un <strong>itinerario su misura</strong> tra le due isole.',
      en: 'New Zealand is a country where <strong>nature reigns supreme</strong>. <strong>Fjords</strong> cutting through mountains, <strong>still-active volcanoes</strong>, ancient glaciers and pristine beaches: all in a surprisingly accessible space. The perfect destination for those seeking <strong>authentic adventure</strong>, breathtaking scenery and the genuine warmth of the Kiwi people. Our <strong>Italian experts</strong> guide you through a <strong>tailor-made itinerary</strong> across both islands.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'best', 'best', 'good', 'avoid', 'avoid', 'avoid', 'good', 'best', 'best', 'good']),
      description: {
        it: 'Il periodo migliore è l\'estate australe (dic–feb) per il caldo e le giornate lunghe, e la primavera (set–nov) per i paesaggi fioriti. L\'inverno (giu–ago) è freddo al sud ma ideale per lo sci a Queenstown.',
        en: 'The best period is the southern summer (Dec–Feb) for warmth and long days, and spring (Sep–Nov) for blooming landscapes. Winter (Jun–Aug) is cold in the south but ideal for skiing in Queenstown.',
      },
    },
    mustSee: [
      { title: { it: 'Fiordland & Milford Sound', en: 'Fiordland & Milford Sound' }, description: { it: 'Uno dei paesaggi più drammatici del pianeta: fiordi profondi, cascate e delfini.', en: 'One of the most dramatic landscapes on the planet: deep fjords, waterfalls and dolphins.' } },
      { title: { it: 'Rotorua & Geotermalismo', en: 'Rotorua & Geothermal' }, description: { it: 'Geyser, fango bollente e cultura Maori autentica nel cuore dell\'Isola del Nord.', en: 'Geysers, boiling mud and authentic Maori culture in the heart of the North Island.' } },
      { title: { it: 'Franz Josef Glacier', en: 'Franz Josef Glacier' }, description: { it: 'Uno dei pochi ghiacciai al mondo che scende fino alla foresta pluviale temperata.', en: 'One of the few glaciers in the world that descends to temperate rainforest level.' } },
      { title: { it: 'Hobbiton & Waikato', en: 'Hobbiton & Waikato' }, description: { it: 'Il set originale di Il Signore degli Anelli, immerso nelle colline verdi del Waikato.', en: 'The original Lord of the Rings film set, nestled in the green hills of Waikato.' } },
      { title: { it: 'Bay of Islands', en: 'Bay of Islands' }, description: { it: '144 isole, delfini, spiagge bianche e la storia del Trattato di Waitangi.', en: '144 islands, dolphins, white beaches and the history of the Treaty of Waitangi.' } },
    ],
    practical: {
      visa: { it: 'NZeTA (New Zealand Electronic Travel Authority) obbligatoria. Costo ca. 17 NZD + IVT 35 NZD.', en: 'NZeTA (New Zealand Electronic Travel Authority) required. Cost approx. 17 NZD + IVT 35 NZD.' },
      flights: { it: 'Voli con scalo (Singapore, Dubai, Hong Kong, Sydney). Durata 24–28 ore. Compagnie: Air New Zealand, Emirates, Singapore Airlines.', en: 'Flights with stopover (Singapore, Dubai, Hong Kong, Sydney). Duration 24–28 hours. Airlines: Air New Zealand, Emirates, Singapore Airlines.' },
      currency: { it: 'Dollaro Neozelandese (NZD). Carte di credito accettate ovunque.', en: 'New Zealand Dollar (NZD). Credit cards accepted everywhere.' },
      language: { it: 'Inglese e Maori (lingua ufficiale co-ufficiale).', en: 'English and Māori (official co-language).' },
      timezone: { it: 'UTC+12 (NZST), UTC+13 in estate. 11–13 ore avanti rispetto all\'Italia.', en: 'UTC+12 (NZST), UTC+13 in summer. 11–13 hours ahead of Italy.' },
    },
    experiences: [
      { it: 'Bungee jumping a Queenstown', en: 'Bungee jumping in Queenstown' },
      { it: 'Trekking Tongariro Alpine Crossing', en: 'Tongariro Alpine Crossing trek' },
      { it: 'Visita ai set de Il Signore degli Anelli', en: 'Lord of the Rings film set visits' },
      { it: 'Kayak nei fiordi di Milford Sound', en: 'Kayaking in Milford Sound fjords' },
      { it: 'Hangi – cena tradizionale Maori', en: 'Hangi – traditional Maori feast' },
      { it: 'Sci sulle Alpi del Sud', en: 'Skiing in the Southern Alps' },
    ],
  },
  {
    slug: 'fiji',
    mustSeeImage: '/images/must-fiji.png',
    intro: {
      it: 'Le Fiji sono il <strong>paradiso tropicale per eccellenza</strong> del Pacifico. <strong>333 isole</strong> sparse su un oceano color smeraldo, <strong>barriere coralline</strong> tra le più ricche al mondo, spiagge di sabbia bianca e la celebre <strong>ospitalità Fijiana</strong> — il "Bula!" con cui ogni abitante ti accoglie è sincero e contagioso. Perfette per la <strong>luna di miele</strong>, il relax assoluto o l\'<strong>avventura subacquea</strong>.',
      en: 'Fiji is the <strong>ultimate tropical paradise</strong> of the Pacific. <strong>333 islands</strong> scattered across an emerald ocean, <strong>coral reefs</strong> among the world\'s richest, white sandy beaches and the celebrated <strong>Fijian hospitality</strong> — the "Bula!" with which every local greets you is genuine and infectious. Perfect for <strong>honeymoons</strong>, total relaxation or <strong>underwater adventure</strong>.',
    },
    whenToGo: {
      months: months(['good', 'good', 'good', 'best', 'best', 'best', 'best', 'best', 'good', 'good', 'avoid', 'avoid']),
      description: {
        it: 'Il periodo migliore è la stagione secca (apr–ott): sole, temperature intorno ai 26°C e mare piatto. La stagione delle piogge (nov–mar) porta umidità e cicloni occasionali, ma i prezzi scendono e le isole si svuotano.',
        en: 'The best time is the dry season (Apr–Oct): sunshine, temperatures around 26°C and calm seas. The wet season (Nov–Mar) brings humidity and occasional cyclones, but prices drop and the islands are quieter.',
      },
    },
    mustSee: [
      { title: { it: 'Mamanuca Islands', en: 'Mamanuca Islands' }, description: { it: 'L\'arcipelago più iconico delle Fiji, con le spiagge più bianche e resort di lusso sull\'acqua.', en: 'Fiji\'s most iconic archipelago, with the whitest beaches and luxury overwater resorts.' } },
      { title: { it: 'Yasawa Islands', en: 'Yasawa Islands' }, description: { it: 'Isole remote e selvagge, raggiungibili in catamarano. Snorkeling con squali e razze manta.', en: 'Remote and wild islands, reachable by catamaran. Snorkeling with sharks and manta rays.' } },
      { title: { it: 'Taveuni – Giardino di Fiji', en: 'Taveuni – Garden of Fiji' }, description: { it: 'La terza isola più grande, coperta di giungla verde e cascate spettacolari. Il Rainbow Reef è tra i migliori siti di diving al mondo.', en: 'The third largest island, covered in green jungle and spectacular waterfalls. Rainbow Reef is among the world\'s best dive sites.' } },
      { title: { it: 'Viti Levu – Isola Principale', en: 'Viti Levu – Main Island' }, description: { it: 'La capitale Suva, la Coral Coast e il pittoresco villaggio di Navala, uno degli ultimi villaggi tradizionali Fijiani.', en: 'The capital Suva, the Coral Coast and the picturesque Navala village, one of the last traditional Fijian villages.' } },
      { title: { it: 'Snorkeling & Diving', en: 'Snorkeling & Diving' }, description: { it: 'Le acque delle Fiji ospitano oltre 1.500 specie di pesci e 400 specie di coralli. Un paradiso per i subacquei di tutti i livelli.', en: 'Fiji\'s waters host over 1,500 fish species and 400 coral species. A paradise for divers of all levels.' } },
    ],
    practical: {
      visa: { it: 'Nessun visto richiesto per soggiorni fino a 4 mesi. Basta passaporto valido.', en: 'No visa required for stays up to 4 months. Valid passport only.' },
      flights: { it: 'Voli con scalo (Sydney, Auckland, Singapore, Hong Kong). Durata 20–26 ore. Compagnie: Fiji Airways, Air Pacific, Qantas.', en: 'Flights with stopover (Sydney, Auckland, Singapore, Hong Kong). Duration 20–26 hours. Airlines: Fiji Airways, Air Pacific, Qantas.' },
      currency: { it: 'Dollaro Fijiano (FJD). Carte accettate nei resort; portare contanti per i villaggi.', en: 'Fijian Dollar (FJD). Cards accepted at resorts; bring cash for villages.' },
      language: { it: 'Inglese, Fijiano e Hindi Fijiano. Inglese parlato ovunque.', en: 'English, Fijian and Fijian Hindi. English spoken everywhere.' },
      timezone: { it: 'UTC+12. 11 ore avanti rispetto all\'Italia.', en: 'UTC+12. 11 hours ahead of Italy.' },
    },
    experiences: [
      { it: 'Diving al Rainbow Reef di Taveuni', en: 'Diving at Taveuni\'s Rainbow Reef' },
      { it: 'Cerimonia del Kava in un villaggio', en: 'Kava ceremony in a traditional village' },
      { it: 'Crociera in catamarano nelle Yasawa', en: 'Catamaran cruise in the Yasawas' },
      { it: 'Kayak tra le isole deserte', en: 'Kayaking between deserted islands' },
      { it: 'Nuoto con i squali toro', en: 'Swimming with bull sharks' },
      { it: 'Tramonto sulla laguna dal bungalow sull\'acqua', en: 'Sunset over the lagoon from overwater bungalow' },
    ],
  },
  {
    slug: 'cook-islands',
    mustSeeImage: '/images/must-cook-islands.png',
    intro: {
      it: 'Le Isole Cook sono il <strong>segreto meglio custodito del Pacifico</strong>: autentiche, accessibili ma ancora incontaminate. La <strong>laguna di Aitutaki</strong> è considerata da molti la più bella al mondo. <strong>Rarotonga</strong>, l\'isola principale, unisce natura lussureggiante, <strong>cultura Maori Polinesiana</strong> e un ritmo di vita che invita a fermarsi. Ideali per chi cerca qualcosa di <strong>genuino e autentico</strong>, lontano dalle folle.',
      en: 'The Cook Islands are the <strong>Pacific\'s best-kept secret</strong>: authentic, accessible yet still unspoiled. <strong>Aitutaki\'s lagoon</strong> is considered by many to be the most beautiful in the world. <strong>Rarotonga</strong>, the main island, combines lush nature, <strong>Polynesian Maori culture</strong> and a pace of life that invites you to pause. Ideal for those seeking something <strong>genuinely authentic</strong>, away from crowds.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'avoid', 'avoid']),
      description: {
        it: 'La stagione secca (apr–ott) è il momento ideale con temperature di 22–26°C e pochissima pioggia. La stagione umida (nov–mar) è più calda e piovosa, con possibilità di cicloni.',
        en: 'The dry season (Apr–Oct) is the ideal time with temperatures of 22–26°C and very little rain. The wet season (Nov–Mar) is warmer and rainier, with possible cyclones.',
      },
    },
    mustSee: [
      { title: { it: 'Laguna di Aitutaki', en: 'Aitutaki Lagoon' }, description: { it: 'Una laguna triangolare di acque turchesi talmente belle da sembrare artificiali. Gita in barca d\'obbligo verso i motu desertici.', en: 'A triangular lagoon of turquoise waters so beautiful they seem artificial. A boat trip to the deserted motu is a must.' } },
      { title: { it: 'Rarotonga', en: 'Rarotonga' }, description: { it: 'L\'isola principale: montagne verdi, laguna cristallina, mercato artigianale e la Cross-Island Track.', en: 'The main island: green mountains, crystal lagoon, craft market and the Cross-Island Track.' } },
      { title: { it: 'Snorkeling & Kayak', en: 'Snorkeling & Kayak' }, description: { it: 'Acque calde e cristalline, abbondanti di tartarughe, pesci tropicali e coralli. Perfette per principianti e famiglie.', en: 'Warm, crystal-clear waters, abundant with turtles, tropical fish and corals. Perfect for beginners and families.' } },
      { title: { it: 'Cultura Maori Polinesiana', en: 'Polynesian Maori Culture' }, description: { it: 'Danze tradizionali, artigianato locale, cerimonie e i colori esplosivi dei mercati del sabato mattina.', en: 'Traditional dances, local crafts, ceremonies and the explosive colours of Saturday morning markets.' } },
      { title: { it: 'Mangaia – Isola di Corallo', en: 'Mangaia – Coral Island' }, description: { it: 'La seconda isola più antica del mondo: grotte di corallo, taro farms e paesaggi lunari.', en: 'The second oldest island in the world: coral caves, taro farms and lunar landscapes.' } },
    ],
    practical: {
      visa: { it: 'Nessun visto richiesto per soggiorni fino a 31 giorni (prorogabili). Passaporto valido.', en: 'No visa required for stays up to 31 days (extendable). Valid passport required.' },
      flights: { it: 'Voli via Auckland (Air New Zealand) o Tahiti. Durata totale 26–30 ore. Non ci sono voli diretti dall\'Europa.', en: 'Flights via Auckland (Air New Zealand) or Tahiti. Total duration 26–30 hours. No direct flights from Europe.' },
      currency: { it: 'Dollaro delle Isole Cook (NZD accettato). Portare contanti: ATM solo a Rarotonga.', en: 'Cook Islands Dollar (NZD accepted). Bring cash: ATMs only in Rarotonga.' },
      language: { it: 'Inglese e Maori delle Isole Cook. Tutti parlano inglese.', en: 'English and Cook Islands Māori. Everyone speaks English.' },
      timezone: { it: 'UTC-10. 11 ore indietro rispetto all\'Italia.', en: 'UTC-10. 11 hours behind Italy.' },
    },
    experiences: [
      { it: 'Gita in barca nella laguna di Aitutaki', en: 'Boat trip in Aitutaki lagoon' },
      { it: 'Trekking Cross-Island Track a Rarotonga', en: 'Cross-Island Track trekking in Rarotonga' },
      { it: 'Snorkeling con le tartarughe', en: 'Snorkeling with turtles' },
      { it: 'Mercato del sabato a Avarua', en: 'Saturday market in Avarua' },
      { it: 'Kayak al tramonto', en: 'Sunset kayaking' },
      { it: 'Visita alle grotte di corallo di Mangaia', en: 'Visit to Mangaia\'s coral caves' },
    ],
  },
  {
    slug: 'samoa',
    mustSeeImage: '/images/must-samoa.png',
    intro: {
      it: 'Le Isole Samoa sono il <strong>cuore pulsante della cultura Polinesiana</strong>. Il <strong>Fa\'a Samoa</strong> — la via Samoana — è uno stile di vita fondato su famiglia, rispetto e spirito comunitario che si percepisce in ogni villaggio. La <strong>To Sua Ocean Trench</strong>, le cascate di Papase\'ea, l\'<strong>isola vulcanica di Savai\'i</strong> e le lagune di Upolu regalano paesaggi da sogno. Per chi vuole il <strong>Pacifico più autentico</strong>.',
      en: 'The Samoa Islands are the <strong>beating heart of Polynesian culture</strong>. The <strong>Fa\'a Samoa</strong> — the Samoan way — is a lifestyle founded on family, respect and community spirit felt in every village. The <strong>To Sua Ocean Trench</strong>, Papase\'ea waterfalls, the <strong>volcanic island of Savai\'i</strong> and Upolu\'s lagoons offer dreamlike scenery. For those who want the <strong>most authentic Pacific</strong>.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'avoid', 'avoid']),
      description: {
        it: 'La stagione secca (mag–ott) è ideale: temperature di 25–28°C e poca pioggia. La stagione delle piogge (nov–apr) porta acquazzoni tropicali e rischio cicloni, ma la vegetazione è lussureggiante.',
        en: 'The dry season (May–Oct) is ideal: temperatures of 25–28°C and little rain. The wet season (Nov–Apr) brings tropical showers and cyclone risk, but the vegetation is lush.',
      },
    },
    mustSee: [
      { title: { it: 'To Sua Ocean Trench', en: 'To Sua Ocean Trench' }, description: { it: 'Una delle piscine naturali più belle al mondo: una voragine di 30 metri riempita dall\'oceano, collegata al mare da grotte sottomarine.', en: 'One of the world\'s most beautiful natural pools: a 30-metre sinkhole filled by the ocean, connected to the sea through underwater caves.' } },
      { title: { it: 'Papase\'ea Sliding Rocks', en: 'Papase\'ea Sliding Rocks' }, description: { it: 'Le famose rocce scivolose di Samoa: cascate naturali su cui scivolare per tuffarsi nelle piscine sottostanti.', en: 'Samoa\'s famous sliding rocks: natural waterfalls you slide down to plunge into the pools below.' } },
      { title: { it: 'Savai\'i – Isola Vulcanica', en: 'Savai\'i – Volcanic Island' }, description: { it: 'La più grande isola Polinesiana: campi di lava, foreste primordiali, spiagge deserte e villaggi tradizionali immutati.', en: 'The largest Polynesian island: lava fields, primordial forests, deserted beaches and unchanged traditional villages.' } },
      { title: { it: 'Cerimonia del Kava', en: 'Kava Ceremony' }, description: { it: 'Essere accolti in un villaggio Samoano con la cerimonia del Kava è un\'esperienza autentica da non perdere.', en: 'Being welcomed into a Samoan village with the Kava ceremony is an authentic experience not to be missed.' } },
      { title: { it: 'Lalomanu Beach', en: 'Lalomanu Beach' }, description: { it: 'Considerata una delle spiagge più belle del Pacifico, con i tradizionali fale direttamente sulla sabbia bianca.', en: 'Considered one of the most beautiful beaches in the Pacific, with traditional fale huts directly on the white sand.' } },
    ],
    practical: {
      visa: { it: 'Nessun visto richiesto per i cittadini italiani fino a 60 giorni.', en: 'No visa required for Italian citizens for up to 60 days.' },
      flights: { it: 'Voli via Auckland o Sydney con Samoa Airways / Air New Zealand. Durata totale 25–30 ore.', en: 'Flights via Auckland or Sydney with Samoa Airways / Air New Zealand. Total duration 25–30 hours.' },
      currency: { it: 'Tālā Samoano (WST). Portare contanti per le aree rurali.', en: 'Samoan Tālā (WST). Bring cash for rural areas.' },
      language: { it: 'Samoano e Inglese. Inglese parlato in tutta l\'isola.', en: 'Samoan and English. English spoken across the island.' },
      timezone: { it: 'UTC+13. 12 ore avanti rispetto all\'Italia.', en: 'UTC+13. 12 hours ahead of Italy.' },
    },
    experiences: [
      { it: 'Bagno nella To Sua Ocean Trench', en: 'Swimming in the To Sua Ocean Trench' },
      { it: 'Scivolata alle Papase\'ea Sliding Rocks', en: 'Sliding at Papase\'ea Sliding Rocks' },
      { it: 'Trekking sui campi di lava di Savai\'i', en: 'Trekking on Savai\'i\'s lava fields' },
      { it: 'Cerimonia del Kava in villaggio', en: 'Kava ceremony in a village' },
      { it: 'Snorkeling nella laguna di Upolu', en: 'Snorkeling in Upolu\'s lagoon' },
      { it: 'Notte in un fale tradizionale sulla spiaggia', en: 'Night in a traditional fale on the beach' },
    ],
  },
  {
    slug: 'french-polynesia',
    mustSeeImage: '/images/must-polynesia.png',
    intro: {
      it: 'La Polinesia Francese è il <strong>sogno romantico per eccellenza</strong>. <strong>Bora Bora</strong> con i suoi bungalow sull\'acqua è l\'immagine stessa del paradiso, ma l\'arcipelago nasconde molto di più: <strong>Moorea</strong> con le sue montagne a denti di sega, <strong>Tahiti</strong> capitale vibrante, e gli atolli remoti delle <strong>Tuamotu</strong> dove il tempo sembra essersi fermato. La destinazione ideale per <strong>coppie e luna di miele</strong> che cercano il lusso nel mezzo del Pacifico.',
      en: 'French Polynesia is the <strong>ultimate romantic dream</strong>. <strong>Bora Bora</strong> with its overwater bungalows is the very image of paradise, but the archipelago hides much more: <strong>Moorea</strong> with its jagged mountains, vibrant <strong>Tahiti</strong>, and the remote <strong>Tuamotu</strong> atolls where time seems to have stood still. The ideal destination for <strong>couples and honeymoons</strong> seeking luxury in the middle of the Pacific.',
    },
    whenToGo: {
      months: months(['good', 'good', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good', 'good']),
      description: {
        it: 'La Polinesia Francese è visitabile tutto l\'anno grazie al clima tropicale stabile. La stagione secca (mag–ott) è la più piacevole: meno umidità, cielo sereno e mare calmo. La stagione delle piogge (nov–apr) è più calda e umida.',
        en: 'French Polynesia can be visited year-round thanks to its stable tropical climate. The dry season (May–Oct) is most pleasant: less humidity, clear skies and calm seas. The wet season (Nov–Apr) is warmer and more humid.',
      },
    },
    mustSee: [
      { title: { it: 'Bora Bora', en: 'Bora Bora' }, description: { it: 'La "Perla del Pacifico": laguna turchese, mount Otemanu e i leggendari bungalow sull\'acqua dei migliori resort al mondo.', en: 'The "Pearl of the Pacific": turquoise lagoon, Mount Otemanu and the legendary overwater bungalows of the world\'s finest resorts.' } },
      { title: { it: 'Moorea', en: 'Moorea' }, description: { it: 'A 30 minuti da Tahiti in traghetto: montagne vulcaniche a picco sul mare, lagune interne e nuoto con razze manta e delfini.', en: '30 minutes from Tahiti by ferry: volcanic mountains plunging into the sea, inner lagoons and swimming with manta rays and dolphins.' } },
      { title: { it: 'Atolli delle Tuamotu', en: 'Tuamotu Atolls' }, description: { it: 'Rangiroa e Fakarava: atolli corallini remoti con il diving più spettacolare della Polinesia, tra squali e banchi di pesci.', en: 'Rangiroa and Fakarava: remote coral atolls with the most spectacular diving in Polynesia, among sharks and schools of fish.' } },
      { title: { it: 'Tahiti', en: 'Tahiti' }, description: { it: 'L\'isola principale, spesso trascurata: cascate, mercati colorati, surf leggendario a Teahupoo e la cultura Polinesiana nel suo centro.', en: 'The main island, often overlooked: waterfalls, colourful markets, legendary surfing at Teahupoo and Polynesian culture at its core.' } },
      { title: { it: 'Bungalow sull\'Acqua', en: 'Overwater Bungalows' }, description: { it: 'Dormire sull\'acqua, svegliarsi con la laguna sotto ai piedi e fare snorkeling dal pontile privato è un\'esperienza unica al mondo.', en: 'Sleeping over water, waking up with the lagoon at your feet and snorkeling from your private dock is an experience unique in the world.' } },
    ],
    practical: {
      visa: { it: 'Nessun visto per cittadini UE (la Polinesia è territorio francese). Passaporto valido.', en: 'No visa for EU citizens (French overseas territory). Valid passport required.' },
      flights: { it: 'Voli via Parigi CDG con Air Tahiti Nui o Air France. Durata 22–24 ore. Anche via Los Angeles o Tokyo.', en: 'Flights via Paris CDG with Air Tahiti Nui or Air France. Duration 22–24 hours. Also via Los Angeles or Tokyo.' },
      currency: { it: 'Franco CFP (XPF). Carte accettate nei resort, contanti utili per i mercati.', en: 'CFP Franc (XPF). Cards accepted at resorts, cash useful for markets.' },
      language: { it: 'Francese e Tahitiano. Nei resort si parla anche inglese.', en: 'French and Tahitian. English spoken at resorts.' },
      timezone: { it: 'UTC-10. 11 ore indietro rispetto all\'Italia.', en: 'UTC-10. 11 hours behind Italy.' },
    },
    experiences: [
      { it: 'Bungalow sull\'acqua a Bora Bora', en: 'Overwater bungalow in Bora Bora' },
      { it: 'Nuoto con le razze manta a Moorea', en: 'Swimming with manta rays in Moorea' },
      { it: 'Diving a Rangiroa con i delfini spinner', en: 'Diving in Rangiroa with spinner dolphins' },
      { it: 'Surf a Teahupoo a Tahiti', en: 'Surfing at Teahupoo in Tahiti' },
      { it: 'Giro in piroga tra i motu', en: 'Outrigger canoe between the motu islets' },
      { it: 'Cena romantica sulla spiaggia', en: 'Romantic dinner on the beach' },
    ],
  },
  {
    slug: 'new-caledonia',
    mustSeeImage: '/images/must-caledonia.png',
    intro: {
      it: 'La Nuova Caledonia è un <strong>paradiso tropicale con un\'anima francese</strong>: un mix unico che non esiste da nessun altra parte al mondo. La sua <strong>laguna Patrimonio UNESCO</strong>, considerata la più bella del pianeta, si affianca alla cosmopolita <strong>Noumea</strong>, alle isole selvagge come <strong>Île des Pins</strong> e all\'autentico interno Kanak. Per chi vuole <strong>lusso, natura e cultura</strong> in un unico viaggio irripetibile.',
      en: 'New Caledonia is a <strong>tropical paradise with a French soul</strong>: a unique mix that exists nowhere else in the world. Its <strong>UNESCO World Heritage lagoon</strong>, considered the most beautiful on the planet, sits alongside cosmopolitan <strong>Noumea</strong>, wild islands like <strong>Île des Pins</strong> and the authentic Kanak interior. For those wanting <strong>luxury, nature and culture</strong> in a single unforgettable journey.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'avoid', 'avoid']),
      description: {
        it: 'La stagione secca (apr–ott) è ideale con temperature di 22–26°C e bassa umidità. La stagione delle piogge (nov–mar) è calda e umida, con rischio di cicloni tra gennaio e marzo.',
        en: 'The dry season (Apr–Oct) is ideal with temperatures of 22–26°C and low humidity. The wet season (Nov–Mar) is hot and humid, with cyclone risk between January and March.',
      },
    },
    mustSee: [
      { title: { it: 'Laguna UNESCO', en: 'UNESCO Lagoon' }, description: { it: 'La laguna più grande del mondo dopo la Grande Barriera Corallina: 24.000 km² di acque turchesi con una biodiversità marina straordinaria.', en: 'The world\'s largest lagoon after the Great Barrier Reef: 24,000 km² of turquoise waters with extraordinary marine biodiversity.' } },
      { title: { it: 'Île des Pins', en: 'Île des Pins' }, description: { it: '"L\'Isola più vicina al paradiso" secondo Kipling. Piscine naturali di sabbia bianca, pini colonnari e acque cristalline.', en: '"The island closest to paradise" according to Kipling. Natural pools of white sand, columnar pines and crystal waters.' } },
      { title: { it: 'Noumea', en: 'Noumea' }, description: { it: 'La "Parigi del Pacifico": ristoranti francesi, musei, spiagge urbane e un\'atmosfera unica tra lusso europeo e vita tropicale.', en: 'The "Paris of the Pacific": French restaurants, museums, urban beaches and a unique atmosphere blending European luxury with tropical life.' } },
      { title: { it: 'Côte Oubliée', en: 'Forgotten Coast' }, description: { it: 'La costa est selvaggia e autentica, abitata dai Kanak: villaggi tradizionali, cascate e foreste dense.', en: 'The wild and authentic east coast, home to the Kanak people: traditional villages, waterfalls and dense forests.' } },
      { title: { it: 'Diving & Snorkeling', en: 'Diving & Snorkeling' }, description: { it: 'Il Pass de Boulari e i numerosi siti della laguna offrono incontri con dugonghi, tartarughe e mante. Tra i migliori del Pacifico.', en: 'The Boulari Pass and the lagoon\'s many sites offer encounters with dugongs, turtles and mantas. Among the Pacific\'s finest.' } },
    ],
    practical: {
      visa: { it: 'Nessun visto per cittadini UE (territorio francese d\'oltremare). Passaporto valido.', en: 'No visa for EU citizens (French overseas territory). Valid passport required.' },
      flights: { it: 'Voli via Parigi CDG con Aircalin o Air France. Durata 23–26 ore. Anche via Tokyo o Sydney.', en: 'Flights via Paris CDG with Aircalin or Air France. Duration 23–26 hours. Also via Tokyo or Sydney.' },
      currency: { it: 'Franco CFP (XPF). Carte di credito accettate a Noumea, contanti necessari fuori città.', en: 'CFP Franc (XPF). Credit cards accepted in Noumea, cash needed outside the city.' },
      language: { it: 'Francese (lingua ufficiale) e Kanak. Inglese limitato fuori dai resort.', en: 'French (official language) and Kanak. Limited English outside resorts.' },
      timezone: { it: 'UTC+11. 10 ore avanti rispetto all\'Italia.', en: 'UTC+11. 10 hours ahead of Italy.' },
    },
    experiences: [
      { it: 'Snorkeling nella piscina naturale dell\'Île des Pins', en: 'Snorkeling in the natural pool of Île des Pins' },
      { it: 'Diving nel Pass de Boulari con i dugonghi', en: 'Diving in the Boulari Pass with dugongs' },
      { it: 'Giro in piroga nella laguna', en: 'Outrigger canoe in the lagoon' },
      { it: 'Visita ai villaggi Kanak della Côte Oubliée', en: 'Visit to Kanak villages on the Forgotten Coast' },
      { it: 'Degustazione di cucina fusion franco-polinesiana a Noumea', en: 'Franco-Polynesian fusion cuisine tasting in Noumea' },
      { it: 'Trekking nella riserva forestale di Rivière Bleue', en: 'Trekking in the Rivière Bleue forest reserve' },
    ],
  },
];
