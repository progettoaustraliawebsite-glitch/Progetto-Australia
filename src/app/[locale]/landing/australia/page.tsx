'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { Check, Phone, Star, ArrowRight, Clock, Users, HeadphonesIcon } from 'lucide-react';

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

function CtaButton({ className = '' }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push('/quote')}
      className={`inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-sans font-bold rounded-full transition-colors ${className}`}
    >
      Richiedi il Tuo Preventivo Gratuito
      <ArrowRight size={18} />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingAustralia() {
  const router = useRouter();

  return (
    <div className="bg-white font-sans pb-24 lg:pb-0">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm h-16 flex items-center px-6">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/it" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Progetto Australia" width={140} height={40} className="h-9 w-auto" />
          </Link>
          <a
            href="tel:+390733886838"
            className="flex items-center gap-2 text-hero font-bold text-sm hover:text-gold transition-colors"
          >
            <Phone size={16} className="text-gold" />
            +39 0733 886838
          </a>
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

      {/* ── ITINERARI IN EVIDENZA ── */}
      <section className="py-20 bg-stone-50">
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
            {FEATURED_ITINERARIES.map((itin) => (
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
            ))}
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
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-3">
              Cosa dicono i nostri viaggiatori
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
              2.000+ italiani ci hanno scelto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  {r.photo ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100 shrink-0">
                      <img src={r.photo} alt={r.name} className="w-full h-full object-cover object-top" loading="lazy" />
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

      {/* ── CTA SECONDARIO ── */}
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
          <p className="mt-5 text-white/50 text-sm font-sans">
            Consulenza gratuita · 24h · Nessun impegno
          </p>
        </div>
      </section>

      {/* ── FOOTER MINIMALE ── */}
      <footer className="py-8 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-400 font-sans">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Progetto Australia" width={100} height={28} className="h-7 w-auto opacity-70" />
            <span>P.IVA 02345678901</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/it/privacy" className="hover:text-stone-600 transition-colors">Privacy Policy</Link>
            <a href="mailto:info@progettoaustralia.it" className="hover:text-stone-600 transition-colors">
              info@progettoaustralia.it
            </a>
          </div>
        </div>
      </footer>

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
