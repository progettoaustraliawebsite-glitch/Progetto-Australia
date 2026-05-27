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
    type: 'adventure',
    gradient: 'from-orange-700 to-red-900',
    image: '/images/dest-hero-australia.png',
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

  // ─────────────────────────────────────────────
  // AUSTRALIA E FIJI — 20 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-fiji',
    slug: 'australia-fiji',
    title: {
      it: 'Australia e Fiji — Sydney, Outback e relax tropicale alle Yasawa',
      en: 'Australia & Fiji — Sydney, Outback and tropical relaxation in the Yasawas',
    },
    description: {
      it: "Un viaggio che unisce la grande Australia — Opera House, Uluru, Great Ocean Road — all'isolata magia delle Fiji. Sydney, il Red Centre con il Kings Canyon e il Field of Lights, Melbourne con i pinguini di Phillip Island, e infine il relax a pensione completa nel resort di Yasawa: un itinerario perfetto per chi vuole tutto.",
      en: "A journey combining great Australia — Opera House, Uluru, Great Ocean Road — with the remote magic of Fiji. Sydney, the Red Centre with Kings Canyon and Field of Lights, Melbourne with Phillip Island's penguins, and finally full-board relaxation at Yasawa Resort: an itinerary for those who want it all.",
    },
    duration: 20,
    destination: 'Australia & Fiji',
    type: 'luxury',
    gradient: 'from-teal-700 to-blue-900',
    image: '/images/itin-fiji.jpg',
    price: { currency: 'EUR', amount: 5240 },
    priceEn: { currency: 'USD', amount: 5700 },
    highlights: {
      it: [
        'Visita guidata dell\'Opera House di Sydney',
        'Tour balene in baia con pranzo a bordo',
        'Uluru al tramonto e Field of Lights dinner',
        'Great Ocean Road e Phillip Island in italiano',
        'Yasawa Resort a pensione completa — Fiji',
      ],
      en: [
        'Guided Opera House tour in Sydney',
        'Whale watching cruise with lunch on board',
        'Uluru at sunset and Field of Lights dinner',
        'Great Ocean Road and Phillip Island in Italian',
        'Yasawa Resort full board — Fiji',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Partenza da Roma', en: 'Departure from Rome' },
        description: {
          it: 'Volo da Roma verso Sydney via Istanbul. Inizio di un\'avventura che attraversa due continenti.',
          en: 'Flight from Rome to Sydney via Istanbul. The beginning of an adventure spanning two continents.',
        },
      },
      {
        day: 2,
        title: { it: 'Arrivo a Sydney', en: 'Arrival in Sydney' },
        description: {
          it: 'Arrivo a Sydney e trasferimento libero al Paradox Hotel con taxi o Uber. Prima notte nella città più iconica d\'Australia.',
          en: 'Arrival in Sydney and free transfer to Paradox Hotel by taxi or Uber. First night in Australia\'s most iconic city.',
        },
      },
      {
        day: 3,
        title: { it: 'Sydney — Opera House e città', en: 'Sydney — Opera House & City' },
        description: {
          it: 'Visita guidata dell\'Opera House di Sydney, uno degli edifici più iconici del mondo. Pomeriggio libero per esplorare il Rocks, il Harbour Bridge e i vicoli del CBD.',
          en: 'Guided tour of the Sydney Opera House, one of the world\'s most iconic buildings. Free afternoon to explore the Rocks, Harbour Bridge, and the CBD laneways.',
        },
      },
      {
        day: 4,
        title: { it: 'Sydney — Bondi Beach', en: 'Sydney — Bondi Beach' },
        description: {
          it: 'Giornata alla celebre Bondi Beach, con le sue onde perfette e la passeggiata panoramica verso Coogee. La spiaggia più famosa d\'Australia.',
          en: 'Day at the famous Bondi Beach with its perfect waves and the panoramic coastal walk to Coogee. Australia\'s most famous beach.',
        },
      },
      {
        day: 5,
        title: { it: 'Tour balene con pranzo a bordo', en: 'Whale Watching Cruise with Lunch' },
        description: {
          it: 'Navigazione panoramica nella baia di Sydney tra l\'Opera House e l\'Harbour Bridge. Colazione o pranzo barbecue a bordo, poi oltre le scogliere di Sydney Heads per incontrare le megattere: spettacolari salti e giochi d\'acqua con naturalisti esperti.',
          en: 'Scenic cruise in Sydney Harbour between the Opera House and Harbour Bridge. Hot breakfast or BBQ lunch on board, then beyond Sydney Heads to meet humpback whales: spectacular breaches and water play with expert naturalists.',
        },
      },
      {
        day: 6,
        title: { it: 'Volo a Ayers Rock — Uluru', en: 'Flight to Ayers Rock — Uluru' },
        description: {
          it: 'Volo mattutino Sydney–Ayers Rock. Ritiro auto a noleggio (Toyota Corolla o similare, Avis All Inclusive con chilometraggio illimitato). Ingresso al parco nazionale e prima visita libera di Uluru: trekking alla base e tramonto magico sul monolite.',
          en: 'Morning flight Sydney–Ayers Rock. Car rental pickup (Toyota Corolla or similar, Avis All Inclusive unlimited mileage). National park entry and first free visit to Uluru: base walk and magical sunset on the monolith.',
        },
      },
      {
        day: 7,
        title: { it: 'Kata Tjuta all\'alba + Field of Lights dinner', en: 'Kata Tjuta at Dawn + Field of Lights Dinner' },
        description: {
          it: 'Alba spettacolare su Kata Tjuta e trekking nella Valle dei Venti. Sera: cena nel deserto con il Field of Lights — migliaia di sfere luminose e cena gourmet sotto il cielo stellato dell\'Outback.',
          en: 'Spectacular dawn over Kata Tjuta and Valle dei Venti hike. Evening: dinner in the desert at Field of Lights — thousands of light spheres and a gourmet dinner under the Outback\'s starred sky.',
        },
      },
      {
        day: 8,
        title: { it: 'Tour Kings Canyon', en: 'Kings Canyon Tour' },
        description: {
          it: 'Tour organizzato al Kings Canyon con colazione a Kings Creek Station. Trekking di 6 km sul bordo del canyon con guida, visita al Giardino dell\'Eden e panorama sul Parco Nazionale di Watarrka.',
          en: 'Guided Kings Canyon tour with breakfast at Kings Creek Station. 6 km canyon rim hike, visit to the Garden of Eden, and panoramic views over Watarrka National Park.',
        },
      },
      {
        day: 9,
        title: { it: 'Volo ad Ayers Rock–Melbourne', en: 'Flight Ayers Rock–Melbourne' },
        description: {
          it: 'Consegna auto in aeroporto e volo pomeridiano verso Melbourne. Check-in al Crown Promenade e prima sera nella capitale culturale d\'Australia.',
          en: 'Car drop-off at the airport and afternoon flight to Melbourne. Check-in at Crown Promenade and first evening in Australia\'s cultural capital.',
        },
      },
      {
        day: 10,
        title: { it: 'Melbourne — visita libera', en: 'Melbourne — Free Exploration' },
        description: {
          it: 'Giornata libera per esplorare Melbourne: i vicoli con street art, i rooftop bar, i mercati di Queen Victoria e la vivace scena gastronomica.',
          en: 'Free day to explore Melbourne: street art laneways, rooftop bars, Queen Victoria Market, and the vibrant food scene.',
        },
      },
      {
        day: 11,
        title: { it: 'Great Ocean Road con audioguida italiana', en: 'Great Ocean Road with Italian Audio Guide' },
        description: {
          it: 'Tour in giornata sulla Great Ocean Road con audioguida in italiano. Tè mattutino sulle spiagge della Surf Coast, i Dodici Apostoli nel Port Campbell National Park, la Gola del Loch Ard e i koala di Kennett River.',
          en: 'Full-day Great Ocean Road tour with Italian audio guide. Morning tea on the Surf Coast beaches, the Twelve Apostles in Port Campbell National Park, Loch Ard Gorge, and koalas at Kennett River.',
        },
      },
      {
        day: 12,
        title: { it: 'Phillip Island — Penguin Parade Plus', en: 'Phillip Island — Penguin Plus Parade' },
        description: {
          it: 'Tour a Phillip Island con audioguida italiana e ingresso Plus con accesso alle passerelle privilegiate. Brighton Beach boxes, Moonlit Sanctuary, Nobbies e Seal Rock, e al tramonto la sfilata dei pinguini fatati che tornano ai loro nidi.',
          en: 'Phillip Island tour with Italian audio guide and Penguin Plus access to private boardwalks. Brighton Beach boxes, Moonlit Sanctuary, Nobbies and Seal Rock, and at sunset the fairy penguins\' parade returning to their burrows.',
        },
      },
      {
        day: 13,
        title: { it: 'Volo Melbourne–Nadi, Fiji', en: 'Flight Melbourne–Nadi, Fiji' },
        description: {
          it: 'Volo pomeridiano verso le Fiji. Check-in al Fiji Gateway Hotel di fronte all\'aeroporto internazionale di Nadi.',
          en: 'Afternoon flight to Fiji. Check-in at Fiji Gateway Hotel right across from Nadi International Airport.',
        },
      },
      {
        day: 14,
        title: { it: 'Trasferimento panoramico a Yasawa Resort', en: 'Scenic Transfer to Yasawa Resort' },
        description: {
          it: 'Trasferimento gratuito in volo panoramico al Yasawa Resort nelle isole Yasawa. Check-in al Deluxe Bure con trattamento di pensione completa. Primo contatto con la laguna cristallina delle Fiji.',
          en: 'Complimentary scenic flight transfer to Yasawa Resort in the Yasawa Islands. Check-in to a Deluxe Bure with full-board. First contact with Fiji\'s crystal-clear lagoon.',
        },
      },
      {
        day: 15,
        title: { it: 'Yasawa Resort — relax', en: 'Yasawa Resort — Relaxation' },
        description: {
          it: 'Giornata di relax totale al Yasawa Resort. Spiagge bianche, snorkeling nella laguna, attività del resort e cucina locale a pensione completa.',
          en: 'Total relaxation day at Yasawa Resort. White beaches, lagoon snorkeling, resort activities, and local cuisine on full board.',
        },
      },
      {
        day: 16,
        title: { it: 'Yasawa Resort — isole e cultura Fijiana', en: 'Yasawa Resort — Islands & Fijian Culture' },
        description: {
          it: 'Escursioni nella laguna, visita ai villaggi locali e immersione nella cultura Fijiana. Serate con danze tradizionali e cerimonie del kava.',
          en: 'Lagoon excursions, local village visits, and immersion in Fijian culture. Evenings with traditional dances and kava ceremonies.',
        },
      },
      {
        day: 17,
        title: { it: 'Yasawa Resort — ultimo giorno al paradiso', en: 'Yasawa Resort — Last Day in Paradise' },
        description: {
          it: 'Ultima giornata nella laguna turchese delle Yasawa. Snorkeling, immersioni o semplicemente ozio in riva al mare prima dell\'ultimo tramonto sulle isole Fiji.',
          en: 'Last day in the Yasawa turquoise lagoon. Snorkeling, diving, or simply lounging by the sea before the final sunset over the Fiji islands.',
        },
      },
      {
        day: 18,
        title: { it: 'Rientro a Nadi, volo verso Roma', en: 'Return to Nadi, Flight to Rome' },
        description: {
          it: 'Volo panoramico di ritorno a Nadi. Pernottamento al Fiji Gateway Hotel e volo notturno verso Sydney poi Istanbul.',
          en: 'Scenic flight back to Nadi. Overnight at Fiji Gateway Hotel and night flight towards Sydney then Istanbul.',
        },
      },
      {
        day: 19,
        title: { it: 'Volo di ritorno', en: 'Return Flight' },
        description: {
          it: 'Scala a Sydney e volo verso Istanbul. Ultimo giorno di viaggio sopra i cieli del Pacifico e dell\'Asia.',
          en: 'Stopover in Sydney and flight to Istanbul. Last travel day above the Pacific and Asian skies.',
        },
      },
      {
        day: 20,
        title: { it: 'Arrivo a Roma', en: 'Arrival in Rome' },
        description: {
          it: 'Volo Istanbul–Roma. Fine di un viaggio indimenticabile attraverso l\'Australia e le isole Fiji.',
          en: 'Istanbul–Rome flight. End of an unforgettable journey through Australia and the Fiji Islands.',
        },
      },
    ],
    included: {
      it: [
        'Assistenza in loco in lingua italiana (telefonica e chat) per tutta la durata',
        'Sistemazioni come da itinerario (colazioni solo dove specificate)',
        'Documentazione di viaggio completa in PDF e digitale',
        'Visita guidata Opera House di Sydney',
        'Tour balene in baia di Sydney con pranzo a bordo',
        'Ingresso al Parco Nazionale di Ayers Rock (valido tutto il soggiorno)',
        'Cena Field of Lights ad Ayers Rock',
        'Tour Kings Canyon con colazione inclusa',
        'Auto a noleggio Ayers Rock — formula All Inclusive, km illimitati, 2° guidatore incluso (Avis)',
        'Tour Great Ocean Road con audioguida italiana',
        'Tour Phillip Island Penguin Parade con audioguida italiana — ingresso Plus',
        'Trasferimento panoramico in aereo Nadi–Yasawa Resort (A/R)',
        'Yasawa Resort — 4 notti in Deluxe Bure con pensione completa',
        '4 notti Paradox Hotel Sydney (Heritage Room)',
        '3 notti Outback Hotel Ayers Rock (Standard Room)',
        '4 notti Crown Promenade Melbourne (Standard King Room)',
        '2 notti Fiji Gateway Hotel Nadi (Superior Room)',
      ],
      en: [
        'Italian-language on-site assistance (phone and chat) throughout',
        'Accommodation as per itinerary (breakfast where specified)',
        'Complete travel documentation in PDF and digital format',
        'Guided Opera House tour in Sydney',
        'Whale watching cruise in Sydney Harbour with lunch on board',
        'Ayers Rock National Park entry pass (valid entire stay)',
        'Field of Lights dinner at Ayers Rock',
        'Kings Canyon tour with breakfast included',
        'Car rental Ayers Rock — All Inclusive formula, unlimited km, 2nd driver included (Avis)',
        'Great Ocean Road tour with Italian audio guide',
        'Phillip Island Penguin Parade tour with Italian audio guide — Plus entry',
        'Scenic flight transfer Nadi–Yasawa Resort (return)',
        'Yasawa Resort — 4 nights in Deluxe Bure full board',
        '4 nights Paradox Hotel Sydney (Heritage Room)',
        '3 nights Outback Hotel Ayers Rock (Standard Room)',
        '4 nights Crown Promenade Melbourne (Standard King Room)',
        '2 nights Fiji Gateway Hotel Nadi (Superior Room)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // AUSTRALIA WINTER EXPLORER — 25 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-winter-explorer',
    slug: 'australia-winter-explorer',
    title: {
      it: 'Australia Winter Explorer — Dal Kimberley alle Whitsundays',
      en: 'Australia Winter Explorer — From the Kimberley to the Whitsundays',
    },
    description: {
      it: "Un'avventura di 25 giorni attraverso l'Australia più autentica: guide italiane a Perth e nel deserto dei Pinnacoli, 4x4 nel selvaggio Kimberley e a Emma Gorge, Kings Canyon via Meerenie Loop, volo panoramico su Uluru e Kata Tjuta, Sydney con vista sull'Opera House, e Hamilton Island con la minicrociera a Whitehaven Beach e il volo in biplano sull'Heart Reef.",
      en: "A 25-day adventure through Australia's most authentic landscapes: Italian guides in Perth and the Pinnacles Desert, 4x4 in the wild Kimberley and Emma Gorge, Kings Canyon via the Meerenie Loop, scenic flight over Uluru and Kata Tjuta, Sydney with Opera House views, and Hamilton Island with a Whitehaven Beach minicruise and biplane flight over Heart Reef.",
    },
    duration: 25,
    destination: 'Australia',
    type: 'adventure',
    gradient: 'from-orange-700 to-red-900',
    image: '/images/itin-selfdrive.jpg',
    price: { currency: 'EUR', amount: 3700 },
    priceEn: { currency: 'USD', amount: 4000 },
    highlights: {
      it: [
        'Perth e Fremantle con guida italiana privata',
        'Kimberley e Emma Gorge in 4x4 (Toyota Prado)',
        'Kings Canyon via Meerenie Loop (150 km off-road)',
        'Volo panoramico su Uluru e Kata Tjuta',
        'Whitehaven Beach e Heart Reef in biplano — Whitsundays',
      ],
      en: [
        'Perth and Fremantle with private Italian guide',
        'Kimberley and Emma Gorge by 4x4 (Toyota Prado)',
        'Kings Canyon via Meerenie Loop (150 km off-road)',
        'Scenic flight over Uluru and Kata Tjuta',
        'Whitehaven Beach and Heart Reef by biplane — Whitsundays',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Partenza da Roma', en: 'Departure from Rome' },
        description: {
          it: 'Volo da Roma verso Perth. Inizio di un\'avventura attraverso l\'Australia più selvaggia.',
          en: 'Flight from Rome to Perth. The start of an adventure through Australia\'s wildest landscapes.',
        },
      },
      {
        day: 2,
        title: { it: 'Arrivo a Perth', en: 'Arrival in Perth' },
        description: {
          it: 'Arrivo a Perth alle ore 08.45. Transfer privato all\'Intercontinental Perth City Center. Primo pomeriggio per ambientarsi nella capitale dell\'Australia Occidentale.',
          en: 'Arrival in Perth at 08:45. Private transfer to Intercontinental Perth City Center. First afternoon to settle into the capital of Western Australia.',
        },
      },
      {
        day: 3,
        title: { it: 'Tour privato Perth e Fremantle', en: 'Private Perth & Fremantle Tour' },
        description: {
          it: 'Tour privato con guida italiana della città di Perth e del porto storico di Fremantle: l\'Old Gaol, i mercati, il lungomare e l\'architettura coloniale.',
          en: 'Private tour with Italian guide of Perth city and the historic port of Fremantle: the Old Gaol, markets, waterfront, and colonial architecture.',
        },
      },
      {
        day: 4,
        title: { it: 'Tour privato deserto dei Pinnacoli', en: 'Private Pinnacles Desert Tour' },
        description: {
          it: 'Tour privato con guida italiana al Nambung National Park per visitare il misterioso deserto dei Pinnacoli: migliaia di colonne di pietra calcarea che emergono dalla sabbia dorata.',
          en: 'Private tour with Italian guide to Nambung National Park for the mysterious Pinnacles Desert: thousands of limestone columns rising from golden sand.',
        },
      },
      {
        day: 5,
        title: { it: 'Volo a Kununurra — Kimberley', en: 'Flight to Kununurra — Kimberley' },
        description: {
          it: 'Transfer privato all\'aeroporto e volo verso Kununurra. Ritiro del 4x4 (Toyota Prado o similare, tariffa all-inclusive km illimitati) e prima notte nelle Tented Cabin di Emma Gorge.',
          en: 'Private transfer to the airport and flight to Kununurra. Pick up the 4x4 (Toyota Prado or similar, all-inclusive unlimited km) and first night in Emma Gorge Tented Cabins.',
        },
      },
      {
        day: 6,
        title: { it: 'Emma Gorge — Kimberley selvaggio', en: 'Emma Gorge — Wild Kimberley' },
        description: {
          it: 'Esplorazione dell\'El Questro Wilderness Park e del Kimberley: gole di arenaria rossa, sorgenti termali e fauna unica. Trekking verso Emma Gorge e la sua piscina naturale nascosta.',
          en: 'Exploration of El Questro Wilderness Park and the Kimberley: red sandstone gorges, thermal springs, and unique wildlife. Trek to Emma Gorge and its hidden natural pool.',
        },
      },
      {
        day: 7,
        title: { it: 'Kimberley — El Questro full day', en: 'Kimberley — El Questro Full Day' },
        description: {
          it: 'Giornata completa di avventura nell\'El Questro Wilderness Park (morning tea, pranzo e afternoon tea inclusi): gorge, baobab e tramonti mozzafiato sul Kimberley.',
          en: 'Full day adventure in El Questro Wilderness Park (morning tea, lunch and afternoon tea included): gorges, boab trees, and breathtaking Kimberley sunsets.',
        },
      },
      {
        day: 8,
        title: { it: 'Kimberley — giornata libera', en: 'Kimberley — Free Day' },
        description: {
          it: 'Ultima giornata nel Kimberley con il 4x4. Esplorazione libera delle strade sterrate, delle gorge e dei bacini d\'acqua di questa regione tra le più remote al mondo.',
          en: 'Last day in the Kimberley with the 4x4. Free exploration of dirt tracks, gorges, and waterholes of one of the world\'s most remote regions.',
        },
      },
      {
        day: 9,
        title: { it: 'Volo Kununurra–Darwin', en: 'Flight Kununurra–Darwin' },
        description: {
          it: 'Consegna dell\'auto 4x4 all\'aeroporto e volo verso Darwin. Transfer privato al Vibe Hotel Waterfront. Sera sul lungomare di Darwin.',
          en: 'Drop off the 4x4 at the airport and flight to Darwin. Private transfer to Vibe Hotel Waterfront. Evening on Darwin\'s waterfront.',
        },
      },
      {
        day: 10,
        title: { it: 'Volo Darwin–Alice Springs', en: 'Flight Darwin–Alice Springs' },
        description: {
          it: 'Transfer privato all\'aeroporto e volo verso Alice Springs. Ritiro di 2 auto 4x4 (Suzuki Jimny o similare, one way fee inclusa nel preventivo). Check-in al Crown Plaza.',
          en: 'Private transfer to the airport and flight to Alice Springs. Pick up 2 4x4 cars (Suzuki Jimny or similar, one-way fee included). Check-in at Crown Plaza.',
        },
      },
      {
        day: 11,
        title: { it: 'Meerenie Loop — Kings Canyon', en: 'Meerenie Loop — Kings Canyon' },
        description: {
          it: 'Percorso epico sulla Meerenie Loop Road: 300 km totali di cui 150 km non asfaltati attraverso il Red Centre. Arrivo al Kings Canyon Resort con le glamping tent nel cuore dell\'Outback.',
          en: 'Epic drive on the Meerenie Loop Road: 300 km total of which 150 km unpaved through the Red Centre. Arrival at Kings Canyon Resort glamping tents in the heart of the Outback.',
        },
      },
      {
        day: 12,
        title: { it: 'Kings Canyon — visita libera', en: 'Kings Canyon — Free Exploration' },
        description: {
          it: 'Giornata libera al Kings Canyon: trekking sul bordo del canyon (Rim Walk, 6 km), visita al Giardino dell\'Eden e panorami sul Watarrka National Park.',
          en: 'Free day at Kings Canyon: Rim Walk hike (6 km), visit to the Garden of Eden, and views over Watarrka National Park.',
        },
      },
      {
        day: 13,
        title: { it: 'Proseguimento per Ayers Rock–Uluru', en: 'Drive to Ayers Rock–Uluru' },
        description: {
          it: 'Trasferimento in auto (circa 300 km) verso Ayers Rock. Check-in al Sail in the Desert Hotel. Pomeriggio: visita libera dei Monti Olgas (Kata Tjuta). Sera: volo panoramico su Uluru e Kata Tjuta (36 minuti).',
          en: 'Drive (approx. 300 km) to Ayers Rock. Check-in at Sail in the Desert Hotel. Afternoon: free visit to the Olgas (Kata Tjuta). Evening: scenic flight over Uluru and Kata Tjuta (36 minutes).',
        },
      },
      {
        day: 14,
        title: { it: 'Uluru — Field of Lights e tramonto', en: 'Uluru — Field of Lights & Sunset' },
        description: {
          it: 'Giornata libera attorno a Uluru: trekking alla base, osservazione della fauna dell\'Outback e punti panoramici. Sera: cena Field of Lights — migliaia di sfere luminose e cena gourmet nel deserto sotto le stelle.',
          en: 'Free day around Uluru: base walk, Outback wildlife spotting, and lookout points. Evening: Field of Lights dinner — thousands of illuminated spheres and gourmet dinner in the desert under the stars.',
        },
      },
      {
        day: 15,
        title: { it: 'Volo Ayers Rock–Sydney', en: 'Flight Ayers Rock–Sydney' },
        description: {
          it: 'Volo pomeridiano verso Sydney. Transfer privato all\'Intercontinental Sydney con vista sull\'Opera House. Prime ore in città.',
          en: 'Afternoon flight to Sydney. Private transfer to Intercontinental Sydney with Opera House views. First hours in the city.',
        },
      },
      {
        day: 16,
        title: { it: 'Sydney — tour privato con guida italiana', en: 'Sydney — Private Tour with Italian Guide' },
        description: {
          it: 'Tour privato della città di Sydney con guida italiana: Opera House, Harbour Bridge, The Rocks, Darling Harbour e i quartieri più vivaci della città.',
          en: 'Private Sydney city tour with Italian guide: Opera House, Harbour Bridge, The Rocks, Darling Harbour, and the city\'s most vibrant neighborhoods.',
        },
      },
      {
        day: 17,
        title: { it: 'Sydney — Blue Mountains con guida italiana', en: 'Sydney — Blue Mountains with Italian Guide' },
        description: {
          it: 'Tour in piccolo gruppo alle Blue Mountains con guida italiana: Three Sisters, panorami sulle vallate eucaliptizie, Scenic Railway e Katoomba.',
          en: 'Small group Blue Mountains tour with Italian guide: Three Sisters, panoramic views over the eucalyptus valleys, Scenic Railway, and Katoomba.',
        },
      },
      {
        day: 18,
        title: { it: 'Sydney — giornata libera', en: 'Sydney — Free Day' },
        description: {
          it: 'Giornata libera a Sydney: Bondi Beach, Manly via ferry, mercati di Paddington o semplicemente ozio con vista sull\'Opera House dall\'Intercontinental.',
          en: 'Free day in Sydney: Bondi Beach, Manly by ferry, Paddington markets, or simply relaxing with Opera House views from the Intercontinental.',
        },
      },
      {
        day: 19,
        title: { it: 'Volo Sydney–Hamilton Island + Whitehaven Beach', en: 'Flight Sydney–Hamilton Island + Whitehaven Beach' },
        description: {
          it: 'Volo verso Hamilton Island nelle Whitsundays. Check-in al The Sundays Hotel con balcone. Pomeriggio: minicrociera alla Whitehaven Beach, con la sua sabbia bianca pura al 98% di silice.',
          en: 'Flight to Hamilton Island in the Whitsundays. Check-in at The Sundays Hotel with balcony. Afternoon: minicruise to Whitehaven Beach, with its 98% pure silica white sand.',
        },
      },
      {
        day: 20,
        title: { it: 'Hamilton Island — volo in biplano', en: 'Hamilton Island — Biplane Flight' },
        description: {
          it: 'Esperienza unica: volo panoramico in biplano su Whitehaven Beach e Heart Reef, la barriera corallina a forma di cuore visibile solo dall\'alto. La Grande Barriera Corallina dall\'alto.',
          en: 'Unique experience: biplane scenic flight over Whitehaven Beach and Heart Reef, the heart-shaped coral reef visible only from the air. The Great Barrier Reef from above.',
        },
      },
      {
        day: 21,
        title: { it: 'Hamilton Island — relax', en: 'Hamilton Island — Relaxation' },
        description: {
          it: 'Giornata libera sulle spiagge di Hamilton Island: snorkeling, kayak, escursioni in golf cart sull\'isola o relax in riva al Coral Sea.',
          en: 'Free day on Hamilton Island\'s beaches: snorkeling, kayaking, golf cart island tour, or relaxation by the Coral Sea.',
        },
      },
      {
        day: 22,
        title: { it: 'Hamilton Island — ultimo giorno', en: 'Hamilton Island — Last Day' },
        description: {
          it: 'Ultima giornata nelle Whitsundays. Crociera opzionale alla Grande Barriera Corallina o relax sulla spiaggia prima del rientro.',
          en: 'Last day in the Whitsundays. Optional Great Barrier Reef cruise or beach relaxation before departure.',
        },
      },
      {
        day: 23,
        title: { it: 'Hamilton Island — relax finale', en: 'Hamilton Island — Final Relaxation' },
        description: {
          it: 'Ultima mattinata sull\'isola prima del transfer in shuttle all\'aeroporto.',
          en: 'Last morning on the island before shuttle transfer to the airport.',
        },
      },
      {
        day: 24,
        title: { it: 'Volo di ritorno verso Roma', en: 'Return Flight to Rome' },
        description: {
          it: 'Transfer in shuttle all\'aeroporto di Hamilton Island. Volo verso Sydney, poi Sydney–Dubai e Dubai–Roma.',
          en: 'Shuttle transfer to Hamilton Island airport. Flight to Sydney, then Sydney–Dubai and Dubai–Rome.',
        },
      },
      {
        day: 25,
        title: { it: 'Arrivo a Roma', en: 'Arrival in Rome' },
        description: {
          it: 'Atterraggio a Roma Fiumicino. Fine di un viaggio attraverso l\'Australia più autentica: dal Kimberley alle Whitsundays.',
          en: 'Landing at Rome Fiumicino. End of a journey through Australia\'s most authentic landscapes: from the Kimberley to the Whitsundays.',
        },
      },
    ],
    included: {
      it: [
        'Assistenza in lingua italiana per tutta la durata del soggiorno',
        'Transfer privato aeroporto Perth – hotel e hotel – aeroporto',
        'Tour privato con guida italiana di Perth e Fremantle',
        'Tour privato deserto dei Pinnacoli con guida italiana',
        'Noleggio 4x4 Toyota Prado, tariffa all-inclusive km illimitati (Kununurra)',
        'El Questro full day tour (morning tea, pranzo e afternoon tea inclusi)',
        'Noleggio 2 auto 4x4 Alice Springs – Ayers Rock (Suzuki Jimny, one-way fee inclusa)',
        'Volo panoramico su Uluru e Kata Tjuta (36 minuti)',
        'Cena Field of Lights ad Uluru',
        'Transfer privato Darwin aeroporto – hotel e ritorno',
        'Transfer privato Sydney aeroporto – hotel',
        'Tour privato di Sydney con guida italiana',
        'Tour Blue Mountains con guida italiana (piccolo gruppo)',
        'Transfer privato hotel Sydney – aeroporto',
        'Minicrociera alla Whitehaven Beach',
        'Volo panoramico in biplano su Whitehaven Beach e Heart Reef',
        'Transfer in shuttle aeroporto Hamilton Island A/R',
        '3 notti Intercontinental Perth (King Classic + Twin Classic)',
        '3 notti Emma Gorge Tented Cabin (colazione inclusa)',
        '1 notte Vibe Hotel Waterfront Darwin',
        '1 notte Crown Plaza Alice Springs',
        '2 notti Kings Canyon Resort Glamping tent',
        '2 notti Sail in the Desert Uluru (Double + Twin Superior)',
        '3 notti Intercontinental Sydney (Double Opera House view)',
        '4 notti The Sundays Hamilton Island (Sundays Balcony)',
      ],
      en: [
        'Italian-language assistance for the entire trip',
        'Private airport transfer Perth – hotel and hotel – airport',
        'Private tour with Italian guide: Perth and Fremantle',
        'Private Pinnacles Desert tour with Italian guide',
        '4x4 Toyota Prado rental, all-inclusive unlimited km (Kununurra)',
        'El Questro full day tour (morning tea, lunch and afternoon tea included)',
        '2 x 4x4 rental Alice Springs – Ayers Rock (Suzuki Jimny, one-way fee included)',
        'Scenic flight over Uluru and Kata Tjuta (36 minutes)',
        'Field of Lights dinner at Uluru',
        'Private transfer Darwin airport – hotel and return',
        'Private transfer Sydney airport – hotel',
        'Private Sydney city tour with Italian guide',
        'Blue Mountains tour with Italian guide (small group)',
        'Private transfer Sydney hotel – airport',
        'Whitehaven Beach minicruise',
        'Biplane scenic flight over Whitehaven Beach and Heart Reef',
        'Hamilton Island airport shuttle transfer (return)',
        '3 nights Intercontinental Perth (King Classic + Twin Classic)',
        '3 nights Emma Gorge Tented Cabin (breakfast included)',
        '1 night Vibe Hotel Waterfront Darwin',
        '1 night Crown Plaza Alice Springs',
        '2 nights Kings Canyon Resort Glamping tent',
        '2 nights Sail in the Desert Uluru (Double + Twin Superior)',
        '3 nights Intercontinental Sydney (Double Opera House view)',
        '4 nights The Sundays Hamilton Island (Sundays Balcony)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // NUOVA ZELANDA: NEL CUORE DELLA TERRA DI MEZZO — 15 giorni
  // ─────────────────────────────────────────────
  {
    id: 'nuova-zelanda-terra-di-mezzo',
    slug: 'nuova-zelanda-terra-di-mezzo',
    title: {
      it: 'Nuova Zelanda: Nel cuore della Terra di Mezzo',
      en: 'New Zealand: In the Heart of Middle-earth',
    },
    description: {
      it: "Un viaggio di 15 giorni attraverso la Nuova Zelanda sulle orme del Signore degli Anelli: Hobbiton nel cuore del Waikato, le grotte luminose di Waitomo, il vulcano di Tongariro (il vero Mordor), Wellington con Weta Workshop, i fiordi di Milford Sound e i paesaggi leggendari di Queenstown e Glenorchy. Un itinerario per chi ama l'avventura, la natura e la magia del cinema.",
      en: "A 15-day journey through New Zealand following in the footsteps of The Lord of the Rings: Hobbiton in the heart of the Waikato, the glowworm caves of Waitomo, the volcanic Tongariro (the real Mordor), Wellington with Weta Workshop, the fjords of Milford Sound, and the legendary landscapes of Queenstown and Glenorchy.",
    },
    duration: 15,
    destination: 'New Zealand',
    type: 'adventure',
    gradient: 'from-emerald-700 to-green-900',
    image: '/images/dest-nz.jpg',
    price: { currency: 'EUR', amount: 3850 },
    priceEn: { currency: 'USD', amount: 4200 },
    highlights: {
      it: [
        'Hobbiton Movie Set — la vera Contea™ con cena inclusa',
        'Grotte di Waitomo — barca tra i glowworm',
        'Tongariro — il vero Mordor e l\'altopiano vulcanico',
        'Weta Workshop + tour LOTR a Wellington',
        'Milford Sound in crociera + LOTR full day a Queenstown',
      ],
      en: [
        'Hobbiton Movie Set — the real Shire™ with dinner included',
        'Waitomo Caves — boat ride among glowworms',
        'Tongariro — the real Mordor and volcanic plateau',
        'Weta Workshop + LOTR tour in Wellington',
        'Milford Sound cruise + LOTR full day in Queenstown',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' },
        description: {
          it: 'Arrivo all\'aeroporto internazionale di Auckland e trasferimento privato in hotel. Resto della giornata dedicato al riposo e all\'adattamento del fuso orario.',
          en: 'Arrival at Auckland International Airport and private transfer to the hotel. Rest of the day for relaxation and adjusting to the time zone.',
        },
      },
      {
        day: 2,
        title: { it: 'Auckland — giornata libera', en: 'Auckland — Free Day' },
        description: {
          it: 'Giornata libera per scoprire Auckland: Auckland War Memorial Museum, Viaduct Harbour, Piha Beach o un\'escursione in traghetto alla splendida Waiheke Island con le sue cantine vinicole. Ritiro dell\'auto a noleggio in centro.',
          en: 'Free day to discover Auckland: War Memorial Museum, Viaduct Harbour, Piha Beach, or a ferry trip to beautiful Waiheke Island with its wineries. Car rental pick-up in the city centre.',
        },
      },
      {
        day: 3,
        title: { it: 'Auckland → Rotorua via Hobbiton e Waitomo', en: 'Auckland → Rotorua via Hobbiton and Waitomo' },
        description: {
          it: 'Partenza per Rotorua con due tappe iconiche: Hobbiton Movie Set con tour guidato della Contea™, visita a Bag End, il Hobbit Hole™ e il Green Dragon™ Inn con cena inclusa. Poi le Grotte di Waitomo: 250 metri di scenari sotterranei culminanti in un\'impareggiabile gita in barca sotto migliaia di glowworm.',
          en: 'Drive to Rotorua with two iconic stops: Hobbiton Movie Set with guided tour of the Shire™, visiting Bag End, a Hobbit Hole™, and the Green Dragon™ Inn with dinner included. Then Waitomo Glowworm Caves: 250 metres of underground scenery culminating in an unmatchable boat ride under thousands of glowworms.',
        },
      },
      {
        day: 4,
        title: { it: 'Rotorua — Valle Geotermale e cultura Maori', en: 'Rotorua — Geothermal Valley & Maori Culture' },
        description: {
          it: 'Visita alla spettacolare Valle Geotermale di Waimangu: geyser, laghi multicolori e formazioni vulcaniche uniche al mondo. Sera: visita al Maori Arts & Crafts Institute con spettacolo tradizionale e cena Maori inclusa.',
          en: 'Visit to the spectacular Waimangu Geothermal Valley: geysers, multi-coloured lakes, and unique volcanic formations. Evening: visit to the Maori Arts & Crafts Institute with traditional performance and Maori dinner included.',
        },
      },
      {
        day: 5,
        title: { it: 'Rotorua → National Park — Tongariro (Mordor)', en: 'Rotorua → National Park — Tongariro (Mordor)' },
        description: {
          it: 'Partenza per il National Park, cuore dell\'altopiano vulcanico centrale. Sosta al Lago Taupo e alle spettacolari Huka Falls. Il parco è dominato dai tre vulcani attivi Ruapehu, Ngauruhoe (il vero Monte Fato) e Tongariro — paesaggi indimenticabili del Signore degli Anelli.',
          en: 'Drive to the National Park in the heart of the volcanic central plateau. Stop at Lake Taupo and the spectacular Huka Falls. The park is dominated by three active volcanoes: Ruapehu, Ngauruhoe (the real Mount Doom), and Tongariro — unforgettable Lord of the Rings landscapes.',
        },
      },
      {
        day: 6,
        title: { it: 'National Park → Wellington', en: 'National Park → Wellington' },
        description: {
          it: 'Mattina con possibilità di trekking tra i vulcani del Tongariro. Nel pomeriggio partenza verso Wellington, la capitale culturale e "città del vento" della Nuova Zelanda, nota per la sua scena gastronomica e il suo ruolo nella produzione dei film di Peter Jackson.',
          en: 'Morning with optional trekking among the Tongariro volcanoes. Afternoon drive to Wellington, New Zealand\'s cultural capital and "Windy City", famous for its food scene and role in Peter Jackson\'s films.',
        },
      },
      {
        day: 7,
        title: { it: 'Wellington — Tour Signore degli Anelli + Weta Workshop', en: 'Wellington — Lord of the Rings Tour + Weta Workshop' },
        description: {
          it: 'Intera giornata (6–6,5 ore) sui set del Signore degli Anelli nei dintorni di Wellington. Visita a Weta Workshop con tour guidato per vedere come vengono realizzati costumi, oggetti di scena e armi. Una delle esperienze più complete per i fan della saga di Tolkien.',
          en: 'Full day (6–6.5 hours) visiting Lord of the Rings filming locations around Wellington. Guided visit to Weta Workshop to see how costumes, props, and weapons are crafted. One of the most complete experiences for fans of Tolkien\'s saga.',
        },
      },
      {
        day: 8,
        title: { it: 'Wellington → Kaikoura (traghetto + Marlborough Sounds)', en: 'Wellington → Kaikoura (Ferry + Marlborough Sounds)' },
        description: {
          it: 'Traversata del meraviglioso Stretto di Cook in traghetto (circa 3 ore) verso l\'Isola Sud. Il tragitto attraversa la regione dei Marlborough Sounds, celebre per il Sauvignon Blanc, con possibilità di sosta per il pranzo in un vigneto. Arrivo a Kaikoura, terra delle aragoste e delle balene.',
          en: 'Crossing the wonderful Cook Strait by ferry (approx. 3 hours) to the South Island. The route passes through the Marlborough Sounds region, famous for Sauvignon Blanc, with optional lunch stop at a vineyard. Arrival in Kaikoura, land of crayfish and whales.',
        },
      },
      {
        day: 9,
        title: { it: 'Kaikoura → Christchurch — avvistamento balene', en: 'Kaikoura → Christchurch — Whale Watching' },
        description: {
          it: 'Escursione in barca per l\'avvistamento delle balene (2h30): capodogli, megattere, balene blu, delfini Hector (i più piccoli al mondo), foche e albatros. Un\'esperienza in mare aperto unica. Nel pomeriggio, proseguimento per Christchurch.',
          en: 'Whale watching boat trip (2h30): sperm whales, humpbacks, blue whales, Hector\'s dolphins (the world\'s smallest), fur seals, and albatrosses. A unique open-sea experience. Afternoon drive to Christchurch.',
        },
      },
      {
        day: 10,
        title: { it: 'Christchurch → Lake Tekapo', en: 'Christchurch → Lake Tekapo' },
        description: {
          it: 'Guida verso il lago Tekapo nel cuore della regione Mackenzie. L\'iconico colore turchese del lago — creato dalla polvere di ghiacciaio sospesa nelle acque — e la storica Chiesa del Buon Pastore sulle rive del lago sono tra le immagini più belle della Nuova Zelanda.',
          en: 'Drive to Lake Tekapo in the heart of the Mackenzie region. The iconic turquoise colour of the lake — created by glacial flour suspended in the water — and the historic Church of the Good Shepherd on the lake shore are among New Zealand\'s most beautiful images.',
        },
      },
      {
        day: 11,
        title: { it: 'Lake Tekapo → Wanaka (Mt Cook e Lago Pukaki)', en: 'Lake Tekapo → Wanaka (Mt Cook & Lake Pukaki)' },
        description: {
          it: 'Percorso panoramico con soste ai lookout: vista spettacolare del Mount Cook e del Lago Pukaki. Arrivo a Wanaka, porta d\'accesso al Parco Nazionale del Mount Aspiring, e foto all\'iconico albero che cresce in mezzo al lago.',
          en: 'Scenic drive with lookout stops: spectacular views of Mount Cook and Lake Pukaki. Arrival in Wanaka, gateway to Mount Aspiring National Park, and photos at the iconic lone tree growing in the lake.',
        },
      },
      {
        day: 12,
        title: { it: 'Wanaka → Queenstown (Arrowtown e Central Otago)', en: 'Wanaka → Queenstown (Arrowtown & Central Otago)' },
        description: {
          it: 'Percorso verso Queenstown con sosta al Kawarau Gorge (il primo ponte del bungee jumping al mondo) e alla pittoresca cittadina mineraria di Arrowtown. Opportunità di pranzo in un vigneto del Central Otago, celebre per il Pinot Noir. Consegna auto in centro a Queenstown.',
          en: 'Drive to Queenstown with a stop at Kawarau Gorge (the world\'s first bungee jumping bridge) and the picturesque gold-rush town of Arrowtown. Optional lunch at a Central Otago vineyard, famous for its Pinot Noir. Car drop-off in central Queenstown.',
        },
      },
      {
        day: 13,
        title: { it: 'Milford Sound — crociera + pranzo', en: 'Milford Sound — Cruise + Lunch' },
        description: {
          it: 'Gita in giornata a Milford Sound in pullman da Queenstown via Te Anau con soste panoramiche lungo il percorso. Crociera rilassante nel fiordo con guida naturalistica: cascate, delfini, foche e — in stagione — pinguini crestati di Fiordland. Pranzo pic nic incluso. Ritorno a Queenstown in pullman.',
          en: 'Full-day trip to Milford Sound by coach from Queenstown via Te Anau with scenic stops en route. Relaxing fjord cruise with nature guide: waterfalls, dolphins, fur seals, and in season, Fiordland crested penguins. Picnic lunch included. Return to Queenstown by coach.',
        },
      },
      {
        day: 14,
        title: { it: 'Queenstown — LOTR Full Day in 4x4 + pranzo', en: 'Queenstown — LOTR Full Day by 4x4 + Lunch' },
        description: {
          it: 'Tour full day (9 ore) sui set del Signore degli Anelli in 4x4: Minas Tirith, Monti Nebbiosi, i Pilastri dei Re, il Guado di Bruinen, Isengard, Lothlorien, Glenorchy e la Paradise Valley. Pranzo, tè mattutino e pomeridiano inclusi. Un\'avventura cinematografica indimenticabile tra i paesaggi leggendari di Queenstown e Arrowtown.',
          en: 'Full day (9 hours) Lord of the Rings filming locations by 4x4: Minas Tirith, Misty Mountains, the Pillars of the Kings, the Ford of Bruinen, Isengard, Lothlorien, Glenorchy and Paradise Valley. Lunch, morning and afternoon tea included. An unforgettable cinematic adventure through the legendary Queenstown and Arrowtown landscapes.',
        },
      },
      {
        day: 15,
        title: { it: 'Partenza da Queenstown', en: 'Departure from Queenstown' },
        description: {
          it: 'Partenza autonoma per l\'aeroporto internazionale di Queenstown. Fine dei servizi a terra. Volo di rientro in Italia.',
          en: 'Independent departure to Queenstown International Airport. End of ground services. Return flight to Italy.',
        },
      },
    ],
    included: {
      it: [
        'Tutti i pernottamenti come da itinerario (colazione inclusa)',
        'Auto a noleggio con assicurazione All Inclusive (Auckland–Queenstown)',
        'Traghetto dall\'Isola Nord all\'Isola Sud (Cook Strait)',
        'Hobbiton Movie Set Tour con cena inclusa',
        'Waitomo Glowworm Caves — tour guidato e gita in barca',
        'Waimangu Geothermal Valley',
        'Spettacolo Maori e cena tradizionale a Rotorua',
        'Tour full day Signore degli Anelli a Wellington + Weta Workshop',
        'Tour avvistamento balene a Kaikoura',
        'Gita Milford Sound in pullman con crociera e pranzo incluso',
        'LOTR Full Day tour in 4x4 a Queenstown con pranzo incluso',
        'Tasse locali GST (15%)',
      ],
      en: [
        'All accommodation as per itinerary (breakfast included)',
        'Car rental with All Inclusive insurance (Auckland–Queenstown)',
        'Cook Strait ferry from North to South Island',
        'Hobbiton Movie Set Tour with dinner included',
        'Waitomo Glowworm Caves — guided tour and boat ride',
        'Waimangu Geothermal Valley',
        'Maori performance and traditional dinner in Rotorua',
        'Lord of the Rings full day tour in Wellington + Weta Workshop',
        'Whale watching tour in Kaikoura',
        'Milford Sound full-day coach trip with cruise and picnic lunch',
        'LOTR Full Day 4x4 tour in Queenstown with lunch included',
        'Local GST taxes (15%)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // AUSTRALIA SUMMER ESCAPE — 22 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-summer-escape',
    slug: 'australia-summer-escape',
    title: {
      it: 'Australia Summer Escape — Adelaide, Kangaroo Island, Melbourne, Uluru e Lord Howe Island',
      en: 'Australia Summer Escape — Adelaide, Kangaroo Island, Melbourne, Uluru & Lord Howe Island',
    },
    description: {
      it: "Un grand tour australiano di 22 giorni che tocca le destinazioni più esclusive del continente: la fauna selvaggia di Kangaroo Island, la Melbourne dei vigneti e della Great Ocean Road, il deserto rosso di Uluru con il Sound of Silence dinner, Sydney con la crociera nel porto e l\'Opera House, e infine Lord Howe Island — UNESCO, 400 visitatori al massimo — nel lusso dell\'Arajilla Retreat.",
      en: "A 22-day Australian grand tour touching the continent's most exclusive destinations: Kangaroo Island wildlife, Melbourne's vineyards and Great Ocean Road, the red desert of Uluru with the Sound of Silence dinner, Sydney harbour cruise and Opera House, and finally Lord Howe Island — UNESCO, 400 visitors maximum — in the luxury of Arajilla Retreat.",
    },
    duration: 22,
    destination: 'Australia',
    type: 'luxury',
    gradient: 'from-amber-600 to-orange-800',
    image: '/images/itin-east-coast.jpg',
    price: { currency: 'EUR', amount: 8210 },
    priceEn: { currency: 'USD', amount: 8900 },
    highlights: {
      it: [
        'Kangaroo Island — fauna australiana e WanderPod Ocean View',
        'Melbourne: Yarra Valley, Great Ocean Road e Phillip Island',
        'Uluru: Sound of Silence dinner e Sunrise Journeys',
        'Sydney: crociera in porto + visita guidata Opera House',
        'Lord Howe Island — paradiso UNESCO, Arajilla Retreat',
      ],
      en: [
        'Kangaroo Island — Australian wildlife and Ocean View WanderPod',
        'Melbourne: Yarra Valley, Great Ocean Road, and Phillip Island',
        'Uluru: Sound of Silence dinner and Sunrise Journeys',
        'Sydney: harbour cruise + Opera House guided tour',
        'Lord Howe Island — UNESCO paradise, Arajilla Retreat',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Partenza — scala a Dubai', en: 'Departure — Dubai Stopover' },
        description: {
          it: 'Volo da Venezia verso Dubai. Pernottamento all\'Hotel Boulevard Autograph Collection con colazione inclusa: una notte nel lusso di Dubai come primo assaggio del viaggio.',
          en: 'Flight from Venice to Dubai. Overnight at Hotel Boulevard Autograph Collection with breakfast included: a night of Dubai luxury as the first taste of the journey.',
        },
      },
      {
        day: 2,
        title: { it: 'Volo Dubai → Adelaide', en: 'Flight Dubai → Adelaide' },
        description: {
          it: 'Volo mattutino verso Adelaide, la capitale del South Australia. Arrivo nel pomeriggio e prima serata in città.',
          en: 'Morning flight to Adelaide, the capital of South Australia. Afternoon arrival and first evening in the city.',
        },
      },
      {
        day: 3,
        title: { it: 'Adelaide → Kangaroo Island (ferry con auto)', en: 'Adelaide → Kangaroo Island (Ferry with Car)' },
        description: {
          it: 'Ritiro auto a noleggio (Toyota Corolla, Avis All Inclusive km illimitati). Guida fino a Cape Jervis (110 km) e traghetto Sealink per Kangaroo Island (45 minuti). Check-in all\'esclusivo Wander WanderPod con vista sull\'oceano. Benvenuto kit pasti incluso per 2 colazioni e 2 cene.',
          en: 'Car rental pick-up (Toyota Corolla, Avis All Inclusive unlimited km). Drive to Cape Jervis (110 km) and Sealink ferry to Kangaroo Island (45 minutes). Check-in at the exclusive Wander WanderPod with ocean view. Welcome meal box included for 2 breakfasts and 2 dinners.',
        },
      },
      {
        day: 4,
        title: { it: 'Kangaroo Island — fauna selvatica', en: 'Kangaroo Island — Wildlife' },
        description: {
          it: 'Giornata libera per esplorare Kangaroo Island: canguri, wallaby, koala, echidne, pinguini, foche e leoni marini nel loro habitat naturale. Flinders Chase National Park e spiagge da sogno.',
          en: 'Free day to explore Kangaroo Island: kangaroos, wallabies, koalas, echidnas, penguins, fur seals, and sea lions in their natural habitat. Flinders Chase National Park and dream beaches.',
        },
      },
      {
        day: 5,
        title: { it: 'Kangaroo Island — giornata libera', en: 'Kangaroo Island — Free Day' },
        description: {
          it: 'Seconda giornata sull\'isola: avvistamento fauna marina, trekking nel bush australiano, spiagge selvagge o semplicemente relax nel WanderPod con vista sull\'oceano.',
          en: 'Second day on the island: marine wildlife spotting, Australian bush trekking, wild beaches, or simply relaxing in the WanderPod with ocean views.',
        },
      },
      {
        day: 6,
        title: { it: 'Kangaroo Island → Melbourne (ferry + volo)', en: 'Kangaroo Island → Melbourne (Ferry + Flight)' },
        description: {
          it: 'Ferry di ritorno a Cape Jervis, guida fino ad Adelaide e consegna auto. Volo pomeridiano Adelaide–Melbourne. Check-in allo Zagames House.',
          en: 'Return ferry to Cape Jervis, drive to Adelaide, and car drop-off. Afternoon flight Adelaide–Melbourne. Check-in at Zagames House.',
        },
      },
      {
        day: 7,
        title: { it: 'Melbourne — visita libera', en: 'Melbourne — Free Exploration' },
        description: {
          it: 'Giornata libera per esplorare Melbourne: i vicoli con street art, i rooftop bar, Queen Victoria Market, i tram storici e la scena gastronomica internazionale.',
          en: 'Free day to explore Melbourne: street art laneways, rooftop bars, Queen Victoria Market, historic trams, and the international food scene.',
        },
      },
      {
        day: 8,
        title: { it: 'Tour Yarra Valley — vigneti con pranzo', en: 'Yarra Valley Winery Tour with Lunch' },
        description: {
          it: 'Tour organizzato nella Yarra Valley con pranzo incluso: degustazione di Chardonnay e Pinot Nero nelle cantine d\'eccellenza a pochi passi da Melbourne, tra colline verdissime e produttori appassionati.',
          en: 'Organised Yarra Valley winery tour with lunch included: Chardonnay and Pinot Noir tastings at excellent wineries just outside Melbourne, among rolling green hills and passionate producers.',
        },
      },
      {
        day: 9,
        title: { it: 'Great Ocean Road', en: 'Great Ocean Road' },
        description: {
          it: 'Tour in giornata sulla Great Ocean Road: tè mattutino sulle spiagge della Surf Coast, i Dodici Apostoli nel Port Campbell National Park, la Gola del Loch Ard, koala a Kennett River e la cittadina costiera di Apollo Bay.',
          en: 'Full-day Great Ocean Road tour: morning tea on the Surf Coast beaches, the Twelve Apostles in Port Campbell National Park, Loch Ard Gorge, koalas at Kennett River, and the coastal town of Apollo Bay.',
        },
      },
      {
        day: 10,
        title: { it: 'Phillip Island — Penguin Parade', en: 'Phillip Island — Penguin Parade' },
        description: {
          it: 'Tour a Phillip Island: Brighton Beach boxes, Moonlit Sanctuary Wildlife Park, Nobbies e Seal Rock. Al tramonto, la Penguin Parade: i pinguini fatati che tornano a terra dai loro piccoli.',
          en: 'Phillip Island tour: Brighton Beach boxes, Moonlit Sanctuary Wildlife Park, Nobbies and Seal Rock. At sunset, the Penguin Parade: fairy penguins returning ashore to their chicks.',
        },
      },
      {
        day: 11,
        title: { it: 'Volo Melbourne → Ayers Rock + Sound of Silence dinner', en: 'Flight Melbourne → Ayers Rock + Sound of Silence Dinner' },
        description: {
          it: 'Volo mattutino verso Ayers Rock. Ritiro auto (Toyota Corolla, Avis All Inclusive). Sera: il Sound of Silence Dinner — tramonto davanti a Uluru, cena gourmet con abbinamenti di vini, osservazione delle stelle e narrazione della cultura aborigena sotto il cielo del Red Centre.',
          en: 'Early morning flight to Ayers Rock. Car rental pick-up (Toyota Corolla, Avis All Inclusive). Evening: the Sound of Silence Dinner — sunset facing Uluru, gourmet dinner with wine pairings, stargazing, and Aboriginal cultural storytelling under the Red Centre sky.',
        },
      },
      {
        day: 12,
        title: { it: 'Uluru e Kata Tjuta — visita libera', en: 'Uluru & Kata Tjuta — Free Exploration' },
        description: {
          it: 'Giornata libera: alba su Kata Tjuta con trekking nella Valle dei Venti, poi trekking alla base di Uluru e tramonto sul monolite sacro. Due delle esperienze più emozionanti dell\'Australia.',
          en: 'Free day: dawn at Kata Tjuta with Valle dei Venti hike, then Uluru base walk and sunset on the sacred monolith. Two of Australia\'s most moving experiences.',
        },
      },
      {
        day: 13,
        title: { it: 'Sunrise Journeys + volo verso Sydney', en: 'Sunrise Journeys + Flight to Sydney' },
        description: {
          it: 'Mattina: Sunrise Journeys con audioguida italiana — le prime luci dell\'alba su Uluru, un racconto aborigeno con proiezioni laser e musica. Poi consegna auto e volo pomeridiano verso Sydney.',
          en: 'Morning: Sunrise Journeys with Italian audio — first dawn light on Uluru, an Aboriginal story with laser projections and music. Then car drop-off and afternoon flight to Sydney.',
        },
      },
      {
        day: 14,
        title: { it: 'Sydney — Bondi Beach', en: 'Sydney — Bondi Beach' },
        description: {
          it: 'Giornata a Sydney: Bondi Beach, la passeggiata panoramica verso Coogee, i ristoranti e i bar del lungomare. Serata nel quartiere di Darling Harbour.',
          en: 'Day in Sydney: Bondi Beach, the panoramic coastal walk to Coogee, waterfront restaurants and bars. Evening in the Darling Harbour neighbourhood.',
        },
      },
      {
        day: 15,
        title: { it: 'Sydney — crociera in porto + Opera House', en: 'Sydney — Harbour Cruise + Opera House' },
        description: {
          it: 'Minicrociera all-inclusive di 2 ore nel porto di Sydney con pranzo a buffet: Opera House, Harbour Bridge e Luna Park dall\'acqua. Nel pomeriggio: visita guidata di 1 ora all\'interno dell\'Opera House.',
          en: '2-hour all-inclusive Sydney Harbour cruise with buffet lunch: Opera House, Harbour Bridge, and Luna Park from the water. Afternoon: 1-hour guided tour inside the Sydney Opera House.',
        },
      },
      {
        day: 16,
        title: { it: 'Volo Sydney → Lord Howe Island', en: 'Flight Sydney → Lord Howe Island' },
        description: {
          it: 'Volo mattutino verso Lord Howe Island (2h, bagaglio 14 kg). Check-in all\'Arajilla Retreat nella lussuosa Banyan Suite con colazione inclusa. Primo contatto con questo paradiso UNESCO che accoglie massimo 400 visitatori alla volta.',
          en: 'Morning flight to Lord Howe Island (2h, 14 kg luggage allowance). Check-in at Arajilla Retreat in the luxurious Banyan Suite with breakfast included. First contact with this UNESCO paradise that welcomes a maximum of 400 visitors at a time.',
        },
      },
      {
        day: 17,
        title: { it: 'Lord Howe Island — relax', en: 'Lord Howe Island — Relaxation' },
        description: {
          it: 'Giornata di relax totale su Lord Howe Island: spiagge bianche con acque turchesi limpide, snorkeling sulla barriera corallina, foreste pluviali subtropicali e sentieri panoramici.',
          en: 'Total relaxation day on Lord Howe Island: white beaches with clear turquoise waters, coral reef snorkeling, subtropical rainforests, and panoramic walking trails.',
        },
      },
      {
        day: 18,
        title: { it: 'Lord Howe Island — natura e snorkeling', en: 'Lord Howe Island — Nature & Snorkeling' },
        description: {
          it: 'Esplorazione dell\'isola: snorkeling o immersioni nella barriera corallina, birdwatching (Lord Howe ospita specie endemiche) e trekking fino ai punti panoramici con vista sull\'oceano.',
          en: 'Island exploration: coral reef snorkeling or diving, birdwatching (Lord Howe hosts endemic species), and trekking to panoramic viewpoints overlooking the ocean.',
        },
      },
      {
        day: 19,
        title: { it: 'Lord Howe Island — relax finale', en: 'Lord Howe Island — Final Relaxation' },
        description: {
          it: 'Ultima giornata intera sull\'isola. Attività a scelta: kayak, pesca, escursioni o semplicemente relax nell\'atmosfera unica di Lord Howe, una delle isole più belle e isolate del Pacifico.',
          en: 'Last full day on the island. Activities of choice: kayaking, fishing, hiking, or simply relaxing in the unique atmosphere of Lord Howe, one of the most beautiful and isolated islands in the Pacific.',
        },
      },
      {
        day: 20,
        title: { it: 'Volo Lord Howe → Sydney', en: 'Flight Lord Howe → Sydney' },
        description: {
          it: 'Volo pomeridiano di ritorno a Sydney (2h). Check-in al ParkRoyal Darling Harbour. Ultima serata nella città più iconica d\'Australia.',
          en: 'Afternoon return flight to Sydney (2h). Check-in at ParkRoyal Darling Harbour. Last evening in Australia\'s most iconic city.',
        },
      },
      {
        day: 21,
        title: { it: 'Sydney — giornata libera, volo verso Roma', en: 'Sydney — Free Day, Flight to Rome' },
        description: {
          it: 'Ultima giornata libera a Sydney. Sera: volo notturno verso Dubai.',
          en: 'Last free day in Sydney. Evening: overnight flight towards Dubai.',
        },
      },
      {
        day: 22,
        title: { it: 'Volo Dubai → Venezia, arrivo', en: 'Flight Dubai → Venice, Arrival' },
        description: {
          it: 'Volo mattutino Dubai–Venezia. Fine di un grand tour attraverso l\'Australia più esclusiva.',
          en: 'Morning flight Dubai–Venice. End of a grand tour through Australia\'s most exclusive destinations.',
        },
      },
    ],
    included: {
      it: [
        'Assistenza in loco in lingua italiana (telefonica e chat) per tutta la durata',
        'Sistemazioni come da itinerario (colazioni solo dove specificate)',
        'Documentazione di viaggio completa in PDF e digitale',
        'Pernottamento Dubai con colazione (scala andata)',
        'Auto a noleggio Adelaide All Inclusive km illimitati (Avis)',
        'Traghetto Sealink Kangaroo Island andata e ritorno con auto',
        'Kit pasti Wander on Kangaroo Island (2 colazioni + 2 cene)',
        'Tour Yarra Valley con pranzo incluso',
        'Tour Great Ocean Road',
        'Tour Phillip Island Penguin Parade',
        'Auto a noleggio Ayers Rock All Inclusive km illimitati (Avis)',
        'Ingresso al Parco Nazionale di Ayers Rock (valido tutto il soggiorno)',
        'Sound of Silence Dinner ad Ayers Rock',
        'Sunrise Journeys con audioguida italiana ad Uluru',
        'Minicrociera Sydney Harbour all-inclusive con pranzo a buffet',
        'Visita guidata Opera House di Sydney (1 ora)',
        'Arajilla Retreat Lord Howe Island — 4 notti Banyan Suite (colazione inclusa)',
      ],
      en: [
        'Italian-language on-site assistance (phone and chat) throughout',
        'Accommodation as per itinerary (breakfast where specified)',
        'Complete travel documentation in PDF and digital format',
        'Dubai stopover with breakfast (outbound)',
        'Adelaide car rental All Inclusive unlimited km (Avis)',
        'Sealink Kangaroo Island ferry return with car',
        'Wander on Kangaroo Island meal box (2 breakfasts + 2 dinners)',
        'Yarra Valley winery tour with lunch included',
        'Great Ocean Road tour',
        'Phillip Island Penguin Parade tour',
        'Ayers Rock car rental All Inclusive unlimited km (Avis)',
        'Ayers Rock National Park entry pass (valid entire stay)',
        'Sound of Silence Dinner at Ayers Rock',
        'Sunrise Journeys with Italian audio guide at Uluru',
        'Sydney Harbour all-inclusive minicruise with buffet lunch',
        'Sydney Opera House guided tour (1 hour)',
        'Arajilla Retreat Lord Howe Island — 4 nights Banyan Suite (breakfast included)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // NUOVA ZELANDA — ROAD TRIP LEGGENDARIO TRA LE DUE ISOLE — 19 giorni
  // ─────────────────────────────────────────────
  {
    id: 'nuova-zelanda-road-trip',
    slug: 'nuova-zelanda-road-trip',
    title: {
      it: 'Nuova Zelanda — Road trip leggendario tra le due isole',
      en: 'New Zealand — Legendary Road Trip Between the Two Islands',
    },
    description: {
      it: "Diciannove giorni on the road da Auckland a Christchurch: la Penisola di Coromandel con Cathedral Cove, Rotorua geotermica e la serata Māori a Te Puia, le grotte di Waitomo, Wellington, la traversata in traghetto dello Stretto di Cook, whale watching a Kaikoura, il Mackenzie Country, Wanaka, Queenstown con la crociera BBQ al Walter Peak, Milford Sound e i pinguini di Dunedin. Il classico road trip neozelandese, senza nulla di tralasciato.",
      en: "Nineteen days on the road from Auckland to Christchurch: Coromandel Peninsula with Cathedral Cove, geothermal Rotorua and the Māori evening at Te Puia, Waitomo Caves, Wellington, the Cook Strait ferry crossing, whale watching in Kaikoura, Mackenzie Country, Wanaka, Queenstown with the Walter Peak BBQ cruise, Milford Sound and the penguins of Dunedin. The classic New Zealand road trip, with nothing left out.",
    },
    duration: 19,
    destination: 'New Zealand',
    type: 'road-trip',
    gradient: 'from-teal-600 to-emerald-900',
    image: '/images/dest-nz.jpg',
    price: { currency: 'EUR', amount: 4400 },
    priceEn: { currency: 'USD', amount: 4800 },
    highlights: {
      it: [
        'Cathedral Cove in crociera dalla baia di Whitianga',
        'Rotorua geotermica + serata Māori a Te Puia',
        'Grotte luminose di Waitomo',
        'Whale watching a Kaikoura',
        'Crociera BBQ al tramonto sul TSS Earnslaw — Walter Peak',
        'Milford Sound in crociera',
        'Pinguini e albatri a Dunedin',
        'Terme alpine di Lake Tekapo',
      ],
      en: [
        'Cathedral Cove cruise from Whitianga Bay',
        'Geothermal Rotorua + Māori evening at Te Puia',
        'Waitomo Glowworm Caves',
        'Whale watching in Kaikoura',
        'Sunset BBQ cruise on the TSS Earnslaw — Walter Peak',
        'Milford Sound fjord cruise',
        'Penguins and albatrosses in Dunedin',
        'Alpine hot springs at Lake Tekapo',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo ad Auckland', en: 'Arrival in Auckland' },
        description: {
          it: "Arrivo all'aeroporto internazionale di Auckland e trasferimento privato in hotel con Hallmark Limousines. La città si estende su un istmo vulcanico tra due porti naturali ed è la più grande della Nuova Zelanda. Due notti all'Adina Apartment Hotel Auckland Britomart.",
          en: "Arrival at Auckland International Airport and private transfer to the hotel with Hallmark Limousines. The city stretches across a volcanic isthmus between two natural harbours and is New Zealand's largest city. Two nights at Adina Apartment Hotel Auckland Britomart.",
        },
      },
      {
        day: 2,
        title: { it: 'Auckland — giornata libera', en: 'Auckland — Free Day' },
        description: {
          it: "Giornata libera per esplorare Auckland: Sky Tower (la più alta della Nuova Zelanda, panorama a 360°), Auckland War Memorial Museum, Viaduct Harbour, mercati, ristoranti e caffè internazionali. Possibilità di traghetto per Waiheke Island con le sue cantine vinicole.",
          en: "Free day to explore Auckland: Sky Tower (New Zealand's tallest, 360° panorama), Auckland War Memorial Museum, Viaduct Harbour, markets, international restaurants and cafés. Option to ferry to Waiheke Island with its renowned wineries.",
        },
      },
      {
        day: 3,
        title: { it: 'Auckland → Penisola di Coromandel (Whitianga)', en: 'Auckland → Coromandel Peninsula (Whitianga)' },
        description: {
          it: "Ritiro dell'auto a noleggio (Toyota Corolla All Inclusive da Auckland a Christchurch) e partenza verso la Penisola di Coromandel. 190 km fino a Whitianga, cittadina costiera con sette spiagge magnifiche, delfini in baia e un'atmosfera di totale relax. Due notti al Mussel Bed.",
          en: "Car rental pick-up (Toyota Corolla All Inclusive, Auckland to Christchurch) and drive to the Coromandel Peninsula. 190 km to Whitianga, a coastal town with seven beautiful beaches, dolphins in the bay and a completely relaxed atmosphere. Two nights at Mussel Bed.",
        },
      },
      {
        day: 4,
        title: { it: 'Whitianga — crociera a Cathedral Cove', en: 'Whitianga — Cathedral Cove Cruise' },
        description: {
          it: "Mattinata in crociera con Ocean Leopard lungo la costa fino a Cathedral Cove, l'arco di roccia calcarea più iconico della Nuova Zelanda. Il Full Monty Tour dura 2 ore tra formazioni rocciose spettacolari e acque smeraldo. Pomeriggio libero sulle spiagge della penisola.",
          en: "Morning cruise with Ocean Leopard along the coast to Cathedral Cove, New Zealand's most iconic limestone arch. The Full Monty Tour lasts 2 hours past spectacular rock formations and emerald waters. Free afternoon on the peninsula's beaches.",
        },
      },
      {
        day: 5,
        title: { it: 'Whitianga → Rotorua', en: 'Whitianga → Rotorua' },
        description: {
          it: "Partenza per Rotorua (230 km), la città geotermica del Paese: pozze di fango bollente, geyser, fumarole e zolfo nell'aria. La città ospita la più alta concentrazione di popolazione Māori della Nuova Zelanda. Due notti a B&B @ The Redwoods.",
          en: "Drive to Rotorua (230 km), New Zealand's geothermal city: boiling mud pools, geysers, fumaroles and sulphur in the air. The city has the highest concentration of Māori population in New Zealand. Two nights at B&B @ The Redwoods.",
        },
      },
      {
        day: 6,
        title: { it: 'Rotorua — Waimangu e Te Puia', en: 'Rotorua — Waimangu and Te Puia' },
        description: {
          it: "Mattina: Waimangu Volcanic Valley, creata dall'eruzione del 1886, con laghi coloratissimi e il più grande geyser d'acqua calda al mondo. Sera: Te Puia con la cena Te Pō — buffet di cucina Māori locale, poi tour della valle geotermica con il geyser Pōhutu illuminato, spettacolo di canti e haka, e cioccolata calda su sedili riscaldati naturalmente.",
          en: "Morning: Waimangu Volcanic Valley, created by the 1886 eruption, with vividly coloured lakes and the world's largest hot-water geyser. Evening: Te Puia with Te Pō dinner — Māori cuisine buffet, then guided geothermal valley tour with the illuminated Pōhutu geyser, cultural show of songs and haka, and hot chocolate on naturally heated seats.",
        },
      },
      {
        day: 7,
        title: { it: 'Rotorua → Waitomo → Taupo', en: 'Rotorua → Waitomo → Taupo' },
        description: {
          it: "Mattinata alle grotte di Waitomo: tour guidato sotterraneo culminante in una silenziosa gita in barca nella Grotta dei Glowworm, una galassia di lucciole bioluminescenti sospese nel buio. Poi Taupo, sul lago più grande della Nuova Zelanda, con vista sui vulcani del Tongariro National Park.",
          en: "Morning at Waitomo Glowworm Caves: guided underground tour culminating in a silent boat ride through the Glowworm Grotto, a galaxy of bioluminescent glowworms suspended in the dark. Then Taupo on New Zealand's largest lake, with views of Tongariro National Park's volcanoes.",
        },
      },
      {
        day: 8,
        title: { it: 'Taupo → Wellington via Wai-O-Tapu', en: 'Taupo → Wellington via Wai-O-Tapu' },
        description: {
          it: "Mattino: Huka Falls, le cascate più fotografate della Nuova Zelanda. Poi Wai-O-Tapu Thermal Wonderland con il geyser Lady Knox (eruzione alle 10:15 ogni giorno) e il Champagne Pool dai bordi sulfurei rossi. Consegna dell'auto a Rotorua e volo per Wellington, la capitale della Nuova Zelanda.",
          en: "Morning: Huka Falls, New Zealand's most photographed waterfall. Then Wai-O-Tapu Thermal Wonderland with the Lady Knox geyser (erupts daily at 10:15) and the red-rimmed Champagne Pool. Car drop-off in Rotorua and flight to Wellington, New Zealand's capital.",
        },
      },
      {
        day: 9,
        title: { it: 'Wellington → Kaikoura via traghetto Interislander', en: 'Wellington → Kaikoura via Interislander Ferry' },
        description: {
          it: "Mattinata libera a Wellington — lungomare, Te Papa Museum, caffè e cultura. Pomeriggio: traghetto Interislander da Wellington a Picton (3 ore attraverso le Green Hills). Ritiro auto al porto di Picton e guida verso Kaikoura, cittadina ai piedi delle montagne innevate famosa per l'aragosta e la fauna marina.",
          en: "Free morning in Wellington — waterfront, Te Papa Museum, cafés and culture. Afternoon: Interislander ferry from Wellington to Picton (3 hours through the Green Hills). Car pick-up at Picton harbour and drive to Kaikoura, a town at the foot of snowy mountains famous for lobster and marine wildlife.",
        },
      },
      {
        day: 10,
        title: { it: 'Kaikoura → Christchurch — whale watching', en: 'Kaikoura → Christchurch — Whale Watching' },
        description: {
          it: "Mattino: crociera di 2,5 ore con Whale Watch Kaikoura per avvistare capodogli, delfini, foche e albatri. Kaikoura è uno dei pochi posti al mondo dove i capodogli vivono tutto l'anno vicino alla costa, grazie a una depressione sottomarina che porta il plancton in superficie. Pomeriggio: Christchurch, la Città Giardino.",
          en: "Morning: 2.5-hour cruise with Whale Watch Kaikoura to spot sperm whales, dolphins, seals and albatrosses. Kaikoura is one of the few places in the world where sperm whales live year-round near the coast, thanks to an unusually close submarine canyon that brings plankton to the surface. Afternoon: Christchurch, the Garden City.",
        },
      },
      {
        day: 11,
        title: { it: 'Christchurch → Twizel (Mackenzie Country)', en: 'Christchurch → Twizel (Mackenzie Country)' },
        description: {
          it: "Guida verso il Mackenzie Country (286 km), vasto bacino alpino nel centro dell'Isola del Sud. Paesaggi usati come location de 'Il Signore degli Anelli', con laghi glaciali turchese e le cime innevate del Monte Cook. Pernottamento a Twizel al Distinction MacKenzie Country Hotel.",
          en: "Drive to Mackenzie Country (286 km), a vast alpine basin in the centre of the South Island. Landscapes used as filming locations for 'The Lord of the Rings', with turquoise glacial lakes and the snow-capped peaks of Mount Cook. Overnight in Twizel at Distinction MacKenzie Country Hotel.",
        },
      },
      {
        day: 12,
        title: { it: 'Twizel → Wanaka', en: 'Twizel → Wanaka' },
        description: {
          it: "Guida verso Wanaka (143 km), tranquilla cittadina sull'omonimo lago alpino. Porta d'ingresso al Parco Nazionale del Mount Aspiring, è vicina alle piste sciistiche di Cardrona e Treble Cone. Pernottamento all'Edgewater Resort sul lago.",
          en: "Drive to Wanaka (143 km), a peaceful town on its namesake alpine lake. Gateway to Mount Aspiring National Park, close to the Cardrona and Treble Cone ski fields. Overnight at Edgewater Resort on the lakefront.",
        },
      },
      {
        day: 13,
        title: { it: 'Wanaka → Queenstown via Arrowtown', en: 'Wanaka → Queenstown via Arrowtown' },
        description: {
          it: "Guida verso Queenstown (69 km) con soste sulla Kawarau Gorge (il primo ponte bungee commerciale del mondo) e ad Arrowtown, il villaggio minerario dell'Otago con edifici in pietra. Pranzo a Kinross Winery nei vigneti di Pinot Noir di Central Otago, poi arrivo a Queenstown, la capitale mondiale dell'adrenalina.",
          en: "Drive to Queenstown (69 km) with stops at the Kawarau Gorge (the world's first commercial bungee bridge) and Arrowtown, Otago's historic gold-mining village. Lunch at Kinross Winery amid the Central Otago Pinot Noir vineyards, then arrival in Queenstown, the world's adventure capital.",
        },
      },
      {
        day: 14,
        title: { it: 'Queenstown — Walter Peak BBQ dinner cruise', en: 'Queenstown — Walter Peak BBQ Dinner Cruise' },
        description: {
          it: "Mattinata libera a Queenstown: bungee, jet boat, gondola sul Bob's Peak o shopping. Sera: crociera sul piroscafo vintage TSS Earnslaw verso Walter Peak High Country Farm, cena barbecue gourmet con carni e frutti di mare neozelandesi, tour della fattoria con dimostrazione di tosatura, poi rientro al chiaro di luna sul lago Wakatipu.",
          en: "Free morning in Queenstown: bungee, jet boat, Bob's Peak gondola or shopping. Evening: cruise on the vintage TSS Earnslaw steamer to Walter Peak High Country Farm, gourmet BBQ dinner with New Zealand meats and seafood, farm tour with shearing demonstration, then moonlit return cruise on Lake Wakatipu.",
        },
      },
      {
        day: 15,
        title: { it: 'Queenstown → Milford Sound → Te Anau', en: 'Queenstown → Milford Sound → Te Anau' },
        description: {
          it: "Partenza per Milford Sound (404 km con l'Homer Tunnel). Crociera nel fiordo: 2 ore tra le cascate di Stirling e Bowen, foreste pluviali a picco sul mare e fauna selvatica (delfini, foche, pinguini). Pranzo al sacco incluso. Rientro e pernottamento a Te Anau, porta del Parco Nazionale di Fiordland.",
          en: "Drive to Milford Sound (404 km through the Homer Tunnel). Fjord cruise: 2 hours past Stirling and Bowen Falls, rainforest dropping into the sea and wildlife (dolphins, seals, penguins). Packed lunch included. Return to Te Anau, gateway to Fiordland National Park.",
        },
      },
      {
        day: 16,
        title: { it: 'Te Anau → Curio Bay → Dunedin', en: 'Te Anau → Curio Bay → Dunedin' },
        description: {
          it: "Lunga guida verso Dunedin (418 km) con sosta a Curio Bay, dove una foresta pietrificata di 170 milioni di anni emerge dalla roccia a bassa marea. Dunedin — la città più scozzese della Nuova Zelanda — è famosa per le sue facciate vittoriane, albatri reali e pinguini.",
          en: "Long drive to Dunedin (418 km) with a stop at Curio Bay, where a 170-million-year-old petrified forest emerges from the rock at low tide. Dunedin — New Zealand's most Scottish city — is famous for its Victorian facades, royal albatrosses and penguins.",
        },
      },
      {
        day: 17,
        title: { it: 'Dunedin — pinguini, albatri e fauna marina', en: 'Dunedin — Penguins, Albatrosses and Marine Wildlife' },
        description: {
          it: "Giornata libera per esplorare la Penisola di Otago: colonia di albatri reali a Taiaroa Head, pinguini dagli occhi gialli (i più rari al mondo) alla Pukekura Reserve, leoni marini sulle spiagge. Il Peninsula Encounter Tour + crociera Monarch è la combinazione consigliata per vedere tutta la fauna in un giorno.",
          en: "Free day to explore the Otago Peninsula: royal albatross colony at Taiaroa Head, yellow-eyed penguins (the world's rarest) at Pukekura Reserve, sea lions on the beaches. The Peninsula Encounter Tour + Monarch Cruise combination is recommended for seeing all wildlife in one day.",
        },
      },
      {
        day: 18,
        title: { it: 'Dunedin → Lake Tekapo — terme alpine', en: 'Dunedin → Lake Tekapo — Alpine Hot Springs' },
        description: {
          it: "Guida verso Lake Tekapo (287 km): il lago glaciale più romantico della Nuova Zelanda, con acque turchese intenso, la Church of the Good Shepherd e il cielo più stellato dell'Emisfero Australe. Ingresso alle piscine termali all'aperto di Tekapo Springs, con tre grandi piscine riscaldate e vista sulle Alpi del Sud.",
          en: "Drive to Lake Tekapo (287 km): New Zealand's most romantic glacial lake, with vivid turquoise water, the Church of the Good Shepherd and the darkest night sky in the Southern Hemisphere. Entry to the outdoor hot pools at Tekapo Springs, with three heated pools and views of the Southern Alps.",
        },
      },
      {
        day: 19,
        title: { it: 'Lake Tekapo → Christchurch — partenza', en: 'Lake Tekapo → Christchurch — Departure' },
        description: {
          it: "Ultima mattinata con colazione e vista sulle montagne, poi guida verso Christchurch (225 km). Consegna dell'auto all'aeroporto internazionale di Christchurch e partenza per l'Italia. Fine dei servizi inclusi nel pacchetto.",
          en: "Final morning with breakfast and mountain views, then drive to Christchurch (225 km). Car drop-off at Christchurch International Airport and departure for Italy. End of included services.",
        },
      },
    ],
    included: {
      it: [
        'Tutti i pernottamenti come da itinerario (colazione inclusa)',
        'Auto a noleggio Budget da Auckland a Christchurch — All Inclusive, km illimitati',
        'Trasferimento privato Auckland Airport → hotel (Hallmark Limousines)',
        'Trasferimento privato Wellington → Terminal Traghetti (Hallmark Limousines)',
        'Traghetto Interislander Wellington → Picton (passeggeri)',
        'Crociera Cathedral Cove — Ocean Leopard Full Monty Tour',
        'Waimangu Volcanic Valley — ingresso Self Guided Walk',
        'Te Puia + cena Te Pō (buffet Māori + spettacolo culturale)',
        'Waitomo Glowworm Caves — tour guidato con gita in barca',
        'Wai-O-Tapu Thermal Wonderland — ingresso',
        'Whale Watch Kaikoura — tour balene (2,5 ore)',
        'Walter Peak High Country Farm — crociera TSS Earnslaw + cena BBQ gourmet',
        'Milford Sound — crociera con pranzo al sacco',
        'Tekapo Springs — ingresso piscine termali',
        'Tasse locali GST 15%',
      ],
      en: [
        'All accommodation as per itinerary (breakfast included)',
        'Budget car rental Auckland to Christchurch — All Inclusive, unlimited km',
        'Private transfer Auckland Airport → hotel (Hallmark Limousines)',
        'Private transfer Wellington → Ferry Terminal (Hallmark Limousines)',
        'Interislander ferry Wellington → Picton (passengers)',
        'Cathedral Cove cruise — Ocean Leopard Full Monty Tour',
        'Waimangu Volcanic Valley — self-guided walk entry',
        'Te Puia + Te Pō dinner (Māori buffet + cultural show)',
        'Waitomo Glowworm Caves — guided tour with boat ride',
        'Wai-O-Tapu Thermal Wonderland — entry',
        'Whale Watch Kaikoura — whale watching tour (2.5 hours)',
        'Walter Peak High Country Farm — TSS Earnslaw cruise + gourmet BBQ dinner',
        'Milford Sound — cruise with packed lunch',
        'Tekapo Springs — hot pool entry',
        'Local GST 15% tax',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // NUOVA ZELANDA E ISOLE COOK — 29 giorni
  // ─────────────────────────────────────────────
  {
    id: 'nuova-zelanda-cook',
    slug: 'nuova-zelanda-cook',
    title: {
      it: 'Nuova Zelanda e Isole Cook — Tra Fiordi Leggendari e Paradisi Tropicali',
      en: 'New Zealand & Cook Islands — Between Legendary Fjords and Tropical Paradises',
    },
    description: {
      it: "Ventinove giorni che uniscono il meglio della Nuova Zelanda — Queenstown, Milford Sound, il treno TranzAlpine, Abel Tasman, Tongariro, Rotorua, Cathedral Cove — con il paradiso tropicale delle Isole Cook: Rarotonga e il day trip a Aitutaki, con la sua laguna considerata tra le più belle del Pacifico. Un viaggio completo tra fiordi, ghiacciai, culture Māori e mari turchesi.",
      en: "Twenty-nine days combining the best of New Zealand — Queenstown, Milford Sound, the TranzAlpine train, Abel Tasman, Tongariro, Rotorua, Cathedral Cove — with the tropical paradise of the Cook Islands: Rarotonga and a day trip to Aitutaki, whose lagoon is considered among the most beautiful in the Pacific. A complete journey between fjords, glaciers, Māori cultures and turquoise seas.",
    },
    duration: 29,
    destination: 'New Zealand & Cook Islands',
    type: 'luxury',
    gradient: 'from-cyan-600 to-teal-900',
    image: '/images/dest-nz.jpg',
    price: { currency: 'EUR', amount: 7870 },
    priceEn: { currency: 'USD', amount: 8600 },
    highlights: {
      it: [
        'Queenstown — pranzo BBQ al Walter Peak sul TSS Earnslaw',
        'Milford Sound — crociera tra i fiordi più spettacolari al mondo',
        'TranzAlpine — il treno panoramico attraverso le Alpi neozelandesi',
        'Abel Tasman — crociera nella riserva marina più soleggiata della NZ',
        'Tongariro — passeggiata al tramonto nel parco vulcanico',
        'Rotorua — Waimangu + serata culturale Māori a Te Puia',
        'Cathedral Cove in barca con fondo di vetro',
        'Aitutaki day trip — laguna e pranzo BBQ a One Foot Island',
      ],
      en: [
        'Queenstown — BBQ lunch at Walter Peak on the TSS Earnslaw',
        'Milford Sound — cruise through the world\'s most spectacular fjords',
        'TranzAlpine — the scenic train through the New Zealand Alps',
        'Abel Tasman — cruise in NZ\'s sunniest marine reserve',
        'Tongariro — sunset walk in the volcanic national park',
        'Rotorua — Waimangu + Māori cultural evening at Te Puia',
        'Cathedral Cove glass-bottom boat cruise',
        'Aitutaki day trip — lagoon and BBQ lunch at One Foot Island',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Partenza per la Nuova Zelanda', en: 'Departure for New Zealand' },
        description: {
          it: "Partenza dall'Italia con scalo intermedio. Il viaggio verso la Nuova Zelanda richiede circa 24–28 ore inclusi i transiti. Primo giorno dedicato ai voli.",
          en: "Departure from Italy with an intermediate stopover. The journey to New Zealand takes approximately 24–28 hours including transits. First day dedicated to flights.",
        },
      },
      {
        day: 2,
        title: { it: 'In volo', en: 'In Transit' },
        description: {
          it: "Secondo giorno di viaggio con scalo e proseguimento verso Auckland o Sydney.",
          en: "Second day of travel with stopover and onward connection towards Auckland or Sydney.",
        },
      },
      {
        day: 3,
        title: { it: 'Arrivo a Queenstown', en: 'Arrival in Queenstown' },
        description: {
          it: "Arrivo a Queenstown dall'Australia con volo domestico. Trasferimento privato in hotel con Hallmark Limousines. Queenstown si estende sulle rive del lago Wakatipu, ai piedi delle montagne Remarkables. Riposo e visita libera della città.",
          en: "Arrival in Queenstown from Australia by domestic flight. Private transfer to the hotel with Hallmark Limousines. Queenstown stretches along the shores of Lake Wakatipu, at the foot of the Remarkables mountains. Rest and free city exploration.",
        },
      },
      {
        day: 4,
        title: { it: 'Queenstown — Walter Peak pranzo BBQ', en: 'Queenstown — Walter Peak BBQ Lunch' },
        description: {
          it: "Visita libera di Queenstown e crociera sul piroscafo TSS Earnslaw verso Walter Peak High Country Farm per il pranzo gourmet BBQ: carni alla griglia, pesce fresco, verdure di stagione e vini locali di Central Otago.",
          en: "Free visit to Queenstown and cruise on the TSS Earnslaw steamer to Walter Peak High Country Farm for the gourmet BBQ lunch: grilled meats, fresh fish, seasonal vegetables and local Central Otago wines.",
        },
      },
      {
        day: 5,
        title: { it: 'Milford Sound — tour con crociera', en: 'Milford Sound — Guided Tour with Cruise' },
        description: {
          it: "Tour organizzato da Queenstown a Milford Sound con autobus panoramico a tetto di vetro, guida naturalistica e crociera nel fiordo con pranzo al sacco incluso. Mitre Peak, cascate di Stirling e Bowen, delfini, foche e pinguini. Rientro a Queenstown in serata.",
          en: "Guided tour from Queenstown to Milford Sound with glass-roof panoramic coach, naturalist guide and fjord cruise with packed lunch included. Mitre Peak, Stirling and Bowen Falls, dolphins, seals and penguins. Return to Queenstown in the evening.",
        },
      },
      {
        day: 6,
        title: { it: 'Queenstown → Mt Cook', en: 'Queenstown → Mt Cook' },
        description: {
          it: "Ritiro dell'auto a noleggio (All Inclusive, km illimitati) e partenza verso Mt Cook (260 km). Il Monte Cook è la montagna più alta della Nuova Zelanda — 3724 m. Il Parco Nazionale di Aoraki/Mt Cook offre sentieri per tutti i livelli: dall'Hooker Valley Track al Mueller Hut Track.",
          en: "Car rental pick-up (All Inclusive, unlimited km) and drive to Mt Cook (260 km). Mt Cook is New Zealand's highest mountain at 3,724 m. Aoraki/Mt Cook National Park offers trails for all levels, from the Hooker Valley Track to the Mueller Hut Track.",
        },
      },
      {
        day: 7,
        title: { it: 'Mt Cook → Lake Tekapo', en: 'Mt Cook → Lake Tekapo' },
        description: {
          it: "Visita libera al Mt Cook e guida verso Lake Tekapo (105 km). Sosta al Lago Pukaki, famoso per il colore turchese intenso e le vedute del Monte Cook. Lake Tekapo: terme all'aperto Tekapo Springs e osservazione delle stelle nel Dark Sky Reserve, la Riserva Internazionale del Cielo Oscuro di Aoraki Mackenzie.",
          en: "Free time at Mt Cook then drive to Lake Tekapo (105 km). Stop at Lake Pukaki, famous for its intense turquoise colour and Mt Cook views. Lake Tekapo: Tekapo Springs outdoor hot pools and star gazing in the Aoraki Mackenzie International Dark Sky Reserve.",
        },
      },
      {
        day: 8,
        title: { it: 'Lake Tekapo → Christchurch', en: 'Lake Tekapo → Christchurch' },
        description: {
          it: "Guida verso Christchurch (230 km), la Città Giardino dell'Isola del Sud. La città ha riscoperto la propria identità dopo i terremoti del 2010–2011 con architettura innovativa, spazi verdi, una vivace scena gastronomica e il Cardboard Cathedral.",
          en: "Drive to Christchurch (230 km), the Garden City of the South Island. The city has rediscovered its identity after the 2010–2011 earthquakes with innovative architecture, green spaces, a vibrant food scene and the Cardboard Cathedral.",
        },
      },
      {
        day: 9,
        title: { it: 'TranzAlpine — Christchurch → Greymouth → Christchurch', en: 'TranzAlpine — Christchurch → Greymouth → Christchurch' },
        description: {
          it: "Giornata sul TranzAlpine, considerato uno dei treni panoramici più belli del mondo: attraversa le Alpi neozelandesi con canyon profondi, foreste rigogliose, Arthur's Pass e il fiume Bealey. Vagoni con ampie vetrate, bar e servizio ristorazione. Partenza e rientro a Christchurch.",
          en: "Full day on the TranzAlpine, considered one of the world's most scenic trains: it crosses the New Zealand Alps through deep canyons, lush forests, Arthur's Pass and the Bealey River. Wide-windowed carriages with bar and dining service. Departs and returns to Christchurch.",
        },
      },
      {
        day: 10,
        title: { it: 'Christchurch → Kaikoura — whale watching', en: 'Christchurch → Kaikoura — Whale Watching' },
        description: {
          it: "Guida verso Kaikoura (180 km) e pomeriggio con Whale Watch Kaikoura: crociera per avvistare capodogli, megattere, balene pilota, delfini e albatri. Kaikoura ospita una delle più alte concentrazioni e varietà di uccelli marini al mondo.",
          en: "Drive to Kaikoura (180 km) and afternoon with Whale Watch Kaikoura: cruise to spot sperm whales, humpbacks, pilot whales, dolphins and albatrosses. Kaikoura hosts one of the world's highest concentrations and varieties of seabirds.",
        },
      },
      {
        day: 11,
        title: { it: 'Kaikoura → Marlborough — degustazione vini', en: 'Kaikoura → Marlborough — Wine Tasting' },
        description: {
          it: "Guida verso Marlborough (140 km), la regione vinicola più famosa della Nuova Zelanda, patria dei Sauvignon Blanc più apprezzati al mondo. Visita libera delle cantine con degustazione consigliata da Allans Scott Winery.",
          en: "Drive to Marlborough (140 km), New Zealand's most famous wine region and home to the world's most acclaimed Sauvignon Blancs. Free winery visits with tasting recommended at Allans Scott Winery.",
        },
      },
      {
        day: 12,
        title: { it: 'Marlborough → Motueka (Abel Tasman)', en: 'Marlborough → Motueka (Abel Tasman)' },
        description: {
          it: "Guida verso Motueka (170 km), porta d'ingresso al Parco Nazionale Abel Tasman, la riserva marina più soleggiata della Nuova Zelanda con spiagge dorate e acque cristalline.",
          en: "Drive to Motueka (170 km), gateway to Abel Tasman National Park, New Zealand's sunniest national park with golden beaches and crystal-clear waters.",
        },
      },
      {
        day: 13,
        title: { it: 'Abel Tasman — crociera nella riserva marina', en: 'Abel Tasman — Marine Reserve Cruise' },
        description: {
          it: "Crociera Open Day Pass con Wilson's Abel Tasman: esplora la spettacolare costa del parco, la Split Apple Rock e la colonia di foche dell'Isola Tonga. Possibilità di kayak, nuoto e soste sulle spiagge isolate. Una delle esperienze più iconiche dell'Isola del Nord.",
          en: "Open Day Pass cruise with Wilson's Abel Tasman: explore the park's spectacular coastline, the Split Apple Rock and the seal colony at Tonga Island. Options for kayaking, swimming and stops on secluded beaches. One of the most iconic experiences in the South Island.",
        },
      },
      {
        day: 14,
        title: { it: 'Abel Tasman → Picton → Wellington (traghetto)', en: 'Abel Tasman → Picton → Wellington (Ferry)' },
        description: {
          it: "Guida verso Picton (160 km) e traghetto Interislander verso Wellington con l'auto a bordo (3 ore di navigazione). Arrivo nella capitale della Nuova Zelanda in serata.",
          en: "Drive to Picton (160 km) and Interislander ferry to Wellington with the car on board (3-hour crossing). Arrival in New Zealand's capital in the evening.",
        },
      },
      {
        day: 15,
        title: { it: 'Wellington — capitale e museo Te Papa', en: 'Wellington — Capital City and Te Papa Museum' },
        description: {
          it: "Giornata libera a Wellington, la capitale più meridionale del mondo: Te Papa Museum (cultura Māori e storia naturale), il lungomare, caffè d'autore, gallerie d'arte e la famosa Courtenay Place. Wellington è spesso considerata la città più vivace della Nuova Zelanda.",
          en: "Free day in Wellington, the world's southernmost capital: Te Papa Museum (Māori culture and natural history), the waterfront, artisan cafés, art galleries and the famous Courtenay Place. Wellington is often considered New Zealand's most vibrant city.",
        },
      },
      {
        day: 16,
        title: { it: 'Wellington → Tongariro — passeggiata al tramonto', en: 'Wellington → Tongariro — Sunset Walk' },
        description: {
          it: "Guida verso il Parco Nazionale di Tongariro (330 km), il più antico della Nuova Zelanda con tre vulcani attivi. Passeggiata guidata al tramonto di 2 ore con Adrift Guided Outdoor Adventures: paesaggi vulcanici lunari, con calice di spumante neozelandese al tramonto.",
          en: "Drive to Tongariro National Park (330 km), New Zealand's oldest with three active volcanoes. 2-hour guided sunset walk with Adrift Guided Outdoor Adventures: lunar volcanic landscapes, with a glass of New Zealand sparkling wine at sunset.",
        },
      },
      {
        day: 17,
        title: { it: 'Tongariro → Waitomo → Rotorua', en: 'Tongariro → Waitomo → Rotorua' },
        description: {
          it: "Guida verso le grotte di Waitomo (170 km) per il tour in barca tra le lucciole bioluminescenti. Poi proseguimento verso Rotorua (140 km), la città geotermica della Nuova Zelanda.",
          en: "Drive to Waitomo Caves (170 km) for the boat tour among bioluminescent glowworms. Then continue to Rotorua (140 km), New Zealand's geothermal city.",
        },
      },
      {
        day: 18,
        title: { it: 'Rotorua — Waimangu e serata Māori a Te Puia', en: 'Rotorua — Waimangu and Māori Evening at Te Puia' },
        description: {
          it: "Mattina: Waimangu Volcanic Valley con mini-crociera di 45 minuti sul lago Rotomahana. Sera: Te Puia Combo Te Po — visita al geyser Pohutu, cena Hangi con cottura tradizionale Māori e spettacolo culturale di canti, danze e haka.",
          en: "Morning: Waimangu Volcanic Valley with a 45-minute mini-cruise on Lake Rotomahana. Evening: Te Puia Combo Te Po — visit to the Pohutu geyser, Hangi dinner with traditional Māori cooking and a cultural show of songs, dances and haka.",
        },
      },
      {
        day: 19,
        title: { it: 'Rotorua → Penisola di Coromandel', en: 'Rotorua → Coromandel Peninsula' },
        description: {
          it: "Guida verso la Penisola di Coromandel (200 km), con sosta a Whitianga, Hot Water Beach e Cathedral Cove. La penisola offre spiagge incontaminate, foreste native del Parco Nazionale di Coromandel e sentieri panoramici.",
          en: "Drive to the Coromandel Peninsula (200 km), stopping at Whitianga, Hot Water Beach and Cathedral Cove. The peninsula offers pristine beaches, native forests of Coromandel National Park and scenic walking tracks.",
        },
      },
      {
        day: 20,
        title: { it: 'Cathedral Cove in barca con fondo di vetro', en: 'Cathedral Cove Glass-Bottom Boat Cruise' },
        description: {
          it: "Tour in barca con fondo di vetro con Glass Bottom Boat Whitianga: osserva pesci, coralli e delfini sotto la superficie, fino all'arco di Cathedral Cove, la formazione rocciosa più fotografata della Nuova Zelanda.",
          en: "Glass-bottom boat tour with Glass Bottom Boat Whitianga: watch fish, corals and occasional dolphins beneath the surface, through to Cathedral Cove arch, New Zealand's most photographed rock formation.",
        },
      },
      {
        day: 21,
        title: { it: 'Coromandel → Auckland', en: 'Coromandel → Auckland' },
        description: {
          it: "Guida verso Auckland (150 km): la più grande città della Nuova Zelanda, nota come 'Città delle Vele', con il suo porto naturale, i mercati e la vivace scena gastronomica. Restituzione dell'auto a noleggio in aeroporto.",
          en: "Drive to Auckland (150 km): New Zealand's largest city, known as the 'City of Sails', with its natural harbour, markets and vibrant food scene. Car drop-off at the airport.",
        },
      },
      {
        day: 22,
        title: { it: 'Auckland → Rarotonga (Isole Cook)', en: 'Auckland → Rarotonga (Cook Islands)' },
        description: {
          it: "Volo per Rarotonga, la vivace capitale delle Isole Cook. Trasferimento in hotel al Little Polynesian Resort con bungalow fronte spiaggia. L'isola è famosa per le sue spiagge di sabbia bianca, la laguna cristallina e la fiorente scena gastronomica.",
          en: "Flight to Rarotonga, the vibrant capital of the Cook Islands. Transfer to the Little Polynesian Resort beachfront bungalow. The island is famous for its white sand beaches, crystal-clear lagoon and thriving food scene.",
        },
      },
      {
        day: 23,
        title: { it: 'Rarotonga — relax e visita libera', en: 'Rarotonga — Relaxation and Free Day' },
        description: {
          it: "Giornata libera a Rarotonga: esplora l'isola con i due autobus locali (uno in senso orario, uno in senso antiorario), visita il Punanga Nui Market il sabato, fai snorkeling nella laguna o passeggia tra ristoranti e mercati locali.",
          en: "Free day in Rarotonga: explore the island using the two local buses (one clockwise, one anticlockwise), visit the Punanga Nui Market on Saturdays, snorkel in the lagoon or wander among local restaurants and markets.",
        },
      },
      {
        day: 24,
        title: { it: 'Aitutaki — day trip con crociera nella laguna', en: 'Aitutaki — Day Trip with Lagoon Cruise' },
        description: {
          it: "Giornata intera ad Aitutaki: volo andata e ritorno incluso, tour dell'isola e crociera Vaka sul catamarano Titi-ai-Tonga. Snorkeling, nuoto e pranzo barbecue a One Foot Island — una spiaggia di sabbia bianca in mezzo alla laguna turchese. Timbro ricordo sul passaporto a One Foot Island.",
          en: "Full day on Aitutaki: return flights included, island tour and Vaka cruise on the catamaran Titi-ai-Tonga. Snorkelling, swimming and BBQ lunch at One Foot Island — a white sand beach in the middle of the turquoise lagoon. Souvenir passport stamp at One Foot Island.",
        },
      },
      {
        day: 25,
        title: { it: 'Rarotonga — relax', en: 'Rarotonga — Relaxation' },
        description: {
          it: "Giornata libera al Little Polynesian Resort: kayak, paddleboard, snorkeling nella laguna e cocktail al tramonto. L'isola offre anche trekking sulle colline interne e immersioni subacquee.",
          en: "Free day at Little Polynesian Resort: kayak, paddleboard, snorkelling in the lagoon and sunset cocktails. The island also offers trekking in the interior hills and scuba diving.",
        },
      },
      {
        day: 26,
        title: { it: 'Rarotonga — relax', en: 'Rarotonga — Relaxation' },
        description: {
          it: "Ultima giornata alle Isole Cook: goditi la laguna, i mercati locali e i tramonti sul Pacifico. Rarotonga offre due autobus locali per esplorare liberamente ogni angolo dell'isola.",
          en: "Final day in the Cook Islands: enjoy the lagoon, local markets and Pacific sunsets. Rarotonga's two local buses make it easy to freely explore every corner of the island.",
        },
      },
      {
        day: 27,
        title: { it: 'Rarotonga → Auckland', en: 'Rarotonga → Auckland' },
        description: {
          it: "Trasferimento in aeroporto e volo per Auckland. Per il fuso orario, si arriva ad Auckland il giorno successivo.",
          en: "Transfer to the airport and flight to Auckland. Due to the time zone, arrival in Auckland is the following day.",
        },
      },
      {
        day: 28,
        title: { it: 'Auckland — transito', en: 'Auckland — Transit' },
        description: {
          it: "Arrivo ad Auckland. Volo di rientro verso l'Italia con scalo intermedio.",
          en: "Arrival in Auckland. Return flight to Italy with an intermediate stopover.",
        },
      },
      {
        day: 29,
        title: { it: 'Rientro in Italia', en: 'Return to Italy' },
        description: {
          it: "Ultimo scalo e atterraggio in Italia. Fine del viaggio.",
          en: "Final stopover and landing in Italy. End of the journey.",
        },
      },
    ],
    included: {
      it: [
        'Tutti i pernottamenti come da itinerario (colazione inclusa dove indicato)',
        'Auto a noleggio Budget All Inclusive, km illimitati, secondo conducente incluso',
        'Trasferimento privato aeroporto Queenstown → hotel (Hallmark Limousines)',
        'Pranzo BBQ Walter Peak — crociera TSS Earnslaw andata e ritorno',
        'Tour Milford Sound — pullman + crociera fiordo + pranzo al sacco',
        'TranzAlpine — Christchurch → Greymouth → Christchurch (andata e ritorno)',
        'Whale Watch Kaikoura — Ocean Cabin',
        'Wilson\'s Abel Tasman — Open Day Pass (crociera)',
        'Traghetto Interislander Picton → Wellington (con auto)',
        'Tongariro — Two Hour Sunset Guided Walk (Adrift)',
        'Waitomo Glowworm Caves — tour guidato con barca',
        'Waimangu Volcanic Valley — Self Guided Walk + mini-crociera lago Rotomahana',
        'Te Puia Combo Te Po (cena Hangi + spettacolo culturale)',
        'Cathedral Cove — Glass Bottom Boat Whitianga',
        'Aitutaki Day Tour — voli A/R + tour isola + crociera Vaka + pranzo BBQ',
        'Little Polynesian Resort — 4 notti Beachfront Bungalow (mezza pensione)',
        'Tekapo Springs — Star Gazing Premium Plus (terme + osservazione stelle)',
      ],
      en: [
        'All accommodation as per itinerary (breakfast included where stated)',
        'Budget All Inclusive car rental, unlimited km, second driver included',
        'Private transfer Queenstown Airport → hotel (Hallmark Limousines)',
        'Walter Peak BBQ lunch — TSS Earnslaw cruise return',
        'Milford Sound tour — coach + fjord cruise + packed lunch',
        'TranzAlpine — Christchurch → Greymouth → Christchurch (return)',
        'Whale Watch Kaikoura — Ocean Cabin',
        'Wilson\'s Abel Tasman — Open Day Pass (cruise)',
        'Interislander ferry Picton → Wellington (with car)',
        'Tongariro — Two Hour Sunset Guided Walk (Adrift)',
        'Waitomo Glowworm Caves — guided tour with boat ride',
        'Waimangu Volcanic Valley — Self Guided Walk + Lake Rotomahana mini-cruise',
        'Te Puia Combo Te Po (Hangi dinner + cultural show)',
        'Cathedral Cove — Glass Bottom Boat Whitianga',
        'Aitutaki Day Tour — return flights + island tour + Vaka cruise + BBQ lunch',
        'Little Polynesian Resort — 4 nights Beachfront Bungalow (half board)',
        'Tekapo Springs — Star Gazing Premium Plus (hot pools + star gazing)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // AUSTRALIA E ISOLE COOK — 22 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-cook',
    slug: 'australia-cook',
    title: {
      it: 'Australia e Isole Cook — Tra Terra Rossa e Lagune Turchesi',
      en: 'Australia & Cook Islands — Between Red Earth and Turquoise Lagoons',
    },
    description: {
      it: "Un viaggio che unisce la grande varietà dell'Australia meridionale e centrale — Great Ocean Road, Kangaroo Island, la via dei vini della Limestone Coast, l'Outback con Kings Canyon e Uluru, Sydney — al paradiso corallino di Aitutaki nelle Isole Cook, con la sua laguna di acque trasparenti, la crociera a One Foot Island e il nuoto con le megattere. Avventura, natura e relax in un unico itinerario.",
      en: "A journey combining the great variety of southern and central Australia — Great Ocean Road, Kangaroo Island, the Limestone Coast wine route, the Outback with Kings Canyon and Uluru, Sydney — with the coral paradise of Aitutaki in the Cook Islands, with its crystal lagoon, One Foot Island cruise and swimming with humpback whales. Adventure, nature and relaxation in a single itinerary.",
    },
    duration: 22,
    destination: 'Australia & Cook Islands',
    type: 'adventure',
    gradient: 'from-orange-600 to-amber-900',
    image: '/images/itin-au-cook.jpg',
    price: { currency: 'EUR', amount: 4475 },
    priceEn: { currency: 'USD', amount: 4900 },
    highlights: {
      it: [
        'Great Ocean Road — le Twelve Apostles da Melbourne a Port Campbell',
        'Blue Lake di Mount Gambier e Limestone Coast',
        'Kangaroo Island — zoo naturale a cielo aperto',
        'Kings Canyon in 4x4 sulla Mereenie Loop Road',
        'Uluru al tramonto e Kata Tjuta all\'alba',
        'Sydney — Opera House, Harbour Bridge e Bondi Beach',
        'Aitutaki — laguna e pranzo BBQ a One Foot Island',
        'Nuoto con le megattere ad Aitutaki',
      ],
      en: [
        'Great Ocean Road — the Twelve Apostles from Melbourne to Port Campbell',
        'Blue Lake at Mount Gambier and Limestone Coast',
        'Kangaroo Island — open-air natural zoo',
        'Kings Canyon by 4WD on the Mereenie Loop Road',
        'Uluru at sunset and Kata Tjuta at dawn',
        'Sydney — Opera House, Harbour Bridge and Bondi Beach',
        'Aitutaki — lagoon and BBQ lunch at One Foot Island',
        'Swimming with humpback whales in Aitutaki',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo a Melbourne', en: 'Arrival in Melbourne' },
        description: {
          it: "Arrivo all'aeroporto di Melbourne con volo via Hong Kong. Trasferimento privato in hotel. Melbourne è la capitale dello Stato di Victoria — città multiculturale, all'avanguardia nell'arte, nella gastronomia e nel design. Tre notti all'Holiday Inn Express Melbourne Southbank.",
          en: "Arrival at Melbourne Airport via Hong Kong. Private transfer to the hotel. Melbourne is the capital of Victoria — a multicultural city at the forefront of art, gastronomy and design. Three nights at Holiday Inn Express Melbourne Southbank.",
        },
      },
      {
        day: 2,
        title: { it: 'Melbourne — giornata libera', en: 'Melbourne — Free Day' },
        description: {
          it: "Giornata libera per esplorare Melbourne: tram gratuito City Circle, Queen Victoria Market, vicoli dell'arte urbana (Hosier Lane, Degraves Street), Federation Square, Royal Botanic Gardens e St Kilda al tramonto. La città è famosa per i suoi bar, ristoranti e la vivace scena culturale.",
          en: "Free day to explore Melbourne: free City Circle Tram, Queen Victoria Market, street art laneways (Hosier Lane, Degraves Street), Federation Square, Royal Botanic Gardens and St Kilda at sunset. The city is famous for its bars, restaurants and vibrant cultural scene.",
        },
      },
      {
        day: 3,
        title: { it: 'Melbourne — seconda giornata libera', en: 'Melbourne — Second Free Day' },
        description: {
          it: "Seconda giornata libera a Melbourne per approfondire i quartieri più interessanti: Fitzroy (mercato artigianale e caffè d'autore), Yarra Valley (vigneti a un'ora dalla città) o MCG e tour sportivi. Cena di arrivederci in città prima di iniziare il road trip il giorno seguente.",
          en: "Second free day in Melbourne to explore the most interesting neighbourhoods: Fitzroy (artisan market and speciality coffee), Yarra Valley (vineyards one hour from the city) or MCG and sports tours. Farewell dinner in the city before starting the road trip the following day.",
        },
      },
      {
        day: 4,
        title: { it: 'Melbourne → Great Ocean Road → Port Campbell', en: 'Melbourne → Great Ocean Road → Port Campbell' },
        description: {
          it: "Ritiro dell'auto a noleggio (Toyota Corolla All Inclusive, km illimitati) e partenza alle 09:00 lungo la Great Ocean Road, una delle strade panoramiche più spettacolari del mondo: Torquay (culla del surf australiano), Kennett River (koala sugli eucalipti e lorikeet coloratissimi), Great Otway National Park e il Maits Rest Rainforest Walk. Arrivo al Parco Nazionale di Port Campbell con i Dodici Apostoli, Loch Ard Gorge e London Arch. Pernottamento a Port Campbell.",
          en: "Car rental pick-up (Toyota Corolla All Inclusive, unlimited km) and 09:00 departure along the Great Ocean Road, one of the world's most spectacular scenic drives: Torquay (birthplace of Australian surfing), Kennett River (koalas in eucalyptus trees and colourful lorikeets), Great Otway National Park and Maits Rest Rainforest Walk. Arrival at Port Campbell National Park with the Twelve Apostles, Loch Ard Gorge and London Arch. Overnight in Port Campbell.",
        },
      },
      {
        day: 5,
        title: { it: 'Port Campbell → Mount Gambier → Robe', en: 'Port Campbell → Mount Gambier → Robe' },
        description: {
          it: "Partenza con sosta a Port Fairy, affascinante villaggio costiero. Poi Mount Gambier: il Blue Lake (colore turchese straordinario che cambia con le stagioni) e l'Umpherston Sinkhole, giardino spettacolare in una dolina naturale. Traversata della Coonawarra Wine Region con possibile degustazione di Cabernet Sauvignon. Pernottamento a Robe, elegante villaggio costiero.",
          en: "Departure with a stop in Port Fairy, a charming coastal village. Then Mount Gambier: the Blue Lake (extraordinary turquoise colour that changes with the seasons) and Umpherston Sinkhole, a spectacular garden inside a natural sinkhole. Drive through Coonawarra Wine Region with possible Cabernet Sauvignon tasting. Overnight in Robe, an elegant coastal village.",
        },
      },
      {
        day: 6,
        title: { it: 'Robe → Victor Harbor', en: 'Robe → Victor Harbor' },
        description: {
          it: "Partenza da Robe verso Victor Harbor (330 km), tranquilla cittadina balneare famosa per il lungomare, il ponte pedonale verso Granite Island e la stagione delle balene (giugno–ottobre). Avvistamento dei pinguini la sera.",
          en: "Drive from Robe to Victor Harbor (330 km), a peaceful seaside town famous for its waterfront, the pedestrian causeway to Granite Island and whale watching season (June–October). Penguin spotting in the evening.",
        },
      },
      {
        day: 7,
        title: { it: 'Victor Harbor → Cape Jervis → Kangaroo Island', en: 'Victor Harbor → Cape Jervis → Kangaroo Island' },
        description: {
          it: "Partenza verso Cape Jervis per il traghetto Sealink verso Penneshaw, sull'isola di Kangaroo Island (45 minuti). All'arrivo: Visitor Centre, ritiro mappa e inizio dell'esplorazione dell'isola più incontaminata dell'Australia Meridionale: fauna in libertà (canguri, koala, echidna, foche, leoni marini), spiagge bianchissime e Parco Nazionale del Flinders Chase.",
          en: "Drive to Cape Jervis for the Sealink ferry to Penneshaw, Kangaroo Island (45 minutes). On arrival: Visitor Centre, map pick-up and start exploring South Australia's most pristine island: free-roaming wildlife (kangaroos, koalas, echidnas, seals, sea lions), white beaches and Flinders Chase National Park.",
        },
      },
      {
        day: 8,
        title: { it: 'Kangaroo Island — giornata libera', en: 'Kangaroo Island — Free Day' },
        description: {
          it: "Giornata libera su Kangaroo Island: Seal Bay (colonia permanente di leoni marini), Remarkable Rocks, Admiral Arch, Little Sahara (dune di sabbia), Vivonne Bay (tra le più belle spiagge dell'Australia), Stokes Bay e Emu Bay. Una giornata non è abbastanza.",
          en: "Free day on Kangaroo Island: Seal Bay (permanent sea lion colony), Remarkable Rocks, Admiral Arch, Little Sahara (sand dunes), Vivonne Bay (one of Australia's most beautiful beaches), Stokes Bay and Emu Bay. A full day is barely enough.",
        },
      },
      {
        day: 9,
        title: { it: 'Kangaroo Island → McLaren Vale → Adelaide', en: 'Kangaroo Island → McLaren Vale → Adelaide' },
        description: {
          it: "Traghetto di ritorno a Cape Jervis e guida verso McLaren Vale, splendida regione vinicola tra colline e vigneti (d'Arenberg Cube, Wirra Wirra, Maxwell Wines). Poi Adelaide, elegante capitale del South Australia, con il Rundle Mall, il fiume Torrens e il Botanic Garden. Pernottamento all'Holiday Inn Express Adelaide.",
          en: "Return ferry to Cape Jervis and drive to McLaren Vale, a beautiful wine region among hills and vineyards (d'Arenberg Cube, Wirra Wirra, Maxwell Wines). Then Adelaide, South Australia's elegant capital, with Rundle Mall, the Torrens River and Botanic Garden. Overnight at Holiday Inn Express Adelaide.",
        },
      },
      {
        day: 10,
        title: { it: 'Adelaide → Alice Springs → Kings Canyon (4x4)', en: 'Adelaide → Alice Springs → Kings Canyon (4WD)' },
        description: {
          it: "Volo Adelaide–Alice Springs e ritiro del fuoristrada 4x4 All Inclusive. Partenza lungo la Larapinta Drive con soste a Simpsons Gap e Standley Chasm nei West MacDonnell Ranges. Poi la Mereenie Loop Road — 150 km non asfaltati attraverso territorio aborigeno. Lungo il percorso: cammelli selvatici, canguri, dingo e cavalli bradi nel silenzio del Red Centre. Pernottamento al Discovery Kings Canyon Resort.",
          en: "Flight Adelaide–Alice Springs and 4WD All Inclusive rental pick-up. Drive along Larapinta Drive with stops at Simpsons Gap and Standley Chasm in the West MacDonnell Ranges. Then the Mereenie Loop Road — 150 km unsealed through Aboriginal territory. Along the way: wild camels, kangaroos, dingoes and brumbies in the silence of the Red Centre. Overnight at Discovery Kings Canyon Resort.",
        },
      },
      {
        day: 11,
        title: { it: 'Kings Canyon → Uluru al tramonto', en: 'Kings Canyon → Uluru at Sunset' },
        description: {
          it: "All'alba: la Kings Canyon Rim Walk (3–4 ore), percorso panoramico tra le pareti rosse del canyon e la pianura sottostante. Per chi preferisce qualcosa di più tranquillo: il Kings Creek Walk. Nel pomeriggio: guida verso Yulara con sosta al Mount Conner Lookout e alla Curtin Springs Station. Arrivo in tempo per il tramonto su Uluru — la roccia cambia dal rosso al viola al nero.",
          en: "At dawn: the Kings Canyon Rim Walk (3–4 hours), a panoramic trail along the canyon's red walls and the plain below. For those preferring something more gentle: the Kings Creek Walk. In the afternoon: drive to Yulara with a stop at Mount Conner Lookout and Curtin Springs Station. Arrive in time for sunset over Uluru — the rock shifts from red to violet to black.",
        },
      },
      {
        day: 12,
        title: { it: 'Uluru e Kata Tjuta', en: 'Uluru and Kata Tjuta' },
        description: {
          it: "Sveglia presto per l'alba su Uluru, uno degli spettacoli più intensi del viaggio. Poi la Base Walk o il suggestivo Mala Walk con storie aborigene. Possibilità di noleggio bici per il perimetro di Uluru. Pomeriggio: Kata Tjuta (The Olgas) con il Walpa Gorge Walk tra le 36 cupole rocciose. Sera: Field of Light di Bruce Munro — installazione luminosa nel deserto.",
          en: "Early rise for the dawn over Uluru, one of the journey's most powerful spectacles. Then the Base Walk or the evocative Mala Walk with Aboriginal stories. Option to hire bikes around Uluru's perimeter. Afternoon: Kata Tjuta (The Olgas) with the Walpa Gorge Walk among the 36 rock domes. Evening: Bruce Munro's Field of Light — luminous art installation in the desert.",
        },
      },
      {
        day: 13,
        title: { it: 'Uluru → Sydney', en: 'Uluru → Sydney' },
        description: {
          it: "Ultima alba su Uluru e visita al Cultural Centre aborigeno. Poi consegna del 4x4 in aeroporto e volo Ayers Rock–Sydney. Trasferimento libero in hotel al Furama Darling Harbour, nel cuore di Sydney.",
          en: "Final dawn at Uluru and visit to the Aboriginal Cultural Centre. Then 4WD drop-off at the airport and flight Ayers Rock–Sydney. Free transfer to the hotel at Furama Darling Harbour, in the heart of Sydney.",
        },
      },
      {
        day: 14,
        title: { it: 'Sydney — baia, Opera House e Harbour Bridge', en: 'Sydney — Bay, Opera House and Harbour Bridge' },
        description: {
          it: "Sydney da scoprire: Opera House, Harbour Bridge, Circular Quay, The Rocks, Royal Botanic Garden, Darling Harbour con acquario e musei. Opzione: tour dell'Opera House o mini-crociera in baia con pranzo incluso.",
          en: "Sydney to explore: Opera House, Harbour Bridge, Circular Quay, The Rocks, Royal Botanic Garden, Darling Harbour with aquarium and museums. Options: Opera House tour or Sydney Harbour minicruise with lunch included.",
        },
      },
      {
        day: 15,
        title: { it: 'Sydney — Bondi Beach e la Bondi to Coogee Walk', en: 'Sydney — Bondi Beach and the Bondi to Coogee Walk' },
        description: {
          it: "Giornata alle spiagge di Sydney: Bondi Beach (surf, scuole e mercatini del weekend), la Bondi to Coogee Clifftop Walk (6 km tra scogliere e belvederi naturali passando per Tamarama e Bronte), Manly in traghetto e St Kilda. L'anima più rilassata e solare di Sydney.",
          en: "Day at Sydney's beaches: Bondi Beach (surf, surf schools and weekend markets), the Bondi to Coogee Clifftop Walk (6 km along cliffs and natural lookouts past Tamarama and Bronte), Manly by ferry and St Kilda. The most relaxed and sunny side of Sydney.",
        },
      },
      {
        day: 16,
        title: { it: 'Sydney → Aitutaki (Isole Cook)', en: 'Sydney → Aitutaki (Cook Islands)' },
        description: {
          it: "Mattina: Taronga Zoo (koala, canguri e vista sulla baia) o SEA LIFE Sydney Aquarium. Nel pomeriggio transfer in aeroporto per il volo Sydney–Rarotonga con proseguimento per Aitutaki. Trasferimento al Resort Tava'e, boutique resort fronte laguna.",
          en: "Morning: Taronga Zoo (koalas, kangaroos and bay views) or SEA LIFE Sydney Aquarium. In the afternoon, transfer to the airport for the flight Sydney–Rarotonga continuing to Aitutaki. Transfer to Resort Tava'e, a boutique beachfront resort.",
        },
      },
      {
        day: 17,
        title: { it: 'Aitutaki — One Foot Island Lagoon Cruise', en: 'Aitutaki — One Foot Island Lagoon Cruise' },
        description: {
          it: "All Day Lagoon Cruise di Bishop's: crociera nella laguna turchese di Aitutaki, snorkeling in acque cristalline, pranzo barbecue a One Foot Island con timbro ricordo sul passaporto. La laguna di Aitutaki è considerata tra le più belle del Pacifico.",
          en: "Bishop's All Day Lagoon Cruise: cruise on Aitutaki's turquoise lagoon, snorkelling in crystal waters, BBQ lunch at One Foot Island with a souvenir passport stamp. Aitutaki's lagoon is considered among the most beautiful in the Pacific.",
        },
      },
      {
        day: 18,
        title: { it: 'Aitutaki — nuoto con le megattere', en: 'Aitutaki — Swimming with Humpback Whales' },
        description: {
          it: "Tour organizzato per nuotare con le balene megattere (luglio–ottobre): partenza alle 09:00 da Ootu Beach con Wet n Wild Aitutaki. Un'esperienza unica al mondo — galleggiare accanto a questi giganti del mare nelle acque calde del Pacifico meridionale.",
          en: "Organised tour to swim with humpback whales (July–October): 09:00 departure from Ootu Beach with Wet n Wild Aitutaki. A once-in-a-lifetime experience — floating alongside these ocean giants in the warm waters of the South Pacific.",
        },
      },
      {
        day: 19,
        title: { it: 'Aitutaki — giornata libera', en: 'Aitutaki — Free Day' },
        description: {
          it: "Giornata libera ad Aitutaki: kayak e paddleboard nella laguna dal resort, esplorazione dei motu, snorkeling autonomo o semplicemente relax sulla spiaggia con le acque turchesi a portata di mano.",
          en: "Free day on Aitutaki: kayak and paddleboard on the lagoon from the resort, exploration of the motu, independent snorkelling or simply relaxing on the beach with turquoise waters at arm's reach.",
        },
      },
      {
        day: 20,
        title: { it: 'Aitutaki — seconda giornata libera', en: 'Aitutaki — Second Free Day' },
        description: {
          it: "Seconda giornata libera ad Aitutaki: l'isola è piccola ma ogni angolo è diverso. Esplora a piedi o in bici, scopri i ristoranti locali e i mercatini, o goditi il tramonto più bello del Pacifico direttamente dalla spiaggia del resort.",
          en: "Second free day on Aitutaki: the island is small but every corner is different. Explore on foot or by bike, discover local restaurants and markets, or enjoy the Pacific's most beautiful sunset directly from the resort beach.",
        },
      },
      {
        day: 21,
        title: { it: 'Aitutaki → Rarotonga → Auckland', en: 'Aitutaki → Rarotonga → Auckland' },
        description: {
          it: "Trasferimento in aeroporto e volo Aitutaki–Rarotonga, poi proseguimento per Auckland. Fine dei servizi inclusi nel pacchetto.",
          en: "Transfer to the airport and flight Aitutaki–Rarotonga, then onward to Auckland. End of included package services.",
        },
      },
      {
        day: 22,
        title: { it: 'Rientro in Italia', en: 'Return to Italy' },
        description: {
          it: "Volo di rientro da Auckland verso l'Italia via Hong Kong. Fine del viaggio.",
          en: "Return flight from Auckland to Italy via Hong Kong. End of the journey.",
        },
      },
    ],
    included: {
      it: [
        'Pernottamenti come da itinerario (colazione inclusa)',
        'Auto a noleggio Toyota Corolla All Inclusive km illimitati (Melbourne)',
        'Fuoristrada 4x4 All Inclusive km illimitati (Alice Springs)',
        'Traghetto Sealink Kangaroo Island andata e ritorno con auto',
        'Resort Tava\'e Aitutaki — 5 notti Premium Beachfront Room (colazione inclusa)',
        'Aitutaki All Day Lagoon Cruise — One Foot Island (volo A/R + pranzo BBQ inclusi)',
        'Tour nuoto con megattere — Wet n Wild Aitutaki',
        'Volo Adelaide → Alice Springs (incluso)',
        'Volo Ayers Rock → Sydney (incluso)',
        'Volo Sydney → Rarotonga → Aitutaki (incluso)',
        'Permesso Mereenie Loop Road (incluso)',
        'Documentazione di viaggio in PDF completa',
        'Assistenza locale italiana (telefono e chat)',
      ],
      en: [
        'Accommodation as per itinerary (breakfast included)',
        'Toyota Corolla All Inclusive car rental unlimited km (Melbourne)',
        'All Inclusive 4WD unlimited km (Alice Springs)',
        'Sealink Kangaroo Island ferry return with car',
        'Resort Tava\'e Aitutaki — 5 nights Premium Beachfront Room (breakfast included)',
        'Aitutaki All Day Lagoon Cruise — One Foot Island (return flights + BBQ lunch included)',
        'Humpback whale swimming tour — Wet n Wild Aitutaki',
        'Flight Adelaide → Alice Springs (included)',
        'Flight Ayers Rock → Sydney (included)',
        'Flight Sydney → Rarotonga → Aitutaki (included)',
        'Mereenie Loop Road permit (included)',
        'Complete travel documentation in PDF format',
        'Italian-language local assistance (phone and chat)',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // NUOVA CALEDONIA — ALLA SCOPERTA DELLA GRANDE TERRE — 10 giorni
  // ─────────────────────────────────────────────
  {
    id: 'nuova-caledonia-grande-terre',
    slug: 'nuova-caledonia-grande-terre',
    title: {
      it: 'Nuova Caledonia — Alla scoperta della Grande Terre',
      en: 'New Caledonia — Discovering the Grande Terre',
    },
    description: {
      it: "Dieci giorni in self-drive lungo la costa est e ovest della Grande Terre, il grande territorio di Nuova Caledonia. Da Noumea alle scogliere nere di Hienghène, dalle spiagge bianche di Poe alla foresta delle grandi felci, passando per villaggi Melanesiani, le rocce di Linderalique e le cascate Tao. Un'isola francese nel Pacifico dove laguna, montagna e cultura Kanak si incontrano.",
      en: "Ten days of self-driving along the east and west coasts of Grande Terre, New Caledonia's main island. From Noumea to the black cliffs of Hienghène, from Poe's white beaches to the Great Ferns forest, through Melanesian villages, the Linderalique rocks and Tao Waterfalls. A French island in the Pacific where lagoon, mountain and Kanak culture meet.",
    },
    duration: 10,
    destination: 'New Caledonia',
    type: 'road-trip',
    gradient: 'from-sky-600 to-teal-800',
    image: '/images/itin-grande-terre.jpg',
    price: { currency: 'EUR', amount: 2500 },
    priceEn: { currency: 'USD', amount: 2750 },
    highlights: {
      it: [
        'Escursione all\'Isola Amedee — pranzo buffet con danze tradizionali',
        'Spiaggia di Poe — una delle più belle del Pacifico',
        'Hienghène — scogliere nere e rocce di Linderalique in crociera',
        'Cascate Tao e traversata in ferry sul fiume Ouaième',
        'Visita guidata a una casa tradizionale Melanesiana',
        'Parco delle Grandi Felci — kagu e specie endemiche',
        'Self-drive in libertà su tutta l\'isola',
      ],
      en: [
        'Amedee Island excursion — buffet lunch with traditional dances',
        'Poe Beach — one of the Pacific\'s most beautiful',
        'Hienghène — black cliffs and Linderalique rocks cruise',
        'Tao Waterfalls and Ouaième River ferry crossing',
        'Guided visit to a traditional Melanesian house',
        'Great Ferns Park — kagu bird and endemic species',
        'Self-drive freedom across the whole island',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo a Noumea', en: 'Arrival in Noumea' },
        description: {
          it: "Arrivo all'aeroporto internazionale di La Tontouta e trasferimento privato in hotel 4 stelle nel centro di Noumea. La capitale della Nuova Caledonia è una città francese nel Pacifico: negozi, caffè, mercati colorati e il lungomare della Baie des Citrons. Due notti in hotel.",
          en: "Arrival at La Tontouta International Airport and private transfer to a 4-star hotel in the centre of Noumea. New Caledonia's capital is a French city in the Pacific: shops, cafés, colourful markets and the Baie des Citrons waterfront. Two nights in hotel.",
        },
      },
      {
        day: 2,
        title: { it: 'Escursione all\'Isola Amedee', en: 'Amedee Island Excursion' },
        description: {
          it: "Trasferimento al Porto Moselle di Noumea e partenza in barca per l'Isola Amedee, nel cuore della laguna UNESCO. Pranzo a buffet con spettacolo di danze e musica tradizionale Kanak. Pomeriggio libero sull'isola: snorkeling nella laguna turchese, stand-up paddle e relax sulla spiaggia. Rientro in hotel nel tardo pomeriggio.",
          en: "Transfer to Port Moselle in Noumea and boat departure to Amedee Island, in the heart of the UNESCO lagoon. Buffet lunch with traditional Kanak dance and music performance. Free afternoon on the island: snorkelling in the turquoise lagoon, stand-up paddling and beach relaxation. Return to hotel in the late afternoon.",
        },
      },
      {
        day: 3,
        title: { it: 'Noumea → Poe (self-drive, 180 km)', en: 'Noumea → Poe (Self-Drive, 180 km)' },
        description: {
          it: "Ritiro dell'auto a noleggio e inizio del road trip lungo la costa ovest. Tappe consigliate: la Distilleria di Niaouli, La Foa, Fort Terremba, la spiaggia di Roche Percée, la Baia delle Tartarughe e la Baia degli Innamorati presso Bourail. Arrivo alla magnifica spiaggia di Poe, considerata una delle più belle dell'intero Pacifico. Pernottamento in bungalow 3 stelle.",
          en: "Car rental pick-up and start of the road trip along the west coast. Recommended stops: Niaouli Distillery, La Foa, Fort Terremba, Roche Percée beach, Turtle Bay and Lovers' Bay near Bourail. Arrival at the magnificent Poe Beach, considered one of the most beautiful in the entire Pacific. Overnight in a 3-star bungalow.",
        },
      },
      {
        day: 4,
        title: { it: 'Poe → Kone', en: 'Poe → Kone' },
        description: {
          it: "Mattinata sulla spiaggia di Poe: acque turchesi, sabbia bianca e nessuna folla. Nel pomeriggio partenza verso Kone (130 km), cittadina nella valle del Kone-Tiwaka. L'entroterra diventa più verde e montuoso man mano che ci si allontana dalla costa ovest. Pernottamento in bungalow 3 stelle.",
          en: "Morning at Poe Beach: turquoise waters, white sand and no crowds. In the afternoon, drive to Kone (130 km), a town in the Kone-Tiwaka valley. The interior becomes greener and more mountainous as you move away from the west coast. Overnight in a 3-star bungalow.",
        },
      },
      {
        day: 5,
        title: { it: 'Kone → Hienghène', en: 'Kone → Hienghène' },
        description: {
          it: "Guida verso Hienghène (120 km) lungo uno dei tratti più scenici dell'isola: foreste dense, valli verdeggianti e colline che scendono verso il mare. Hienghène è famosa per le sue imponenti scogliere di calcare nero e per essere uno dei luoghi più affascinanti della Nuova Caledonia. Due notti in bungalow 3 stelle.",
          en: "Drive to Hienghène (120 km) along one of the island's most scenic stretches: dense forests, green valleys and hills descending to the sea. Hienghène is famous for its imposing black limestone cliffs and for being one of New Caledonia's most fascinating places. Two nights in a 3-star bungalow.",
        },
      },
      {
        day: 6,
        title: { it: 'Hienghène — cascate Tao e crociera Linderalique', en: 'Hienghène — Tao Waterfalls and Linderalique Cruise' },
        description: {
          it: "Mattino: traversata in ferry sul fiume Ouaième e visita alle cascate Tao nel cuore della foresta. Pomeriggio: crociera di 2 ore nella baia di Hienghène per ammirare le rocce di Linderalique — formazioni di calcare nero dalle forme curiose, tra cui la celebre 'gallina' — e i villaggi Kanak sulle rive.",
          en: "Morning: ferry crossing on the Ouaième River and visit to the Tao Waterfalls in the heart of the forest. Afternoon: 2-hour boat cruise in Hienghène Bay to admire the Linderalique rocks — curious black limestone formations including the famous 'chicken' — and the Kanak villages on the banks.",
        },
      },
      {
        day: 7,
        title: { it: 'Hienghène → Poindimié', en: 'Hienghène → Poindimié' },
        description: {
          it: "Guida verso Poindimié (90 km) sulla costa est, con sosta per una visita guidata a una casa tradizionale Melanesiana: architettura, storia e cultura Kanak spiegata da una guida locale. Poindimié è un punto di riferimento sulla costa est, con spiagge tranquille e un'atmosfera autentica. Pernottamento in bungalow 3 stelle.",
          en: "Drive to Poindimié (90 km) on the east coast, with a stop for a guided visit to a traditional Melanesian house: architecture, history and Kanak culture explained by a local guide. Poindimié is a reference point on the east coast, with quiet beaches and an authentic atmosphere. Overnight in a 3-star bungalow.",
        },
      },
      {
        day: 8,
        title: { it: 'Poindimié → Sarramea/Farino', en: 'Poindimié → Sarramea/Farino' },
        description: {
          it: "Lunga guida verso l'interno dell'isola (190 km) fino alle colline di Sarramea e Farino, la zona più fresca e boscosa della Grande Terre. Possibile sosta all'Hotel Evasion per una passeggiata fino alla pozza naturale fluviale 'Buco di Feuillet'. Pernottamento in bungalow 3 stelle.",
          en: "Long drive into the island's interior (190 km) to the hills of Sarramea and Farino, the coolest and most forested area of Grande Terre. Optional stop at Hotel Evasion for a walk to the natural river pool 'Feuillet's Hole'. Overnight in a 3-star bungalow.",
        },
      },
      {
        day: 9,
        title: { it: 'Parco delle Grandi Felci → Noumea', en: 'Great Ferns Park → Noumea' },
        description: {
          it: "Mattino: visita al Parco delle Grandi Felci (Parc des Grandes Fougères), con foresta secca densa di specie endemiche: il kagu (uccello simbolo della Nuova Caledonia, incapace di volare), il noutou, il piccione verde caledoniano e il passero caledoniano. Poi guida di ritorno verso Noumea (120 km), consegna dell'auto e check-in in hotel 4 stelle. Una notte.",
          en: "Morning: visit to the Great Ferns Park (Parc des Grandes Fougères), with dry forest dense with endemic species: the kagu (New Caledonia's flightless symbol bird), the noutou, the Caledonian green pigeon and the Caledonian warbler. Then drive back to Noumea (120 km), car drop-off and check-in at a 4-star hotel. One night.",
        },
      },
      {
        day: 10,
        title: { it: 'Partenza da Noumea', en: 'Departure from Noumea' },
        description: {
          it: "Colazione in hotel e trasferimento all'aeroporto internazionale di La Tontouta per il volo di rientro. Fine dei servizi inclusi nel pacchetto.",
          en: "Hotel breakfast and transfer to La Tontouta International Airport for the return flight. End of included package services.",
        },
      },
    ],
    included: {
      it: [
        'Tutti i pernottamenti come da itinerario (colazione inclusa)',
        'Trasferimenti privati aeroporto–hotel (andata e ritorno)',
        'Tour organizzato Isola Amedee (pranzo a buffet + spettacolo incluso)',
        'Auto a noleggio self-drive Noumea–Noumea (All Inclusive, km illimitati)',
        'Visita guidata casa tradizionale Melanesiana',
        'Crociera nella baia di Hienghène — rocce di Linderalique',
        'Tasse locali',
        'Assistenza in loco in lingua italiana',
      ],
      en: [
        'All accommodation as per itinerary (breakfast included)',
        'Private airport–hotel transfers (return)',
        'Amedee Island organised tour (buffet lunch + show included)',
        'Self-drive car rental Noumea–Noumea (All Inclusive, unlimited km)',
        'Guided visit to traditional Melanesian house',
        'Hienghène Bay cruise — Linderalique rocks',
        'Local taxes',
        'Italian-language on-site assistance',
      ],
    },
    notIncluded: standardNotIncluded,
  },

  // ─────────────────────────────────────────────
  // L'ALTRA FACCIA DELL'AUSTRALIA — WESTERN AUSTRALIA E KIMBERLEY — 31 giorni
  // ─────────────────────────────────────────────
  {
    id: 'australia-rossa-selvaggia',
    slug: 'australia-rossa-selvaggia',
    title: {
      it: "L'Altra Faccia dell'Australia — Western Australia e Kimberley",
      en: "The Other Face of Australia — Western Australia & the Kimberley",
    },
    description: {
      it: "Trentuno giorni attraverso l'Australia che pochi conoscono: da Perth alle infinite spiagge del Western Australia, dai delfini di Monkey Mia alla barriera di Ningaloo, dalle gole rosse di Karijini alle saline di Broome, dalle Gorge di Purnululu (Bungle Bungles) al Katherine Gorge nel Territorio del Nord, fino a Kakadu e Darwin. Poi il Red Centre con Kings Canyon e Uluru, e il gran finale a Sydney. Il road trip più lungo e più vero d'Australia.",
      en: "Thirty-one days through the Australia that few know: from Perth along the endless beaches of Western Australia, from the dolphins of Monkey Mia to the Ningaloo Reef, from the red gorges of Karijini to the pindan cliffs of Broome, from Purnululu's Bungle Bungles to Katherine Gorge in the Northern Territory, through Kakadu and Darwin. Then the Red Centre with Kings Canyon and Uluru, and the grand finale in Sydney. The longest and most authentic Australian road trip.",
    },
    duration: 31,
    destination: 'Australia',
    type: 'adventure',
    gradient: 'from-red-700 to-orange-900',
    image: '/images/itin-western-au.jpg',
    price: { currency: 'EUR', amount: 5550 },
    priceEn: { currency: 'USD', amount: 6050 },
    highlights: {
      it: [
        'Pinnacles Desert — le colonne di calcare al tramonto',
        'Monkey Mia — delfini selvatici che si avvicinano alla riva ogni mattina',
        'Ningaloo Reef — barriera corallina incontaminata a Coral Bay ed Exmouth',
        'Karijini National Park — gole rosse e piscine naturali',
        'Cape Leveque — scogliere ocra sul mare turchese di Broome',
        'Purnululu (Bungle Bungles) — a cupole a strisce in volo panoramico',
        'Katherine Gorge — crociera tra le pareti di arenaria',
        'Kakadu — il parco nazionale più grande d\'Australia',
        'Kings Canyon e Uluru — il cuore rosso del continente',
      ],
      en: [
        'Pinnacles Desert — limestone columns at sunset',
        'Monkey Mia — wild dolphins that approach the shore every morning',
        'Ningaloo Reef — pristine coral reef at Coral Bay and Exmouth',
        'Karijini National Park — red gorges and natural pools',
        'Cape Leveque — ochre cliffs above Broome\'s turquoise sea',
        'Purnululu (Bungle Bungles) — striped domes from a scenic flight',
        'Katherine Gorge — cruise between sandstone walls',
        'Kakadu — Australia\'s largest national park',
        'Kings Canyon and Uluru — the red heart of the continent',
      ],
    },
    program: [
      {
        day: 1,
        title: { it: 'Arrivo a Perth', en: 'Arrival in Perth' },
        description: {
          it: "Arrivo all'aeroporto internazionale di Perth e trasferimento in hotel 3,5 stelle. Perth è la capitale del Western Australia: città soleggiata, moderna e rilassata, con il Kings Park che domina la città, le spiagge bianchissime di Cottesloe e Scarborough e la vivace Fremantle a 30 minuti. Due notti in hotel.",
          en: "Arrival at Perth International Airport and transfer to a 3.5-star hotel. Perth is the Western Australia capital: a sunny, modern and relaxed city, with Kings Park dominating the skyline, the pristine beaches of Cottesloe and Scarborough and vibrant Fremantle just 30 minutes away. Two nights in hotel.",
        },
      },
      {
        day: 2,
        title: { it: 'Perth — giornata libera', en: 'Perth — Free Day' },
        description: {
          it: "Giornata libera per esplorare Perth: Kings Park e Botanic Garden con vista panoramica sulla città, Fremantle con il suo mercato e i pub storici, Cottesloe Beach, Swan Valley per una degustazione di vini locali o Rottnest Island in traghetto per incontrare i quokka.",
          en: "Free day to explore Perth: Kings Park and Botanic Garden with panoramic city views, Fremantle with its market and historic pubs, Cottesloe Beach, Swan Valley for local wine tasting, or Rottnest Island by ferry to meet the quokkas.",
        },
      },
      {
        day: 3,
        title: { it: 'Perth → Pinnacles Desert (Cervantes)', en: 'Perth → Pinnacles Desert (Cervantes)' },
        description: {
          it: "Ritiro dell'auto a noleggio e partenza verso nord (200 km). Tappa al Parco Nazionale di Nambung: i Pinnacles Desert, colonne di calcare che emergono dal deserto giallo in migliaia di forme bizzarre. Il tramonto sulle colonne è uno degli spettacoli più fotografati d'Australia. Pernottamento a Cervantes.",
          en: "Car rental pick-up and drive north (200 km). Stop at Nambung National Park: the Pinnacles Desert, limestone columns rising from the yellow sand in thousands of bizarre shapes. Sunset over the pinnacles is one of Australia's most photographed spectacles. Overnight in Cervantes.",
        },
      },
      {
        day: 4,
        title: { it: 'Cervantes → Kalbarri National Park', en: 'Cervantes → Kalbarri National Park' },
        description: {
          it: "Guida verso Kalbarri National Park (310 km), famoso per le sue gole rosse lungo il fiume Murchison e i colori delle Skywalk — le passerelle panoramiche sospese sulle gole. Avvistamento di fauna locale: canguri, emù e kokaburra. Pernottamento a Kalbarri.",
          en: "Drive to Kalbarri National Park (310 km), famous for its red gorges along the Murchison River and the colours of the Skywalk — panoramic walkways suspended over the gorges. Wildlife spotting: kangaroos, emus and kookaburras. Overnight in Kalbarri.",
        },
      },
      {
        day: 5,
        title: { it: 'Kalbarri → Monkey Mia', en: 'Kalbarri → Monkey Mia' },
        description: {
          it: "Guida verso Monkey Mia (350 km), nella Shark Bay UNESCO World Heritage Area. Pernottamento al resort di Monkey Mia, uno dei luoghi più iconici del Western Australia. Due notti.",
          en: "Drive to Monkey Mia (350 km), in the Shark Bay UNESCO World Heritage Area. Overnight at the Monkey Mia resort, one of Western Australia's most iconic locations. Two nights.",
        },
      },
      {
        day: 6,
        title: { it: 'Monkey Mia — delfini e François Peron 4x4', en: 'Monkey Mia — Dolphins and François Peron 4WD Tour' },
        description: {
          it: "Mattino: i delfini selvatici di Monkey Mia — ogni mattina si avvicinano spontaneamente alla riva dove i ranger li nutrono, in uno degli eventi più emozionanti di tutta l'Australia. Pomeriggio: tour organizzato in 4x4 nel Parco Nazionale di François Peron, con fauna endemica, remote beaches e stromatoliti nel Hamelin Pool.",
          en: "Morning: the wild dolphins of Monkey Mia — every morning they spontaneously approach the shore where rangers feed them, in one of the most moving events in all of Australia. Afternoon: organised 4WD tour in François Peron National Park, with endemic wildlife, remote beaches and stromatolites at Hamelin Pool.",
        },
      },
      {
        day: 7,
        title: { it: 'Monkey Mia → Coral Bay', en: 'Monkey Mia → Coral Bay' },
        description: {
          it: "Guida verso Coral Bay (450 km), una delle porte d'accesso al Ningaloo Reef — la barriera corallina più incontaminata dell'Australia, accessibile direttamente dalla spiaggia. Pernottamento in hotel 4 stelle. Due notti.",
          en: "Drive to Coral Bay (450 km), one of the gateways to the Ningaloo Reef — Australia's most pristine coral reef, accessible directly from the beach. Overnight in a 4-star hotel. Two nights.",
        },
      },
      {
        day: 8,
        title: { it: 'Coral Bay — snorkeling al Ningaloo Reef', en: 'Coral Bay — Snorkelling at Ningaloo Reef' },
        description: {
          it: "Giornata libera a Coral Bay: snorkeling direttamente dalla spiaggia tra coralli coloratissimi, razze, tartarughe e pesci tropicali. Il Ningaloo Reef è il posto al mondo dove con più probabilità si può nuotare con lo squalo balena (da marzo a luglio). Pomeriggio libero sulla spiaggia.",
          en: "Free day at Coral Bay: snorkelling directly from the beach among colourful corals, manta rays, sea turtles and tropical fish. Ningaloo Reef is the most accessible place in the world to swim with whale sharks (March–July). Free afternoon on the beach.",
        },
      },
      {
        day: 9,
        title: { it: 'Coral Bay → Exmouth — Cape Range', en: 'Coral Bay → Exmouth — Cape Range' },
        description: {
          it: "Guida verso Exmouth (130 km) e visita al Parco Nazionale di Cape Range: canyon, gorge e spiagge isolate sull'oceano. Yardie Creek Gorge offre una delle poche crociere in barca all'interno di una gorge del Western Australia. Pernottamento a Exmouth in hotel 4 stelle.",
          en: "Drive to Exmouth (130 km) and visit Cape Range National Park: canyons, gorges and isolated beaches on the ocean. Yardie Creek Gorge offers one of Western Australia's few gorge boat cruises. Overnight in Exmouth at a 4-star hotel.",
        },
      },
      {
        day: 10,
        title: { it: 'Exmouth → Karijini National Park', en: 'Exmouth → Karijini National Park' },
        description: {
          it: "Lunga guida verso Karijini National Park (650 km), nel cuore del Pilbara. Le gole rosse di Karijini sono tra le più antiche formazioni geologiche del mondo — rocce di 2,5 miliardi di anni. Tre notti in tenda permanente nel parco.",
          en: "Long drive to Karijini National Park (650 km), in the heart of the Pilbara. Karijini's red gorges are among the world's oldest geological formations — 2.5-billion-year-old rock. Three nights in a permanent tent in the park.",
        },
      },
      {
        day: 11,
        title: { it: 'Karijini — tour organizzato delle gole', en: 'Karijini — Organised Gorge Tour' },
        description: {
          it: "Tour organizzato nel Parco Nazionale di Karijini con pranzo incluso: Dales Gorge, Fortescue Falls (la cascata più grande del Western Australia), Fern Pool, Hancock Gorge e Weano Gorge con Handrail Pool. Nuoto nelle piscine naturali tra le pareti di ferro rosso. Una delle giornate più spettacolari del viaggio.",
          en: "Organised tour of Karijini National Park with lunch included: Dales Gorge, Fortescue Falls (Western Australia's largest waterfall), Fern Pool, Hancock Gorge and Weano Gorge with Handrail Pool. Swimming in natural pools between iron-red walls. One of the most spectacular days of the journey.",
        },
      },
      {
        day: 12,
        title: { it: 'Karijini — giornata libera nelle gole', en: 'Karijini — Free Day in the Gorges' },
        description: {
          it: "Seconda giornata nel parco per esplorare le gole meno frequentate: Knox Gorge, Joffre Falls, Oxer Lookout (punto panoramico dove quattro gole si incontrano). Karijini ha oltre 100 km di percorsi escursionistici con diversi livelli di difficoltà.",
          en: "Second day in the park to explore the less-visited gorges: Knox Gorge, Joffre Falls, Oxer Lookout (the viewpoint where four gorges meet). Karijini has over 100 km of walking trails at various difficulty levels.",
        },
      },
      {
        day: 13,
        title: { it: 'Karijini → Pardoo (510 km)', en: 'Karijini → Pardoo (510 km)' },
        description: {
          it: "Lunga guida (510 km) verso la Pardoo Station, nella zona costiera tra Port Hedland e Broome. Il Pilbara lascia spazio al paesaggio della Kimberley, terra rossa e spinifex. Pernottamento in motel 3 stelle.",
          en: "Long drive (510 km) to Pardoo Station, in the coastal zone between Port Hedland and Broome. The Pilbara gives way to the Kimberley landscape, red earth and spinifex. Overnight in a 3-star motel.",
        },
      },
      {
        day: 14,
        title: { it: 'Pardoo → Broome', en: 'Pardoo → Broome' },
        description: {
          it: "Guida verso Broome (280 km), la capitale della perla dell'Australia, con le sue scogliere ocra a picco sul mare turchese di Cable Beach. Tre notti in hotel 4 stelle.",
          en: "Drive to Broome (280 km), the pearl capital of Australia, with its ochre cliffs towering above the turquoise sea at Cable Beach. Three nights in a 4-star hotel.",
        },
      },
      {
        day: 15,
        title: { it: 'Broome — Cape Leveque tour', en: 'Broome — Cape Leveque Tour' },
        description: {
          it: "Tour organizzato con pranzo incluso a Cape Leveque, la punta più a nord della Penisola di Dampier: scogliere di argilla rossa che cadono verticalmente nel mare azzurro, una delle immagini più iconiche del Western Australia. Lungo la strada, sosta alla Middle Lagoon e visita alla comunità aborigena di Ardyaloon.",
          en: "Organised tour with lunch to Cape Leveque, the northernmost tip of the Dampier Peninsula: red clay cliffs dropping vertically into the blue sea, one of Western Australia's most iconic images. Along the way, stop at Middle Lagoon and visit the Aboriginal community of Ardyaloon.",
        },
      },
      {
        day: 16,
        title: { it: 'Broome — Cable Beach e centro storico', en: 'Broome — Cable Beach and Historic Centre' },
        description: {
          it: "Giornata libera a Broome: Cable Beach (22 km di sabbia bianca, le carovane di cammelli al tramonto), Chinatown storica, il Pearl Luggers Museum sulla storia della perlicultura, il Sun Pictures (il cinema all'aperto più antico del mondo, 1916). Cena a base di barramundi e pesce locale.",
          en: "Free day in Broome: Cable Beach (22 km of white sand, sunset camel caravans), historic Chinatown, the Pearl Luggers Museum on pearling history, Sun Pictures (the world's oldest operating outdoor cinema, 1916). Dinner featuring barramundi and local fish.",
        },
      },
      {
        day: 17,
        title: { it: 'Broome → Halls Creek (690 km)', en: 'Broome → Halls Creek (690 km)' },
        description: {
          it: "Lunga guida nel cuore della Kimberley (690 km): la Great Northern Highway attraversa paesaggi immutati da millenni, terra rossa e boab (baobab australiani). Arrivo a Halls Creek, cittadina di confine nel cuore remoto dell'Australia. Pernottamento in hotel 3,5 stelle.",
          en: "Long drive into the heart of the Kimberley (690 km): the Great Northern Highway crosses landscapes unchanged for millennia, red earth and boab trees (Australian baobabs). Arrival in Halls Creek, a frontier town in the remote heart of Australia. Overnight in a 3.5-star hotel.",
        },
      },
      {
        day: 18,
        title: { it: 'Halls Creek → Kununurra', en: 'Halls Creek → Kununurra' },
        description: {
          it: "Guida verso Kununurra (360 km) nel nord-est della Kimberley. Sosta alle Wolfe Creek Meteor Crater — il secondo cratere meteorico più grande al mondo — e a Lake Argyle, il più grande lago artificiale dell'Australia Occidentale. Due notti a Kununurra in hotel 3,5 stelle.",
          en: "Drive to Kununurra (360 km) in the north-east of the Kimberley. Stop at Wolfe Creek Meteor Crater — the world's second largest meteorite crater — and Lake Argyle, Western Australia's largest artificial lake. Two nights in Kununurra at a 3.5-star hotel.",
        },
      },
      {
        day: 19,
        title: { it: 'Kununurra — Purnululu (Bungle Bungles) in volo panoramico', en: 'Kununurra — Purnululu (Bungle Bungles) Scenic Flight' },
        description: {
          it: "Volo panoramico e tour in 4x4 a Purnululu National Park — le Bungle Bungles: cupole di arenaria a strisce arancioni e nere, formate su 350 milioni di anni, che emergono dalla pianura della Kimberley come una città aliena. Sito Patrimonio dell'Umanità UNESCO. Pranzo incluso.",
          en: "Scenic flight and 4WD tour to Purnululu National Park — the Bungle Bungles: orange and black striped sandstone domes, formed over 350 million years, rising from the Kimberley plain like an alien city. UNESCO World Heritage Site. Lunch included.",
        },
      },
      {
        day: 20,
        title: { it: 'Kununurra → Katherine', en: 'Kununurra → Katherine' },
        description: {
          it: "Attraversamento del confine tra Western Australia e Territorio del Nord. Guida verso Katherine (530 km), la quarta città più grande del Territorio del Nord, porta d'ingresso al Katherine Gorge. Due notti in hotel 3,5 stelle.",
          en: "Crossing the border between Western Australia and the Northern Territory. Drive to Katherine (530 km), the Northern Territory's fourth largest town and gateway to Katherine Gorge. Two nights in a 3.5-star hotel.",
        },
      },
      {
        day: 21,
        title: { it: 'Katherine Gorge — crociera tra le pareti di arenaria', en: 'Katherine Gorge — Cruise Between Sandstone Walls' },
        description: {
          it: "Crociera nel Katherine Gorge (Nitmiluk National Park): 13 gole successive scavate dall'acqua nella pietra arenaria, con pareti verticali di 60 metri, arte rupestre aborigena e coccodrilli d'acqua dolce sulle rive. La crociera naviga nelle prime due o tre gole con cambio in canoa tra una gola e l'altra.",
          en: "Cruise along Katherine Gorge (Nitmiluk National Park): 13 successive gorges carved by water through sandstone, with 60-metre vertical walls, Aboriginal rock art and freshwater crocodiles on the banks. The cruise navigates the first two or three gorges with canoe transfer between gorges.",
        },
      },
      {
        day: 22,
        title: { it: 'Katherine → Kakadu — crociera Yellow Water', en: 'Katherine → Kakadu — Yellow Water Cruise' },
        description: {
          it: "Guida verso il Parco Nazionale di Kakadu (320 km), il più grande parco nazionale d'Australia e doppio Patrimonio UNESCO (naturale e culturale). Tappa alla crociera al tramonto sul Yellow Water Billabong: coccodrilli marini, migliaia di uccelli e i colori infuocati del tramonto tropicale sul territorio Bininj/Mungguy.",
          en: "Drive to Kakadu National Park (320 km), Australia's largest national park and double UNESCO World Heritage site (natural and cultural). Stop for the Yellow Water Billabong sunset cruise: saltwater crocodiles, thousands of birds and the fiery colours of the tropical sunset over the Bininj/Mungguy country.",
        },
      },
      {
        day: 23,
        title: { it: 'Kakadu → Darwin', en: 'Kakadu → Darwin' },
        description: {
          it: "Mattinata a Kakadu: visita ai siti di arte rupestre di Ubirr (pitture aborigene di oltre 20.000 anni) o Nourlangie. Poi guida verso Darwin (250 km), la capitale tropicale del Territorio del Nord. Una notte in hotel 3,5 stelle.",
          en: "Morning in Kakadu: visit to the rock art sites of Ubirr (Aboriginal paintings over 20,000 years old) or Nourlangie. Then drive to Darwin (250 km), the Northern Territory's tropical capital. One night in a 3.5-star hotel.",
        },
      },
      {
        day: 24,
        title: { it: 'Darwin → Kings Canyon (4x4, Mereenie Loop)', en: 'Darwin → Kings Canyon (4WD, Mereenie Loop)' },
        description: {
          it: "Volo Darwin–Alice Springs e ritiro del fuoristrada 4x4. Partenza lungo la Larapinta Drive e poi la Mereenie Loop Road — 150 km di pista non asfaltata attraverso territorio aborigeno (permesso incluso) con cammelli selvatici, dingo e paesaggi del Red Centre. Pernottamento al Kings Canyon Resort in hotel 4 stelle.",
          en: "Flight Darwin–Alice Springs and 4WD pick-up. Drive along Larapinta Drive and then the Mereenie Loop Road — 150 km of unsealed track through Aboriginal territory (permit included) with wild camels, dingoes and Red Centre landscapes. Overnight at Kings Canyon Resort in a 4-star hotel.",
        },
      },
      {
        day: 25,
        title: { it: 'Kings Canyon → Uluru', en: 'Kings Canyon → Uluru' },
        description: {
          it: "All'alba: Kings Canyon Rim Walk (3–4 ore), percorso panoramico sulle pareti rosse del canyon e la pianura del Red Centre. Nel pomeriggio: guida verso Yulara con sosta al Mount Conner Lookout. Arrivo in tempo per il tramonto su Uluru. Due notti in hotel 4 stelle.",
          en: "At dawn: Kings Canyon Rim Walk (3–4 hours), panoramic trail along the canyon's red walls and the Red Centre plain. In the afternoon: drive to Yulara with a stop at Mount Conner Lookout. Arrival in time for sunset over Uluru. Two nights in a 4-star hotel.",
        },
      },
      {
        day: 26,
        title: { it: 'Uluru e Kata Tjuta', en: 'Uluru and Kata Tjuta' },
        description: {
          it: "Alba su Uluru e la Base Walk o il Mala Walk con storie del Tjukurpa (la Legge ancestrale aborigena). Pomeriggio: Kata Tjuta (The Olgas) con il Walpa Gorge Walk tra le 36 cupole rocciose. Sera: Field of Lights di Bruce Munro — installazione luminosa nel deserto.",
          en: "Dawn at Uluru and the Base Walk or Mala Walk with stories of the Tjukurpa (the ancestral Aboriginal Law). Afternoon: Kata Tjuta (The Olgas) with the Walpa Gorge Walk among the 36 rock domes. Evening: Bruce Munro's Field of Lights — luminous art installation in the desert.",
        },
      },
      {
        day: 27,
        title: { it: 'Uluru — ultima alba e volo per Sydney', en: 'Uluru — Final Dawn and Flight to Sydney' },
        description: {
          it: "Ultima alba su Uluru, poi visita al Uluru-Kata Tjuta Cultural Centre per approfondire la cultura Anangu. Consegna del 4x4 e volo Ayers Rock–Sydney. Trasferimento in hotel 3,5 stelle. Tre notti a Sydney.",
          en: "Final dawn at Uluru, then visit to the Uluru-Kata Tjuta Cultural Centre to deepen understanding of Anangu culture. 4WD drop-off and flight Ayers Rock–Sydney. Transfer to a 3.5-star hotel. Three nights in Sydney.",
        },
      },
      {
        day: 28,
        title: { it: 'Sydney — crociera nel porto con pranzo', en: 'Sydney — Harbour Cruise with Lunch' },
        description: {
          it: "Crociera panoramica nel porto di Sydney con pranzo a buffet incluso: Opera House, Harbour Bridge, la baia di Mosman, le spiagge di Manly e i promontori di Georges Head da prospettiva acquatica. Pomeriggio libero per Circular Quay, The Rocks e Darling Harbour.",
          en: "Panoramic Sydney Harbour cruise with buffet lunch included: Opera House, Harbour Bridge, Mosman Bay, Manly beaches and Georges Head promontories from the water. Free afternoon at Circular Quay, The Rocks and Darling Harbour.",
        },
      },
      {
        day: 29,
        title: { it: 'Sydney — giornata libera', en: 'Sydney — Free Day' },
        description: {
          it: "Giornata libera a Sydney: Bondi Beach e la Bondi to Coogee Walk, Taronga Zoo, Blue Mountains (1 ora dalla città con canyon e cascate), visita all'Opera House o semplicemente una passeggiata nei Royal Botanic Gardens con vista sulla baia.",
          en: "Free day in Sydney: Bondi Beach and the Bondi to Coogee Walk, Taronga Zoo, Blue Mountains (1 hour from the city with canyons and waterfalls), an Opera House visit, or simply a stroll through the Royal Botanic Gardens with bay views.",
        },
      },
      {
        day: 30,
        title: { it: 'Sydney — seconda giornata libera', en: 'Sydney — Second Free Day' },
        description: {
          it: "Seconda giornata libera a Sydney per esplorare i quartieri più interessanti: Paddington con le sue case vittoriane e le gallerie d'arte, Surry Hills con i migliori ristoranti della città, o Manly e le Northern Beaches per gli amanti del mare.",
          en: "Second free day in Sydney to explore the most interesting neighbourhoods: Paddington with its Victorian terraces and art galleries, Surry Hills with the city's best restaurants, or Manly and the Northern Beaches for sea lovers.",
        },
      },
      {
        day: 31,
        title: { it: 'Partenza da Sydney', en: 'Departure from Sydney' },
        description: {
          it: "Transfer libero all'aeroporto internazionale di Sydney e volo di rientro verso l'Italia. Fine dei servizi inclusi nel pacchetto. Il road trip più lungo d'Australia si conclude qui, dopo 31 giorni di natura remota, cultura aborigena e paesaggi indimenticabili.",
          en: "Free transfer to Sydney International Airport and return flight to Italy. End of included package services. Australia's longest road trip ends here, after 31 days of remote nature, Aboriginal culture and unforgettable landscapes.",
        },
      },
    ],
    included: {
      it: [
        'Tutti i pernottamenti come da itinerario',
        'Auto a noleggio Perth–Darwin (All Inclusive, km illimitati)',
        'Fuoristrada 4x4 Alice Springs–Ayers Rock (All Inclusive, km illimitati)',
        'Tour organizzato François Peron National Park in 4x4',
        'Tour organizzato Karijini National Park (pranzo incluso)',
        'Tour organizzato Cape Leveque (pranzo incluso)',
        'Tour panoramico e 4x4 Purnululu/Bungle Bungles (pranzo incluso)',
        'Crociera Katherine Gorge',
        'Crociera al tramonto Yellow Water Billabong (Kakadu)',
        'Field of Lights — Uluru',
        'Crociera panoramica Sydney Harbour (pranzo a buffet incluso)',
        'SIM australiana con credito',
        'Assistenza in loco in lingua italiana (telefono e chat)',
        'Permesso Mereenie Loop Road',
      ],
      en: [
        'All accommodation as per itinerary',
        'Perth–Darwin car rental (All Inclusive, unlimited km)',
        'Alice Springs–Ayers Rock 4WD rental (All Inclusive, unlimited km)',
        'François Peron National Park organised 4WD tour',
        'Karijini National Park organised tour (lunch included)',
        'Cape Leveque organised tour (lunch included)',
        'Purnululu/Bungle Bungles scenic flight and 4WD tour (lunch included)',
        'Katherine Gorge cruise',
        'Yellow Water Billabong sunset cruise (Kakadu)',
        'Field of Lights — Uluru',
        'Sydney Harbour panoramic cruise (buffet lunch included)',
        'Australian SIM card with credit',
        'Italian-language on-site assistance (phone and chat)',
        'Mereenie Loop Road permit',
      ],
    },
    notIncluded: standardNotIncluded,
  },
];
