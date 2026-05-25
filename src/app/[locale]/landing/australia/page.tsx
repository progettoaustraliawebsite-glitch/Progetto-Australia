'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { Check, Star, ArrowRight, Clock, Users, HeadphonesIcon, ChevronDown } from 'lucide-react';
import { itineraries } from '@/data/itineraries';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED_ITINERARIES = [
  {
    slug: 'australia-self-drive',
    title: 'Australia Self-Drive',
    description:
      "L'Australia è un paese perfetto per viaggiare in libertà con auto a noleggio. Strade sicure, fauna unica e paesaggi mozzafiato da Perth a Cairns.",
    duration: 18,
    price: 1790,
    image: '/images/itin-self-drive.jpg',
    tag: 'Più richiesto',
    highlights: ['Rottnest Island', 'Kangaroo Island', 'Uluru', 'Great Barrier Reef'],
  },
  {
    slug: 'australia-on-the-road-isole-cook',
    title: 'Australia + Isole Cook',
    description:
      'Un viaggio indimenticabile che unisce le meraviglie australiane alle acque turchesi del Pacifico Sud, con soste nelle isole più belle del mondo.',
    duration: 24,
    price: 2850,
    image: '/images/itin-au-cook.jpg',
    tag: 'Consigliato',
    highlights: ['Sydney', 'Uluru', 'Cairns', 'Rarotonga'],
  },
  {
    slug: 'australia-rossa-selvaggia',
    title: 'Australia Rossa e Selvaggia',
    description:
      'Il viaggio più completo per scoprire l\'Australia da ovest a est: Perth, Broome, Darwin, Kakadu, Uluru e la Costa Est fino a Cairns.',
    duration: 31,
    price: 3470,
    image: '/images/itin-western-au.jpg',
    tag: 'Avventura',
    highlights: ['Perth', 'Broome', 'Kakadu', 'Uluru'],
  },
  {
    slug: 'magica-australia',
    title: 'Magica Australia Luxury',
    description:
      'Strutture deluxe immerse nella natura: Great Ocean Road, Kangaroo Island in lodge 5 stelle, Kakadu e cena nel deserto sotto le stelle.',
    duration: 23,
    price: 5980,
    image: '/images/itin-magica-au.jpg',
    tag: 'Luxury',
    highlights: ['Great Ocean Road', 'Kangaroo Island', 'Kakadu', 'Uluru'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Claudia e Alberto',
    photo: '/images/testimonials/claudia-alberto.jpg',
    trip: 'Australia – 20 giorni in self-drive',
    title: 'Non avremmo potuto fare scelta migliore',
    text: 'Siamo abituati a viaggiare in autonomia ma questa volta abbiamo demandato ad un\'agenzia. Non avremmo potuto fare una scelta migliore! Professionisti che conoscono perfettamente il territorio e riescono in poco tempo a cucirti un itinerario perfetto per le tue esigenze. Consigliamo al 100%!',
    rating: 5,
    platform: 'Facebook',
  },
  {
    name: 'Alessio, Lara e Mirco',
    photo: undefined,
    trip: 'Australia in famiglia',
    title: 'Organizzato alla perfezione, anche col bimbo',
    text: 'Viaggio molto impegnativo perché avevamo un bimbo di 3 anni, ma siamo stati accontentati per tutte le tappe che avevamo chiesto, organizzato davvero bene sia come tempistiche, spostamenti, location e veicoli. L\'agente locale Daria sempre disponibile. Grazie veramente.',
    rating: 5,
    platform: 'Sito ufficiale',
  },
  {
    name: 'Raffaella e Francesco',
    photo: '/images/testimonials/raffaella-francesco.jpg',
    trip: 'Australia – Tasmania',
    title: 'Non ci hanno mai fatto sentire soli',
    text: 'Il nostro viaggio ha soddisfatto pienamente le nostre aspettative, ci ha permesso di conoscere una natura meravigliosa. Ottime le sistemazioni scelte. Tutto ha funzionato perfettamente, con la presenza costante ed attenta di Antonio.',
    rating: 5,
    platform: 'Sito ufficiale',
  },
  {
    name: 'Marco e Silvia',
    photo: undefined,
    trip: 'Australia – 24 giorni con bambini',
    title: 'Tutto organizzato alla perfezione',
    text: 'Abbiamo viaggiato con due bambini piccoli e ogni trasferimento, ogni hotel, ogni attività era già pronto. Non abbiamo dovuto pensare a nulla. Consigliatissimi.',
    rating: 5,
    platform: 'Sito ufficiale',
  },
  {
    name: 'Giovanna',
    photo: undefined,
    trip: 'Australia – self drive 18 giorni',
    title: 'Risposta immediata anche durante il viaggio',
    text: 'Ho avuto un piccolo problema con il noleggio auto a Perth e Daria ha risolto tutto in 20 minuti. Questo è il vero servizio — non solo organizzare, ma esserci quando hai bisogno.',
    rating: 5,
    platform: 'Facebook',
  },
];

const FAQS = [
  {
    q: 'Il preventivo è davvero gratuito e senza impegno?',
    a: 'Sì, completamente. Ricevi un itinerario personalizzato entro 24 ore, costruito dal nostro team a Brisbane. Non ci sono costi, non c\'è nessun obbligo di prenotare.',
  },
  {
    q: 'Quando è il periodo migliore per visitare l\'Australia?',
    a: 'Il periodo ideale è da ottobre ad aprile (estate australe). Il clima è ottimo su tutta la costa est e nell\'entroterra. Giugno-agosto è perfetto per il Nord (Darwin, Kakadu) e per l\'Outback.',
  },
  {
    q: 'I prezzi indicati cosa includono?',
    a: 'I prezzi indicati coprono pernottamenti, alcune colazioni, trasferimenti locali e le attività specificate nell\'itinerario. Non includono voli internazionali, assicurazione di viaggio e spese personali.',
  },
  {
    q: 'Come avviene il pagamento?',
    a: 'Nessun pagamento anticipato fino alla conferma dell\'itinerario. Una volta approvato il piano di viaggio, la caparra è del 30% del totale. Il saldo viene versato 60 giorni prima della partenza.',
  },
  {
    q: 'Posso modificare l\'itinerario dopo il preventivo?',
    a: 'Assolutamente sì. Il preventivo è un punto di partenza — lo affiniamo insieme con tutte le revisioni necessarie, senza costi aggiuntivi.',
  },
  {
    q: 'Siete un\'agenzia certificata?',
    a: 'Sì. Operiamo in conformità con la normativa italiana e australiana nel settore del turismo. Il nostro team vive e lavora a Brisbane da oltre 15 anni.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= count ? '#F59E0B' : 'none'}
          stroke={s <= count ? '#F59E0B' : '#D1D5DB'}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingAustralia() {
  const router = useRouter();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white font-sans pb-24 lg:pb-0">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm h-16 flex items-center px-6">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <Link href="/it" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Progetto Australia" width={140} height={40} className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center">
        <Image
          src="/images/hero-sydney.jpg"
          alt="Sydney, Australia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#F59E0B" stroke="#F59E0B" />)}
              </div>
              <span className="text-white/90 text-xs font-sans">4.8/5 · 15 anni di esperienza · 2.000+ viaggiatori</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Viaggi Su Misura in Australia<br />
              <span className="text-gold">con Esperti Italiani</span>
            </h1>

            <p className="text-white/85 text-lg md:text-xl font-sans mb-10 leading-relaxed">
              Pianifica il tuo itinerario personalizzato con il nostro team a Brisbane.
              Consulenza gratuita, risposta entro 24 ore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                type="button"
                onClick={() => router.push('/quote')}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-lg px-8 py-4 rounded-full transition-colors shadow-lg"
              >
                Richiedi il Tuo Preventivo Gratuito
                <ArrowRight size={20} />
              </button>
            </div>

            <p className="mt-5 text-white/60 text-sm font-sans">
              Consulenza gratuita · Risposta entro 24h · Nessun impegno
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={28} className="text-gold" />,
                title: 'Itinerari 100% personalizzati',
                desc: 'Ogni viaggio è costruito attorno a te: tappe, ritmi, budget e desideri. Nessun tour di gruppo, nessun pacchetto fisso.',
              },
              {
                icon: <HeadphonesIcon size={28} className="text-gold" />,
                title: 'Esperti italiani a Brisbane',
                desc: 'Il nostro team vive in Australia. Conoscenza sul campo, aggiornata in tempo reale — non da catalogo.',
              },
              {
                icon: <Check size={28} className="text-gold" />,
                title: 'Assistenza durante il viaggio',
                desc: 'Sei in Australia e hai un problema? Il tuo consulente risponde. Sempre. Per tutta la durata del tuo viaggio.',
              },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-6">
                <div className="w-14 h-14 rounded-full bg-stone-50 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-hero">{p.title}</h3>
                <p className="text-stone-500 text-base leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 bg-stone-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Chi siamo
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-4">
              Il team che ti segue dall'Italia all'Australia
            </h2>
            <p className="text-stone-500 text-base max-w-xl mx-auto">
              Non agenti da ufficio — persone che vivono in Australia da anni e conoscono ogni dettaglio del territorio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sara Trezzi',
                role: 'Fondatrice & Itinerari',
                photo: '/images/team/sara.jpg',
                bio: "Viaggiare è sempre stato il filo conduttore della mia vita. Dopo anni in Australia e Nuova Zelanda, ho deciso di trasformare questa esperienza in una professione. Dal 2016 creo itinerari su misura per viaggiatori che vogliono vivere davvero questo continente — con il ritmo giusto e l'equilibrio perfetto.",
                tag: 'Dal 2016 · Itinerari Australia & NZ',
              },
              {
                name: 'Norma',
                role: 'Assistenza in loco · East Coast',
                photo: '/images/team/norma.jpg',
                bio: 'Sarda di nascita, cittadina del mondo per scelta. Dopo Germania, Spagna, Stati Uniti e Messico — dove ha gestito business nel turismo e si è laureata in Psicologia — ha scelto l\'Australia per crescere i suoi figli. Da oltre 12 anni sulla East Coast australiana.',
                tag: '12+ anni · East Coast Australia',
              },
              {
                name: 'Antonio Elia Tucci',
                role: 'Assistenza in loco · Pacchetti completi',
                photo: '/images/team/antonio.jpg',
                bio: 'Napoletano, in Australia da oltre 6 anni. General Manager nel settore alberghiero, ristoratore e imprenditore nell\'import-export. Papà di un bambino australiano, conosce il paese come pochi. Si occupa di supportare i viaggiatori nella scelta di pacchetti completi e assistenza personalizzata in loco.',
                tag: '6+ anni · Brisbane',
              },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col">
                {/* Photo */}
                <div className="relative h-56 bg-stone-200 flex items-center justify-center">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={() => {}}
                  />
                  <Users size={40} className="text-stone-400 relative z-0" />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-hero">{member.name}</h3>
                    <p className="text-gold text-xs font-bold font-sans uppercase tracking-wider mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed flex-1">{member.bio}</p>
                  <span className="inline-block bg-stone-100 text-stone-500 text-xs font-sans px-3 py-1 rounded-full mt-1 self-start">
                    {member.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARI IN EVIDENZA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Idee di Viaggio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-4">
              I nostri itinerari più amati
            </h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              Ogni itinerario è un punto di partenza — lo adattiamo esattamente alle tue esigenze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_ITINERARIES.map((itin) => {
              const fullData = itineraries.find((i) => i.slug === itin.slug);
              const isExpanded = expandedSlug === itin.slug;

              // Extract key program days (first, middle, last)
              const program = fullData?.program ?? [];
              const keyDays = program.length >= 3
                ? [program[0], program[Math.floor(program.length / 2)], program[program.length - 1]]
                : program;

              return (
                <div
                  key={itin.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-100 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={itin.image}
                      alt={itin.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold text-white text-xs font-bold font-sans px-3 py-1 rounded-full">
                        {itin.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <span className="text-white font-serif font-bold text-xl drop-shadow">{itin.title}</span>
                      <span className="text-white/90 text-sm font-sans bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                        {itin.duration} giorni
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{itin.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {itin.highlights.map((h) => (
                        <span key={h} className="text-xs font-sans bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Expandable section */}
                    {fullData && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(isExpanded ? null : itin.slug)}
                          className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
                        >
                          {isExpanded ? 'Chiudi' : 'Vedi cosa è incluso'}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="mt-4 space-y-5">
                            {/* Included */}
                            <div>
                              <p className="text-xs font-bold font-sans uppercase tracking-wider text-stone-400 mb-2">Incluso</p>
                              <ul className="space-y-1.5">
                                {fullData.included.it.slice(0, 5).map((item) => (
                                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                                    <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Key program days */}
                            {keyDays.length > 0 && (
                              <div>
                                <p className="text-xs font-bold font-sans uppercase tracking-wider text-stone-400 mb-2">Tappe chiave</p>
                                <ul className="space-y-1.5">
                                  {keyDays.map((day) => (
                                    <li key={day.day} className="flex items-start gap-2 text-sm text-stone-600">
                                      <span className="text-gold font-bold font-sans shrink-0">Giorno {day.day}:</span>
                                      {day.title.it}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Not included */}
                            <div>
                              <p className="text-xs font-bold font-sans uppercase tracking-wider text-stone-400 mb-2">Non incluso</p>
                              <ul className="space-y-1.5">
                                {fullData.notIncluded.it.map((item) => (
                                  <li key={item} className="flex items-start gap-2 text-sm text-stone-400">
                                    <span className="mt-0.5 shrink-0">–</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-stone-400 font-sans">A partire da</p>
                        <p className="font-serif text-2xl font-bold text-hero">
                          €{itin.price.toLocaleString('it-IT')}
                          <span className="text-sm font-sans font-normal text-stone-400"> /persona</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => router.push('/quote')}
                        className="inline-flex items-center gap-2 bg-hero hover:bg-charcoal text-white text-sm font-bold font-sans px-5 py-2.5 rounded-full transition-colors"
                      >
                        Richiedi preventivo
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-stone-400 text-sm mt-8">
            Non vedi quello che cerchi?{' '}
            <button
              type="button"
              onClick={() => router.push('/quote')}
              className="text-gold hover:underline font-semibold"
            >
              Raccontaci il tuo viaggio ideale →
            </button>
          </p>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Semplice e veloce
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              Come funziona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-stone-200" />

            {[
              {
                n: '01',
                title: 'Compila il form',
                desc: 'Rispondi a poche domande sul tuo viaggio ideale. Ci vogliono meno di 3 minuti.',
                time: '3 minuti',
              },
              {
                n: '02',
                title: 'Ricevi il preventivo',
                desc: 'Un nostro esperto costruisce il tuo itinerario personalizzato e te lo invia entro 24 ore.',
                time: 'Entro 24 ore',
              },
              {
                n: '03',
                title: 'Parti — noi pensiamo a tutto',
                desc: 'Voli, hotel, trasferimenti, attività: ogni dettaglio curato. Tu pensa solo a goderti il viaggio.',
                time: 'Tutto incluso',
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-gold bg-white flex items-center justify-center shadow-sm z-10 relative">
                    <span className="font-serif text-2xl font-bold text-gold">{step.n}</span>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 bg-stone-100 text-stone-500 text-xs font-sans px-3 py-1 rounded-full mb-3">
                    <Clock size={11} />
                    {step.time}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-hero mb-2">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Cosa dicono i nostri viaggiatori
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              2.000+ italiani ci hanno scelto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  {r.photo ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100 shrink-0 relative">
                      <Image src={r.photo} alt={r.name} fill className="object-cover object-top" sizes="56px" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <span className="text-amber-700 font-bold font-sans text-lg">{r.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-hero font-sans text-sm">{r.name}</p>
                    <p className="text-stone-400 text-xs font-sans">{r.trip}</p>
                    <Stars count={r.rating} />
                  </div>
                </div>
                <div>
                  <p className="font-serif font-semibold text-hero mb-2 text-base">{r.title}</p>
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-4">&ldquo;{r.text}&rdquo;</p>
                </div>
                <p className="text-xs text-stone-400 font-sans mt-auto">via {r.platform}</p>
              </div>
            ))}
          </div>

          {/* Aggregate ratings */}
          <div className="mt-10 pt-8 border-t border-stone-200 flex flex-wrap items-center justify-center gap-10 text-center">
            <div>
              <p className="font-serif text-2xl font-bold text-hero">4.8<span className="text-base text-stone-400">/5</span></p>
              <div className="flex justify-center my-1"><Stars count={5} /></div>
              <p className="text-[10px] font-sans text-stone-400 uppercase tracking-wider">Matrimonio.com</p>
            </div>
            <div className="w-px h-10 bg-stone-200 hidden sm:block" />
            <div>
              <p className="font-serif text-2xl font-bold text-hero">98%</p>
              <p className="text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">Consigliato · Facebook</p>
            </div>
            <div className="w-px h-10 bg-stone-200 hidden sm:block" />
            <div>
              <p className="font-serif text-2xl font-bold text-hero">15+</p>
              <p className="text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">Anni di esperienza</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Domande frequenti
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              Hai dubbi? Rispondiamo qui
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-serif font-semibold text-hero text-base">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-stone-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(/images/hero-whitehaven.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-hero/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Richiedi il Tuo Preventivo Gratuito
          </h2>
          <p className="text-white/75 text-lg mb-10 font-sans">
            Raccontaci il tuo viaggio ideale — un esperto italiano a Brisbane lo costruisce per te entro 24 ore.
          </p>
          <button
            type="button"
            onClick={() => router.push('/quote')}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-lg px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            Inizia ora — è gratis
            <ArrowRight size={20} />
          </button>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {[
              'Nessun pagamento anticipato',
              'Preventivo in 24 ore',
              'Revisioni illimitate',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-white/70 text-sm font-sans">
                <Check size={14} className="text-green-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-white border-t border-stone-200 shadow-lg lg:hidden">
        <button
          type="button"
          onClick={() => router.push('/quote')}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-base py-4 rounded-full transition-colors"
        >
          Richiedi Preventivo Gratuito
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
