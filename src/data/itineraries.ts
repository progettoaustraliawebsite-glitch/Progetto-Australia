export interface ItineraryDay {
  day: number;
  title: { it: string; en: string };
  description: { it: string; en: string };
  images?: string[];
}

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
  mapImage?: string;
  price: { currency: string; amount: number };
  priceEn: { currency: string; amount: number };
  highlights: { it: string[]; en: string[] };
  program: ItineraryDay[];
  included: { it: string[]; en: string[] };
  notIncluded: { it: string[]; en: string[] };
}

const standardNotIncluded = {
  it: [
    'Voli internazionali ed interni',
    'Assicurazione di viaggio',
    'Tutto ciò che non è espressamente indicato nei servizi inclusi',
  ],
  en: [
    'International and domestic flights',
    'Travel insurance',
    'Anything not expressly listed in the included services',
  ],
};

export const itineraries: Itinerary[] = [
  // ─────────────────────────────────────────────
  // 1. AUSTRALIA + BORA BORA — 23 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-bora-bora',
    slug: 'australia-bora-bora',
    title: {
      it: 'Australia e Polinesia — Dal cuore rosso dell\'Australia alle lagune turchesi del Pacifico',
      en: 'Australia & Polynesia — From the Red Heart of Australia to the Turquoise Lagoons of the Pacific',
    },
    description: {
      it: "Un viaggio che unisce la vastità selvaggia dell'Australia — dalla Great Ocean Road all'Uluru — alla magia cristallina di Bora Bora. Da Melbourne alle lagune della Polinesia Francese, passando per il Territorio del Nord e Sydney: un itinerario per chi vuole tutto.",
      en: "A journey combining Australia's wild vastness — from the Great Ocean Road to Uluru — with the crystal magic of Bora Bora. From Melbourne to the lagoons of French Polynesia via the Northern Territory and Sydney: an itinerary for those who want it all.",
    },
    duration: 23,
    destination: 'Australia & French Polynesia',
    type: 'luxury',
    gradient: 'from-cyan-700 to-blue-900',
    image: '/images/dest-whitehaven.jpg',
    price: { currency: 'EUR', amount: 8000 },
    priceEn: { currency: 'USD', amount: 8700 },
    highlights: {
      it: [
        'Great Ocean Road e le Twelve Apostles',
        'Uluru al tramonto e all\'alba',
        'Sydney Opera House e Harbour Bridge',
        'Laguna di Bora Bora in overwater bungalow',
        'Kangaroo Island — fauna australiana autentica',
      ],
      en: [
        'Great Ocean Road and the Twelve Apostles',
        'Uluru at sunset and sunrise',
        'Sydney Opera House and Harbour Bridge',
        'Bora Bora lagoon in an overwater bungalow',
        'Kangaroo Island — authentic Australian wildlife',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo a Melbourne', en: 'Arrival in Melbourne' },
        description: {
          it: 'Arrivo a Melbourne e trasferimento in hotel nel cuore della città. Melbourne è la capitale culturale dell\'Australia: una città europea nell\'anima, con i suoi vicoli decorati di street art, i mercati coperti e la scena gastronomica tra le più vivaci dell\'emisfero australe. Prima passeggiata serale lungo la Yarra River e cena in città.',
          en: 'Arrival in Melbourne and hotel transfer in the heart of the city. Melbourne is Australia\'s cultural capital: a city European in spirit, with its street-art laneway, covered markets and one of the southern hemisphere\'s most vibrant food scenes. First evening stroll along the Yarra River and dinner in the city.',
        },
      },
      {
        day: 2,
        title: { it: 'Melbourne — città e quartieri', en: 'Melbourne — city and neighbourhoods' },
        description: {
          it: 'Giornata libera per esplorare Melbourne: il Queen Victoria Market, uno dei mercati all\'aperto più grandi dell\'emisfero australe aperto dal 1878, i vicoli dei murales (Hosier Lane, AC/DC Lane), la Federazione Square e i quartieri di Fitzroy e Collingwood, con le loro gallerie d\'arte, caffetterie specialty e boutique indipendenti. In serata cena in uno dei ristoranti di Lygon Street, la Little Italy di Melbourne.',
          en: 'Free day to explore Melbourne: Queen Victoria Market, one of the largest open-air markets in the southern hemisphere (open since 1878), the mural laneways (Hosier Lane, AC/DC Lane), Federation Square, and the Fitzroy and Collingwood neighbourhoods with their art galleries, specialty coffee shops and independent boutiques. Evening dinner on Lygon Street, Melbourne\'s Little Italy.',
        },
      },
      {
        day: 3,
        title: { it: 'Great Ocean Road — Twelve Apostles', en: 'Great Ocean Road — Twelve Apostles' },
        description: {
          it: 'Partenza in auto verso ovest lungo la Great Ocean Road, una delle strade costiere più spettacolari del pianeta. La strada si snoda tra foreste di euclipti, spiagge deserte e scogliere che precipitano sull\'oceano. Prima tappa obbligatoria: Bells Beach, la leggendaria spiaggia del surf. Poi Apollo Bay, il Parco Nazionale di Great Otway con le sue foreste di felci arboree e — al tramonto — i Twelve Apostles: imponenti pinnacoli calcarei alti fino a 45 metri che emergono dal Southern Ocean in uno scenario drammatico e indimenticabile.',
          en: 'Drive west along the Great Ocean Road, one of the most spectacular coastal roads on the planet. The road winds through eucalyptus forests, deserted beaches and cliffs plunging into the ocean. First stop: Bells Beach, the legendary surf beach. Then Apollo Bay, the Great Otway National Park with its tree-fern forests, and — at sunset — the Twelve Apostles: imposing limestone pinnacles up to 45 metres tall rising from the Southern Ocean in a dramatic and unforgettable setting.',
        },
      },
      {
        day: 4,
        title: { it: 'Grampians National Park', en: 'Grampians National Park' },
        description: {
          it: 'Direzione nord verso i Grampians, una catena montuosa di arenaria antica che emerge dalla pianura vittoriana. Il parco nazionale offre escursioni spettacolari: il Pinnacle Lookout con vista a 360° sulla pianura, le cascate di McKenzie Falls e le rocce di Boroka. I Grampians ospitano oltre 80 specie di uccelli e sono uno dei luoghi più ricchi di arte rupestre aborigena dell\'Australia meridionale. Alta probabilità di avvistare canguri grigi e koala selvatici al pascolo.',
          en: 'Head north to the Grampians, an ancient sandstone mountain range rising from the Victorian plains. The national park offers spectacular hikes: the Pinnacle Lookout with 360° views over the plains, McKenzie Falls and Boroka Rocks. The Grampians host over 80 bird species and are one of the richest sites for Aboriginal rock art in southern Australia. High chance of spotting wild grey kangaroos and koalas grazing.',
        },
      },
      {
        day: 5,
        title: { it: 'Victor Harbour', en: 'Victor Harbour' },
        description: {
          it: 'Trasferimento verso est in direzione Victor Harbour, affascinante cittadina costiera a 90 km da Adelaide, affacciata sull\'Encounter Bay. Una passeggiata sul molo in legno conduce fino a Granite Island, collegata alla terraferma da un ponte storico percorso ancora oggi da un tram a cavallo. Al tramonto, la colonia di piccoli pinguini fatina (Eudyptula minor) emerge dal mare per rientrare nei loro nidi sotto le rocce: uno degli spettacoli naturali più dolci d\'Australia.',
          en: 'Transfer east to Victor Harbour, a charming coastal town 90km from Adelaide overlooking Encounter Bay. A wooden causeway leads to Granite Island, connected to the mainland by a historic bridge still served today by a horse-drawn tram. At sunset, the colony of little fairy penguins (Eudyptula minor) emerges from the sea to return to their nests under the rocks: one of Australia\'s most endearing natural spectacles.',
        },
      },
      {
        day: 6,
        title: { it: 'Kangaroo Island — Seal Bay', en: 'Kangaroo Island — Seal Bay' },
        description: {
          it: 'Traghetto da Cape Jervis per Kangaroo Island, la terza isola più grande dell\'Australia e uno degli ecosistemi più incontaminati del continente. L\'isola non è mai stata connessa alla terraferma da un ponte, il che ha preservato la sua fauna in modo straordinario. Prima tappa: Seal Bay Conservation Park, dove centinaia di leoni marini australiani (Neophoca cinerea) riposano, giocano e allevano i cuccioli direttamente sulla spiaggia. Una passeggiata guidata al tramonto avvicina il gruppo a pochi metri dagli animali.',
          en: 'Ferry from Cape Jervis to Kangaroo Island, Australia\'s third-largest island and one of the continent\'s most pristine ecosystems. The island has never been connected to the mainland by a bridge, preserving its wildlife in extraordinary ways. First stop: Seal Bay Conservation Park, where hundreds of Australian sea lions (Neophoca cinerea) rest, play and raise their pups directly on the beach. A guided sunset walk brings the group within metres of the animals.',
        },
      },
      {
        day: 7,
        title: { it: 'Kangaroo Island — Flinders Chase', en: 'Kangaroo Island — Flinders Chase' },
        description: {
          it: 'Giornata intera nel Flinders Chase National Park, nell\'estremo ovest dell\'isola. I Remarkable Rocks sono formazioni granitiche di 500 milioni di anni scolpite da vento e mare in forme surreali, affacciate sull\'oceano su un promontorio di 75 metri. L\'Admirals Arch è un arco naturale sotto il quale vive una colonia di otarie dal naso corto. Lungo il tragitto: avvistamento pressoché garantito di canguri canguro di Kangaroo Island (una sottospecie endemica), echidne e wallaby. Rientro in lodge con cena a base di prodotti locali.',
          en: 'Full day in Flinders Chase National Park in the island\'s far west. The Remarkable Rocks are 500-million-year-old granite formations sculpted by wind and sea into surreal shapes, perched on a 75-metre ocean headland. Admirals Arch is a natural rock arch beneath which a colony of New Zealand fur seals lives. Along the way: near-guaranteed sightings of Kangaroo Island kangaroos (an endemic subspecies), echidnas and wallabies. Return to lodge with a dinner of local produce.',
        },
      },
      {
        day: 8,
        title: { it: 'Adelaide', en: 'Adelaide' },
        description: {
          it: 'Traghetto di ritorno e trasferimento ad Adelaide, la città delle chiese e dei festival. Passeggiata nel Central Market coperto, il più antico e vivace mercato alimentare dell\'emisfero australe. Nel pomeriggio, escursione nelle Adelaide Hills fino al villaggio tedesco di Hahndorf, fondato nel 1839 da immigrati prussiani: architetture in legno, produttori di formaggio e birrifici artigianali. Cena nel quartiere di Norwood o Peel Street.',
          en: 'Ferry back and transfer to Adelaide, the city of churches and festivals. Walk through the Central Market, the oldest and most vibrant food market in the southern hemisphere. Afternoon excursion into the Adelaide Hills to the German village of Hahndorf, founded in 1839 by Prussian immigrants: timber architecture, cheesemakers and craft breweries. Dinner in the Norwood or Peel Street quarter.',
        },
      },
      {
        day: 9,
        title: { it: 'Volo per Alice Springs — Red Centre', en: 'Flight to Alice Springs — Red Centre' },
        description: {
          it: 'Volo per Alice Springs, nel cuore geografico dell\'Australia — il Red Centre. La città sorge nel letto del Todd River, un fiume che scorre solo poche volte all\'anno. Visita al Desert Park, dove oltre 320 specie animali del deserto vivono in habitat ricostruiti: dingo, bilby, echidne, aquile australiane. Nel tardo pomeriggio, visita al museo aborigeno Araluen Cultural Precinct per una prima immersione nella cultura dei Arrernte, il popolo che abita questa terra da oltre 40.000 anni.',
          en: 'Flight to Alice Springs, in the geographical heart of Australia — the Red Centre. The town sits in the bed of the Todd River, a waterway that flows only a few times a year. Visit the Desert Park, where over 320 desert animal species live in reconstructed habitats: dingo, bilby, echidna, wedge-tailed eagles. Late afternoon visit to the Araluen Cultural Precinct Aboriginal museum for a first immersion into the culture of the Arrernte, the people who have inhabited this land for over 40,000 years.',
        },
      },
      {
        day: 10,
        title: { it: 'Kings Canyon', en: 'Kings Canyon' },
        description: {
          it: 'Transfer verso Kings Canyon nel Watarrka National Park. Il canyon, scavato in arenaria rossa nel corso di 300 milioni di anni, è profondo oltre 300 metri. Il trekking del Rim Walk (6 km, 3–4 ore) porta lungo il bordo del canyon attraverso formazioni rocciose che sembrano città perdute, fino al Garden of Eden: una pozza d\'acqua nascosta tra le pareti dove crescono cicadi di 300 milioni di anni e palme native. Pausa pranzo al picnic area con vista sull\'Outback infinito.',
          en: 'Transfer to Kings Canyon in Watarrka National Park. The canyon, carved in red sandstone over 300 million years, is over 300 metres deep. The Rim Walk (6km, 3–4 hours) follows the canyon\'s edge through rock formations resembling lost cities, ending at the Garden of Eden: a hidden rock pool where 300-million-year-old cycads and native palms grow. Picnic lunch with views over the endless Outback.',
        },
      },
      {
        day: 11,
        title: { it: 'Uluru — tramonto', en: 'Uluru — sunset' },
        description: {
          it: 'Trasferimento all\'area di Uluru-Kata Tjuta National Park, patrimonio UNESCO e cuore spirituale dell\'Australia. Mattinata al Mutitjulu Waterhole, una pozza d\'acqua permanente ai piedi dell\'Uluru dove vivono echidne e varani, con pitture rupestri Anangu risalenti a migliaia di anni fa. Passeggiata parziale della base (9,4 km totali) con guida aborigena Anangu che spiega il Tjukurpa — il diritto consuetudinario — e il significato spirituale della roccia. Al tramonto: aperitivo panoramico al Talinguru Nyakunytjaku viewing area mentre l\'Uluru si tinge di arancione, rosso intenso e viola.',
          en: 'Transfer to the Uluru-Kata Tjuta National Park, a UNESCO World Heritage site and Australia\'s spiritual heart. Morning at Mutitjulu Waterhole, a permanent water hole at the base of Uluru where echidnas and goannas live, with Anangu rock paintings thousands of years old. Partial base walk (9.4km total) with an Anangu Aboriginal guide explaining Tjukurpa — customary law — and the rock\'s spiritual significance. At sunset: panoramic aperitif at the Talinguru Nyakunytjaku viewing area as Uluru turns orange, deep red and violet.',
        },
      },
      {
        day: 12,
        title: { it: 'Alba sull\'Uluru e Kata Tjuta', en: 'Uluru at dawn and Kata Tjuta' },
        description: {
          it: 'Sveglia prima dell\'alba per raggiungere il Talinguru viewing area: lo spettacolo dell\'Uluru che si illumina lentamente al sorgere del sole è uno dei momenti più emozionanti dell\'intero viaggio. Poi trasferimento a Kata Tjuta (le Olgas), il complesso di 36 formazioni rocciose dolomitiche che circondano l\'Uluru. Escursione nella Valle dei Venti: un percorso tra monoliti alti fino a 546 metri, con viste straordinarie. Kata Tjuta è considerata ancora più sacra dell\'Uluru dagli Anangu, tanto che alcune aree rimangono chiuse ai visitatori.',
          en: 'Early wake-up to reach the Talinguru viewing area: the spectacle of Uluru slowly lighting up at sunrise is one of the most moving moments of the entire journey. Then transfer to Kata Tjuta (the Olgas), the complex of 36 dolomite rock formations surrounding Uluru. Hike through the Valley of the Winds: a path between monoliths up to 546 metres tall, with extraordinary views. Kata Tjuta is considered even more sacred than Uluru by the Anangu, so much so that some areas remain closed to visitors.',
        },
      },
      {
        day: 13,
        title: { it: 'Volo per Sydney', en: 'Flight to Sydney' },
        description: {
          it: 'Volo per Sydney, la città più grande e iconica dell\'Australia. Nel pomeriggio, prima immersione nella città con una passeggiata a Circular Quay: di fronte, l\'Opera House progettata da Jorn Utzon e il Ponte dell\'Harbour, due delle strutture architettoniche più fotografate al mondo. Cena con vista sull\'harbour.',
          en: 'Flight to Sydney, Australia\'s largest and most iconic city. Afternoon first immersion in the city with a walk around Circular Quay: facing you, the Opera House designed by Jorn Utzon and the Harbour Bridge, two of the world\'s most photographed architectural structures. Dinner overlooking the harbour.',
        },
      },
      {
        day: 14,
        title: { it: 'Sydney — Opera House e Harbour', en: 'Sydney — Opera House and Harbour' },
        description: {
          it: 'Mattinata con tour guidato interno all\'Opera House (inaugurata nel 1973, patrimonio UNESCO dal 2007): sale da concerto, foyer, backstage e la storia straordinaria della sua costruzione. Poi passeggiata nel quartiere storico di The Rocks, il primo insediamento europeo d\'Australia (1788). Nel pomeriggio: BridgeClimb sul Harbour Bridge, la salita sui 134 archi metallici del ponte per una vista a 360° sull\'harbour. In serata, bus per Bondi Beach: il tramonto sulla spiaggia più famosa d\'Australia.',
          en: 'Morning guided tour inside the Opera House (inaugurated 1973, UNESCO World Heritage since 2007): concert halls, foyers, backstage areas and the extraordinary story of its construction. Then walk through The Rocks historic quarter, Australia\'s first European settlement (1788). Afternoon BridgeClimb on the Harbour Bridge, climbing the 134 steel arches for 360° harbour views. Evening bus to Bondi Beach: sunset on Australia\'s most famous beach.',
        },
      },
      {
        day: 15,
        title: { it: 'Blue Mountains', en: 'Blue Mountains' },
        description: {
          it: 'Escursione di giornata alle Blue Mountains, patrimonio UNESCO a 90 km da Sydney. Il nome deriva dall\'evaporazione degli oli essenziali degli eucalipti che crea una foschia azzurrina sull\'orizzonte. Tappa ai Three Sisters — i tre pinnacoli rocciosi che emergono dalla valle — con vista dalla Echo Point Lookout. Discesa in funicolare (la più ripida del mondo a 52°) nella Jamison Valley, camminata tra le felci arboree giurassiche e risalita in cable car. Pranzo nel villaggio di Leura.',
          en: 'Day trip to the Blue Mountains, a UNESCO World Heritage area 90km from Sydney. The name comes from the evaporation of eucalyptus essential oils that creates a bluish haze on the horizon. Stop at the Three Sisters — the three rocky pinnacles emerging from the valley — with views from Echo Point Lookout. Descent by funicular railway (the world\'s steepest at 52°) into the Jamison Valley, walk among Jurassic tree ferns and return by cable car. Lunch in the village of Leura.',
        },
      },
      {
        day: 16,
        title: { it: 'Volo per Papeete — Tahiti', en: 'Flight to Papeete — Tahiti' },
        description: {
          it: 'Volo da Sydney verso Papeete (Tahiti), capitale della Polinesia Francese. L\'arrivo in aereo su Tahiti, con la sagoma vulcanica dell\'isola e la laguna verde smeraldo dall\'alto, è già uno spettacolo. Sistemazione in hotel e prima sera nella capitale polinesiana: profumo di monoi, musica ukulele e il mare che si illumina al tramonto.',
          en: 'Flight from Sydney to Papeete (Tahiti), capital of French Polynesia. The aerial arrival over Tahiti, with the island\'s volcanic silhouette and emerald lagoon below, is already spectacular. Hotel check-in and first evening in the Polynesian capital: scent of monoi oil, ukulele music and the sea glowing at sunset.',
        },
      },
      {
        day: 17,
        title: { it: 'Tahiti — mercato e isola', en: 'Tahiti — market and island' },
        description: {
          it: 'Mattinata al Marché de Papeete: un labirinto di colori tra fiori di tiare, perle nere di Tahiti, vaniglia di Moorea e artigianato locale. Il mercato è l\'anima pulsante della città e il posto migliore per capire la vita quotidiana polinesiana. Nel pomeriggio, giro dell\'isola in auto: la costa ovest con le sue spiagge, il museo Paul Gauguin e i giardini botanici di Harrison Smith. In serata, aperitivo sul waterfront con vista sull\'isola di Moorea all\'orizzonte — il profilo triangolare è ipnotico.',
          en: 'Morning at the Marché de Papeete: a labyrinth of colours among tiare flowers, Tahitian black pearls, Moorea vanilla and local crafts. The market is the city\'s beating heart and the best place to understand everyday Polynesian life. Afternoon island circuit by car: the west coast beaches, the Paul Gauguin Museum and Harrison Smith Botanical Gardens. Evening aperitif on the waterfront with views of Moorea\'s triangular silhouette on the horizon — hypnotic.',
        },
      },
      {
        day: 18,
        title: { it: 'Arrivo a Bora Bora', en: 'Arrival in Bora Bora' },
        description: {
          it: 'Volo per Bora Bora. L\'atterraggio sull\'atollo è già un\'emozione: la pista è su un motu (isoletta corallina) e si atterra con la laguna da entrambi i lati. Transfer in barca motore verso il resort: il Monte Otemanu (727 m) si staglia sopra una laguna così blu da sembrare irreale. Check-in nell\'overwater bungalow: il pavimento in vetro mostra i pesci che nuotano sotto, la terrazza privata si affaccia direttamente sulla laguna.',
          en: 'Flight to Bora Bora. Landing on the atoll is already an emotion: the runway sits on a motu (coral islet) and you land with the lagoon on both sides. Speedboat transfer to the resort: Mount Otemanu (727m) rises above a lagoon so blue it seems unreal. Check-in at the overwater bungalow: the glass floor reveals fish swimming below, the private terrace opens directly onto the lagoon.',
        },
      },
      {
        day: 19,
        title: { it: 'Bora Bora — laguna e snorkeling', en: 'Bora Bora — lagoon and snorkelling' },
        description: {
          it: 'Giornata in laguna con escursione in barca: prima tappa ai coral gardens per lo snorkeling tra pesci pappagallo, napoleone e una miriade di specie tropicali. Poi incontro con le mante giganti (Manta birostris) in uno dei siti di avvistamento più affidabili della Polinesia: questi animali di 4–6 metri di apertura alare filtrano il plancton a pochi metri dai nuotatori. Nel pomeriggio, sosta su un motu privato con spiaggia di sabbia bianca per aperitivo al tramonto. La laguna di Bora Bora è considerata la più bella del mondo.',
          en: 'Day on the lagoon with boat excursion: first stop at the coral gardens for snorkelling among parrotfish, Napoleon wrasse and a myriad of tropical species. Then encounter with giant manta rays (Manta birostris) at one of Polynesia\'s most reliable sighting sites: these animals with a 4–6 metre wingspan filter plankton just metres from swimmers. Afternoon stop on a private motu with white sand beach for sunset aperitifs. Bora Bora\'s lagoon is considered the most beautiful in the world.',
        },
      },
      {
        day: 20,
        title: { it: 'Bora Bora — giornata libera', en: 'Bora Bora — free day' },
        description: {
          it: 'Giornata completamente libera per vivere Bora Bora al proprio ritmo. Chi cerca adrenalina può optare per il jet ski attorno all\'atollo, il kitesurfing o il windsurf. Chi cerca pace: kayak nella laguna, paddle in piedi tra i coralli, nuoto dal pontile del bungalow. I resort offrono anche massaggi tradizionali polinesiani con olio di monoi profumato al tiare — il modo migliore per concludere un pomeriggio in paradiso.',
          en: 'Completely free day to experience Bora Bora at your own pace. For those seeking adventure: jet ski around the atoll, kitesurfing or windsurfing. For those seeking peace: kayaking on the lagoon, stand-up paddle among the corals, swimming from the bungalow pier. Resorts also offer traditional Polynesian massages with tiare-scented monoi oil — the perfect way to end a paradise afternoon.',
        },
      },
      {
        day: 21,
        title: { it: 'Bora Bora — tour dell\'isola', en: 'Bora Bora — island tour' },
        description: {
          it: 'Tour dell\'isola principale in 4x4: il giro completo è di soli 32 km ma rivela angoli inaspettati. Salita ai belvedere sul Monte Pahia con vista sulla laguna dall\'alto — la prospettiva aerea rivela i diversi colori dell\'acqua, dal turchese al blu cobalto al verde smeraldo secondo la profondità. Visita ai cannoni americani della Seconda Guerra Mondiale, installati nel 1942 per difendere l\'atollo. Sosta nei villaggi locali di Vaitape e Faanui, dove la vita scorre lenta tra pescherie e piccoli mercati.',
          en: 'Tour of the main island by 4WD: the complete circuit is only 32km but reveals unexpected corners. Climb to viewpoints on Mount Pahia with aerial views of the lagoon — the aerial perspective reveals the different water colours, from turquoise to cobalt blue to emerald green depending on depth. Visit to the American WWII cannons installed in 1942 to defend the atoll. Stop in the local villages of Vaitape and Faanui, where life moves slowly among fish stalls and small markets.',
        },
      },
      {
        day: 22,
        title: { it: 'Ultima mattina a Bora Bora', en: 'Last morning in Bora Bora' },
        description: {
          it: 'Ultima mattina libera nella laguna. Shopping finale di perle nere di Tahiti — la Polinesia Francese produce le perle nere più belle al mondo, coltivate nell\'ostrica Pinctada margaritifera — e di artigianato locale. Pranzo finale al resort con vista sull\'Otemanu. Nel pomeriggio, transfer in barca all\'aeroporto e volo per Papeete in vista del rientro.',
          en: 'Last free morning on the lagoon. Final shopping for Tahitian black pearls — French Polynesia produces the world\'s finest black pearls, cultivated in the Pinctada margaritifera oyster — and local crafts. Final lunch at the resort with Otemanu views. Afternoon speedboat transfer to the airport and flight to Papeete for the return journey.',
        },
      },
      {
        day: 23,
        title: { it: 'Rientro in Europa', en: 'Return to Europe' },
        description: {
          it: 'Volo da Papeete verso l\'Europa, solitamente con scalo a Los Angeles (LAX) e poi verso l\'Italia. Il viaggio di rientro è lungo, ma ripercorrendo mentalmente le tappe — Melbourne, la Great Ocean Road, Kangaroo Island, l\'Uluru, Sydney, Bora Bora — si capisce perché questo sia uno degli itinerari più amati dai viaggiatori di Progetto Australia. Fine di un\'avventura indimenticabile.',
          en: 'Flight from Papeete to Europe, usually via Los Angeles (LAX) and then to Italy. The return journey is long, but mentally retracing the stages — Melbourne, the Great Ocean Road, Kangaroo Island, Uluru, Sydney, Bora Bora — makes clear why this is one of Progetto Australia\'s most-loved itineraries. End of an unforgettable adventure.',
        },
      },
    ],
    included: {
      it: [
        'Sistemazioni in hotel 4–5 stelle per l\'intera durata del viaggio',
        'Overwater bungalow a Bora Bora (minimo 3 notti)',
        'Traghetto Kangaroo Island andata e ritorno (Cape Jervis ↔ Penneshaw)',
        'Voli interni: Melbourne → Adelaide, Alice Springs → Sydney, Sydney → Papeete, Papeete → Bora Bora',
        'Tutti i trasferimenti terrestri e marittimi tra le destinazioni',
        'Escursione guidata alla base dell\'Uluru con guida aborigena Anangu',
        'Tour guidato interno all\'Opera House di Sydney',
        'Escursione in laguna a Bora Bora con snorkeling e visita al motu privato',
        'BridgeClimb sul Harbour Bridge di Sydney',
        'Tour 4x4 di Bora Bora',
        'Visita a Seal Bay Conservation Park con guida (Kangaroo Island)',
        'Assistenza Progetto Australia per tutta la durata',
      ],
      en: [
        '4–5 star hotel accommodation throughout',
        'Overwater bungalow in Bora Bora (minimum 3 nights)',
        'Kangaroo Island ferry return (Cape Jervis ↔ Penneshaw)',
        'Internal flights: Melbourne → Adelaide, Alice Springs → Sydney, Sydney → Papeete, Papeete → Bora Bora',
        'All land and sea transfers between destinations',
        'Guided Uluru base walk with Anangu Aboriginal guide',
        'Sydney Opera House internal guided tour',
        'Bora Bora lagoon excursion with snorkelling and private motu stop',
        'Sydney Harbour Bridge Climb',
        'Bora Bora 4WD island tour',
        'Seal Bay Conservation Park guided visit (Kangaroo Island)',
        'Progetto Australia assistance throughout',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // 2. MERAVIGLIOSA POLINESIA — 16 giorni
  // ─────────────────────────────────────────────
  {
    id: 'meravigliosa-polinesia',
    slug: 'meravigliosa-polinesia',
    title: {
      it: 'Polinesia in catamarano — meraviglioso viaggio tra Raiatea, Taha\'a, Bora Bora e Moorea',
      en: 'Polynesia by Catamaran — A Wonderful Journey among Raiatea, Taha\'a, Bora Bora and Moorea',
    },
    description: {
      it: "Un viaggio nel cuore della Polinesia Francese, tra atolli da sogno, lagune turchesi e ritmi lenti. Da Papeete a Raiatea, Taha'a e Bora Bora a bordo di un catamarano, fino a Moorea: ogni isola è un mondo a sé, ogni tramonto un'opera d'arte.",
      en: "A journey into the heart of French Polynesia, among dream atolls, turquoise lagoons and slow rhythms. From Papeete to Raiatea, Taha'a and Bora Bora aboard a catamaran, then Moorea: each island is a world of its own, every sunset a work of art.",
    },
    duration: 16,
    destination: 'French Polynesia',
    type: 'luxury',
    gradient: 'from-teal-600 to-cyan-900',
    image: '/images/hero-french-polynesia.png',
    price: { currency: 'EUR', amount: 9730 },
    priceEn: { currency: 'USD', amount: 10600 },
    highlights: {
      it: [
        'Crociera in catamarano tra le isole Sottovento',
        'Snorkeling con mante e squali di barriera a Bora Bora',
        'Raiatea — isola sacra del Pacifico',
        "Taha'a — l'isola della vaniglia",
        'Nuoto con mante e delfini a Moorea',
      ],
      en: [
        'Catamaran cruise among the Leeward Islands',
        'Snorkelling with manta rays and reef sharks in Bora Bora',
        'Raiatea — the sacred island of the Pacific',
        "Taha'a — the vanilla island",
        'Swimming with rays and dolphins in Moorea',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo a Papeete', en: 'Arrival in Papeete' },
        description: {
          it: "Arrivo all'aeroporto internazionale di Fa'a'ā a Papeete. Il primo impatto con la Polinesia Francese è già un'emozione: l'aria calda e umida, il profumo del tiare mahoi (il fiore nazionale), le ghirlande di fiori offerte all'arrivo. Trasferimento in hotel e prima serata nella capitale polinesiana. Cena sul waterfront del Quai de Moorea, con la sagoma dell'isola cuore illuminata all'orizzonte.",
          en: "Arrival at Fa'a'ā International Airport in Papeete. The first contact with French Polynesia is already an emotion: the warm humid air, the scent of tiare mahoi (the national flower), the garlands of flowers offered on arrival. Hotel transfer and first evening in the Polynesian capital. Dinner on the Quai de Moorea waterfront, with the heart-shaped island silhouette lit on the horizon.",
        },
      },
      {
        day: 2,
        title: { it: 'Papeete — mercato e città', en: 'Papeete — market and city' },
        description: {
          it: "Mattinata al Marché de Papeete, un labirinto di banconi traboccanti di fiori di tiare, vaniglia di Moorea, monoi profumato, perle nere coltivate e artigianato in madreperla. Il mercato è il luogo più autentico per capire la Polinesia quotidiana. Nel pomeriggio, visita al Musée de Tahiti et des Îles per comprendere la storia delle migrazioni polinesiane attraverso il Pacifico e la cultura locale. Serata libera: aperitivo nei roulotte truck (i furgoni bar dello street food polinesiano) lungo il waterfront.",
          en: "Morning at the Marché de Papeete, a labyrinth of stalls overflowing with tiare flowers, Moorea vanilla, scented monoi oil, cultured black pearls and mother-of-pearl crafts. The market is the most authentic place to understand everyday Polynesia. Afternoon visit to the Musée de Tahiti et des Îles to understand the history of Polynesian Pacific migrations and local culture. Free evening: aperitif at the roulotte trucks (Polynesian street food vans) along the waterfront.",
        },
      },
      {
        day: 3,
        title: { it: 'Volo per Raiatea — imbarco catamarano', en: 'Flight to Raiatea — catamaran boarding' },
        description: {
          it: "Volo di 45 minuti per Raiatea, la seconda isola più grande della Polinesia Francese dopo Tahiti. Raiatea è l'isola sacra per eccellenza: secondo la tradizione orale polinesiana, è qui che nacquero gli dèi e da qui partirono i grandi navigatori che colonizzarono il Pacifico in canoa fino alle Hawaii e alla Nuova Zelanda. Imbarco sul catamarano che sarà la nostra casa per i prossimi giorni. Cena a bordo nel porto di Uturoa mentre il sole tramonta sulle montagne.",
          en: "45-minute flight to Raiatea, French Polynesia's second-largest island after Tahiti. Raiatea is the sacred island par excellence: according to Polynesian oral tradition, the gods were born here and the great navigators who colonised the Pacific by canoe to Hawaii and New Zealand set off from here. Board the catamaran that will be our home for the next few days. Dinner on board in Uturoa harbour as the sun sets over the mountains.",
        },
      },
      {
        day: 4,
        title: { it: 'Raiatea — Marae Taputapuātea', en: 'Raiatea — Marae Taputapuātea' },
        description: {
          it: "Navigazione verso il Marae Taputapuātea, patrimonio UNESCO e luogo spirituale più importante di tutta la Polinesia — e probabilmente di tutto il Pacifico. Il marae è una piattaforma di corallo costruita dai polinesiani come luogo di riunione, culto e sacrificio. Qui si decidevano alleanze tra isole, si celebravano le cerimonie più importanti e i navigatori chiedevano protezione prima di salpare. Il sito conserva ancora la sua aura misteriosa. Nel pomeriggio, navigazione intorno all\'isola con snorkeling nei coral gardens.",
          en: "Sail to Marae Taputapuātea, a UNESCO World Heritage site and the most important spiritual place in all of Polynesia — and arguably in the entire Pacific. The marae is a coral platform built by Polynesians as a gathering place for worship and ceremony. This is where inter-island alliances were decided, the most important ceremonies celebrated, and where navigators sought protection before setting sail. The site still preserves its mysterious aura. Afternoon sailing around the island with snorkelling in the coral gardens.",
        },
      },
      {
        day: 5,
        title: { it: "Taha'a — l'isola della vaniglia", en: "Taha'a — the vanilla island" },
        description: {
          it: "Navigazione verso Taha'a, l'isola che profuma letteralmente di vaniglia. Taha'a e Raiatea condividono la stessa laguna, ma hanno caratteri completamente diversi: Taha'a è dolce, silenziosa, agricola. Produce circa l'80% della vaniglia di Tahiti, la più pregiata al mondo per il suo aroma floreale unico. Visita a una piantagione dove la vaniglia cresce come liana sulle radici degli alberi — la fioritura avviene una volta l'anno e ogni fiore viene impollinato a mano. Nel pomeriggio, snorkeling nella barriera corallina esterna con pesci dalle mille forme.",
          en: "Sail to Taha'a, the island that literally smells of vanilla. Taha'a and Raiatea share the same lagoon but have completely different characters: Taha'a is sweet, quiet, agricultural. It produces about 80% of Tahitian vanilla, the world's most prized for its unique floral aroma. Visit a plantation where vanilla grows as a vine on tree roots — it flowers once a year and each flower is hand-pollinated. Afternoon snorkelling on the outer coral reef among endlessly varied fish.",
        },
      },
      {
        day: 6,
        title: { it: "Taha'a — motu privato", en: "Taha'a — private motu" },
        description: {
          it: "Giornata su un motu privato nel lagoon di Taha'a. I motu sono piccole isole di sabbia e corallo che emergono dalla laguna attorno all'isola principale: spiagge di sabbia bianca fine, palme, acque bassissime e trasparenti. Pranzo a bordo del catamarano con pesce fresco. Snorkeling tra le stelle marine giganti (Culcita novaeguineae) che riposano sul fondo sabbioso. Nel tardo pomeriggio, aperitivo al tramonto sul ponte del catamarano: uno dei momenti più romantici del viaggio.",
          en: "Day on a private motu in Taha'a's lagoon. The motu are small sand and coral islands rising from the lagoon around the main island: fine white sand beaches, palm trees, shallow and crystal-clear waters. Lunch on board the catamaran with fresh fish. Snorkelling among giant starfish (Culcita novaeguineae) resting on the sandy bottom. Late afternoon sunset aperitif on the catamaran deck: one of the journey's most romantic moments.",
        },
      },
      {
        day: 7,
        title: { it: 'Navigazione verso Bora Bora', en: 'Sailing towards Bora Bora' },
        description: {
          it: "Navigazione in catamarano verso Bora Bora. Il viaggio richiede qualche ora e si naviga in mare aperto tra le due isole. L'avvistamento del Monte Otemanu che emerge dall'oceano mentre ci si avvicina è uno dei momenti più emozionanti del viaggio: la montagna vulcanica si riflette nella laguna creando un quadro che sembra dipinto. Ingresso nella laguna di Bora Bora attraverso il canale principale. Ancoraggio nel lagoon con vista sul resort.",
          en: "Catamaran sail to Bora Bora. The crossing takes a few hours in open sea between the two islands. The first sighting of Mount Otemanu rising from the ocean as you approach is one of the journey's most moving moments: the volcanic mountain reflects in the lagoon creating a scene that looks painted. Entry into Bora Bora's lagoon through the main channel. Anchoring in the lagoon with resort views.",
        },
      },
      {
        day: 8,
        title: { it: 'Bora Bora — snorkeling con mante e squali', en: 'Bora Bora — snorkelling with rays and sharks' },
        description: {
          it: "Escursione in laguna: la barca porta in tre siti distinti. Prima tappa: le mante — in questo tratto di laguna vivono stabilmente sia le mante giganti (Manta birostris) che le mante di barriera (Mobula alfredi). Seconda tappa: gli squali del reef — punta nera e punta bianca, innocui ma impressionanti da vicino, nuotano tra i bagnanti in acqua bassa. Terza tappa: i coral gardens con pesci tropicali di ogni specie. Pranzo su un motu privato. Pomeriggio libero sulla spiaggia o a bordo.",
          en: "Lagoon excursion: the boat visits three distinct sites. First stop: the manta rays — both giant manta rays (Manta birostris) and reef manta rays (Mobula alfredi) live permanently in this section of the lagoon. Second stop: the reef sharks — blacktip and whitetip, harmless but impressive up close, swimming among bathers in shallow water. Third stop: the coral gardens with tropical fish of every species. Lunch on a private motu. Free afternoon on the beach or aboard.",
        },
      },
      {
        day: 9,
        title: { it: 'Bora Bora — tour 4x4 e belvedere', en: 'Bora Bora — 4WD tour and viewpoints' },
        description: {
          it: "Tour dell'isola principale in 4x4. L'isola di Bora Bora ha un perimetro di soli 32 km ma nasconde storia e paesaggi straordinari. Salita ai belvedere sul Monte Pahia (661 m): dall'alto, la laguna mostra tutti i suoi colori — turchese chiaro sulle zone di barriera, blu cobalto in profondità, verde smeraldo nelle baie riparate. Visita ai cannoni della Seconda Guerra Mondiale: nel 1942 gli Stati Uniti installarono sull'isola batterie di artiglieria che non spararono mai un colpo. Villaggi di Vaitape e Faanui, mercato delle perle.",
          en: "4WD tour of the main island. Bora Bora's main island has a perimeter of just 32km but conceals extraordinary history and landscapes. Climb to viewpoints on Mount Pahia (661m): from above, the lagoon reveals all its colours — pale turquoise over the reef zones, cobalt blue in the depths, emerald green in the sheltered bays. Visit to the WWII cannons: in 1942 the United States installed artillery batteries on the island that never fired a single shot. Villages of Vaitape and Faanui, pearl market.",
        },
      },
      {
        day: 10,
        title: { it: 'Bora Bora — giornata libera', en: 'Bora Bora — free day' },
        description: {
          it: "Giornata completamente libera a Bora Bora. Le opzioni sono infinite: kayak nella laguna cristallina, paddleboard al tramonto, lezione di surf, giro in jet ski attorno all'atollo, o semplicemente relax sulla spiaggia bianca del motu davanti al resort. I resort offrono massaggi tradizionali polinesiani con monoi all'olio di cocco e tiare — il modo perfetto per ricaricarsi dopo giorni di navigazione.",
          en: "Completely free day in Bora Bora. Options are endless: kayaking on the crystal lagoon, sunset paddleboarding, surf lesson, jet ski around the atoll, or simply relaxing on the white sand beach of the motu in front of the resort. Resorts offer traditional Polynesian massages with coconut and tiare monoi oil — the perfect way to recharge after days of sailing.",
        },
      },
      {
        day: 11,
        title: { it: 'Sbarco e volo per Moorea', en: 'Disembark and flight to Moorea' },
        description: {
          it: "Ultima colazione a bordo del catamarano. Sbarco e trasferimento all'aeroporto di Bora Bora per il volo per Moorea. Moorea è a 20 minuti di volo da Papeete e si chiama l'\"isola cuore\" sia per la sua forma vista dall'alto, sia per il posto speciale che occupa nel cuore dei polinesiani. La laguna di Moorea è una delle più belle della Polinesia, con le sue due baie iconiche — Cook Bay e Opunohu Bay — incorniciate da montagne vulcaniche.",
          en: "Last breakfast on board the catamaran. Disembark and transfer to Bora Bora airport for the flight to Moorea. Moorea is 20 minutes by air from Papeete and is called the \"heart island\" both for its shape seen from above and for the special place it holds in Polynesian hearts. Moorea's lagoon is one of Polynesia's most beautiful, with its two iconic bays — Cook Bay and Opunohu Bay — framed by volcanic mountains.",
        },
      },
      {
        day: 12,
        title: { it: 'Moorea — Cook Bay e Opunohu Bay', en: 'Moorea — Cook Bay and Opunohu Bay' },
        description: {
          it: "Prima giornata su Moorea dedicata alla scoperta dell'isola. Le due baie di Moorea sono le più fotografate della Polinesia: Cook Bay è profonda e raccolta, con le montagne che si specchiano nell'acqua verde scuro; Opunohu Bay è più larga e luminosa, circondata da colline ricoperte di noni, mango e ibiscus. Salita al Belvedere (396 m) per il panorama sull'isola intera. Nel pomeriggio, kayak nella Cook Bay al tramonto: luce dorata, silenzio e il riflesso dei picchi vulcanici sull'acqua.",
          en: "First day on Moorea dedicated to discovering the island. Moorea's two bays are the most photographed in Polynesia: Cook Bay is deep and intimate, with mountains mirrored in dark green water; Opunohu Bay is wider and brighter, surrounded by hills covered in noni, mango and hibiscus. Climb to the Belvedere (396m) for panoramic views of the whole island. Afternoon kayaking in Cook Bay at sunset: golden light, silence and the reflection of volcanic peaks on the water.",
        },
      },
      {
        day: 13,
        title: { it: 'Moorea — mante e delfini', en: 'Moorea — rays and dolphins' },
        description: {
          it: "Escursione in barca nel canale tra Moorea e Tahiti, uno dei punti più ricchi di fauna marina della Polinesia Francese. Prima tappa: nuoto con le mante giganti in acque profonde — le mante di Moorea sono abituate alla presenza umana e si avvicinano incuriosite. Seconda tappa: i delfini. Il canale è percorso da branchi di delfini spinner (Stenella longirostris) e delfini comuni che spesso si avvicinano alle barche per giocare nelle onde della prua. Un'esperienza naturalistica di rara bellezza.",
          en: "Boat excursion in the channel between Moorea and Tahiti, one of the richest areas for marine wildlife in French Polynesia. First stop: swimming with giant manta rays in deep water — Moorea's manta rays are accustomed to human presence and approach out of curiosity. Second stop: dolphins. The channel is traversed by pods of spinner dolphins (Stenella longirostris) and common dolphins that often approach boats to play in the bow waves. A wildlife experience of rare beauty.",
        },
      },
      {
        day: 14,
        title: { it: 'Moorea — giornata libera', en: 'Moorea — free day' },
        description: {
          it: "Ultima giornata intera in Polinesia: tempo libero per assaporare ogni momento. Possibilità di fare snorkeling nel lagoon di fronte al resort (razze, tartarughe e pesci tropicali si avvicinano facilmente alle spiagge di Moorea), di fare un giro in quad sull'isola o di dedicarsi agli acquisti di perle nere e vaniglia prima del rientro. Cena d'addio con tramonto polinesiano.",
          en: "Last full day in Polynesia: free time to savour every moment. Options include snorkelling in the resort lagoon (stingrays, turtles and tropical fish easily approach Moorea's beaches), a quad bike tour of the island, or shopping for black pearls and vanilla before heading home. Farewell dinner at sunset.",
        },
      },
      {
        day: 15,
        title: { it: 'Ritorno a Papeete', en: 'Return to Papeete' },
        description: {
          it: "Traghetto o volo per Papeete (20 minuti). Pomeriggio libero nella capitale per gli ultimi acquisti o per visitare la cattedrale di Notre Dame de Papeete. Serata libera per la cena d'addio alla Polinesia. Transfer all'aeroporto per il volo di mezzanotte.",
          en: "Ferry or flight to Papeete (20 minutes). Free afternoon in the capital for last-minute shopping or a visit to Notre Dame de Papeete cathedral. Free evening for a farewell dinner in Polynesia. Transfer to the airport for the midnight flight.",
        },
      },
      {
        day: 16,
        title: { it: 'Rientro in Europa', en: 'Return to Europe' },
        description: {
          it: "Volo di rientro verso l'Europa, solitamente con scalo a Los Angeles (LAX) e poi verso l'Italia. Il viaggio aereo da Papeete all'Italia è di circa 20 ore totali — il prezzo da pagare per il paradiso più lontano d'Europa. Fine di uno dei viaggi più sognati al mondo.",
          en: "Return flight to Europe, usually via Los Angeles (LAX) and then to Italy. The total flight time from Papeete to Italy is around 20 hours — the price to pay for Europe's most distant paradise. End of one of the world's most dreamed-of journeys.",
        },
      },
    ],
    included: {
      it: [
        'Sistemazioni in hotel 4–5 stelle o resort overwater a Papeete e Moorea',
        'Crociera in catamarano 7 notti (Raiatea, Taha\'a, Bora Bora) in mezza pensione a bordo',
        'Voli interni: Papeete–Raiatea e Bora Bora–Moorea',
        'Traghetto o volo rapido Moorea–Papeete',
        'Tutti i trasferimenti aeroporto/porto/hotel',
        'Escursione in laguna con snorkeling a Bora Bora (mante, squali, coral gardens, motu)',
        'Tour 4x4 di Bora Bora',
        'Escursione con mante e delfini a Moorea',
        'Visita alle piantagioni di vaniglia di Taha\'a',
        'Visita al Marae Taputapuātea di Raiatea',
        'Assistenza Progetto Australia per tutta la durata',
      ],
      en: [
        '4–5 star hotel or overwater resort in Papeete and Moorea',
        '7-night catamaran cruise (Raiatea, Taha\'a, Bora Bora) with half-board on board',
        'Internal flights: Papeete–Raiatea and Bora Bora–Moorea',
        'Moorea–Papeete ferry or shuttle flight',
        'All airport/port/hotel transfers',
        'Bora Bora lagoon excursion with snorkelling (rays, sharks, coral gardens, motu)',
        'Bora Bora 4WD island tour',
        'Manta ray and dolphin excursion in Moorea',
        'Vanilla plantation visit in Taha\'a',
        'Marae Taputapuātea visit in Raiatea',
        'Progetto Australia assistance throughout',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // 3. NUOVA ZELANDA + POLINESIA — 24 giorni
  // ─────────────────────────────────────────────
  {
    id: 'nuova-zelanda-polinesia',
    slug: 'nuova-zelanda-polinesia',
    title: {
      it: 'Nuova Zelanda e Polinesia — viaggio tra i paesaggi più spettacolari del mondo',
      en: 'New Zealand & Polynesia — A Journey Through the World\'s Most Spectacular Landscapes',
    },
    description: {
      it: "Dalla Terra di Mezzo alla Polinesia: un viaggio che attraversa la Nuova Zelanda da Queenstown a Auckland passando per Milford Sound, il lago Tekapo e Rotorua, per poi immergersi nella magia tropicale di Moorea e Bora Bora.",
      en: "From Middle-Earth to Polynesia: a journey across New Zealand from Queenstown to Auckland via Milford Sound, Lake Tekapo and Rotorua, then plunging into the tropical magic of Moorea and Bora Bora.",
    },
    duration: 24,
    destination: 'New Zealand & French Polynesia',
    type: 'adventure',
    gradient: 'from-emerald-700 to-teal-900',
    image: '/images/hero-new-zealand.png',
    price: { currency: 'EUR', amount: 9710 },
    priceEn: { currency: 'USD', amount: 10600 },
    highlights: {
      it: [
        'Milford Sound — fiordo più bello del mondo',
        'Lago Tekapo e il cielo stellato più puro',
        'Hobbiton — la Contea di Tolkien',
        'Rotorua — cultura Maori e geotermale',
        'Bora Bora e Moorea — Polinesia pura',
      ],
      en: [
        'Milford Sound — the world\'s most beautiful fjord',
        'Lake Tekapo and the purest starry sky',
        'Hobbiton — Tolkien\'s Shire',
        'Rotorua — Maori culture and geothermal wonders',
        'Bora Bora and Moorea — pure Polynesia',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' },
        description: {
          it: "Arrivo ad Auckland, la City of Sails, la città più grande della Nuova Zelanda con oltre 1,7 milioni di abitanti. Auckland sorge su un istmo vulcanico tra due porti: l'harbour di Waitemata a est (Pacifico) e il porto di Manukau a ovest (Tasman). Trasferimento in hotel nel quartiere di Viaduct Harbour e prima passeggiata serale sul lungomare tra yacht da regata e ristoranti di pesce.",
          en: "Arrival in Auckland, the City of Sails, New Zealand's largest city with over 1.7 million inhabitants. Auckland sits on a volcanic isthmus between two harbours: Waitemata to the east (Pacific) and Manukau to the west (Tasman). Hotel transfer in the Viaduct Harbour quarter and first evening stroll along the marina among racing yachts and seafood restaurants.",
        },
      },
      {
        day: 2,
        title: { it: 'Volo per Queenstown', en: 'Flight to Queenstown' },
        description: {
          it: "Volo per Queenstown, sull'Isola del Sud. L'atterraggio su Queenstown è già uno spettacolo: la pista si trova a bordo lago Wakatipu e l'aereo sembra atterrare sull'acqua con le montagne Remarkables sullo sfondo. Queenstown è la capitale mondiale dell'avventura — bungee jumping, skydiving, jet boat, sci — ma è anche una città elegante con ottimi ristoranti e cantine. Check-in in hotel con vista sul lago e sulle montagne.",
          en: "Flight to Queenstown on the South Island. Landing at Queenstown is already spectacular: the runway sits at the edge of Lake Wakatipu and the plane seems to land on the water with the Remarkables mountains in the background. Queenstown is the world's adventure capital — bungee jumping, skydiving, jet boating, skiing — but also an elegant town with excellent restaurants and wineries. Hotel check-in with lake and mountain views.",
        },
      },
      {
        day: 3,
        title: { it: 'Queenstown — lago e panorami', en: 'Queenstown — lake and panoramas' },
        description: {
          it: "Giornata a Queenstown: salita in gondola sul Bob's Peak (450 m) con vista a 360° sul lago Wakatipu e sulle Remarkables Range. Crociera in battello a vapore TSS Earnslaw (costruito nel 1912) fino a Walter Peak Station, un'autentica fattoria di pecore sulle sponde del lago. Nel pomeriggio: jet boat sull'Shotover River (optional) o wine tasting a Gibbston Valley, la valley dei pinot noir più premiati della Nuova Zelanda.",
          en: "Day in Queenstown: gondola to Bob's Peak (450m) with 360° views of Lake Wakatipu and the Remarkables Range. Cruise on the TSS Earnslaw steamship (built 1912) to Walter Peak Station, an authentic sheep farm on the lake's shores. Afternoon: jet boating on the Shotover River (optional) or wine tasting in Gibbston Valley, the valley of New Zealand's most award-winning pinot noirs.",
        },
      },
      {
        day: 4,
        title: { it: 'Glenorchy e location del Signore degli Anelli', en: 'Glenorchy and Lord of the Rings locations' },
        description: {
          it: "Escursione verso Glenorchy, a 45 minuti da Queenstown lungo il lago Wakatipu. La strada che porta a Glenorchy è già un'opera d'arte: montagne innevate, boschi di faggi rossi e il lago che cambia colore a ogni curva. Glenorchy e la Paradise Valley ospitano molte delle location del Signore degli Anelli: Isengard, Lothlórien, Amon Hen. Escursione a piedi nella Dart River Valley con guida specializzata nelle location cinematografiche. Picnic in uno dei paesaggi più belli al mondo.",
          en: "Excursion to Glenorchy, 45 minutes from Queenstown along Lake Wakatipu. The road to Glenorchy is already a work of art: snow-capped mountains, red beech forests and the lake changing colour at every bend. Glenorchy and the Paradise Valley host many Lord of the Rings locations: Isengard, Lothlórien, Amon Hen. Walk in the Dart River Valley with a specialist film location guide. Picnic in one of the world's most beautiful landscapes.",
        },
      },
      {
        day: 5,
        title: { it: 'Milford Sound', en: 'Milford Sound' },
        description: {
          it: "Il giorno più atteso: trasferimento verso Milford Sound attraverso il Fiordland National Park, patrimonio UNESCO. La Milford Road è una delle strade più scenografiche del mondo: passa attraverso la Homer Tunnel (1.270 m sotto la montagna), la Valle di Eglinton con i suoi faggi argentati, Mirror Lakes dove le montagne si riflettono perfettamente nell'acqua. La crociera nel fiordo dura 2 ore: cascate che precipitano da centinaia di metri, leoni marini di Nuova Zelanda che riposano sulle rocce, talvolta delfini e pinguini.",
          en: "The most awaited day: transfer to Milford Sound through the UNESCO World Heritage Fiordland National Park. The Milford Road is one of the world's most scenic drives: it passes through the Homer Tunnel (1,270m through the mountain), the Eglinton Valley with its silver beech trees, Mirror Lakes where mountains perfectly reflect in the water. The fjord cruise lasts 2 hours: waterfalls plunging from hundreds of metres, New Zealand fur seals resting on rocks, sometimes dolphins and penguins.",
        },
      },
      {
        day: 6,
        title: { it: 'Ritorno verso l\'Isola del Sud', en: 'Back through the South Island' },
        description: {
          it: "Mattinata libera a Milford Sound — se la fortuna aiuta, la nebbia mattutina crea un'atmosfera ancora più mistica nel fiordo. Inizio del trasferimento verso est in direzione Tekapo attraverso le pianure dell'Isola del Sud. Pausa al Lindis Pass (971 m) — crinale che separa Otago da Canterbury — dove in estate le colline sono coperte di tussock dorato. Nel tardo pomeriggio, arrivo a Cromwell nella Otago centrale, famosa per le ciliegie, le pesche e il pinot noir.",
          en: "Free morning at Milford Sound — if luck is on your side, the morning mist creates an even more mystical atmosphere in the fjord. Begin the drive east towards Tekapo through the South Island plains. Stop at the Lindis Pass (971m) — the ridge separating Otago from Canterbury — where in summer the hills are covered in golden tussock. Late afternoon arrival in Cromwell in Central Otago, famous for cherries, peaches and pinot noir.",
        },
      },
      {
        day: 7,
        title: { it: 'Lake Tekapo e Aoraki/Monte Cook', en: 'Lake Tekapo and Aoraki/Mount Cook' },
        description: {
          it: "Arrivo al lago Tekapo: l'acqua color turchese-latte è causata dalla \"farina glaciale\" — particelle finissime di roccia sospese nell'acqua che riflettono la luce del sole in modo unico. La piccola Church of the Good Shepherd, costruita nel 1935 in pietra locale con una finestra che inquadra il lago e le montagne, è una delle scene più fotografate della Nuova Zelanda. Nel pomeriggio: trasferimento fino ad Aoraki/Monte Cook Village per vedere da vicino il Monte Cook (3.724 m), la montagna più alta della Nuova Zelanda. Serata: stargazing nel Mackenzie Basin, una delle aree più buie del pianeta certificata International Dark Sky Reserve.",
          en: "Arrival at Lake Tekapo: the milky turquoise water is caused by 'glacial flour' — extremely fine rock particles suspended in the water that reflect sunlight in a unique way. The small Church of the Good Shepherd, built in 1935 in local stone with a window framing the lake and mountains, is one of New Zealand's most photographed scenes. Afternoon: transfer to Aoraki/Mount Cook Village to see up close Mount Cook (3,724m), New Zealand's highest mountain. Evening: stargazing in the Mackenzie Basin, one of the planet's darkest areas certified as an International Dark Sky Reserve.",
        },
      },
      {
        day: 8,
        title: { it: 'Christchurch', en: 'Christchurch' },
        description: {
          it: "Trasferimento a Christchurch, la città giardino sull'Isola del Sud, in rinascita dopo il devastante terremoto del 2011 che distrusse il 70% del centro storico. Oggi Christchurch è una città creativa e coraggiosa: il Re:START Mall fatto di container colorati, la cattedrale in ricostruzione, i nuovi edifici architetticamente audaci come il Cardboard Cathedral in cartone. I Botanic Gardens e Hagley Park rimangono tra i più belli della Nuova Zelanda. Giro in barca piatta (punt) sull'Avon River.",
          en: "Transfer to Christchurch, the South Island's garden city, rebuilding after the devastating 2011 earthquake that destroyed 70% of the city centre. Today Christchurch is a creative and courageous city: the Re:START Mall made of colourful containers, the cathedral under reconstruction, bold new architectural buildings like the Cardboard Cathedral. The Botanic Gardens and Hagley Park remain among New Zealand's finest. Flat-bottomed boat (punt) trip on the Avon River.",
        },
      },
      {
        day: 9,
        title: { it: 'Kaikoura — whale watching', en: 'Kaikoura — whale watching' },
        description: {
          it: "Trasferimento a Kaikoura lungo la coastal highway, una delle strade costiere più spettacolari della Nuova Zelanda: mare di Tasman a ovest, montagne innevate a est. Kaikoura è uno dei pochi luoghi al mondo dove i capodogli (Physeter macrocephalus) sono avvistabili tutto l'anno: la profonda fossa marina al largo della costa crea correnti ascendenti ricche di calamari giganti — la preda preferita dei capodogli. Le balene si immergono a 2–3 km di profondità e risalgono per respirare ogni 60–90 minuti. Tour in barca (2 ore) con garanzia di avvistamento.",
          en: "Transfer to Kaikoura along the coastal highway, one of New Zealand's most spectacular coastal roads: Tasman Sea to the west, snow-capped mountains to the east. Kaikoura is one of the few places on Earth where sperm whales (Physeter macrocephalus) can be seen year-round: the deep marine canyon offshore creates upwellings rich in giant squid — the sperm whale's favourite prey. Whales dive to depths of 2–3km and surface to breathe every 60–90 minutes. Boat tour (2 hours) with sighting guarantee.",
        },
      },
      {
        day: 10,
        title: { it: 'Wellington — capitale creativa', en: 'Wellington — creative capital' },
        description: {
          it: "Volo o traghetto Interislander da Picton per Wellington, la capitale della Nuova Zelanda. Il traghetto attraversa il Cook Strait e poi si insinua tra le fiorded sounds del Marlborough Sounds — uno dei tratti marini più belli al mondo. Wellington è piccola ma vivacissima: il Te Papa Tongarewa Museum (museo nazionale della Nuova Zelanda, ingresso gratuito), la funicolare per Mount Victoria, il quartiere di Cuba Street con le sue librerie, caffetterie specialty e gallerie. Peter Jackson ha il suo studio (Weta Workshop) proprio qui.",
          en: "Flight or Interislander ferry from Picton to Wellington, New Zealand's capital. The ferry crosses Cook Strait and then winds through the Marlborough Sounds — one of the world's most beautiful maritime landscapes. Wellington is small but vibrant: the Te Papa Tongarewa Museum (New Zealand's national museum, free entry), the cable car to Mount Victoria, the Cuba Street quarter with its bookshops, specialty coffee shops and galleries. Peter Jackson has his studio (Weta Workshop) right here.",
        },
      },
      {
        day: 11,
        title: { it: 'Tongariro National Park', en: 'Tongariro National Park' },
        description: {
          it: "Trasferimento verso il Tongariro National Park, il parco nazionale più antico della Nuova Zelanda (1887) e doppio patrimonio UNESCO — sia per il valore naturale che per quello culturale Maori. Il parco ospita tre vulcani attivi: Ruapehu (2.797 m), Ngauruhoe (2.291 m, il Monte Fato del Signore degli Anelli) e Tongariro (1.978 m). Il Tongariro Alpine Crossing (19,4 km, 7–8 ore) è considerato il miglior trekking giornaliero della Nuova Zelanda: percorre la cresta dei vulcani attraverso crateri fumanti, laghi verde smeraldo e paesaggi lunari.",
          en: "Transfer to Tongariro National Park, New Zealand's oldest national park (1887) and a dual UNESCO World Heritage site — both for natural and Maori cultural values. The park hosts three active volcanoes: Ruapehu (2,797m), Ngauruhoe (2,291m, the Mount Doom of Lord of the Rings) and Tongariro (1,978m). The Tongariro Alpine Crossing (19.4km, 7–8 hours) is considered New Zealand's best single-day hike: it follows the volcanic ridge through steaming craters, emerald lakes and lunar landscapes.",
        },
      },
      {
        day: 12,
        title: { it: 'Rotorua — geotermale e Maori', en: 'Rotorua — geothermal and Maori' },
        description: {
          it: "Rotorua è unica al mondo: una città costruita sopra un campo geotermale attivo dove il terreno respira — il vapore solforoso esce dai tombini, dai giardini, dalle rive del lago. Visita a Te Puia, il sito geotermale più importante della città, con i geyser Pohutu (il più grandi dell'emisfero australe — 30 metri di altezza) e la Scuola Nazionale di Arte Maori, dove si imparano l'intaglio del legno e la tessitura tradizionale. Poi Wai-O-Tapu, il sito geotermale più colorato: la Champagne Pool (bolle di CO2 in acqua a 74°C), il Devil's Bath (giallo lime per lo zolfo) e le piscine di fango bollente. Serata: cultural show Maori con haka e hangi tradizionale.",
          en: "Rotorua is unique in the world: a city built above an active geothermal field where the ground breathes — sulphurous steam rises from manholes, gardens and the lake shores. Visit Te Puia, the city's most important geothermal site, with the Pohutu geysers (the largest in the southern hemisphere at 30 metres) and the National Maori Arts School, where traditional wood carving and weaving are taught. Then Wai-O-Tapu, the most colourful geothermal site: the Champagne Pool (CO2 bubbles in 74°C water), the Devil's Bath (lime yellow from sulphur) and the boiling mud pools. Evening: Maori cultural show with haka and traditional hangi.",
        },
      },
      {
        day: 13,
        title: { it: 'Hobbiton', en: 'Hobbiton' },
        description: {
          it: "Il momento più atteso dai fan di Tolkien: visita alla Alexander Family Farm di Matamata, dove Peter Jackson costruì i 44 Hobbit Holes originali per Il Signore degli Anelli (2001–2003) e mantenne la location intatta per Lo Hobbit (2012–2014). La fattoria fu scelta dopo un sorvolo in elicottero da parte di Jackson nel 1998: i dolci pendii verdi, il laghetto e la quercia secolare sembravano usciti dalle illustrazioni di Tolkien. Tour guidato di 2 ore con guida in costume tra le porte tonde colorate, i giardini fioriti, il Mulino e il Green Dragon Inn (aperitivo incluso).",
          en: "The moment Tolkien fans have been waiting for: visit to the Alexander Family Farm in Matamata, where Peter Jackson built the original 44 Hobbit Holes for The Lord of the Rings (2001–2003) and kept the location intact for The Hobbit (2012–2014). The farm was chosen after Jackson's helicopter flyover in 1998: the gentle green hills, the pond and the ancient oak seemed straight out of Tolkien's illustrations. 2-hour guided tour in costume among the coloured round doors, flower gardens, the Mill and the Green Dragon Inn (aperitif included).",
        },
      },
      {
        day: 14,
        title: { it: 'Waitomo Caves', en: 'Waitomo Caves' },
        description: {
          it: "Le grotte di Waitomo sono una delle esperienze naturalistiche più straordinarie della Nuova Zelanda. Il percorso in barca nel buio totale porta sotto una volta di pietra calcarea dove vivono milioni di Arachnocampa luminosa — un insetto endemico neozelandese la cui larva emette una luce blu-verde per attirare le prede. Il risultato è un cielo stellato sotterraneo di dimensioni irreali, in totale silenzio. Dopo le grotte, trasferimento verso Auckland attraverso la regione dell'Waikato.",
          en: "Waitomo Caves are one of New Zealand's most extraordinary natural experiences. The boat ride in total darkness passes under a limestone ceiling where millions of Arachnocampa luminosa live — a New Zealand endemic insect whose larva emits blue-green light to attract prey. The result is an underground starry sky of unreal scale, in total silence. After the caves, transfer towards Auckland through the Waikato region.",
        },
      },
      {
        day: 15,
        title: { it: 'Auckland — volo per Papeete', en: 'Auckland — flight to Papeete' },
        description: {
          it: "Arrivo ad Auckland e mezza giornata per visitare la città: Sky Tower (328 m, la più alta dell'emisfero australe), passeggiata a Ponsonby Road con i suoi caffè e ristoranti, o visita all'Auckland Museum nel Domain. Nel pomeriggio, check-in in hotel vicino all'aeroporto. Volo notturno per Papeete (Tahiti) con arrivo di prima mattina: la traversata del Pacifico di notte, mentre sotto il finestrino non c'è che oceano e stelle.",
          en: "Arrival in Auckland and half a day to see the city: Sky Tower (328m, the tallest in the southern hemisphere), walk along Ponsonby Road with its cafés and restaurants, or a visit to Auckland Museum in the Domain. Afternoon hotel check-in near the airport. Night flight to Papeete (Tahiti) arriving early morning: crossing the Pacific at night, nothing but ocean and stars outside the window.",
        },
      },
      {
        day: 16,
        title: { it: 'Arrivo a Papeete — Tahiti', en: 'Arrival in Papeete — Tahiti' },
        description: {
          it: "Arrivo di prima mattina a Papeete. Trasferimento in hotel e giornata di riposo per recuperare il cambio di fuso orario (la Polinesia Francese è 2 ore indietro rispetto alla Nuova Zelanda). Nel pomeriggio, prima passeggiata sul waterfront di Papeete e visita al mercato. Serata libera nella capitale polinesiana — il cambio di scenario rispetto alla Nuova Zelanda è totale: da montagne innevate a lagune tropicali.",
          en: "Early morning arrival in Papeete. Hotel transfer and rest day to adjust to the time zone change (French Polynesia is 2 hours behind New Zealand). Afternoon first walk along the Papeete waterfront and market visit. Free evening in the Polynesian capital — the contrast with New Zealand is total: from snow-capped mountains to tropical lagoons.",
        },
      },
      {
        day: 17,
        title: { it: 'Moorea — Cook Bay e Opunohu Bay', en: 'Moorea — Cook Bay and Opunohu Bay' },
        description: {
          it: "Traghetto per Moorea (20 minuti da Papeete). Sistemazione in resort e primo contatto con la laguna polinesiana — dopo i paesaggi verdi e montagnosi della Nuova Zelanda, l'acqua color turchese di Moorea è uno shock visivo nel senso migliore del termine. Nel pomeriggio, esplorazione dell'isola: Cook Bay con le sue montagne vulcaniche riflesse nell'acqua verde scuro, Opunohu Bay con le colline di mango e noni, salita al Belvedere per il panorama sull'isola. Cena nel resort al tramonto.",
          en: "Ferry to Moorea (20 minutes from Papeete). Resort check-in and first contact with the Polynesian lagoon — after New Zealand's green and mountainous landscapes, Moorea's turquoise water is a visual shock in the best sense. Afternoon island exploration: Cook Bay with its volcanic mountains reflected in dark green water, Opunohu Bay with its mango and noni hills, climb to the Belvedere for the island panorama. Resort dinner at sunset.",
        },
      },
      {
        day: 18,
        title: { it: 'Moorea — mante e delfini', en: 'Moorea — rays and dolphins' },
        description: {
          it: "Escursione in barca nelle acque di Moorea per nuotare con le mante giganti: questi animali con un'apertura alare fino a 5 metri filtrano il plancton a pochi metri dalla superficie, abituati alla presenza umana. Poi nel canale tra Moorea e Tahiti alla ricerca di delfini spinner e delfini comuni — spesso si avvicinano ai natanti per giocare nelle onde della prua. Nel pomeriggio, snorkeling nel lagoon di fronte al resort: razze nere di barriera (Himantura fai) e tartarughe si avvicinano facilmente.",
          en: "Boat excursion in Moorea's waters to swim with giant manta rays: these animals with a wingspan up to 5 metres filter plankton just below the surface, accustomed to human presence. Then into the channel between Moorea and Tahiti in search of spinner dolphins and common dolphins — they often approach vessels to play in the bow waves. Afternoon snorkelling in the resort lagoon: black-spotted stingrays (Himantura fai) and turtles approach easily.",
        },
      },
      {
        day: 19,
        title: { it: 'Moorea — libera', en: 'Moorea — free day' },
        description: {
          it: "Giornata libera a Moorea. Chi vuole esplorare può noleggiare un quad o una bici per girare l'isola, con sosta alla distilleria di rum agricolo Saint-James. Chi preferisce rilassarsi: l'acqua davanti al resort è bassa, cristallina e piena di vita — i bambini razze (stingray) vengono spesso a frugare nella sabbia lungo la riva. Shopping di perle nere di Tahiti nei negozi del porto di Vaiare.",
          en: "Free day on Moorea. Those who want to explore can rent a quad or bicycle to tour the island, stopping at the Saint-James rum distillery. Those who prefer to relax: the water in front of the resort is shallow, crystal-clear and full of life — baby stingrays often forage in the sand along the shore. Black pearl shopping at the boutiques of Vaiare harbour.",
        },
      },
      {
        day: 20,
        title: { it: 'Volo per Bora Bora', en: 'Flight to Bora Bora' },
        description: {
          it: "Volo da Moorea (via Papeete) per Bora Bora. L'atterraggio sull'atollo è tra le esperienze aeree più belle al mondo: la pista è su un motu piatto circondato dalla laguna, il Monte Otemanu emerge sullo sfondo e l'acqua intorno all'aereo cambia colore mentre si atterra. Transfer in barca motore al resort. La prima sera a Bora Bora, sulla terrazza del bungalow sull'acqua, il tramonto tinge il Monte Otemanu di arancio e rosa.",
          en: "Flight from Moorea (via Papeete) to Bora Bora. Landing on the atoll is one of the world's most beautiful flight experiences: the runway is on a flat motu surrounded by the lagoon, Mount Otemanu rises in the background and the water around the plane changes colour as you land. Speedboat transfer to the resort. The first Bora Bora evening, on the overwater bungalow terrace, the sunset turns Mount Otemanu orange and pink.",
        },
      },
      {
        day: 21,
        title: { it: 'Bora Bora — laguna e snorkeling', en: 'Bora Bora — lagoon and snorkelling' },
        description: {
          it: "Escursione in laguna: coral gardens con pesci tropicali, snorkeling con mante e squali di barriera (punta nera e punta bianca, assolutamente innocui), sosta su un motu privato con spiaggia di sabbia bianca finissima per il pranzo. La laguna di Bora Bora è protetta da una barriera corallina esterna che crea un bacino interno calmo e trasparente — si vede il fondo anche a 10–12 metri di profondità.",
          en: "Lagoon excursion: coral gardens with tropical fish, snorkelling with manta rays and reef sharks (blacktip and whitetip, entirely harmless), stop on a private motu with the finest white sand beach for lunch. Bora Bora's lagoon is protected by an outer coral reef creating a calm and transparent inner basin — you can see the bottom even at 10–12 metres depth.",
        },
      },
      {
        day: 22,
        title: { it: 'Bora Bora — libera', en: 'Bora Bora — free day' },
        description: {
          it: "Giornata completamente libera: Bora Bora offre tutto ciò che si può desiderare da un paradiso tropicale. Nuoto dal pontile del bungalow (spesso ci sono pesci anche qui), kayak nella laguna, lezione di paddle, jet ski, tour in elicottero sull'atollo o semplicemente relax assoluto sulla chaise-longue sopra l'acqua. Massaggio tradizionale polinesiano all'aperto con vista sull'Otemanu.",
          en: "Completely free day: Bora Bora offers everything you could want from a tropical paradise. Swimming from the bungalow pier (often fish here too), kayaking on the lagoon, paddleboard lesson, jet skiing, helicopter tour over the atoll or simply total relaxation on the chaise-longue above the water. Traditional Polynesian outdoor massage with Otemanu views.",
        },
      },
      {
        day: 23,
        title: { it: 'Ultima giornata a Bora Bora', en: 'Last day in Bora Bora' },
        description: {
          it: "Ultima mattina nella laguna di Bora Bora. Shopping finale di perle nere e souvenir a Vaitape. Pranzo finale al resort con vista sull'Otemanu. Nel pomeriggio, transfer in barca all'aeroporto e volo per Papeete per il collegamento intercontinentale di rientro.",
          en: "Last morning on the Bora Bora lagoon. Final shopping for black pearls and souvenirs in Vaitape. Last resort lunch with Otemanu views. Afternoon speedboat transfer to the airport and flight to Papeete for the intercontinental return connection.",
        },
      },
      {
        day: 24,
        title: { it: 'Rientro in Europa', en: 'Return to Europe' },
        description: {
          it: "Volo da Papeete verso l'Europa con scalo a Los Angeles. Un viaggio che ha toccato due delle realtà naturali più spettacolari del pianeta: i fiordi, i vulcani e i boschi di Aotearoa da una parte, le lagune azzurre e le mante giganti della Polinesia Francese dall'altra. Fine di un'avventura che lascia il segno.",
          en: "Flight from Papeete to Europe via Los Angeles. A journey that has touched two of the planet's most spectacular natural worlds: the fjords, volcanoes and forests of Aotearoa on one side, the blue lagoons and giant manta rays of French Polynesia on the other. End of an adventure that leaves a mark.",
        },
      },
    ],
    included: {
      it: [
        'Sistemazioni in hotel 4–5 stelle o resort overwater per tutta la durata',
        'Auto a noleggio in Nuova Zelanda (inclusa assicurazione base)',
        'Volo Auckland–Papeete',
        'Voli interni in Polinesia: Papeete–Moorea–Bora Bora',
        'Traghetto Papeete–Moorea e transfer in barca a Bora Bora',
        'Crociera whale watching a Kaikoura (con garanzia)',
        'Escursione in laguna a Bora Bora con snorkeling (mante, squali, motu)',
        'Escursione con mante e delfini a Moorea',
        'Ingresso Hobbiton con tour guidato e aperitivo al Green Dragon Inn',
        'Ingresso grotte di Waitomo con barca',
        'Tongariro Alpine Crossing (guida inclusa)',
        'Cultural show Maori con hangi a Rotorua',
        'Visita Te Puia (geyser e centro Maori)',
        'Crociera a Milford Sound',
        'Assistenza Progetto Australia per tutta la durata',
      ],
      en: [
        '4–5 star hotel or overwater resort throughout',
        'Rental car in New Zealand (basic insurance included)',
        'Auckland–Papeete flight',
        'Internal Polynesia flights: Papeete–Moorea–Bora Bora',
        'Papeete–Moorea ferry and Bora Bora boat transfer',
        'Kaikoura whale watching cruise (with guarantee)',
        'Bora Bora lagoon excursion with snorkelling (rays, sharks, motu)',
        'Manta ray and dolphin excursion in Moorea',
        'Hobbiton entry with guided tour and Green Dragon Inn aperitif',
        'Waitomo Caves entry with boat',
        'Tongariro Alpine Crossing (guide included)',
        'Maori cultural show with hangi in Rotorua',
        'Te Puia visit (geysers and Maori centre)',
        'Milford Sound cruise',
        'Progetto Australia assistance throughout',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // 4. GRUPPO NZ — AOTEAROA — 15 giorni
  // ─────────────────────────────────────────────
  {
    id: 'gruppo-nuova-zelanda',
    slug: 'gruppo-nuova-zelanda',
    title: {
      it: 'Nuova Zelanda — viaggio di gruppo esclusivo in italiano',
      en: 'New Zealand — Exclusive Italian-Guided Group Tour',
    },
    description: {
      it: "Un viaggio di gruppo alla scoperta della Nuova Zelanda: dalle grotte luminescenti di Waitomo ai fiordi di Milford Sound, passando per la magia Maori di Rotorua e i paesaggi da cartolina di Tekapo e Wanaka. Aotearoa, la Terra della Lunga Nuvola Bianca, sorprende ad ogni curva.",
      en: "A group journey discovering New Zealand: from the glowworm caves of Waitomo to the fjords of Milford Sound, via the Maori magic of Rotorua and the postcard landscapes of Tekapo and Wanaka. Aotearoa, the Land of the Long White Cloud, surprises at every turn.",
    },
    duration: 15,
    destination: 'New Zealand',
    type: 'group',
    gradient: 'from-green-700 to-emerald-900',
    image: '/images/itin-nz-gruppo.jpg',
    price: { currency: 'EUR', amount: 5700 },
    priceEn: { currency: 'USD', amount: 6200 },
    highlights: {
      it: [
        'Grotte di Waitomo con i glow worm',
        'Hobbiton — la Contea del Signore degli Anelli',
        'Rotorua — geyser e cultura Maori',
        'Lago Tekapo — acqua turchese e cieli stellati',
        'Milford Sound — fiordo patrimonio UNESCO',
      ],
      en: [
        'Waitomo Caves with glowworms',
        'Hobbiton — Lord of the Rings Shire',
        'Rotorua — geysers and Maori culture',
        'Lake Tekapo — turquoise water and starry skies',
        'Milford Sound — UNESCO World Heritage fjord',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' },
        description: {
          it: "Arrivo ad Auckland e trasferimento in hotel nel quartiere di Viaduct Harbour. Incontro con la guida accompagnatrice italiana e il gruppo. Cena di benvenuto in un ristorante del waterfront. Auckland è una città di ponti: ponti sul porto, ponti tra culture (è la città con la più grande popolazione Polinesiana del mondo), ponti tra oceani (si trova sull'istmo tra il Pacifico e il Tasman). Prima serata nella città che non dorme mai.",
          en: "Arrival in Auckland and hotel transfer in the Viaduct Harbour quarter. Meeting with the Italian-speaking guide and the group. Welcome dinner at a waterfront restaurant. Auckland is a city of bridges: bridges over the harbour, bridges between cultures (it has the world's largest Polynesian population), bridges between oceans (it sits on the isthmus between the Pacific and Tasman). First evening in the city that never sleeps.",
        },
      },
      {
        day: 2,
        title: { it: 'Auckland — Sky Tower e Harbour', en: 'Auckland — Sky Tower and Harbour' },
        description: {
          it: "Giornata ad Auckland: salita alla Sky Tower (328 m, la più alta struttura dell'emisfero australe) con vista a 360° sui due porti e sull'isola vulcanica di Rangitoto. Visita al quartiere di Parnell, il più antico di Auckland, con le sue gallerie e boutique. Nel pomeriggio, crociera sull'harbour di Waitemata con vista sul Ponte dell'Harbour e le isole dell'Auckland Gulf. Serata libera a Ponsonby Road, l'animata arteria dei ristoranti.",
          en: "Day in Auckland: ascent to the Sky Tower (328m, the tallest structure in the southern hemisphere) with 360° views of both harbours and the volcanic island of Rangitoto. Visit to the Parnell quarter, Auckland's oldest, with its galleries and boutiques. Afternoon cruise on Waitemata Harbour with views of the Harbour Bridge and the Auckland Gulf islands. Free evening on Ponsonby Road, the lively restaurant strip.",
        },
      },
      {
        day: 3,
        title: { it: 'Waitomo Caves — glow worm', en: 'Waitomo Caves — glowworms' },
        description: {
          it: "Trasferimento verso sud in direzione Waitomo, attraverso i dolci pascoli dell'Isola del Nord. Le grotte di Waitomo sono state scoperte nel 1887 da un capo Maori locale che guidò il primo europeo all'interno. Oggi ospitano milioni di Arachnocampa luminosa — larve di un insetto endemico neozelandese che emettono bioluminescenza blu-verde per attirare insetti in trappole di fili di seta. Il tour in barca nel buio totale, guardando in su quella volta luminosa, è un'esperienza senza paragoni nel mondo.",
          en: "Transfer south towards Waitomo through the gentle pastures of the North Island. The Waitomo Caves were discovered in 1887 by a local Maori chief who led the first European inside. Today they host millions of Arachnocampa luminosa — larvae of a New Zealand endemic insect that emit blue-green bioluminescence to lure insects into silk thread traps. The boat ride in total darkness, looking up at that glowing ceiling, is an experience without equal in the world.",
        },
      },
      {
        day: 4,
        title: { it: 'Hobbiton — la Contea di Tolkien', en: 'Hobbiton — Tolkien\'s Shire' },
        description: {
          it: "Trasferimento alla Alexander Family Farm di Matamata per la visita a Hobbiton, uno dei set cinematografici più famosi del mondo. Peter Jackson scelse questa fattoria dopo un sorvolo in elicottero: i dolci pendii verdi di Waikato, il laghetto e la quercia secolare gli sembrarono la Contea perfetta. Il set fu costruito nel 1999 e poi ricostruito in modo permanente per Lo Hobbit (2012). Tour guidato di 2 ore tra i 44 Hobbit Holes, i giardini curati di fiori e ortaggi, il Mulino e il Green Dragon Inn dove si brinda con birra artigianale fresca.",
          en: "Transfer to the Alexander Family Farm in Matamata for the Hobbiton visit, one of the world's most famous film sets. Peter Jackson chose this farm after a helicopter flyover: the gentle green hills of Waikato, the pond and the ancient oak seemed the perfect Shire to him. The set was built in 1999 and then permanently rebuilt for The Hobbit (2012). 2-hour guided tour among the 44 Hobbit Holes, the gardens tended with flowers and vegetables, the Mill and the Green Dragon Inn where you toast with fresh craft ale.",
        },
      },
      {
        day: 5,
        title: { it: 'Rotorua — Wai-O-Tapu', en: 'Rotorua — Wai-O-Tapu' },
        description: {
          it: "Arrivo a Rotorua, la città che odora di zolfo — una peculiarità che i residenti non notano più ma che colpisce sempre i nuovi arrivi. Visita a Wai-O-Tapu Thermal Wonderland, il sito geotermale più colorato della Nuova Zelanda: la Champagne Pool (57 m di diametro, acqua a 74°C, bolle di CO2 che risalgono continuamente), il Devil's Bath con la sua acqua giallo-verde fosforescente per lo zolfo, le Primrose Terrace e il geyser Lady Knox che entra in eruzione ogni mattina alle 10:15 per effetto di un'aggiunta di sapone. Sistemazione in hotel con piscine geotermali.",
          en: "Arrival in Rotorua, the city that smells of sulphur — a peculiarity that residents no longer notice but always strikes new arrivals. Visit to Wai-O-Tapu Thermal Wonderland, New Zealand's most colourful geothermal site: the Champagne Pool (57m diameter, water at 74°C, CO2 bubbles rising continuously), the Devil's Bath with its phosphorescent yellow-green water from sulphur, the Primrose Terrace and the Lady Knox geyser that erupts every morning at 10:15am with the addition of soap. Hotel accommodation with geothermal pools.",
        },
      },
      {
        day: 6,
        title: { it: 'Rotorua — cultura Maori e Te Puia', en: 'Rotorua — Maori culture and Te Puia' },
        description: {
          it: "Giornata dedicata alla cultura Maori a Rotorua, il cuore della Maoritanga (cultura Maori) in Nuova Zelanda. Visita a Te Puia: il sito comprende il complesso dei geyser Pohutu (i più grandi dell'emisfero australe — fanno eruzione in media 20 volte al giorno fino a 30 m di altezza) e la Scuola Nazionale d'Arte Maori (Te Wānanga Whakairo Rākau), dove gli studenti apprendono l'intaglio tradizionale del legno (whakairo) e la tessitura delle stuoie (raranga). Serata: hangi (pranzo cotto nella terra con pietre calde) e spettacolo cultural con haka, poi e waiata.",
          en: "Day devoted to Maori culture in Rotorua, the heart of Maoritanga (Maori culture) in New Zealand. Visit Te Puia: the site includes the Pohutu geyser complex (the largest in the southern hemisphere — erupting on average 20 times a day up to 30m high) and the National Maori Arts School (Te Wānanga Whakairo Rākau), where students learn traditional wood carving (whakairo) and mat weaving (raranga). Evening: hangi (meal cooked underground with hot stones) and cultural show with haka, poi and waiata.",
        },
      },
      {
        day: 7,
        title: { it: 'Volo per Christchurch', en: 'Flight to Christchurch' },
        description: {
          it: "Volo per Christchurch, la città più grande dell'Isola del Sud. Christchurch è in perenne trasformazione dopo il terremoto del 22 febbraio 2011 (185 morti, 70% del centro storico distrutto): oggi è una città creativa, audace, che ha trasformato il trauma in opportunità artistica. Il Re:START Mall fatto di container colorati è diventato un simbolo mondiale di resilienza. I Botanic Gardens con 50 ettari di giardini storici e la passeggiata in punt sull'Avon River sono i momenti più romantici della città.",
          en: "Flight to Christchurch, the South Island's largest city. Christchurch is in perpetual transformation after the 22 February 2011 earthquake (185 deaths, 70% of the city centre destroyed): today it is a creative, bold city that has turned trauma into artistic opportunity. The Re:START Mall of colourful containers has become a global symbol of resilience. The Botanic Gardens with 50 hectares of historic gardens and the Avon River punt ride are the city's most romantic moments.",
        },
      },
      {
        day: 8,
        title: { it: 'Lake Tekapo e Aoraki/Monte Cook', en: 'Lake Tekapo and Aoraki/Mount Cook' },
        description: {
          it: "Trasferimento verso le Alpi del Sud attraverso le pianure di Canterbury. Arrivo al lago Tekapo: l'acqua turchese-lattiginosa è causata dai sedimenti glaciali in sospensione che riflettono la luce — il colore è unico al mondo. La Church of the Good Shepherd (1935), costruita in pietra locale con una finestra che inquadra perfettamente il lago e le montagne, è una delle scene più emozionanti della Nuova Zelanda. Nel pomeriggio, trasferimento fino al Mount Cook Village per vedere da vicino l'Aoraki/Monte Cook (3.724 m) e i ghiacciai Hooker e Tasman. Serata: osservazione delle stelle nell'International Dark Sky Reserve del Mackenzie Basin.",
          en: "Transfer towards the Southern Alps through the Canterbury Plains. Arrival at Lake Tekapo: the milky turquoise water is caused by suspended glacial sediments reflecting light — the colour is unique in the world. The Church of the Good Shepherd (1935), built in local stone with a window perfectly framing the lake and mountains, is one of New Zealand's most moving scenes. Afternoon transfer to Mount Cook Village to see up close Aoraki/Mount Cook (3,724m) and the Hooker and Tasman glaciers. Evening: stargazing in the Mackenzie Basin International Dark Sky Reserve.",
        },
      },
      {
        day: 9,
        title: { it: 'Wanaka', en: 'Wanaka' },
        description: {
          it: "Trasferimento verso Wanaka attraverso il Lindis Pass, il valico montano che separa la regione di Canterbury da quella di Otago. Wanaka è il lago più tranquillo e meno turistico rispetto al vicino Queenstown, con le stesse montagne ma un'atmosfera più rilassata. Il famoso albero solitario di Wanaka — un salice che cresce parzialmente immerso nel lago a pochi metri dalla riva — è uno dei soggetti fotografici più condivisi della Nuova Zelanda. Escursione al Roy's Peak (1.578 m) per il panorama sul lago.",
          en: "Transfer to Wanaka through the Lindis Pass, the mountain crossing dividing Canterbury from Otago. Wanaka is a quieter, less touristy lake compared to nearby Queenstown, with the same mountains but a more relaxed atmosphere. The famous lone Wanaka tree — a willow growing partially submerged in the lake just metres from shore — is one of New Zealand's most shared photographic subjects. Hike to Roy's Peak (1,578m) for the lake panorama.",
        },
      },
      {
        day: 10,
        title: { it: 'Te Anau — porta del Fiordland', en: 'Te Anau — gateway to Fiordland' },
        description: {
          it: "Trasferimento a Te Anau, piccola città sul lago Te Anau (il più grande dell'Isola del Sud) che funge da porta d'accesso al Fiordland National Park. Il Fiordland è il parco nazionale più grande della Nuova Zelanda e uno degli ecosistemi selvaggi più incontaminati del pianeta: 1,2 milioni di ettari di fiordi, laghi glaciali, cascate e foreste pluviali temperata. Nel pomeriggio: visita alle grotte di Te Anau, accessibili solo in barca, con i loro glowworm e un sotterraneo lago.",
          en: "Transfer to Te Anau, a small town on Lake Te Anau (the South Island's largest lake) that serves as the gateway to Fiordland National Park. Fiordland is New Zealand's largest national park and one of the planet's most pristine wild ecosystems: 1.2 million hectares of fjords, glacial lakes, waterfalls and temperate rainforest. Afternoon: visit to the Te Anau Caves, accessible only by boat, with their glowworms and underground lake.",
        },
      },
      {
        day: 11,
        title: { it: 'Milford Sound', en: 'Milford Sound' },
        description: {
          it: "Il giorno più atteso: trasferimento verso Milford Sound lungo la Milford Road, 120 km di una delle strade più scenografiche al mondo. Si percorrono la Eglinton Valley con i suoi faggi argentati, Mirror Lakes (la riflessione delle Alpi del Sud nell'acqua è perfetta), la Homer Tunnel (1.270 m scavati nella roccia viva). Arrivo a Milford Sound e crociera di 2 ore nel fiordo: pareti di granito che precipitano verticalmente in acqua per centinaia di metri, la cascata Stirling Falls (155 m, la barca ci passa sotto), colonie di foche, gabbiani, talvolta pinguini e delfini.",
          en: "The most awaited day: transfer to Milford Sound along the Milford Road, 120km of one of the world's most scenic roads. Drive the Eglinton Valley with its silver beech trees, Mirror Lakes (the Southern Alps' reflection in the water is perfect), the Homer Tunnel (1,270m cut through solid rock). Arrival at Milford Sound and 2-hour fjord cruise: granite walls plunging vertically into the water for hundreds of metres, Stirling Falls (155m, the boat passes underneath), fur seal colonies, gulls, sometimes penguins and dolphins.",
        },
      },
      {
        day: 12,
        title: { it: 'Queenstown — arrivo', en: 'Queenstown — arrival' },
        description: {
          it: "Trasferimento a Queenstown attraverso i paesaggi dell'Isola del Sud: la strada da Te Anau a Queenstown passa per Lumsden e Kingston, con viste sul lago Wakatipu che si aprono all'improvviso dopo una curva. Arrivo a Queenstown nel pomeriggio. Salita in gondola sul Bob's Peak al tramonto: la vista sul lago Wakatipu (a forma di Z, lungo 80 km) con le Remarkables sullo sfondo è una delle più belle della Nuova Zelanda. Cena a downtown Queenstown.",
          en: "Transfer to Queenstown through South Island landscapes: the road from Te Anau to Queenstown passes through Lumsden and Kingston, with views of Lake Wakatipu suddenly opening after a bend. Arrival in Queenstown in the afternoon. Gondola to Bob's Peak at sunset: the view over Lake Wakatipu (Z-shaped, 80km long) with the Remarkables behind is one of New Zealand's finest. Dinner in downtown Queenstown.",
        },
      },
      {
        day: 13,
        title: { it: 'Queenstown — giornata libera', en: 'Queenstown — free day' },
        description: {
          it: "Giornata libera a Queenstown, la capitale mondiale dell'avventura. Le possibilità sono infinite: bungee jumping dal Kawarau Bridge (il primo bungee commerciale del mondo, dal 1988), jet boat sull'Shotover River, skydiving con paracadute sul lago Wakatipu, giro in quad nei dintorni, wine tasting nella Gibbston Valley (pinot noir d'eccellenza), o semplicemente passeggiata sul lungolago tra i negozi e i caffè del centro.",
          en: "Free day in Queenstown, the world's adventure capital. Options are endless: bungee jumping from Kawarau Bridge (the world's first commercial bungee, since 1988), jet boating on the Shotover River, skydiving over Lake Wakatipu, quad biking in the surroundings, wine tasting in Gibbston Valley (outstanding pinot noir), or simply a lakeside stroll among the town centre shops and cafés.",
        },
      },
      {
        day: 14,
        title: { it: 'Rientro ad Auckland', en: 'Return to Auckland' },
        description: {
          it: "Volo da Queenstown ad Auckland. Pomeriggio libero nella City of Sails per gli ultimi acquisti (lana di merino, olio di manuka, vini e biscotti di hokey pokey) o per visitare l'Auckland War Memorial Museum nel Domain, uno dei musei di storia naturale e Maori più belli della Nuova Zelanda. Cena di arrivederci con tutto il gruppo: l'occasione per ricordare le tappe migliori del viaggio.",
          en: "Flight from Queenstown to Auckland. Free afternoon in the City of Sails for last-minute shopping (merino wool, manuka honey, wines and hokey pokey biscuits) or to visit the Auckland War Memorial Museum in the Domain, one of New Zealand's finest natural history and Maori museums. Farewell dinner with the whole group: the occasion to recall the journey's best moments.",
        },
      },
      {
        day: 15,
        title: { it: 'Rientro in Italia', en: 'Return to Italy' },
        description: {
          it: "Volo di rientro verso l'Italia, solitamente via Singapore o Dubai con uno scalo intermedio. La Nuova Zelanda è lontana — 19–23 ore di volo dall'Italia — ma ogni ora di volo vale ogni minuto trascorso in Aotearoa. Il paese delle grotte luminose, dei vulcani, dei fiordi, degli hobbit e dei guerrieri Maori rimane impresso per sempre nella memoria di chi ci va.",
          en: "Return flight to Italy, usually via Singapore or Dubai with an intermediate stopover. New Zealand is far away — 19–23 hours of flying from Italy — but every flight hour is worth every minute spent in Aotearoa. The country of glowworm caves, volcanoes, fjords, hobbits and Maori warriors stays forever in the memory of those who visit.",
        },
      },
    ],
    included: {
      it: [
        'Sistemazioni in hotel 3–4 stelle per tutta la durata (camera doppia/matrimoniale)',
        'Guida accompagnatrice italiana per tutto il viaggio',
        'Tutti i trasferimenti in minivan o pullman di gruppo',
        'Voli interni: Auckland–Christchurch e Queenstown–Auckland',
        'Crociera a Milford Sound (2 ore)',
        'Ingresso e tour guidato grotte di Waitomo (barca inclusa)',
        'Ingresso e tour guidato Hobbiton con aperitivo al Green Dragon Inn',
        'Visita a Te Puia (geyser Pohutu e Scuola Nazionale Maori)',
        'Visita a Wai-O-Tapu Thermal Wonderland',
        'Cultural show Maori con hangi tradizionale a Rotorua',
        'Visita grotte di Te Anau (barca inclusa)',
        'Gondola sul Bob\'s Peak a Queenstown',
        'Cena di benvenuto e cena di arrivederci',
        'Assistenza Progetto Australia per tutta la durata',
      ],
      en: [
        '3–4 star hotel accommodation throughout (twin/double room)',
        'Italian-speaking tour leader for the entire trip',
        'All transfers by minivan or group coach',
        'Internal flights: Auckland–Christchurch and Queenstown–Auckland',
        'Milford Sound cruise (2 hours)',
        'Waitomo Caves entry and guided tour (boat included)',
        'Hobbiton entry and guided tour with Green Dragon Inn aperitif',
        'Te Puia visit (Pohutu geysers and National Maori School)',
        'Wai-O-Tapu Thermal Wonderland entry',
        'Maori cultural show with traditional hangi in Rotorua',
        'Te Anau Caves visit (boat included)',
        'Bob\'s Peak gondola in Queenstown',
        'Welcome dinner and farewell dinner',
        'Progetto Australia assistance throughout',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // 5. AUSTRALIA SELVAGGIA — 28 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-selvaggia',
    slug: 'australia-selvaggia',
    title: {
      it: 'Australia Selvaggia — Darwin, Kakadu, Reef, Sydney, Uluru, Melbourne e Kangaroo Island',
      en: 'Wild Australia — Darwin, Kakadu, the Reef, Sydney, Uluru, Melbourne & Kangaroo Island',
    },
    description: {
      it: "Un grand tour dell'Australia autentica: dalle foreste pluviali del Territorio del Nord e la Grande Barriera Corallina, passando per Sydney e il Red Centre con Uluru e Kings Canyon, fino alla Great Ocean Road, Phillip Island e il selvaggio road trip su Kangaroo Island. Ventotto giorni per toccare l'anima di un continente.",
      en: "A grand tour of authentic Australia: from the Northern Territory rainforests and the Great Barrier Reef, through Sydney and the Red Centre with Uluru and Kings Canyon, to the Great Ocean Road, Phillip Island and a wild road trip on Kangaroo Island. Twenty-eight days to touch the soul of a continent.",
    },
    duration: 28,
    destination: 'Australia',
    type: 'avventura',
    gradient: 'from-orange-700 to-red-900',
    image: '/images/dest-hero-australia-v2.png',
    price: { currency: 'EUR', amount: 5600 },
    priceEn: { currency: 'USD', amount: 6100 },
    highlights: {
      it: [
        'Kakadu e Litchfield — 3 giorni con guida nel territorio del Nord',
        'Grande Barriera Corallina in catamarano alle Low Isles',
        'Foresta pluviale di Daintree e Cape Tribulation',
        'Uluru al tramonto e Kata Tjuta all\'alba + cena Field of Lights',
        'Great Ocean Road con guida italiana',
        'Pinguini di Phillip Island — Penguin Parade',
        'Road trip di 4 giorni su Kangaroo Island',
        'Barossa Valley — degustazione vini',
      ],
      en: [
        'Kakadu & Litchfield — 3-day guided tour in the Northern Territory',
        'Great Barrier Reef by catamaran at the Low Isles',
        'Daintree Rainforest and Cape Tribulation',
        'Uluru at sunset and Kata Tjuta at dawn + Field of Lights dinner',
        'Great Ocean Road with Italian guide',
        'Phillip Island Penguin Parade',
        '4-day self-drive road trip on Kangaroo Island',
        'Barossa Valley wine tasting',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Volo Milano – Darwin via Singapore', en: 'Flight Milan – Darwin via Singapore' },
        description: {
          it: 'Partenza da Milano con Singapore Airlines. Scalo a Singapore e volo per Darwin. Arrivo il giorno seguente.',
          en: 'Departure from Milan with Singapore Airlines. Stopover in Singapore and onward flight to Darwin. Arrival the following day.',
        },
      },
      {
        day: 2,
        title: { it: 'Arrivo a Darwin', en: 'Arrival in Darwin' },
        description: {
          it: 'Arrivo a Darwin e trasferimento privato in hotel. Darwin è la vivace capitale del Territorio del Nord, punto d\'incontro tra cultura urbana e natura selvaggia. Da non perdere il Waterfront Precinct e i Sunset Markets.',
          en: 'Arrival in Darwin and private hotel transfer. Darwin is the vibrant capital of the Northern Territory, where urban culture meets wild nature. Not to be missed: the Waterfront Precinct and Sunset Markets.',
        },
      },
      {
        day: 3,
        title: { it: 'Tour Kakadu e Litchfield — Giorno 1', en: 'Kakadu & Litchfield Tour — Day 1' },
        description: {
          it: 'Inizio del tour di 3 giorni. Partenza da Darwin verso il Kakadu National Park. Crociera in barca nella Corroboree Billabong per avvistare coccodrilli e uccelli del Top End. Visita al Burrungkuy (Nourlangie Rock) con arte rupestre aborigena. Tramonto sulla pianura alluvionale di Nadab. Pernottamento in campo safari nel Jabiru Campground.',
          en: 'Start of the 3-day tour. Departure from Darwin to Kakadu National Park. Boat cruise on the Corroboree Billabong to spot crocodiles and Top End birdlife. Visit to Burrungkuy (Nourlangie Rock) with Aboriginal rock art. Sunset over the Nadab floodplain. Overnight at Jabiru Campground safari tents.',
        },
      },
      {
        day: 4,
        title: { it: 'Tour Kakadu — Giorno 2: Litchfield e cascate', en: 'Kakadu Tour — Day 2: Litchfield & Waterfalls' },
        description: {
          it: 'Giornata immersi nella natura di Litchfield National Park tra foreste monsoniche, cascate incontaminate e piscine naturali. Possibili tappe: Florence Falls, Wangi Falls, Buley Rockholes. Arte rupestre aborigena risalente a 20.000 anni fa.',
          en: 'A day immersed in Litchfield National Park: monsoon forests, pristine waterfalls and natural swimming pools. Possible stops: Florence Falls, Wangi Falls, Buley Rockholes. Aboriginal rock art dating back 20,000 years.',
        },
      },
      {
        day: 5,
        title: { it: 'Tour Litchfield — Giorno 3 e volo per Port Douglas', en: 'Litchfield Tour — Day 3 & Flight to Port Douglas' },
        description: {
          it: 'Mattina a Litchfield tra le Cathedral Termite Mounds, impressionanti termitai alti diversi metri. Nel pomeriggio rientro a Darwin e volo per Cairns. Trasferimento privato a Port Douglas.',
          en: 'Morning at Litchfield among the Cathedral Termite Mounds, impressive termite hills several metres tall. Afternoon return to Darwin and flight to Cairns. Private transfer to Port Douglas.',
        },
      },
      {
        day: 6,
        title: { it: 'Giornata libera a Port Douglas', en: 'Free Day in Port Douglas' },
        description: {
          it: 'Relax sulla celebre Four Mile Beach, passeggiata panoramica sul Flagstaff Hill o lungo il Four Mile Beach Cliff Walk. Esplorazione del porto e della Marina Station.',
          en: 'Relax on the famous Four Mile Beach, panoramic walk on Flagstaff Hill or along the Four Mile Beach Cliff Walk. Exploration of the port and Marina Station.',
        },
      },
      {
        day: 7,
        title: { it: 'Grande Barriera Corallina in catamarano', en: 'Great Barrier Reef by Catamaran' },
        description: {
          it: 'Intera giornata nella Grande Barriera Corallina a bordo del Sailaway VI, catamarano di lusso Lagoon 560. Snorkeling alle Low Isles con biologo marino, nuoto con tartarughe, passeggiata naturalistica guidata sull\'isola. Pranzo a buffet e tè a bordo inclusi.',
          en: 'Full day on the Great Barrier Reef aboard the Sailaway VI, a luxury Lagoon 560 catamaran. Snorkelling at the Low Isles with a marine biologist, swimming with turtles, guided nature walk on the island. Buffet lunch and teas included.',
        },
      },
      {
        day: 8,
        title: { it: 'Cape Tribulation e Daintree Forest', en: 'Cape Tribulation & Daintree Forest' },
        description: {
          it: 'Tour guidato nella foresta pluviale di Daintree, una delle più antiche del mondo. Visita al Mossman Gorge, crociera sul fiume Daintree per osservare i coccodrilli, arrivo a Cape Tribulation dove la foresta pluviale incontra la barriera corallina. Pranzo incluso.',
          en: 'Guided tour through the Daintree Rainforest, one of the world\'s oldest. Visit to Mossman Gorge, Daintree River cruise to spot crocodiles, arrival at Cape Tribulation where the rainforest meets the reef. Lunch included.',
        },
      },
      {
        day: 9,
        title: { it: 'Giornata libera a Port Douglas', en: 'Free Day in Port Douglas' },
        description: {
          it: 'Giornata a disposizione per esplorare i dintorni, rilassarsi in spiaggia o organizzare attività facoltative.',
          en: 'Free day to explore the surroundings, relax on the beach or arrange optional activities.',
        },
      },
      {
        day: 10,
        title: { it: 'Kuranda — seggiovia e treno panoramico', en: 'Kuranda — Cable Car & Scenic Railway' },
        description: {
          it: 'Sorvola la foresta pluviale sulla seggiovia panoramica Skyrail ammirando la vegetazione lussureggiante dall\'alto. Visita libera al villaggio di Kuranda e al Koala Garden Sanctuary. Discesa in treno panoramico Kuranda Scenic Railway con audio guida in italiano.',
          en: 'Soar above the rainforest on the Skyrail gondola with stunning aerial views. Free time in Kuranda village and Koala Garden Sanctuary. Descent by Kuranda Scenic Railway with Italian audio guide.',
        },
      },
      {
        day: 11,
        title: { it: 'Volo Cairns – Sydney', en: 'Flight Cairns – Sydney' },
        description: {
          it: 'Trasferimento privato da Port Douglas all\'aeroporto di Cairns. Volo per Sydney e check-in al Furama Darling Harbour.',
          en: 'Private transfer from Port Douglas to Cairns Airport. Flight to Sydney and check-in at the Furama Darling Harbour.',
        },
      },
      {
        day: 12,
        title: { it: 'Sydney — Bondi Beach e città', en: 'Sydney — Bondi Beach & City' },
        description: {
          it: 'Giornata libera a Sydney. Passeggiata a Bondi Beach, iconica spiaggia con onde perfette per i surfisti e vivace atmosfera. Possibilità di percorrere il Bondi to Coogee Coastal Walk. Nel pomeriggio esplorazione libera del centro.',
          en: 'Free day in Sydney. Walk to Bondi Beach, iconic for its perfect surf waves and vibrant atmosphere. Option to hike the Bondi to Coogee Coastal Walk. Afternoon free to explore the city.',
        },
      },
      {
        day: 13,
        title: { it: 'Blue Mountains — tour in italiano', en: 'Blue Mountains — Italian-language Tour' },
        description: {
          it: 'Tour in italiano alle spettacolari Blue Mountains, Patrimonio dell\'Umanità UNESCO. Sosta panoramica alle Three Sisters, passeggiata a Leura con tempo per lo shopping. Colazione australiana inclusa.',
          en: 'Italian-language tour of the spectacular Blue Mountains, UNESCO World Heritage Site. Panoramic stop at the Three Sisters, walk in Leura with shopping time. Australian morning tea included.',
        },
      },
      {
        day: 14,
        title: { it: 'Mini crociera nel porto di Sydney con pranzo', en: 'Sydney Harbour Lunch Cruise' },
        description: {
          it: 'Crociera di due ore nel porto di Sydney con pranzo a buffet incluso. Viste sull\'Opera House, Harbour Bridge e Luna Park dalla barca.',
          en: 'Two-hour cruise around Sydney Harbour with buffet lunch included. Views of the Opera House, Harbour Bridge and Luna Park from the water.',
        },
      },
      {
        day: 15,
        title: { it: 'Volo Sydney – Uluru e tramonto a Uluru', en: 'Flight Sydney – Uluru & Sunset at Uluru' },
        description: {
          it: 'Volo per Ayers Rock. Tour al tramonto di Uluru con audio guida in italiano: avvicinamento alla base del monolite, visita al Mutitjulu Waterhole, storie del Tjukurpa (Tempo del Sogno). Vista panoramica da Talinguru Nyakun Tjaku al tramonto.',
          en: 'Flight to Ayers Rock. Uluru sunset tour with Italian audio guide: approach to the base of the monolith, Mutitjulu Waterhole visit, Tjukurpa (Dreamtime) stories. Panoramic viewpoint at Talinguru Nyakun Tjaku at sunset.',
        },
      },
      {
        day: 16,
        title: { it: 'Kings Canyon', en: 'Kings Canyon' },
        description: {
          it: 'Tour a Kings Canyon con partenza da Ayers Rock Resort, colazione calda a Kings Creek Station. Escursione al bordo del canyon con viste spettacolari sul Watarrka National Park e discesa nel "Garden of Eden". In alternativa: passeggiata di 2 km lungo il letto del torrente.',
          en: 'Kings Canyon tour departing Ayers Rock Resort, hot breakfast at Kings Creek Station. Rim walk with spectacular views over Watarrka National Park and descent into the "Garden of Eden". Alternative: 2 km creek bed walk.',
        },
      },
      {
        day: 17,
        title: { it: 'Kata Tjuta all\'alba e cena Field of Lights', en: 'Kata Tjuta at Dawn & Field of Lights Dinner' },
        description: {
          it: 'Tour all\'alba a Kata Tjuta con colazione all\'aperto e audio guida in italiano. Passeggiata nella Gola di Walpa tra le cupole di conglomerato. La sera: cena sotto le stelle con accesso al Field of Lights, l\'installazione artistica di Bruce Munro con migliaia di sfere luminose. Narratore di stelle incluso.',
          en: 'Kata Tjuta dawn tour with outdoor breakfast and Italian audio guide. Walk through the Walpa Gorge between the conglomerate domes. Evening: dinner under the stars with Field of Lights access, Bruce Munro\'s art installation. Stargazing storyteller included.',
        },
      },
      {
        day: 18,
        title: { it: 'Volo Uluru – Melbourne', en: 'Flight Uluru – Melbourne' },
        description: {
          it: 'Trasferimento privato all\'aeroporto e volo per Melbourne. Check-in al Crowne Promenade. Prima serata libera per esplorare i famosi vicoli di street art e la scena gastronomica della città.',
          en: 'Private transfer to the airport and flight to Melbourne. Check-in at the Crowne Promenade. First evening free to explore the famous street art laneways and the city\'s food scene.',
        },
      },
      {
        day: 19,
        title: { it: 'Great Ocean Road con guida italiana', en: 'Great Ocean Road with Italian Guide' },
        description: {
          it: 'Tour guidato in italiano lungo la Great Ocean Road: tè mattutino sulle spiagge panoramiche, sosta alle Twelve Apostles nel Port Campbell National Park, Loch Ard Gorge, koala selvatici a Kennett River e Apollo Bay. Pranzo incluso.',
          en: 'Italian-guided tour along the Great Ocean Road: morning tea on scenic beaches, Twelve Apostles in Port Campbell National Park, Loch Ard Gorge, wild koalas at Kennett River, Apollo Bay. Lunch included.',
        },
      },
      {
        day: 20,
        title: { it: 'Phillip Island — Penguin Parade con guida italiana', en: 'Phillip Island — Penguin Parade with Italian Guide' },
        description: {
          it: 'Tour in giornata a Phillip Island con guida italiana. Visita al Moonlit Sanctuary (canguri, wombat, echidne), Woolamai Surf Beach, costa occidentale spettacolare, Nobbies. In serata: Penguin Plus — la Parata dei Pinguini dall\'area di osservazione esclusiva.',
          en: 'Full-day Phillip Island tour with Italian guide. Moonlit Sanctuary (kangaroos, wombats, echidnas), Woolamai Surf Beach, spectacular west coast, The Nobbies. Evening: Penguin Plus — the Little Penguin Parade from the exclusive viewing area.',
        },
      },
      {
        day: 21,
        title: { it: 'Giornata libera a Melbourne', en: 'Free Day in Melbourne' },
        description: {
          it: 'Giornata libera per esplorare Melbourne a proprio ritmo: mercati coperti, vicoli di street art, Queen Victoria Market, musei o semplice relax in città.',
          en: 'Free day to explore Melbourne at your own pace: covered markets, street art laneways, Queen Victoria Market, museums or simply relaxing in the city.',
        },
      },
      {
        day: 22,
        title: { it: 'Volo Melbourne – Adelaide – Kangaroo Island', en: 'Flight Melbourne – Adelaide – Kangaroo Island' },
        description: {
          it: 'Volo da Melbourne ad Adelaide e coincidenza per Kangaroo Island. Ritiro auto a noleggio (Mazda CX5 o simile, km illimitati, assicurazione inclusa). Inizio del road trip di 4 giorni sull\'isola. Esplorazione della zona orientale intorno a Kingscote.',
          en: 'Flight from Melbourne to Adelaide with connection to Kangaroo Island. Car rental pick-up (Mazda CX5 or similar, unlimited km, insurance included). Start of the 4-day island road trip. Explore the eastern area around Kingscote.',
        },
      },
      {
        day: 23,
        title: { it: 'Kangaroo Island — Seal Bay e Vivonne Bay', en: 'Kangaroo Island — Seal Bay & Vivonne Bay' },
        description: {
          it: 'Visita al Seal Bay Conservation Park, uno dei luoghi più iconici dell\'isola: passeggiata guidata tra i leoni marini australiani sulla spiaggia. Proseguimento verso Vivonne Bay, considerata una delle spiagge più belle d\'Australia, e le dune di sabbia di Little Sahara.',
          en: 'Visit to Seal Bay Conservation Park, one of the island\'s most iconic spots: guided walk among Australian sea lions on the beach. Continue to Vivonne Bay, often rated one of Australia\'s best beaches, and the Little Sahara sand dunes.',
        },
      },
      {
        day: 24,
        title: { it: 'Kangaroo Island — Flinders Chase National Park', en: 'Kangaroo Island — Flinders Chase National Park' },
        description: {
          it: 'Giornata nel Flinders Chase National Park, la zona più spettacolare dell\'isola. Ammirate le Remarkable Rocks, formazioni granitiche modellate dal vento, e l\'Admirals Arch dove si avvistano foche della Nuova Zelanda. Canguri, wallaby e koala selvatici lungo i sentieri.',
          en: 'Full day at Flinders Chase National Park, the island\'s most spectacular area. See the Remarkable Rocks, wind-sculpted granite formations, and Admirals Arch with New Zealand fur seals. Wild kangaroos, wallabies and koalas along the trails.',
        },
      },
      {
        day: 25,
        title: { it: 'Kangaroo Island — mattina libera, volo per Adelaide', en: 'Kangaroo Island — Free Morning, Flight to Adelaide' },
        description: {
          it: 'Ultima mattina sull\'isola: visita a una fattoria di miele locale (famoso il miele ligure di KI) o degustazione di gin artigianale alla Kangaroo Island Spirits. Volo Kingscote–Adelaide. Trasferimento privato al The Vibe Hotel.',
          en: 'Last morning on the island: visit a local honey farm (KI Ligurian honey is famous) or gin tasting at Kangaroo Island Spirits. Flight Kingscote–Adelaide. Private transfer to The Vibe Hotel.',
        },
      },
      {
        day: 26,
        title: { it: 'Barossa Valley — degustazione vini', en: 'Barossa Valley — Wine Tasting' },
        description: {
          it: 'Intera giornata nella Barossa Valley tra vini eccellenti e paesaggi spettacolari. Degustazioni in cantine storiche a gestione familiare (Kies Family Wines, Turkey Flat, Rosenvale). Sosta nel villaggio di Tanunda e al belvedere di Menglers Hill. Pranzo con prodotti regionali incluso.',
          en: 'Full day in the Barossa Valley among excellent wines and spectacular scenery. Tastings at historic family-run wineries (Kies Family Wines, Turkey Flat, Rosenvale). Stop in Tanunda village and Menglers Hill lookout. Lunch with regional produce included.',
        },
      },
      {
        day: 27,
        title: { it: 'Volo Adelaide – Singapore – Milano', en: 'Flight Adelaide – Singapore – Milan' },
        description: {
          it: 'Trasferimento privato all\'aeroporto di Adelaide. Volo per Singapore e coincidenza notturna per Milano. Fine del viaggio.',
          en: 'Private transfer to Adelaide Airport. Flight to Singapore with overnight connection to Milan. End of the journey.',
        },
      },
      {
        day: 28,
        title: { it: 'Arrivo a Milano', en: 'Arrival in Milan' },
        description: {
          it: 'Arrivo a Milano in mattinata. Fine dei servizi.',
          en: 'Morning arrival in Milan. End of services.',
        },
      },
    ],
    included: {
      it: [
        'Tutti i trasferimenti privati aeroporto/hotel inclusi',
        '2 notti a Darwin — The Vibe Hotel',
        'Tour di 3 giorni Kakadu e Litchfield (pasti e tende safari inclusi)',
        '6 notti a Port Douglas — Shantara Resort (Studio Pool View)',
        'Tour in catamarano nella Grande Barriera Corallina (pranzo incluso)',
        'Tour Cape Tribulation e Daintree con audio guida in italiano (pranzo incluso)',
        'Tour Kuranda con seggiovia e treno panoramico con audio guida in italiano',
        '4 notti a Sydney — Furama Darling Harbour (colazione inclusa)',
        'Tour Blue Mountains con guida in italiano',
        'Crociera nel porto di Sydney con pranzo a bordo',
        '3 notti Ayers Rock — Desert Gardens Hotel',
        'Tour al tramonto di Uluru con audio guida in italiano',
        'Tour all\'alba di Kata Tjuta con colazione e audio guida in italiano',
        'Tour Kings Canyon con guida in inglese',
        'Cena sotto le stelle con accesso al Field of Lights',
        '5 notti a Melbourne — Crowne Promenade',
        'Tour Great Ocean Road con guida in italiano (pranzo incluso)',
        'Tour Phillip Island con Penguin Plus e guida in italiano',
        '3 notti Adelaide — The Vibe Hotel (Deluxe King con colazione)',
        'Tour Barossa Valley con guida in inglese (pranzo e assaggi inclusi)',
        '4 giorni noleggio auto con assicurazione a Kangaroo Island',
        '3 notti Kangaroo Island — Kangaroo Island Seaside Inn',
      ],
      en: [
        'All private airport/hotel transfers',
        '2 nights in Darwin — The Vibe Hotel',
        '3-day Kakadu & Litchfield tour (meals and safari tents included)',
        '6 nights in Port Douglas — Shantara Resort (Studio Pool View)',
        'Great Barrier Reef catamaran tour (lunch included)',
        'Cape Tribulation & Daintree tour with Italian audio guide (lunch included)',
        'Kuranda tour with Skyrail gondola and Scenic Railway, Italian audio guide',
        '4 nights in Sydney — Furama Darling Harbour (breakfast included)',
        'Blue Mountains tour with Italian guide',
        'Sydney Harbour lunch cruise',
        '3 nights Ayers Rock — Desert Gardens Hotel',
        'Uluru sunset tour with Italian audio guide',
        'Kata Tjuta dawn tour with breakfast and Italian audio guide',
        'Kings Canyon tour with English guide',
        'Field of Lights dinner under the stars',
        '5 nights in Melbourne — Crowne Promenade',
        'Great Ocean Road tour with Italian guide (lunch included)',
        'Phillip Island Penguin Parade tour with Italian guide',
        '3 nights Adelaide — The Vibe Hotel (Deluxe King with breakfast)',
        'Barossa Valley tour with English guide (lunch and tastings included)',
        '4-day car hire with insurance on Kangaroo Island',
        '3 nights Kangaroo Island — Kangaroo Island Seaside Inn',
      ],
    },
    notIncluded: standardNotIncluded,
  },
];
