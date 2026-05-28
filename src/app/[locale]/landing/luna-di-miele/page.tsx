'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { Star, ArrowRight, Clock, Heart, Sparkles, Users } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED_ITINERARIES = [
  {
    slug: 'magica-australia',
    title: 'Magica Australia Luxury',
    description:
      'Strutture deluxe immerse nella natura: Great Ocean Road, Kangaroo Island in lodge 5 stelle, Kakadu e cena romantica nel deserto sotto le stelle.',
    duration: 23,
    price: 5980,
    image: '/images/itin-magica-au.webp',
    tag: 'Più scelto per le nozze',
    highlights: ['Great Ocean Road', 'Kangaroo Island 5★', 'Uluru', 'Cena nel deserto'],
  },
  {
    slug: 'australia-deluxe-isole-cook',
    title: 'Australia Deluxe + Isole Cook',
    description:
      "Australia in strutture superior e il paradiso delle Isole Cook: lagune turchesi, overwater bungalow e tramonti indimenticabili.",
    duration: 23,
    price: 4130,
    image: '/images/itin-au-deluxe.webp',
    tag: 'Mare + Avventura',
    highlights: ['Sydney', 'Uluru', 'Rarotonga', 'Overwater Bungalow'],
  },
  {
    slug: 'australia-on-the-road-isole-cook',
    title: 'Australia + Isole Cook',
    description:
      'Il mix perfetto per una luna di miele: la magia dell\'entroterra australiano e le acque cristalline del Pacifico Sud.',
    duration: 24,
    price: 2850,
    image: '/images/itin-au-cook.webp',
    tag: 'Romantico',
    highlights: ['Cairns', 'Great Barrier Reef', 'Aitutaki', 'Cook Islands'],
  },
  {
    slug: 'australia-self-drive',
    title: 'Australia in Libertà',
    description:
      'Self-drive romantico da Perth a Cairns: paesaggi mozzafiato, fauna unica e hotel selezionati per una luna di miele autentica.',
    duration: 18,
    price: 1790,
    image: '/images/itin-self-drive.webp',
    tag: 'Avventura di coppia',
    highlights: ['Rottnest Island', 'Kangaroo Island', 'Uluru', 'Cairns'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Chiara e Giuseppe',
    photo: '/images/testimonials/chiara-giuseppe.webp',
    trip: 'Viaggio di nozze in Australia',
    title: 'Il viaggio più bello della nostra vita',
    text: 'Siamo partiti con Progetto Australia per il nostro viaggio di nozze. Daria ci ha seguito in tutto e per tutto definendo un itinerario che rispecchiasse le nostre esigenze. È stato il viaggio più bello della nostra vita tra paesaggi mozzafiato, animaletti simpatici e mare cristallino!',
    rating: 5,
    platform: 'Matrimonio.com',
  },
  {
    name: 'Francesca e Emanuele',
    photo: '/images/testimonials/francesca-emanuele.webp',
    trip: 'Viaggio di nozze in Australia',
    title: 'Lavoro impeccabile, nessun imprevisto',
    text: 'È stato tutto perfetto! L\'itinerario rispecchiava esattamente il nostro stile, le attività ci sono piaciute tantissimo e gli hotel erano perfetti, sempre comodissimi ai centri o immersi nella natura. Un viaggio davvero indimenticabile!',
    rating: 5,
    platform: 'Sito ufficiale',
  },
  {
    name: 'Raffaella e Francesco',
    photo: '/images/testimonials/raffaella-francesco.webp',
    trip: 'Australia – Tasmania',
    title: 'Non ci hanno mai fatto sentire soli',
    text: 'Il nostro viaggio ha soddisfatto pienamente le nostre aspettative, ci ha permesso di conoscere una natura meravigliosa. Ottime le sistemazioni scelte. Tutto ha funzionato perfettamente, con la presenza costante ed attenta di Antonio.',
    rating: 5,
    platform: 'Sito ufficiale',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={14} fill={s <= count ? '#F59E0B' : 'none'} stroke={s <= count ? '#F59E0B' : '#D1D5DB'} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingLunaDiMiele() {
  const router = useRouter();

  const goToForm = () => router.push('/quote?honeymoon=1');

  return (
    <div className="bg-white font-sans pb-24 lg:pb-0">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm h-16 flex items-center px-6">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <Link href="/it">
            <Image src="/images/logo.webp" alt="Progetto Australia" width={140} height={40} className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center">
        <Image
          src="/images/hero-whitehaven.webp"
          alt="Luna di miele in Australia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Heart size={13} fill="#F59E0B" stroke="#F59E0B" />
              <span className="text-white/90 text-xs font-sans">500+ coppie · 4.8/5 su Matrimonio.com · 20 anni di esperienza</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Luna di Miele in Australia –<br />
              <span className="text-gold">Il Viaggio dei Tuoi Sogni</span>
            </h1>

            <p className="text-white/85 text-lg md:text-xl font-sans mb-10 leading-relaxed">
              500+ coppie ci hanno scelto per il loro viaggio di nozze. Ogni dettaglio curato da esperti italiani a Brisbane.
            </p>

            <button
              type="button"
              onClick={goToForm}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-lg px-8 py-4 rounded-full transition-colors shadow-lg"
            >
              Richiedi il Tuo Preventivo Gratuito
              <ArrowRight size={20} />
            </button>

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
                icon: <Heart size={28} className="text-gold" />,
                title: 'Ogni dettaglio è romantico',
                desc: "Cene sotto le stelle nel deserto, lodge immersi nella natura, spiagge private. Curiamo ogni momento perché sia indimenticabile.",
              },
              {
                icon: <Sparkles size={28} className="text-gold" />,
                title: 'Su misura per voi due',
                desc: 'Nessun pacchetto preconfezionato. Il vostro itinerario nasce dalle vostre passioni, dal vostro stile, dal vostro budget.',
              },
              {
                icon: <Users size={28} className="text-gold" />,
                title: '500+ coppie soddisfatte',
                desc: 'Da 15 anni organizziamo viaggi di nozze in Australia e Oceania. Conosciamo ogni angolo romantico di questo continente.',
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

      {/* ── ITINERARI ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Idee di Viaggio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-4">
              I viaggi di nozze più amati
            </h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              Ogni itinerario è un punto di partenza — lo costruiamo attorno a voi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_ITINERARIES.map((itin) => (
              <div key={itin.slug} className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-100 flex flex-col">
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

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{itin.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {itin.highlights.map((h) => (
                      <span key={h} className="text-xs font-sans bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>

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
                      onClick={goToForm}
                      className="inline-flex items-center gap-2 bg-hero hover:bg-charcoal text-white text-sm font-bold font-sans px-5 py-2.5 rounded-full transition-colors"
                    >
                      Richiedi preventivo
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-stone-400 text-sm mt-8">
            Hai un'idea diversa?{' '}
            <button type="button" onClick={goToForm} className="text-gold hover:underline font-semibold">
              Raccontaci il vostro viaggio ideale →
            </button>
          </p>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Semplice e veloce
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              Come funziona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: '01',
                title: 'Raccontateci il vostro sogno',
                desc: 'Compilate il form in 3 minuti — destinazioni, date, stile di viaggio. Più ci dite, più il preventivo sarà preciso.',
                time: '3 minuti',
              },
              {
                n: '02',
                title: 'Ricevete il preventivo',
                desc: 'Un nostro esperto costruisce il vostro itinerario romantico e ve lo invia entro 24 ore, senza impegno.',
                time: 'Entro 24 ore',
              },
              {
                n: '03',
                title: 'Partite — noi pensiamo a tutto',
                desc: 'Voli, hotel romantici, trasferimenti, cene speciali: ogni dettaglio curato. Voi pensate solo a godervi ogni momento.',
                time: 'Tutto incluso',
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-gold bg-white flex items-center justify-center shadow-sm">
                  <span className="font-serif text-2xl font-bold text-gold">{step.n}</span>
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
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Coppie che ci hanno scelto
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              Il loro viaggio di nozze, raccontato da loro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  {r.photo ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100 shrink-0">
                      <Image src={r.photo} alt={r.name} fill className="object-cover object-top" sizes="56px" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Heart size={20} className="text-amber-600" />
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
              <p className="font-serif text-2xl font-bold text-hero">500+</p>
              <p className="text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">Coppie soddisfatte</p>
            </div>
            <div className="w-px h-10 bg-stone-200 hidden sm:block" />
            <div>
              <p className="font-serif text-2xl font-bold text-hero">20+</p>
              <p className="text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">Anni di esperienza</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECONDARIO ── */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(/images/dest-whitehaven.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-hero/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Heart size={32} fill="#f9b233" stroke="#f9b233" className="mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Richiedi il Tuo Preventivo Gratuito
          </h2>
          <p className="text-white/75 text-lg mb-10 font-sans">
            Raccontateci il vostro sogno — costruiamo la luna di miele perfetta per voi entro 24 ore.
          </p>
          <button
            type="button"
            onClick={goToForm}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-lg px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            Inizia ora — è gratis
            <ArrowRight size={20} />
          </button>
          <p className="mt-5 text-white/50 text-sm font-sans">
            Consulenza gratuita · 24h · Nessun impegno
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-white border-t border-stone-200 shadow-lg lg:hidden">
        <button
          type="button"
          onClick={goToForm}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold font-sans text-base py-4 rounded-full transition-colors"
        >
          Richiedi Preventivo Gratuito
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
