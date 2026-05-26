export type MonthRating = 'best' | 'good' | 'avoid';

export interface MonthInfo {
  it: string;
  en: string;
  rating: MonthRating;
}

export interface DestinationContent {
  slug: string;
  mustSeeImage?: string;
  introLabel?: { it: string; en: string };
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
    introLabel: { it: 'Australia su misura', en: 'Tailor-Made Australia' },
    intro: {
      it: 'Ogni viaggio in Australia viene <strong>progettato attorno alla persona</strong>, al suo stile di viaggio e al modo in cui desidera vivere questa esperienza. Dagli spostamenti ai tempi di percorrenza, dall\'equilibrio tra natura, città e relax fino alla scelta delle strutture, <strong>ogni dettaglio viene studiato</strong> per creare un <strong>itinerario fluido, autentico e realmente sostenibile</strong> nei ritmi.<br><br>L\'Australia <strong>non è una destinazione da visitare velocemente</strong>. È un paese da vivere con il ritmo giusto. Dalle città affacciate sull\'oceano agli spazi immensi dell\'Outback, dalle foreste tropicali del Queensland alle spiagge più remote, è un viaggio che cambia continuamente paesaggi, atmosfere ed emozioni. Ci sono luoghi che si ricordano per ciò che si vede. L\'Australia, invece, rimane soprattutto per la <strong>sensazione di libertà</strong> che lascia addosso. Per questo ogni itinerario viene <strong>costruito su misura</strong>, con attenzione agli spostamenti, ai tempi di viaggio e al modo in cui desideri vivere davvero questa esperienza. Perché conoscere l\'Australia significa anche sapere come viverla nel modo giusto.',
      en: 'Every trip to Australia is <strong>designed around the person</strong>, their travel style, and the way they wish to experience it. From transfers to travel times, from the balance between nature, cities and relaxation to the choice of accommodation, <strong>every detail is carefully planned</strong> to create an <strong>itinerary that flows naturally, authentically and at a truly sustainable pace</strong>.<br><br>Australia is <strong>not a destination to be rushed</strong>. It is a country to experience at the right rhythm. From cities facing the ocean to the vast spaces of the Outback, from Queensland\'s tropical forests to its most remote beaches, it is a journey of ever-changing landscapes, atmospheres and emotions. There are places you remember for what you see. Australia stays with you above all for the <strong>feeling of freedom</strong> it leaves behind. This is why every itinerary is <strong>tailor-made</strong>, with careful attention to transfers, travel times and the way you truly wish to live this experience. Because truly knowing Australia also means knowing how to experience it the right way.',
    },
    whenToGo: {
      months: months(['good', 'good', 'best', 'best', 'best', 'good', 'avoid', 'avoid', 'good', 'best', 'best', 'good']),
      description: {
        it: 'L\'Australia è una destinazione che si può vivere durante tutto l\'anno. Essendo un continente enorme, le stagioni e il clima cambiano molto da una regione all\'altra. Per questo non esiste un unico periodo "migliore" per visitarla, ma itinerari costruiti in base alle condizioni ideali delle diverse aree e al tipo di esperienza che desideri vivere.',
        en: 'Australia can be experienced throughout the year. Being a vast continent, seasons and climate vary greatly from one region to another. This is why there is no single "best" time to visit, but itineraries built around the ideal conditions of each area and the type of experience you wish to have.',
      },
    },
    mustSee: [
      {
        title: { it: 'Grande Barriera Corallina', en: 'Great Barrier Reef' },
        description: { it: 'Nuotare nella Grande Barriera Corallina significa entrare in uno degli ecosistemi più straordinari del pianeta. Reef corallini, isole tropicali e fondali incredibili regalano esperienze uniche, perfette sia per lo snorkeling che per le immersioni.', en: 'Swimming in the Great Barrier Reef means entering one of the most extraordinary ecosystems on the planet. Coral reefs, tropical islands and incredible seabeds offer unique experiences, perfect for both snorkelling and diving.' },
        image: 'https://images.unsplash.com/photo-1587139223877-04bd6df79b79?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Uluru & Red Centre', en: 'Uluru & Red Centre' },
        description: { it: 'Nel cuore rosso dell\'Australia, Uluru regala una delle esperienze più intense del viaggio. I colori che cambiano al tramonto, il silenzio del deserto e i paesaggi sconfinati del Red Centre creano un\'atmosfera difficile da dimenticare.', en: 'In the red heart of Australia, Uluru offers one of the journey\'s most intense experiences. The colours that shift at sunset, the silence of the desert and the boundless landscapes of the Red Centre create an atmosphere that is hard to forget.' },
        image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Sydney & Opera House', en: 'Sydney & Opera House' },
        description: { it: 'Sydney unisce energia urbana e stile di vita australiano come poche altre città al mondo. Dall\'Opera House alla Bondi Beach, passando per quartieri creativi, rooftop e passeggiate sull\'oceano, ogni giornata ha un ritmo diverso.', en: 'Sydney combines urban energy and the Australian way of life like few other cities in the world. From the Opera House to Bondi Beach, through creative neighbourhoods, rooftops and ocean walks, every day has its own rhythm.' },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Daintree Rainforest', en: 'Daintree Rainforest' },
        description: { it: 'Qui la foresta pluviale incontra il mare tropicale. Il Daintree è uno dei luoghi più selvaggi e affascinanti del Queensland: crociere tra i coccodrilli, spiagge deserte, natura incontaminata e una biodiversità unica al mondo.', en: 'Here the rainforest meets the tropical sea. The Daintree is one of Queensland\'s wildest and most fascinating places: cruises among crocodiles, deserted beaches, unspoiled nature and a biodiversity unique in the world.' },
        image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Great Ocean Road & Dodici Apostoli', en: 'Great Ocean Road & Twelve Apostles' },
        description: { it: 'Uno dei road trip più spettacolari dell\'Australia. Oceano infinito, scogliere scolpite dal vento, foreste di eucalipti e i celebri Dodici Apostoli rendono questo itinerario una delle esperienze on the road più iconiche del paese.', en: 'One of Australia\'s most spectacular road trips. Endless ocean, wind-sculpted cliffs, eucalyptus forests and the famous Twelve Apostles make this one of the country\'s most iconic on-the-road experiences.' },
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80&auto=format',
      },
      {
        title: { it: 'Kangaroo Island', en: 'Kangaroo Island' },
        description: { it: 'Un\'Australia più autentica, lenta e selvaggia. Kangaroo Island è il luogo ideale per chi cerca natura incontaminata, spiagge immense, animali in libertà e paesaggi ancora poco toccati dal turismo di massa. Tra koala, leoni marini, tramonti sull\'oceano e strade panoramiche, l\'isola regala una delle esperienze più genuine del South Australia.', en: 'A more authentic, slow and wild Australia. Kangaroo Island is the ideal place for those seeking unspoiled nature, vast beaches, free-roaming wildlife and landscapes still largely untouched by mass tourism. Among koalas, sea lions, ocean sunsets and scenic roads, the island offers one of South Australia\'s most genuine experiences.' },
      },
    ],
    practical: {
      visa: { it: 'EVisitor 651 — gratuito, richiedibile online in pochi minuti.', en: 'EVisitor (subclass 651) — free of charge, applicable online in minutes.' },
      flights: { it: 'Voli da Roma, Milano, Venezia, Bologna con Qatar Airways, Cathay Pacific, Singapore Airlines, Emirates, Etihad, Qantas. Durata media 22–26 ore.', en: 'Flights from major US cities with Qantas and American Airlines. Average duration 20–24 hours.' },
      currency: { it: 'Dollaro Australiano (AUD). Carte di credito accettate ovunque. ATM disponibili in ogni città.', en: 'Australian Dollar (AUD). Credit cards accepted everywhere. ATMs available in every city.' },
      language: { it: 'Inglese.', en: 'English.' },
      timezone: { it: 'Australia ha 3 fusi orari: AEST (UTC+10), ACST (UTC+9:30), AWST (UTC+8). Jet lag significativo dall\'Italia (8–10 ore avanti).', en: 'Australia has 3 time zones: AEST (UTC+10), ACST (UTC+9:30), AWST (UTC+8). Significant jet lag from the US (14–19 hours ahead).' },
    },
    experiences: [
      { it: 'Snorkeling alla Grande Barriera Corallina', en: 'Snorkelling at the Great Barrier Reef' },
      { it: 'Safari nel Kakadu National Park', en: 'Safari in Kakadu National Park' },
      { it: 'Road trip sulla Great Ocean Road', en: 'Road trip along the Great Ocean Road' },
      { it: 'Tramonto a Uluru', en: 'Sunset at Uluru' },
      { it: 'Surf a Bondi Beach', en: 'Surfing at Bondi Beach' },
      { it: 'Wildlife a Kangaroo Island', en: 'Wildlife on Kangaroo Island' },
    ],
  },
  {
    slug: 'new-zealand',
    mustSeeImage: '/images/must-nz-hobbiton.png',
    introLabel: { it: 'Nuova Zelanda su misura', en: 'Tailor-Made New Zealand' },
    intro: {
      it: 'Ogni itinerario viene <strong>costruito in base al tuo modo di viaggiare</strong>, ai ritmi desiderati e alle esperienze che vuoi vivere davvero. Dai grandi road trip tra le due isole ai lodge immersi nella natura, fino alle escursioni più iconiche, <strong>ogni dettaglio viene studiato</strong> per creare un <strong>viaggio fluido, equilibrato e autentico</strong>.<br><br>La Nuova Zelanda è uno dei pochi luoghi al mondo dove <strong>paesaggi completamente diversi convivono a poche ore di distanza</strong>. Fiordi profondi, vulcani attivi, foreste pluviali, ghiacciai e spiagge selvagge trasformano continuamente il viaggio, creando la sensazione di <strong>attraversare più mondi in un solo itinerario</strong>. È una destinazione perfetta per chi ama la natura, i viaggi on the road e gli spazi aperti, ma anche per chi cerca un modo di viaggiare <strong>più lento, immersivo e lontano dal turismo di massa</strong>.',
      en: 'Every itinerary is <strong>built around your way of travelling</strong>, your desired pace and the experiences you truly want to live. From epic road trips across both islands to lodges immersed in nature, to the most iconic hikes, <strong>every detail is planned</strong> to create a journey that <strong>flows naturally, balanced and authentic</strong>.<br><br>New Zealand is one of the few places in the world where <strong>completely different landscapes coexist just hours apart</strong>. Deep fjords, active volcanoes, rainforests, glaciers and wild beaches continuously transform the journey, creating the feeling of <strong>crossing multiple worlds in a single itinerary</strong>. It is the perfect destination for those who love nature, road trips and open spaces, as well as those seeking a <strong>slower, more immersive way of travelling, far from mass tourism</strong>.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'best', 'best', 'good', 'avoid', 'avoid', 'avoid', 'good', 'best', 'best', 'good']),
      description: {
        it: 'La Nuova Zelanda è una destinazione visitabile durante tutto l\'anno, con stagioni opposte rispetto all\'Europa. Ogni periodo offre esperienze diverse: l\'estate australe regala giornate lunghe e temperature più miti, mentre primavera e autunno sono ideali per chi cerca paesaggi spettacolari e meno affollamento. Anche l\'inverno può essere un ottimo momento per visitare alcune aree del paese, soprattutto per gli amanti dello sci e dei paesaggi alpini.',
        en: 'New Zealand can be visited all year round, with seasons opposite to those in Europe. Each period offers different experiences: the southern summer brings long days and milder temperatures, while spring and autumn are ideal for those seeking spectacular scenery and fewer crowds. Winter can also be an excellent time to visit certain areas, especially for skiing and alpine landscapes lovers.',
      },
    },
    mustSee: [
      {
        title: { it: 'Viaggiare on the road tra le due isole', en: 'Road-tripping across both islands' },
        description: { it: 'La Nuova Zelanda è uno dei paesi più belli al mondo da esplorare in self-drive. In poche ore si passa da coste oceaniche a montagne alpine, da foreste pluviali a laghi glaciali, con una sensazione continua di scoperta lungo la strada.', en: 'New Zealand is one of the most beautiful countries in the world to explore by self-drive. Within hours you move from ocean coasts to alpine mountains, from rainforests to glacial lakes, with a constant sense of discovery along the way.' },
      },
      {
        title: { it: 'Fiordi e natura estrema nel Fiordland', en: 'Fjords and extreme nature in Fiordland' },
        description: { it: 'Milford Sound e il Fiordland regalano alcuni dei paesaggi più spettacolari del paese: montagne che precipitano nei fiordi, cascate immense, nebbia, foreste incontaminate e una natura ancora profondamente selvaggia.', en: 'Milford Sound and Fiordland offer some of the country\'s most spectacular scenery: mountains plunging into fjords, immense waterfalls, mist, pristine forests and a nature that remains deeply wild.' },
      },
      {
        title: { it: 'Rotorua e la cultura Māori', en: 'Rotorua and Māori culture' },
        description: { it: 'Nel cuore dell\'Isola del Nord, Rotorua unisce attività geotermica, geyser e sorgenti termali a una forte identità culturale Māori, ancora molto presente nella vita quotidiana e nelle tradizioni locali.', en: 'In the heart of the North Island, Rotorua combines geothermal activity, geysers and hot springs with a strong Māori cultural identity, still very present in everyday life and local traditions.' },
      },
      {
        title: { it: 'Ghiacciai, laghi e montagne della South Island', en: 'Glaciers, lakes and mountains of the South Island' },
        description: { it: 'La parte sud della Nuova Zelanda concentra alcuni dei paesaggi più scenografici del viaggio: ghiacciai che scendono verso la foresta pluviale, laghi color turchese, passi alpini e strade panoramiche tra le più belle dell\'emisfero australe.', en: 'The southern part of New Zealand concentrates some of the journey\'s most scenic landscapes: glaciers descending toward the rainforest, turquoise lakes, alpine passes and some of the most beautiful scenic roads in the southern hemisphere.' },
      },
      {
        title: { it: 'Baie, oceano e fauna marina', en: 'Bays, ocean and marine wildlife' },
        description: { it: 'Dalle Bay of Islands alla penisola di Kaikōura, la Nuova Zelanda offre coste spettacolari dove è possibile avvistare delfini, balene, foche e vivere un rapporto molto diretto con l\'oceano e la natura.', en: 'From the Bay of Islands to the Kaikōura Peninsula, New Zealand offers spectacular coastlines where you can spot dolphins, whales and seals, and experience a very direct relationship with the ocean and nature.' },
      },
    ],
    practical: {
      visa: { it: 'Per i cittadini italiani è richiesta la NZeTA e la tassa sul turismo, acquistabili direttamente sul sito ufficiale del Governo della Nuova Zelanda.', en: 'Italian citizens require the NZeTA and the International Visitor Conservation and Tourism Levy (IVL), available on the official New Zealand Government website.' },
      flights: { it: 'Voli con scalo da Roma, Milano, Bologna con Qatar Airways, Emirates, Singapore Airlines. Durata media 24–28 ore.', en: 'Flights from major US cities with American Airlines, Air New Zealand, United Airlines.' },
      currency: { it: 'Dollaro Neozelandese (NZD). Le carte di credito sono accettate praticamente ovunque.', en: 'New Zealand Dollar (NZD). Credit cards accepted virtually everywhere.' },
      language: { it: 'Inglese e Māori (lingue ufficiali).', en: 'English and Māori (official languages).' },
      timezone: { it: 'La Nuova Zelanda si trova tra 10 e 12 ore avanti rispetto all\'Italia, a seconda del periodo dell\'anno.', en: 'New Zealand is approximately 17–19 hours ahead of the US East Coast, depending on the time of year.' },
    },
    experiences: [
      { it: 'Road trip tra le due isole in self-drive', en: 'Self-drive road trip across both islands' },
      { it: 'Trekking nel Fiordland e Milford Sound', en: 'Trekking in Fiordland and Milford Sound' },
      { it: 'Rotorua e cultura Māori', en: 'Rotorua and Māori culture' },
      { it: 'Ghiacciai e laghi della South Island', en: 'Glaciers and lakes of the South Island' },
      { it: 'Whale watching a Kaikōura', en: 'Whale watching at Kaikōura' },
      { it: 'Sci a Queenstown', en: 'Skiing in Queenstown' },
    ],
  },
  {
    slug: 'fiji',
    mustSeeImage: '/images/must-fiji.png',
    introLabel: { it: 'Fiji su misura', en: 'Tailor-Made Fiji' },
    intro: {
      it: 'Ogni itinerario viene costruito in base al tipo di esperienza che desideri vivere: relax totale su isole remote, resort immersi nella natura, snorkeling e immersioni tra i reef del Pacifico oppure combinazioni con Australia e Nuova Zelanda. Dalla scelta delle isole ai collegamenti tra gli arcipelaghi, <strong>ogni dettaglio viene studiato</strong> per creare un <strong>viaggio fluido, equilibrato e realmente adatto ai tuoi tempi</strong>.<br><br>Le Fiji rappresentano <strong>una delle destinazioni più autentiche e rilassanti del Pacifico</strong>. Oltre 300 isole immerse nell\'oceano, spiagge bianche, mare cristallino e una delle culture più accoglienti dell\'Oceania creano un\'atmosfera difficile da trovare altrove. Qui <strong>il tempo sembra fermarsi</strong>. Le giornate scorrono tra reef corallini, tramonti sull\'oceano, villaggi locali e piccole isole raggiungibili solo via mare. Il celebre <strong>"Bula"</strong>, il saluto fijiano, non è soltanto una parola: è il modo in cui le Fiji fanno sentire chi arriva.',
      en: 'Every itinerary is built around the type of experience you wish to have: total relaxation on remote islands, resorts immersed in nature, snorkeling and diving among the Pacific reefs, or combinations with Australia and New Zealand. From the choice of islands to inter-island connections, <strong>every detail is carefully planned</strong> to create a journey that <strong>flows naturally, balanced and truly suited to your pace</strong>.<br><br>Fiji is <strong>one of the most authentic and relaxing destinations in the Pacific</strong>. Over 300 islands set in the ocean, white beaches, crystal-clear sea and one of Oceania\'s most welcoming cultures create an atmosphere that is hard to find elsewhere. Here, <strong>time seems to stand still</strong>. Days unfold between coral reefs, ocean sunsets, local villages and small islands reachable only by sea. The famous <strong>"Bula"</strong>, the Fijian greeting, is not just a word — it is the way Fiji makes you feel.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'avoid', 'avoid', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good']),
      description: {
        it: 'Il periodo ideale per visitare le Fiji è la stagione secca, da maggio a ottobre: cielo sereno, temperature intorno ai 26–28°C, mare piatto e condizioni perfette per snorkeling e immersioni. Novembre e dicembre sono ancora godibili, con qualche pioggia in più. Da gennaio ad aprile è la stagione delle piogge, con possibilità di cicloni — da considerare con attenzione in fase di pianificazione.',
        en: 'The ideal time to visit Fiji is the dry season, from May to October: clear skies, temperatures around 26–28°C, calm seas and perfect conditions for snorkeling and diving. November and December are still enjoyable, with a little more rain. January to April is the wet season, with possible cyclones — worth considering carefully when planning.',
      },
    },
    mustSee: [
      {
        title: { it: 'Mamanuca Islands', en: 'Mamanuca Islands' },
        description: { it: 'Piccole isole circondate da lagune turchesi e spiagge bianchissime: le Mamanuca sono tra le immagini più iconiche delle Fiji, perfette per relax, snorkeling e soggiorni vista oceano.', en: 'Small islands surrounded by turquoise lagoons and pristine white beaches: the Mamanucas are among Fiji\'s most iconic images, perfect for relaxation, snorkeling and ocean-view stays.' },
      },
      {
        title: { it: 'Yasawa Islands', en: 'Yasawa Islands' },
        description: { it: 'Più remote e selvagge, le Yasawa regalano un\'atmosfera autentica e ritmi lenti. Qui il mare domina completamente il paesaggio, tra villaggi locali, snorkeling e tramonti spettacolari.', en: 'More remote and wild, the Yasawas offer an authentic atmosphere and slow rhythms. Here the sea completely dominates the landscape, between local villages, snorkeling and spectacular sunsets.' },
      },
      {
        title: { it: 'Snorkeling & Diving nel Pacifico', en: 'Snorkeling & Diving in the Pacific' },
        description: { it: 'Le Fiji ospitano alcuni dei reef più ricchi e colorati dell\'Oceania. Acque calde, visibilità eccellente e una straordinaria biodiversità marina rendono ogni uscita in mare un\'esperienza speciale.', en: 'Fiji is home to some of Oceania\'s richest and most colourful reefs. Warm waters, excellent visibility and extraordinary marine biodiversity make every outing at sea a special experience.' },
      },
      {
        title: { it: 'Isole private e resort immersi nella natura', en: 'Private islands and nature-immersed resorts' },
        description: { it: 'Dalle piccole boutique island ai resort più esclusivi, le Fiji offrono alcune delle esperienze più rilassanti del Pacifico, perfette per lune di miele, anniversari o semplicemente per staccare completamente dalla routine.', en: 'From small boutique islands to the most exclusive resorts, Fiji offers some of the most relaxing experiences in the Pacific, perfect for honeymoons, anniversaries or simply disconnecting from everyday life.' },
      },
      {
        title: { it: 'Cultura fijiana e vita nei villaggi', en: 'Fijian culture and village life' },
        description: { it: 'Oltre al mare, le Fiji colpiscono per l\'accoglienza delle persone. Visitare un villaggio locale, assistere a una cerimonia della kava o semplicemente vivere il celebre spirito "Bula" permette di entrare in contatto con il lato più autentico del paese.', en: 'Beyond the sea, Fiji impresses with the warmth of its people. Visiting a local village, attending a kava ceremony or simply experiencing the famous "Bula" spirit allows you to connect with the most authentic side of the country.' },
      },
    ],
    practical: {
      visa: { it: 'Nessun visto richiesto per soggiorni fino a 4 mesi. Basta passaporto valido.', en: 'No visa required for stays up to 4 months. Valid passport only.' },
      flights: { it: 'Voli con scalo (Sydney, Auckland, Singapore, Hong Kong). Durata 20–26 ore. Compagnie: Fiji Airways, Qantas, Cathay Pacific e Singapore Airlines.', en: 'Flights with stopover (Sydney, Auckland, Singapore, Hong Kong). Duration 20–26 hours. Airlines: Fiji Airways, Qantas, Cathay Pacific and Singapore Airlines.' },
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
    introLabel: { it: 'Isole Cook su misura', en: 'Tailor-Made Cook Islands' },
    intro: {
      it: 'Ogni itinerario viene costruito in base al tipo di esperienza che desideri vivere: soggiorni vista laguna, escursioni tra le isole, snorkeling nelle acque cristalline oppure semplicemente il piacere di rallentare e vivere il Pacifico con tempi più lenti. Dalla scelta delle isole ai ritmi del viaggio, <strong>ogni dettaglio viene studiato</strong> per creare un\'esperienza <strong>autentica, equilibrata e realmente su misura</strong>.<br><br>Le Isole Cook rappresentano <strong>uno dei volti più genuini del Pacifico</strong>. Raggiungibili ma ancora poco toccate dal turismo di massa, conservano <strong>un equilibrio raro</strong> tra natura, cultura locale e semplicità. Aitutaki regala <strong>una delle lagune più belle dell\'Oceania</strong>, mentre Rarotonga unisce montagne tropicali, mare cristallino e vita locale in un\'atmosfera rilassata e accogliente. È la destinazione ideale per chi cerca <strong>un Pacifico autentico</strong>, lontano dai grandi resort e dai ritmi più turistici.',
      en: 'Every itinerary is built around the type of experience you wish to have: lagoon-view stays, island excursions, snorkeling in crystal-clear waters or simply the pleasure of slowing down and experiencing the Pacific at a gentler pace. From the choice of islands to the rhythm of the journey, <strong>every detail is carefully planned</strong> to create an <strong>authentic, balanced and truly tailor-made experience</strong>.<br><br>The Cook Islands represent <strong>one of the most genuine faces of the Pacific</strong>. Accessible yet still largely untouched by mass tourism, they preserve <strong>a rare balance</strong> between nature, local culture and simplicity. Aitutaki offers <strong>one of Oceania\'s most beautiful lagoons</strong>, while Rarotonga combines tropical mountains, crystal-clear sea and local life in a relaxed, welcoming atmosphere. It is the ideal destination for those seeking <strong>an authentic Pacific</strong>, far from large resorts and more touristy rhythms.',
    },
    whenToGo: {
      months: months(['good', 'avoid', 'avoid', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good']),
      description: {
        it: 'Il periodo ideale per le Isole Cook è la stagione secca, da maggio a ottobre: clima mite, cielo sereno e mare ottimo per snorkeling e navigazione. Gennaio, aprile, novembre e dicembre sono ancora godibili ma con più variabilità. Febbraio e marzo coincidono con la stagione delle piogge e con la possibilità di cicloni.',
        en: 'The ideal time for the Cook Islands is the dry season, from May to October: mild climate, clear skies and excellent conditions for snorkeling and sailing. January, April, November and December are still enjoyable but with more variability. February and March coincide with the wet season and the possibility of cyclones.',
      },
    },
    mustSee: [
      {
        title: { it: 'Laguna di Aitutaki', en: 'Aitutaki Lagoon' },
        description: { it: 'Una delle lagune più spettacolari del Pacifico, con motu di sabbia bianca, mare turchese e piccole isole raggiungibili solo in barca.', en: 'One of the most spectacular lagoons in the Pacific, with white sand motu, turquoise sea and small islands reachable only by boat.' },
      },
      {
        title: { it: 'Rarotonga', en: 'Rarotonga' },
        description: { it: 'L\'isola principale delle Cook unisce vegetazione tropicale, laguna cristallina e vita locale. Tra mercati, strade panoramiche e sentieri interni, qui il viaggio scorre con un ritmo completamente diverso.', en: 'The Cook Islands\' main island combines tropical vegetation, crystal lagoon and local life. Between markets, scenic roads and inland trails, the journey here flows at a completely different pace.' },
      },
      {
        title: { it: 'Snorkeling & Kayak', en: 'Snorkeling & Kayak' },
        description: { it: 'Le lagune protette delle Cook offrono condizioni perfette per snorkeling e kayak, grazie alle acque calme e alla straordinaria trasparenza del mare.', en: 'The protected lagoons of the Cook Islands offer perfect conditions for snorkeling and kayaking, thanks to calm waters and extraordinary sea clarity.' },
      },
      {
        title: { it: 'Cultura polinesiana e ritmo lento del Pacifico', en: 'Polynesian culture and the slow Pacific rhythm' },
        description: { it: 'Musica, danza, cucina locale e accoglienza fanno parte della quotidianità delle isole. Le Cook sono il luogo ideale per chi desidera rallentare davvero e vivere un Pacifico ancora autentico.', en: 'Music, dance, local cuisine and hospitality are part of everyday island life. The Cooks are the ideal place for those who want to truly slow down and experience an authentic Pacific.' },
      },
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
    introLabel: { it: 'Samoa su misura', en: 'Tailor-Made Samoa' },
    intro: {
      it: 'Ogni itinerario viene costruito in base al tipo di esperienza che desideri vivere: spiagge tropicali, villaggi locali, escursioni nella natura, cascate, lagune vulcaniche e soggiorni immersi nella cultura samoana. Dalla scelta delle isole ai ritmi del viaggio, <strong>ogni dettaglio viene studiato</strong> per creare un\'esperienza <strong>autentica, equilibrata e lontana dal turismo più costruito</strong>.<br><br>Le Samoa rappresentano uno dei luoghi in cui <strong>la cultura polinesiana è ancora più viva e autentica</strong>. Il <strong>Fa\'a Samoa</strong> — "la via samoana" — non è un\'attrazione turistica, ma <strong>uno stile di vita basato su famiglia, rispetto e spirito comunitario</strong> che si percepisce in ogni villaggio. Tra lagune tropicali, coste vulcaniche, foreste lussureggianti e spiagge quasi deserte, le Samoa regalano <strong>un Pacifico più genuino, intenso e profondamente umano</strong>.',
      en: 'Every itinerary is built around the type of experience you wish to have: tropical beaches, local villages, nature excursions, waterfalls, volcanic lagoons and stays immersed in Samoan culture. From the choice of islands to the rhythm of the journey, <strong>every detail is carefully planned</strong> to create an <strong>authentic, balanced experience far from more commercial tourism</strong>.<br><br>Samoa is one of those places where <strong>Polynesian culture is most alive and authentic</strong>. The <strong>Fa\'a Samoa</strong> — "the Samoan way" — is not a tourist attraction, but <strong>a way of life based on family, respect and community spirit</strong> felt in every village. Between tropical lagoons, volcanic coastlines, lush forests and near-deserted beaches, Samoa offers <strong>a Pacific that is more genuine, intense and deeply human</strong>.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'avoid', 'avoid', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good']),
      description: {
        it: 'Il periodo ideale per visitare le Samoa è la stagione secca, da maggio a ottobre: clima mite, temperature intorno ai 26–28°C e poca pioggia. Novembre e dicembre restano godibili, con qualche acquazzone in più. Da gennaio ad aprile è la stagione delle piogge, con umidità elevata e rischio cicloni.',
        en: 'The ideal time to visit Samoa is the dry season, from May to October: mild climate, temperatures around 26–28°C and little rain. November and December remain enjoyable, with slightly more showers. January to April is the wet season, with high humidity and cyclone risk.',
      },
    },
    mustSee: [
      {
        title: { it: 'To Sua Ocean Trench', en: 'To Sua Ocean Trench' },
        description: { it: 'Una delle meraviglie naturali più iconiche del Pacifico: una spettacolare piscina naturale collegata all\'oceano attraverso grotte vulcaniche sotterranee.', en: 'One of the Pacific\'s most iconic natural wonders: a spectacular natural pool connected to the ocean through underground volcanic caves.' },
      },
      {
        title: { it: 'Savai\'i', en: 'Savai\'i' },
        description: { it: 'L\'isola più selvaggia dell\'arcipelago, tra campi di lava, foreste tropicali, villaggi tradizionali e spiagge ancora poco toccate dal turismo internazionale.', en: 'The wildest island of the archipelago, between lava fields, tropical forests, traditional villages and beaches still largely untouched by international tourism.' },
      },
      {
        title: { it: 'Lalomanu Beach', en: 'Lalomanu Beach' },
        description: { it: 'Una delle spiagge più belle delle Samoa, famosa per il mare trasparente, la barriera corallina e i tradizionali fale affacciati direttamente sull\'oceano.', en: 'One of Samoa\'s most beautiful beaches, known for its crystal-clear sea, coral reef and traditional fale huts looking directly out over the ocean.' },
      },
      {
        title: { it: 'Cultura e villaggi samoani', en: 'Samoan culture and villages' },
        description: { it: 'Parte dell\'esperienza alle Samoa è entrare in contatto con la vita locale: mercati, villaggi, cucina tradizionale e la celebre cerimonia del kava raccontano un Pacifico ancora autentico.', en: 'Part of the Samoa experience is connecting with local life: markets, villages, traditional cuisine and the famous kava ceremony tell the story of a still-authentic Pacific.' },
      },
      {
        title: { it: 'Cascate e natura tropicale', en: 'Waterfalls and tropical nature' },
        description: { it: 'Tra foreste lussureggianti, piscine naturali e cascate immerse nella vegetazione, le Samoa offrono una natura potente e ancora incredibilmente incontaminata.', en: 'Between lush forests, natural pools and waterfalls immersed in vegetation, Samoa offers powerful and still remarkably unspoiled nature.' },
      },
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
    introLabel: { it: 'Polinesia Francese su misura', en: 'Tailor-Made French Polynesia' },
    intro: {
      it: 'Ogni itinerario viene costruito in base al tipo di esperienza che desideri vivere: soggiorni in bungalow sull\'acqua, island hopping tra gli arcipelaghi, snorkeling nelle lagune tropicali oppure viaggi più autentici alla scoperta delle isole meno conosciute. Dalla scelta delle isole ai collegamenti interni, <strong>ogni dettaglio viene studiato</strong> per creare un <strong>viaggio equilibrato, fluido e realmente su misura</strong>.<br><br>La Polinesia Francese rappresenta <strong>uno dei luoghi più iconici e spettacolari del Pacifico</strong>. Bora Bora, Moorea, Tahiti e gli atolli delle Tuamotu offrono paesaggi completamente diversi tra loro, accomunati da <strong>lagune cristalline, natura tropicale e una cultura polinesiana ancora profondamente presente</strong>. È una destinazione perfetta per chi cerca <strong>relax, mare straordinario e un\'atmosfera romantica</strong>, ma anche per chi desidera vivere il Pacifico in modo più autentico, tra piccole guesthouse, isole remote e <strong>ritmi lenti lontani dal turismo più frenetico</strong>.',
      en: 'Every itinerary is built around the type of experience you wish to have: stays in overwater bungalows, island hopping across the archipelagos, snorkeling in tropical lagoons or more authentic journeys discovering the lesser-known islands. From the choice of islands to internal connections, <strong>every detail is carefully planned</strong> to create a <strong>balanced, flowing and truly tailor-made trip</strong>.<br><br>French Polynesia is <strong>one of the most iconic and spectacular places in the Pacific</strong>. Bora Bora, Moorea, Tahiti and the Tuamotu atolls offer completely different landscapes, united by <strong>crystal lagoons, tropical nature and a Polynesian culture still deeply present</strong>. It is the perfect destination for those seeking <strong>relaxation, extraordinary sea and a romantic atmosphere</strong>, as well as those wishing to experience the Pacific more authentically, between small guesthouses, remote islands and <strong>slow rhythms far from the busiest tourist trails</strong>.',
    },
    whenToGo: {
      months: months(['good', 'good', 'good', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good', 'good']),
      description: {
        it: 'La Polinesia Francese si può visitare durante tutto l\'anno grazie al clima tropicale del Pacifico. I mesi tra maggio e ottobre offrono generalmente temperature più miti, minore umidità e condizioni ideali per vivere il mare e le attività outdoor. Anche la stagione più calda regala giornate splendide, vegetazione rigogliosa e un\'atmosfera ancora più tropicale.',
        en: 'French Polynesia can be visited all year round thanks to the Pacific\'s tropical climate. The months between May and October generally offer milder temperatures, lower humidity and ideal conditions for enjoying the sea and outdoor activities. The warmer season also brings splendid days, lush vegetation and an even more tropical atmosphere.',
      },
    },
    mustSee: [
      {
        title: { it: 'Bora Bora', en: 'Bora Bora' },
        description: { it: 'La laguna di Bora Bora è una delle immagini più iconiche del Pacifico: acqua turchese, motu tropicali e il profilo del Monte Otemanu che domina l\'isola.', en: 'Bora Bora\'s lagoon is one of the Pacific\'s most iconic images: turquoise water, tropical motu and the profile of Mount Otemanu dominating the island.' },
      },
      {
        title: { it: 'Moorea', en: 'Moorea' },
        description: { it: 'Montagne vulcaniche, baie profonde e lagune trasparenti rendono Moorea una delle isole più scenografiche della Polinesia Francese, perfetta per combinare natura e mare.', en: 'Volcanic mountains, deep bays and transparent lagoons make Moorea one of the most scenic islands in French Polynesia, perfect for combining nature and sea.' },
      },
      {
        title: { it: 'Atolli delle Tuamotu', en: 'Tuamotu Atolls' },
        description: { it: 'Rangiroa e Fakarava regalano un volto più remoto e selvaggio della Polinesia, famoso per snorkeling, immersioni e immense lagune coralline.', en: 'Rangiroa and Fakarava reveal a more remote and wild face of Polynesia, famous for snorkeling, diving and immense coral lagoons.' },
      },
      {
        title: { it: 'Tahiti', en: 'Tahiti' },
        description: { it: 'Spesso considerata solo un punto di passaggio, Tahiti custodisce invece mercati locali, cascate tropicali, spiagge vulcaniche e uno dei centri culturali più importanti della Polinesia.', en: 'Often seen as just a stopover, Tahiti actually holds local markets, tropical waterfalls, volcanic beaches and one of Polynesia\'s most important cultural centres.' },
      },
      {
        title: { it: 'Bungalow sull\'acqua e vita in laguna', en: 'Overwater bungalows and lagoon life' },
        description: { it: 'Dormire sospesi sull\'oceano, fare snorkeling direttamente dal pontile e vivere il ritmo lento della laguna è una delle esperienze più iconiche del viaggio.', en: 'Sleeping suspended over the ocean, snorkeling directly from the jetty and living the slow rhythm of the lagoon is one of the journey\'s most iconic experiences.' },
      },
    ],
    practical: {
      visa: { it: 'Nessun visto per cittadini UE (la Polinesia è territorio francese). Passaporto valido.', en: 'No visa for EU citizens (French overseas territory). Valid passport required.' },
      flights: { it: 'Voli via Parigi CDG con Air Tahiti Nui o Air France. Durata 22–24 ore. Anche via Los Angeles, Auckland o Tokyo.', en: 'Flights via Paris CDG with Air Tahiti Nui or Air France. Duration 22–24 hours. Also via Los Angeles, Auckland or Tokyo.' },
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
    introLabel: { it: 'Nuova Caledonia su misura', en: 'Tailor-Made New Caledonia' },
    intro: {
      it: 'Ogni itinerario viene costruito in base al tipo di esperienza che desideri vivere: soggiorni vista laguna, escursioni tra le isole, snorkeling e immersioni, oppure percorsi più autentici alla scoperta della cultura Kanak e delle regioni meno turistiche dell\'arcipelago. Dalla scelta delle isole ai ritmi del viaggio, <strong>ogni dettaglio viene studiato</strong> per creare un\'esperienza <strong>equilibrata, fluida e realmente su misura</strong>.<br><br>La Nuova Caledonia offre <strong>un mix unico nel Pacifico</strong>: <strong>lagune tropicali patrimonio UNESCO</strong>, influenze francesi, natura incontaminata e <strong>una forte identità culturale locale</strong> convivono in un equilibrio raro. Nouméa regala un\'atmosfera cosmopolita e rilassata, mentre località come Île des Pins mostrano il lato più tropicale e spettacolare dell\'arcipelago. È una destinazione ideale per chi cerca <strong>mare, natura e autenticità</strong> in un contesto ancora lontano dal turismo di massa.',
      en: 'Every itinerary is built around the type of experience you wish to have: lagoon-view stays, island excursions, snorkeling and diving, or more authentic routes discovering Kanak culture and the less touristy regions of the archipelago. From the choice of islands to the rhythm of the journey, <strong>every detail is carefully planned</strong> to create a <strong>balanced, flowing and truly tailor-made experience</strong>.<br><br>New Caledonia offers <strong>a unique mix in the Pacific</strong>: <strong>UNESCO World Heritage tropical lagoons</strong>, French influences, unspoiled nature and <strong>a strong local cultural identity</strong> coexist in a rare balance. Nouméa offers a cosmopolitan and relaxed atmosphere, while places like Île des Pins reveal the most tropical and spectacular side of the archipelago. It is the ideal destination for those seeking <strong>sea, nature and authenticity</strong> in a setting still far from mass tourism.',
    },
    whenToGo: {
      months: months(['avoid', 'avoid', 'avoid', 'avoid', 'best', 'best', 'best', 'best', 'best', 'best', 'good', 'good']),
      description: {
        it: 'Il periodo ideale per visitare la Nuova Caledonia è la stagione secca, da maggio a ottobre: temperature tra 22 e 26°C, bassa umidità e condizioni perfette per il mare e le attività outdoor. Novembre e dicembre sono ancora gradevoli ma con più variabilità. Da gennaio ad aprile è la stagione delle piogge, con umidità elevata e rischio cicloni.',
        en: 'The ideal time to visit New Caledonia is the dry season, from May to October: temperatures between 22 and 26°C, low humidity and perfect conditions for the sea and outdoor activities. November and December are still pleasant but with more variability. January to April is the wet season, with high humidity and cyclone risk.',
      },
    },
    mustSee: [
      {
        title: { it: 'Laguna della Nuova Caledonia', en: 'New Caledonia Lagoon' },
        description: { it: 'Una delle lagune più grandi e spettacolari del mondo, con acque trasparenti, reef corallini e una biodiversità marina straordinaria.', en: 'One of the largest and most spectacular lagoons in the world, with transparent waters, coral reefs and extraordinary marine biodiversity.' },
      },
      {
        title: { it: 'Île des Pins', en: 'Île des Pins' },
        description: { it: 'Spiagge bianche, piscine naturali e pini colonnari rendono quest\'isola uno dei luoghi più iconici e scenografici della Nuova Caledonia.', en: 'White beaches, natural pools and columnar pines make this island one of the most iconic and scenic places in New Caledonia.' },
      },
      {
        title: { it: 'Nouméa', en: 'Nouméa' },
        description: { it: 'La capitale unisce cultura francese, cucina raffinata, mercati locali e spiagge affacciate sulla laguna in un\'atmosfera elegante ma rilassata.', en: 'The capital blends French culture, refined cuisine, local markets and beaches overlooking the lagoon in an elegant yet relaxed atmosphere.' },
      },
      {
        title: { it: 'Costa Est e cultura Kanak', en: 'East Coast and Kanak culture' },
        description: { it: 'La parte orientale dell\'isola principale custodisce villaggi tradizionali, foreste tropicali e un contatto più autentico con la cultura melanesiana locale.', en: 'The eastern part of the main island holds traditional villages, tropical forests and a more authentic connection with local Melanesian culture.' },
      },
      {
        title: { it: 'Snorkeling & Diving nella laguna', en: 'Snorkeling & Diving in the lagoon' },
        description: { it: 'Le acque della Nuova Caledonia offrono alcune delle migliori esperienze marine del Pacifico, tra coralli, tartarughe, mante e reef ancora poco affollati.', en: 'New Caledonia\'s waters offer some of the Pacific\'s finest marine experiences, among corals, turtles, mantas and still uncrowded reefs.' },
      },
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
