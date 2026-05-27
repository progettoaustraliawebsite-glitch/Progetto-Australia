'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatPrice, renderTitle } from '@/lib/utils';
import type { Itinerary } from '@/data/itineraries';

interface Props {
  itineraries: Itinerary[];
}

export default function FeaturedItineraries({ itineraries }: Props) {
  const t = useTranslations('home.itineraries');
  const locale = useLocale() as 'it' | 'en';
  const daysLabel = locale === 'it' ? 'giorni' : 'days';
  const fromLabel = locale === 'it' ? 'Da' : 'From';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 340;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} light />
          </div>
          {/* Arrow Controls */}
          <div className="flex gap-2 mb-2 shrink-0 ml-6">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-200"
              aria-label="Precedente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-200"
              aria-label="Successivo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {itineraries.map((itinerary) => (
            <article
              key={itinerary.id}
              className="group flex-none w-[300px] md:w-[320px] flex flex-col overflow-hidden snap-start"
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <div
                className="relative h-52 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${itinerary.image})` }}
              >
                <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:bg-black/10" />
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 flex items-center gap-1.5"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                >
                  <Clock size={11} style={{ color: '#b0a377' }} />
                  <span className="text-xs font-sans" style={{ color: '#b0a377' }}>
                    {itinerary.duration} {daysLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} style={{ color: '#b0a377' }} />
                  <span className="text-xs font-sans uppercase tracking-wider" style={{ color: '#b0a377' }}>
                    {itinerary.destination}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 text-white line-clamp-2">
                  {renderTitle(itinerary.title[locale])}
                </h3>
                <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {itinerary.description[locale]}
                </p>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider block" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {fromLabel}
                    </span>
                    <p className="font-serif text-xl font-bold" style={{ color: '#b0a377' }}>
                      {locale === 'en' && itinerary.priceEn
                        ? formatPrice(itinerary.priceEn.amount, itinerary.priceEn.currency, 'en-GB')
                        : formatPrice(itinerary.price.amount, itinerary.price.currency, 'it-IT')}
                    </p>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', fontFamily: 'sans-serif', display: 'block', letterSpacing: '0.05em' }}>
                      {locale === 'it' ? 'a persona · indicativo' : 'per person · indicative'}
                    </span>
                  </div>
                  <Link
                    href={`/travel-ideas/${itinerary.slug}` as Parameters<typeof Link>[0]['href']}
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 hover:gap-4"
                    style={{ color: '#b0a377' }}
                  >
                    {t('cta')} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
