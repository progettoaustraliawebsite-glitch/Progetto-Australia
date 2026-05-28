'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface Testimonial {
  name: string;
  trip: { it: string; en: string };
  title: { it: string; en: string };
  text: { it: string; en: string };
  rating: number;
  date: { it: string; en: string };
  platform: 'matrimonio' | 'facebook' | 'website';
  reviewCount: string;
  photo?: string;
}

// Real reviews from progettoaustralia.it/testimonial/ and third-party platforms
const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Chiara e Giuseppe',
    photo: '/images/testimonials/chiara-giuseppe.webp',
    trip: { it: 'Viaggio di nozze in Australia', en: 'Honeymoon in Australia' },
    title: { it: 'Il viaggio più bello della nostra vita', en: 'The most beautiful trip of our lives' },
    text: {
      it: 'Siamo partiti con Progetto Australia per il nostro viaggio di nozze. Daria ci ha seguito in tutto e per tutto definendo un itinerario che rispecchiasse le nostre esigenze. È stato il viaggio più bello della nostra vita tra paesaggi mozzafiato, animaletti simpatici e mare cristallino!',
      en: 'We travelled with Progetto Australia for our honeymoon. Daria followed us every step of the way, designing an itinerary that matched our needs. It was the most beautiful trip of our lives — breathtaking landscapes, adorable animals and crystal-clear seas!',
    },
    rating: 5,
    date: { it: '2025', en: '2025' },
    platform: 'matrimonio',
    reviewCount: '4.8 / 5',
  },
  {
    name: 'Claudia e Alberto',
    photo: '/images/testimonials/claudia-alberto.webp',
    trip: { it: 'Australia – 20 giorni in self-drive', en: 'Australia – 20-day self-drive' },
    title: { it: 'Non avremmo potuto fare scelta migliore', en: 'We could not have made a better choice' },
    text: {
      it: 'Siamo abituati a viaggiare in autonomia ma questa volta abbiamo demandato ad un\'agenzia. Non avremmo potuto fare una scelta migliore! Professionisti che conoscono perfettamente il territorio e riescono in poco tempo a cucirti un itinerario perfetto per le tue esigenze. Consigliamo al 100%!',
      en: 'We normally travel independently but this time we turned to an agency. We could not have made a better choice! Professionals who know the territory perfectly and manage, in no time, to tailor a perfect itinerary for your needs. 100% recommended!',
    },
    rating: 5,
    date: { it: 'Ottobre 2025', en: 'October 2025' },
    platform: 'facebook',
    reviewCount: '98% recommended',
  },
  {
    name: 'Francesca e Emanuele',
    photo: '/images/testimonials/francesca-emanuele.webp',
    trip: { it: 'Viaggio di nozze in Australia', en: 'Honeymoon in Australia' },
    title: { it: 'Lavoro impeccabile, nessun imprevisto', en: 'Impeccable work, no hitches' },
    text: {
      it: 'È stato tutto perfetto! L\'itinerario rispecchiava esattamente il nostro stile, le attività ci sono piaciute tantissimo e gli hotel erano perfetti, sempre comodissimi ai centri o immersi nella natura. Un viaggio davvero indimenticabile, grazie per la vostra professionalità!',
      en: 'Everything was perfect! The itinerary matched our style exactly, we loved all the activities and the hotels were perfect — always centrally located or immersed in nature. A truly unforgettable trip, thank you for your professionalism!',
    },
    rating: 5,
    date: { it: '2025', en: '2025' },
    platform: 'website',
    reviewCount: '5 / 5',
  },
  {
    name: 'Gianluca ed Alessia',
    trip: { it: 'Nuova Zelanda', en: 'New Zealand' },
    title: { it: 'Un viaggio straordinario', en: 'An extraordinary journey' },
    text: {
      it: 'Cara Paola, sei stata veramente incredibile. Abbiamo fatto un viaggio straordinario. Sei stata gentilissima, disponibilissima e ti ringraziamo tantissimo per tutto quello che ci hai fatto vivere.',
      en: 'Dear Paola, you were truly incredible. We had an extraordinary journey. You were so kind and helpful — we are deeply grateful for everything you made possible for us.',
    },
    rating: 5,
    date: { it: 'Novembre 2025', en: 'November 2025' },
    platform: 'website',
    reviewCount: '5 / 5',
  },
  {
    name: 'Alessio, Lara e Mirco',
    trip: { it: 'Australia in famiglia', en: 'Family trip to Australia' },
    title: { it: 'Organizzato alla perfezione, anche col bimbo', en: 'Perfectly organised, even with a toddler' },
    text: {
      it: 'Viaggio molto impegnativo perché avevamo un bimbo di 3 anni, ma siamo stati accontentati per tutte le tappe che avevamo chiesto, organizzato davvero bene sia come tempistiche, spostamenti, location e veicoli. L\'agente locale Daria sempre disponibile. Grazie veramente.',
      en: 'A very demanding trip because we had a 3-year-old with us, but every stop we requested was catered for, organised brilliantly in terms of timing, transfers, accommodation and vehicle hire. Local agent Daria was always available. Truly grateful.',
    },
    rating: 5,
    date: { it: 'Ottobre 2025', en: 'October 2025' },
    platform: 'website',
    reviewCount: '5 / 5',
  },
  {
    name: 'Raffaella e Francesco',
    photo: '/images/testimonials/raffaella-francesco.webp',
    trip: { it: 'Australia – Tasmania', en: 'Australia – Tasmania' },
    title: { it: 'Non ci hanno mai fatto sentire soli', en: 'They never left us feeling alone' },
    text: {
      it: 'Il nostro viaggio ha soddisfatto pienamente le nostre aspettative, ci ha permesso di conoscere una natura meravigliosa. Ottime le sistemazioni scelte. Tutto ha funzionato perfettamente, con la presenza costante ed attenta di Antonio.',
      en: 'Our trip fully exceeded our expectations, allowing us to discover magnificent nature. The chosen accommodation was excellent. Everything ran perfectly, with the constant and attentive presence of Antonio.',
    },
    rating: 5,
    date: { it: '2024', en: '2024' },
    platform: 'website',
    reviewCount: '5 / 5',
  },
];

function SmallPlatformBadge({ platform }: { platform: Testimonial['platform'] }) {
  if (platform === 'matrimonio') {
    return (
      <div className="w-5 h-5 rounded-full bg-[#c41230] flex items-center justify-center shadow-sm border-2 border-white">
        <span className="text-white font-bold text-[9px]" style={{ fontFamily: 'serif' }}>m</span>
      </div>
    );
  }
  if (platform === 'facebook') {
    return (
      <div className="w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center shadow-sm border-2 border-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-amber-700 flex items-center justify-center shadow-sm border-2 border-white">
      <span className="text-white font-bold text-[7px] font-sans">PA</span>
    </div>
  );
}

function PlatformLogo({ platform }: { platform: Testimonial['platform'] }) {
  if (platform === 'matrimonio') {
    return (
      <div className="w-16 h-16 rounded-full bg-[#c41230] flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-2xl" style={{ fontFamily: 'serif' }}>m</span>
      </div>
    );
  }
  if (platform === 'facebook') {
    return (
      <div className="w-16 h-16 rounded-full bg-[#1877f2] flex items-center justify-center shadow-md">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center shadow-md">
      <span className="text-white font-bold text-base font-sans tracking-wide">PA</span>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= count ? '#F59E0B' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'it' | 'en';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 370 : -370, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header with side lines */}
        <div className="flex items-center gap-4 md:gap-8 mb-10 md:mb-14">
          <div className="flex-1 h-px bg-stone-200" />
          <div className="text-center shrink-0">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-2 md:mb-3">
              {t('label')}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-hero">
              {t('title')}
            </h2>
          </div>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Cards — horizontal scroll with arrow controls on desktop */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md items-center justify-center text-stone-400 hover:text-hero hover:border-stone-400 transition-all"
            aria-label="Precedente"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto overflow-y-hidden pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: 'x mandatory' }}
          >
          {TESTIMONIALS.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-stone-100 p-8 flex flex-col gap-6 shrink-0 w-[80vw] sm:w-[60vw] lg:w-[340px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Photo/logo + rating */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-stone-100">
                {r.photo ? (
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-2 ring-stone-100">
                      <img
                        src={r.photo}
                        alt={r.name}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <SmallPlatformBadge platform={r.platform} />
                    </div>
                  </div>
                ) : (
                  <PlatformLogo platform={r.platform} />
                )}
                <div className="flex flex-col items-center gap-2">
                  <Stars count={r.rating} />
                  <span className="text-xs font-sans text-stone-400 uppercase tracking-wide">
                    {r.reviewCount}
                  </span>
                </div>
              </div>

              {/* Review content */}
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="font-sans font-bold text-lg text-hero leading-snug">
                  {r.title[locale]}
                </h3>
                <p className="text-stone-500 text-base leading-relaxed line-clamp-5 font-sans">
                  &ldquo;{r.text[locale]}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="pt-5 border-t border-stone-100">
                <p className="font-sans font-bold text-base text-hero">{r.name}</p>
                <p className="text-sm font-sans text-stone-400 mt-1 truncate">{r.trip[locale]} · {r.date[locale]}</p>
              </div>
            </div>
          ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md items-center justify-center text-stone-400 hover:text-hero hover:border-stone-400 transition-all"
            aria-label="Successiva"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Stats strip — single row, no scroll */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-center gap-4 sm:gap-10 text-center">
          <div className="flex-1 sm:flex-none">
            <p className="font-serif text-lg sm:text-2xl font-bold text-hero">4.8<span className="text-sm sm:text-base text-stone-400">/5</span></p>
            <Stars count={5} />
            <p className="text-[8px] sm:text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">Matrimonio.com</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-stone-200" />
          <div className="flex-1 sm:flex-none">
            <p className="font-serif text-lg sm:text-2xl font-bold text-hero">98%</p>
            <p className="text-[8px] sm:text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">{t('recommended')} · Facebook</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-stone-200" />
          <div className="flex-1 sm:flex-none">
            <p className="font-serif text-lg sm:text-2xl font-bold text-hero">15+</p>
            <p className="text-[8px] sm:text-[10px] font-sans text-stone-400 mt-1 uppercase tracking-wider">{t('yearsExp')}</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-stone-200 hidden sm:block" />
          <div className="hidden sm:block">
            <p className="font-sans text-xs text-stone-500 max-w-[200px] leading-relaxed italic">
              &ldquo;{t('overallQuote')}&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
