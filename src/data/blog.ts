export interface BlogSection {
  id: string;
  title: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { it: string; en: string };
  excerpt: { it: string; en: string };
  category: { it: string; en: string };
  image: string;
  date: string;
  content: {
    it: {
      intro: string;
      sections: BlogSection[];
    };
    en: {
      intro: string;
      sections: BlogSection[];
    };
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 'guida-australia',
    slug: 'guida-viaggio-australia',
    title: {
      it: `Australia: La Guida Completa al Down Under`,
      en: `Australia: The Complete Guide to Down Under`,
    },
    excerpt: {
      it: `Tutto quello che devi sapere per un viaggio indimenticabile in Australia: visti, trasporti, clima e consigli pratici.`,
      en: `Everything you need to know for an unforgettable trip to Australia: visas, transport, climate and practical advice.`,
    },
    category: { it: `Guide Destinazioni`, en: `Destination Guides` },
    image: '/images/dest-australia.png',
    date: '2026-03-03',
    content: {
      it: {
        intro: `L’Australia è il sesto paese più grande al mondo che si trova tra l’Oceano Indiano e il Pacifico. Le incalcolabili bellezze dell’Australia la rendono una meta ideale per una vacanza indimenticabile, divertente ed eccitante, sempre all’insegna della scoperta e dell’avventura.

Parchi nazionali, foreste pluviali nate migliaia di anni fa, stupende spiagge bianche che incantano e permettono un gran numero di attività all’aperto, i magnifici colori dell’entroterra australiano con l’indimenticabile Ayers Rock, la cultura aborigena e molto altro ancora fanno dell’Australia una delle mete predilette dai viaggiatori di tutto il mondo.

Sempre nuova ed improntata alla scoperta è la visita dei centri urbani: da Sydney a Melbourne, da Darwin a Hobart, Brisbane, Perth, Cairns, Adelaide e Canberra. Un’avventura unica… Così l’Australia entrerà a far parte della vostra realtà e non sarà più solo la “lontana terra dove vivono i canguri e i koala”.`,
        sections: [
          {
            id: 'documenti',
            title: 'DOCUMENTI E VISTI',
            content: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. Oltre al passaporto è obbligatorio ottenere un visto d’ingresso. Il visto turistico “elettronico” (ETA Electronic Travel Authority) è gratuito e si puo’ ottenere on-line accedendo al sito dell’ufficio del governo Australiano: www.australia.gov.au/

DOGANA: Esistono forti restrizioni sull’importazione di generi alimentari, prodotti naturali e attrezzature sportive e altro. Informatevi prima di partire direttamente sul sito del governo australiano: www.australia.gov.au/information-and-services/passports-and-travel/customs-and-quarantine`,
          },
          {
            id: 'quando-andare',
            title: 'QUANDO ANDARE E CLIMA',
            content: `L’Australia si trova a sud dell’equatore, quindi le stagioni sono invertite rispetto all’Europa: l’estate va da dicembre a marzo e l’inverno da giugno a settembre. Caratterizzata da diverse zone climatiche: clima temperato (Sydney, Melbourne), desertico (centro), tropicale (Queensland) ed equatoriale (estremo nord).

CLIMA: In Australia le stagioni sono l’opposto di quelle europee. Quando fa freddo nelle regioni meridionali, in quelle settentrionali e centrali si sta molto bene e si evita la stagione delle piogge (da fine Novembre a fine Febbraio).

Le stagioni australiane sono:
Primavera: da settembre a novembre
Estate: da dicembre a febbraio
Autunno: da marzo a maggio
Inverno: da giugno ad agosto`,
          },
          {
            id: 'trasporti',
            title: 'TRASPORTI LOCALI',
            content: `L’Australia è un paese enorme, ma spostarsi al suo interno è molto semplice.

AEREO: Il modo migliore per coprire le lunghe distanze. Qantas, Virgin Australia, Jetstar, Tiger Airways, Rex e Airnorth servono tutte le capitali e molte città regionali. La concorrenza garantisce tariffe convenienti se si prenota in anticipo.

AUTOBUS: Comodi ed efficienti. La linea Greyhound offre biglietti “hop-on hop off” per i circuiti più famosi, flessibili in base ai chilometri da percorrere.

AUTO: Vasta rete di strade ben mantenute. Percorsi consigliati: Great Ocean Road, Kangaroo Island, Red Center, costa Brisbane-Cairns, Northern Territory (Kakadu, Litchfield). Necessaria patente internazionale o traduzione certificata. Guida a sinistra. Sconsigliato guidare dopo il tramonto in zone remote.

TRENO: Modo comodo e panoramico. TrainLink, V-Line, Queensland Rail e TransWA. Viaggi spettacolari: Indian Pacific (Sydney-Perth) e il leggendario Ghan (Adelaide-Darwin).

TRAGHETTO: Spirit of Tasmania (Melbourne-Devonport), SeaLink (Kangaroo Island), Rottnest Express (Perth) e traghetti urbani a Sydney e Brisbane.

DISABILITÀ: Aerei, treni, autobus e traghetti sono tutti accessibili. Gli aeroporti forniscono servizi di assistenza completi.`,
          },
          {
            id: 'lingua-moneta',
            title: 'MONETA E LINGUA',
            content: `MONETA LOCALE: Dollaro australiano (AUD). Carte di credito (Visa, MasterCard, Amex) ampiamente accettate. Più conveniente acquistare dollari in Italia prima della partenza.

LINGUA: La lingua ufficiale è l’inglese. Nazione multiculturale con varie lingue e culture diffuse.`,
          },
          {
            id: 'abbigliamento',
            title: 'ABBIGLIAMENTO CONSIGLIATO',
            content: `Informale e confortevole. Scarpe da trekking, cappellino, felpa e giacca a vento leggera. Abbigliamento a strati essenziale. Il sole è molto forte: utilizzare creme solari ad alta protezione e occhiali da sole.`,
          },
          {
            id: 'elettricita',
            title: 'ELETTRICITÀ',
            content: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee, disponibile in aeroporti e hotel.`,
          }
        ]
      },
      en: {
        intro: `Australia is the world's sixth-largest country guide.`,
        sections: [{ id: 'docs', title: 'DOCUMENTS', content: 'Passport and ETA required.' }]
      }
    }
  },
  {
    id: 'guida-nuova-zelanda',
    slug: 'guida-viaggio-nuova-zelanda',
    title: {
      it: `Nuova Zelanda: Tutto quello che devi sapere`,
      en: `New Zealand: Everything you need to know`,
    },
    excerpt: {
      it: `Una guida completa sulla Nuova Zelanda: documenti, clima, trasporti e consigli per vivere al meglio la Terra di Mezzo.`,
      en: `A complete guide to New Zealand: documents, climate, transport and tips to best experience Middle-earth.`,
    },
    category: { it: `Guide Destinazioni`, en: `Destination Guides` },
    image: '/images/blog-nz.jpg',
    date: '2026-03-03',
    content: {
      it: {
        intro: `La Nuova Zelanda, costituita principalmente da due isole, l’Isola del Nord e l’Isola del Sud, è un paese di rara bellezza e varietà paesaggistica: montagne glaciali, lunghe spiagge deserte, fiumi impetuosi, laghi limpidi e profondi, vulcani e geyser, fanghi ribollenti. Tra felci e piante di mimosa, numerosi sono i parchi nazionali dove cogliere le migliori ricchezze naturalistiche del Paese. Attraverso la protezione delle specie, all’interno dei parchi forestali e delle riserve marine, la Nuova Zelanda è riuscita a conservare molti esemplari unici per l’ecosistema, tra cui il kiwi, l’uccello simbolo del Paese.

Gli amanti dell’avventura potranno cimentarsi in tutti i generi di dinamiche attività all’aperto: escursioni, sci, trekking, rafting e, naturalmente, lo sport preferito di sempre, il bungee jumping (salto con l’elastico). Potrete nuotare con i delfini, osservare le balene o pescare grasse trote nei numerosi torrenti. Con un viaggio in Nuova Zelanda conoscerete quelle terre da favola che hanno animato la storia del Signore degli anelli, ossia la “terra di mezzo”.

La gente del posto, depositaria di una cultura che fonde insieme l’eredità europea con quella maori, è ingegnosa, premurosa e incredibilmente affabile. Viaggiare in Nuova Zelanda (in aereo, autobus, treno, automobile o camper) è semplice e veloce. Anche per il soggiorno ci sono opportunità varie ed economiche. E la promessa di delizie gastronomiche a base di cacciagione, frutti di mare freschi, squisito gelato e vini da primo premio dovrebbe essere sufficiente a far venire l’acquolina in bocca.`,
        sections: [
          {
            id: 'documenti',
            title: 'DOCUMENTI E VISTI',
            content: `È necessario avere un passaporto con validità residua di almeno sei mesi dopo la data di ritorno. A partire dal 1 Ottobre 2019 è obbligatorio ottenere un visto d’ingresso NzeTA (New Zealand Electronic Travel Authority) e pagare l’International Visitor Conservation and Tourism Levy (IVL).

Per ulteriori informazioni visitate il sito dell’immigrazione della Nuova Zelanda:
www.immigration.govt.nz/new-zealand-visas/options/visit`,
          },
          {
            id: 'quando-andare',
            title: 'QUANDO ANDARE?',
            content: `La Nuova Zelanda si presta ad essere visitata durante tutto l’anno, anche se il periodo migliore per viaggiare in Nuova Zelanda va da novembre a marzo, che coincide con la nostra primavera-estate, per godere di temperature gradevoli e clima più secco. Vanno bene anche ottobre ed aprile, anche se le temperature sono un po’ più fresche e c’è qualche giornata annuvolata ed umida in più. Negli altri mesi dell’anno tenete presente che le precipitazioni potrebbero essere più frequenti e che potrebbe nevicare in alcune zone.`,
          },
          {
            id: 'clima',
            title: 'CLIMA',
            content: `Il clima è della Nuova Zelanda influenzato dalle acque dell’oceano che le stanno intorno. Ha un clima temperato con inverni non eccessivamente freddi ed estati non eccessivamente calde, ma le precipitazioni cadono costanti, e a tratti abbondanti, tutto l’anno.
            
Premettendo che le stagioni sono invertite rispetto alle nostre, durante l’inverno da giugno ad agosto le precipitazioni sono molto più intense in quasi tutto il paese e nei rilievi montuosi cade spesso la neve, mentre i mesi meno piovosi sono quelli estivi tra ottobre ed aprile.

Le condizioni climatiche cambiano molto tra l’Isola del Sud e l’Isola del Nord. La prima ha temperature più fresche e precipitazioni più abbondanti nella costa occidentale, un clima più secco invece nella costa orientale, la regione meno piovosa della Nuova Zelanda. Nell’Isola del Nord le precipitazioni sono abbondanti e ben distribuite durante tutto l’arco dell’anno. La città di Auckland nell’Isola del Nord è la più piovosa del Paese.

L’acqua del mare è più calda durante l’estate, specialmente da dicembre a febbraio, nell’Isola del Nord; mentre al sud le temperature in immersione sono molto più rigide, mediamente intorno ai 12°C all’estremo sud.`,
          },
          {
            id: 'trasporti',
            title: 'TRASPORTI LOCALI',
            content: `La Nuova Zelanda è un paese tranquillo ed in genere molto sicuro, spostarsi al suo interno è molto semplice e ci sono diversi modi per farlo.

AEREO: Adatto se si ha poco tempo a disposizione o/e se ci si vuole spostare dall’Isola del Nord a quella del Sud e viceversa. Air New Zealand e Qantas collegano le principali aree urbane. Barrier Air, Stewart Island Flights e Air Chathams servono le isole minori.

PULMAN: Viaggi comodi, efficienti e a prezzi ragionevoli. Mezzi con aria condizionata, sedili reclinabili e wi-fi. Possibilità di Travel Pass valido 12 mesi per viaggiare liberamente.

AUTO: Distanze brevi e strade in buone condizioni (tranne traffico ad Auckland). Strade collinose e ventose. Limite 50km/h in città, 100km/h su autostrade. Guida a sinistra. Necessaria patente internazionale o traduzione certificata. Età minima 21 anni.

TRENO: Rotte limitate ma veloci e confortevoli. Percorsi spettacolari: TranzAlpine (Christchurch-Greymouth), Northern Explorer (Wellington-Auckland) e Coastal Pacific.

TRAGHETTO: Interislander tra Wellington e Picton. Navi per Hauraki Gulf da Auckland e per Stewart Island (Bluff-Oban).`,
          },
          {
            id: 'lingua-moneta',
            title: 'MONETA E LINGUA',
            content: `MONETA LOCALE: Dollaro neozelandese (NZD). Carte di credito ampiamente accettate. Consigliati contanti per i parchi nazionali.

LINGUA: Lingua ufficiale l’inglese. Nazione multiculturale con influenze Maori diffuse.`,
          },
          {
            id: 'abbigliamento',
            title: 'ABBIGLIAMENTO CONSIGLIATO',
            content: `Informale e confortevole. Scarpe da trekking, felpa, giacca a vento impermeabile. Abbigliamento a strati essenziale: il tempo può variare spesso, vivendo "quattro stagioni in un giorno".`,
          },
          {
            id: 'elettricita',
            title: 'ELETTRICITÀ',
            content: `Corrente a 220-240 volts, AC 50Hz. Necessario adattatore per spine europee.`,
          }
        ]
      },
      en: {
        intro: `New Zealand guide.`,
        sections: [{ id: 'docs', title: 'DOCUMENTS', content: 'NzeTA required.' }]
      }
    }
  },
  {
    id: 'squali-balena-australia',
    slug: 'nuotare-con-gli-squali-balena-australia',
    title: {
      it: `Incontra i Giganti del Mare: Nuotare con gli Squali Balena in Australia`,
      en: `Meet the Giants of the Sea: Swimming with Whale Sharks in Australia`,
    },
    excerpt: {
      it: `Un'esperienza che ti toccherà l'anima: nuotare a fianco degli squali balena nelle acque cristalline del Western Australia.`,
      en: `An experience that will touch your soul: swimming alongside whale sharks in the crystal-clear waters of Western Australia.`,
    },
    category: { it: `Esperienze`, en: `Experiences` },
    image: '/images/blog-squali.jpg',
    date: '2026-02-10',
    content: {
      it: {
        intro: `Immagina di scivolare nelle acque cristalline dell'Ovest Australia dove il silenzio è rotto solo dal tuo respiro e dal movimento ritmico delle tue braccia. Mentre ti immergi più a fondo, la maestosa ombra di uno squalo balena emerge dalla distanza e si avvicina con una calma sovrannaturale.

Nuotare con gli squali balena, questi gentili giganti, è un'esperienza che ti toccherà l'anima, un incontro ravvicinato che ti farà sentire parte di un mondo antico e misterioso. È un momento di connessione con la natura australiana e un ricordo del tuo viaggio in Australia che rimarrà impresso nel tuo cuore per sempre.`,
        sections: [
          {
            id: 'dove-quando',
            title: 'DOVE E QUANDO',
            content: `Ningaloo Reef, Western Australia: La stagione degli squali balena va da marzo a luglio, con il picco ad aprile-maggio. Exmouth e Coral Bay sono i principali punti di partenza per le escursioni.

Ningaloo Reef è uno dei pochi posti al mondo dove è possibile nuotare con questi giganti in modo prevedibile ogni anno. La barriera corallina è dichiarata Patrimonio dell'Umanità UNESCO.`,
          },
          {
            id: 'cosa-aspettarsi',
            title: "COS'ASPETTARSI",
            content: `Gli squali balena (Rhincodon typus) sono i pesci più grandi del mondo, ma completamente innocui per l'uomo — si nutrono esclusivamente di plancton.

Le escursioni durano in genere mezza giornata. Una guida specializzata si immerge con te e ti mostra come avvicinarti in sicurezza. È richiesta la capacità di snorkeling di base; non serve essere sub esperti.`,
          },
          {
            id: 'come-prenotare',
            title: 'COME PRENOTARE',
            content: `I tour vanno prenotati con largo anticipo, specialmente per la alta stagione (aprile-maggio). Contatta il nostro team: organizziamo l'esperienza all'interno di un itinerario personalizzato nel Western Australia, abbinando l'incontro con gli squali balena ad altre meraviglie di questa regione unica.`,
          },
        ],
      },
      en: {
        intro: `Imagine gliding through the crystal-clear waters of Western Australia where the silence is broken only by your breathing and the rhythmic movement of your arms. As you dive deeper, the majestic shadow of a whale shark emerges from the distance, approaching with supernatural calm.

Swimming with whale sharks, these gentle giants, is an experience that will touch your soul — a close encounter that will make you feel part of an ancient and mysterious world. It is a moment of connection with Australian nature and a memory of your trip to Australia that will remain etched in your heart forever.`,
        sections: [
          {
            id: 'dove-quando',
            title: 'WHERE AND WHEN',
            content: `Ningaloo Reef, Western Australia: Whale shark season runs from March to July, peaking in April-May. Exmouth and Coral Bay are the main departure points for excursions.

Ningaloo Reef is one of the few places in the world where you can predictably swim with these giants every year. The coral reef is a UNESCO World Heritage Site.`,
          },
          {
            id: 'cosa-aspettarsi',
            title: 'WHAT TO EXPECT',
            content: `Whale sharks (Rhincodon typus) are the largest fish in the world, but completely harmless to humans — they feed exclusively on plankton.

Excursions generally last half a day. A specialist guide dives with you and shows you how to approach safely. Basic snorkelling ability is required; you don't need to be an experienced diver.`,
          },
          {
            id: 'come-prenotare',
            title: 'HOW TO BOOK',
            content: `Tours should be booked well in advance, especially for peak season (April-May). Contact our team: we organise the experience within a personalised itinerary in Western Australia, combining the whale shark encounter with other wonders of this unique region.`,
          },
        ],
      },
    },
  },
  {
    id: 'hobbiton-contea-esiste',
    slug: 'hobbiton-la-contea-esiste',
    title: {
      it: `Hobbiton: la "Contea" Esiste!`,
      en: `Hobbiton: The "Shire" Really Exists!`,
    },
    excerpt: {
      it: `Il set cinematografico di Hobbiton in Nuova Zelanda è un'esperienza magica per tutti gli appassionati de Il Signore degli Anelli e Lo Hobbit.`,
      en: `The Hobbiton movie set in New Zealand is a magical experience for all fans of The Lord of the Rings and The Hobbit.`,
    },
    category: { it: `Esperienze`, en: `Experiences` },
    image: '/images/blog-hobbiton.jpg',
    date: '2026-01-20',
    content: {
      it: {
        intro: `Il tour Hobbiton Movie Set è un'esperienza interessante e divertente per tutti gli appassionati della Trilogia di The Lord of The Rings e The Hobbit. La tua guida ti accompagnerà sul famoso set cinematografico di 12 acri, mostrandoti i dettagli intricati, indicando i luoghi più famosi e spiegando come è stata creata la magia dei film.

Innamorati della fattoria di ovini e di manzo della famiglia Alexander, proprio come ha fatto l'acclamato regista Sir Peter Jackson, delle buche Hobbit, del Mulino e della famosa Green Dragon Inn, dove è possibile concedersi delle esclusive bevande.`,
        sections: [
          {
            id: 'dove-quando',
            title: 'DOVE SI TROVA',
            content: `Matamata, Isola del Nord, Nuova Zelanda: Il set si trova a circa 2 ore da Auckland e 1 ora da Rotorua. È raggiungibile in auto o con tour organizzati da entrambe le città.

La fattoria Alexander, su cui è costruito il set, è ancora un'azienda agricola funzionante — il che rende il tutto ancora più autentico e affascinante.`,
          },
          {
            id: 'cosa-aspettarsi',
            title: "COS'ASPETTARSI",
            content: `Il tour dura circa 2 ore e si svolge a piedi attraverso il set. Vedrai le 44 buche Hobbit originali, i giardini curati, il Mulino sul laghetto e naturalmente la Green Dragon Inn.

Il tour si conclude con una bevanda inclusa alla Green Dragon Inn — birra artigianale, sidro o una bevanda analcolica. Le visite sono solo guidate, non è possibile esplorare da soli.`,
          },
          {
            id: 'come-prenotare',
            title: 'COME INSERIRLO NEL TUO VIAGGIO',
            content: `Hobbiton si inserisce perfettamente in un itinerario sull'Isola del Nord neozelandese. Noi di Progetto Australia lo inseriamo spesso negli itinerari tra Auckland e Rotorua, abbinandolo alla visione del set al tramonto per un'atmosfera davvero magica.

Contattaci per creare il tuo viaggio su misura in Nuova Zelanda.`,
          },
        ],
      },
      en: {
        intro: `The Hobbiton Movie Set tour is an interesting and fun experience for all fans of The Lord of the Rings and The Hobbit trilogy. Your guide will take you around the famous 12-acre movie set, showing you the intricate details, pointing out the most famous locations and explaining how the magic of the films was created.

Fall in love with the Alexander family's sheep and beef farm, just as acclaimed director Sir Peter Jackson did, the Hobbit holes, the Mill and the famous Green Dragon Inn, where you can enjoy exclusive beverages.`,
        sections: [
          {
            id: 'dove-quando',
            title: 'WHERE IS IT',
            content: `Matamata, North Island, New Zealand: The set is located about 2 hours from Auckland and 1 hour from Rotorua. It can be reached by car or with organised tours from both cities.

The Alexander farm, on which the set is built, is still a working farm — which makes everything even more authentic and fascinating.`,
          },
          {
            id: 'cosa-aspettarsi',
            title: 'WHAT TO EXPECT',
            content: `The tour lasts about 2 hours and takes place on foot through the set. You will see the original 44 Hobbit holes, the manicured gardens, the Mill on the pond and of course the Green Dragon Inn.

The tour concludes with a complimentary drink at the Green Dragon Inn — craft beer, cider or a non-alcoholic beverage. Visits are guided only; you cannot explore on your own.`,
          },
          {
            id: 'come-prenotare',
            title: 'HOW TO INCLUDE IT IN YOUR TRIP',
            content: `Hobbiton fits perfectly into a North Island New Zealand itinerary. At Progetto Australia we often include it in itineraries between Auckland and Rotorua, combining the set visit at sunset for a truly magical atmosphere.

Contact us to create your tailor-made trip to New Zealand.`,
          },
        ],
      },
    },
  },
];
