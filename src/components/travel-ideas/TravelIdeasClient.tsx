'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Clock, MapPin, ArrowRight, ChevronDown, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import type { Itinerary } from '@/data/itineraries';

interface Props {
  itineraries: Itinerary[];
  locale: 'it' | 'en';
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
}

const typeLabels: Record<string, { it: string; en: string }> = {
  adventure: { it: 'Avventura', en: 'Adventure' },
  luxury: { it: 'Lusso', en: 'Luxury' },
  honeymoon: { it: 'Luna di Miele', en: 'Honeymoon' },
  family: { it: 'Famiglia', en: 'Family' },
  group: { it: 'Gruppo', en: 'Group Tour' },
  selfDrive: { it: 'Self-Drive', en: 'Self-Drive' },
};

const priceRanges = [
  { key: 'low',  it: 'Fino a €6.500',   en: 'Up to $7,000',    min: 0,    max: 6500 },
  { key: 'mid',  it: '€6.500 – €9.500', en: '$7,000 – $10,000', min: 6500, max: 9500 },
  { key: 'high', it: 'Oltre €9.500',    en: 'Above $10,000',    min: 9500, max: Infinity },
];

type DropdownKey = 'type' | 'dest' | 'price' | null;

export default function TravelIdeasClient({ itineraries, locale, heroLabel, heroTitle, heroSubtitle }: Props) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeDest, setActiveDest] = useState<string | null>(null);
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [open, setOpen] = useState<DropdownKey>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const destinations = useMemo(
    () => Array.from(new Set(itineraries.map((it) => it.destination))).sort(),
    [itineraries]
  );
  const types = useMemo(
    () => Array.from(new Set(itineraries.map((it) => it.type))),
    [itineraries]
  );

  const filtered = useMemo(() => {
    return itineraries.filter((it) => {
      if (activeType && it.type !== activeType) return false;
      if (activeDest && it.destination !== activeDest) return false;
      if (activePrice) {
        const range = priceRanges.find((r) => r.key === activePrice);
        if (range && (it.price.amount < range.min || it.price.amount >= range.max)) return false;
      }
      return true;
    });
  }, [itineraries, activeType, activeDest, activePrice]);

  const hasFilters = activeType || activeDest || activePrice;

  const copy = {
    it: {
      type: 'Tipo',
      destination: 'Destinazione',
      price: 'Budget',
      allTypes: 'Tutti i tipi',
      allDest: 'Tutte le destinazioni',
      allPrice: 'Qualsiasi budget',
      results: (n: number) => `${n} itinerar${n === 1 ? 'io' : 'i'}`,
      reset: 'Rimuovi filtri',
      discover: 'Scopri',
      from: 'Da',
      days: 'giorni',
      noResults: 'Nessun itinerario corrisponde ai filtri selezionati.',
    },
    en: {
      type: 'Type',
      destination: 'Destination',
      price: 'Budget',
      allTypes: 'All types',
      allDest: 'All destinations',
      allPrice: 'Any budget',
      results: (n: number) => `${n} itinerar${n === 1 ? 'y' : 'ies'}`,
      reset: 'Clear',
      discover: 'Discover',
      from: 'From',
      days: 'days',
      noResults: 'No itineraries match the selected filters.',
    },
  };
  const c = copy[locale];

  const toggle = (key: DropdownKey) => setOpen((prev) => (prev === key ? null : key));

  const activeTypeLabel = activeType ? (typeLabels[activeType]?.[locale] ?? activeType) : null;
  const activePriceLabel = activePrice ? (priceRanges.find((r) => r.key === activePrice)?.[locale] ?? null) : null;

  return (
    <>
      {/* Hero + Filters */}
      <section className="relative pt-28 pb-6 px-6 bg-hero overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-2 block">
            {heroLabel}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            {heroTitle}
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-6">
            {heroSubtitle}
          </p>

          {/* Filter bar */}
          <div ref={barRef} className="relative flex items-center justify-center gap-2 flex-wrap">

            {/* Type dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('type')}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] border transition-all duration-200 ${
                  activeType
                    ? 'bg-gold border-gold text-white'
                    : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                }`}
              >
                {activeTypeLabel ?? c.type}
                <ChevronDown size={12} className={`transition-transform duration-200 ${open === 'type' ? 'rotate-180' : ''}`} />
              </button>
              {open === 'type' && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl min-w-[160px] max-w-[90vw] z-50 py-1">
                  {activeType && (
                    <button
                      onClick={() => { setActiveType(null); setOpen(null); }}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest text-red-400 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <X size={10} /> {c.allTypes}
                    </button>
                  )}
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setActiveType(t); setOpen(null); }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest hover:bg-stone-50 transition-colors ${
                        activeType === t ? 'text-gold font-bold' : 'text-hero/70'
                      }`}
                    >
                      {typeLabels[t]?.[locale] ?? t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Destination dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('dest')}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] border transition-all duration-200 ${
                  activeDest
                    ? 'bg-gold border-gold text-white'
                    : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                }`}
              >
                {activeDest ?? c.destination}
                <ChevronDown size={12} className={`transition-transform duration-200 ${open === 'dest' ? 'rotate-180' : ''}`} />
              </button>
              {open === 'dest' && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl min-w-[220px] max-w-[90vw] z-50 py-1">
                  {activeDest && (
                    <button
                      onClick={() => { setActiveDest(null); setOpen(null); }}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest text-red-400 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <X size={10} /> {c.allDest}
                    </button>
                  )}
                  {destinations.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setActiveDest(d); setOpen(null); }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest hover:bg-stone-50 transition-colors ${
                        activeDest === d ? 'text-gold font-bold' : 'text-hero/70'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('price')}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] border transition-all duration-200 ${
                  activePrice
                    ? 'bg-gold border-gold text-white'
                    : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                }`}
              >
                {activePriceLabel ?? c.price}
                <ChevronDown size={12} className={`transition-transform duration-200 ${open === 'price' ? 'rotate-180' : ''}`} />
              </button>
              {open === 'price' && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl min-w-[180px] max-w-[90vw] z-50 py-1">
                  {activePrice && (
                    <button
                      onClick={() => { setActivePrice(null); setOpen(null); }}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest text-red-400 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <X size={10} /> {c.allPrice}
                    </button>
                  )}
                  {priceRanges.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => { setActivePrice(r.key); setOpen(null); }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-sans uppercase tracking-widest hover:bg-stone-50 transition-colors ${
                        activePrice === r.key ? 'text-gold font-bold' : 'text-hero/70'
                      }`}
                    >
                      {r[locale]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear all */}
            {hasFilters && (
              <button
                onClick={() => { setActiveType(null); setActiveDest(null); setActivePrice(null); }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
              >
                <X size={11} /> {c.reset}
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-white/30 text-[10px] font-sans uppercase tracking-widest mt-3 pb-6">
            {c.results(filtered.length)}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-hero/40 font-sans py-20">{c.noResults}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((itinerary) => {
                const typeLabel = typeLabels[itinerary.type]?.[locale] ?? itinerary.type;
                return (
                  <article
                    key={itinerary.id}
                    className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={itinerary.image}
                        alt={itinerary.title[locale]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-hero/80 backdrop-blur-sm text-gold text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 font-bold">
                          {typeLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-hero/80 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                        <Clock size={12} className="text-gold" />
                        <span className="text-gold text-xs font-sans font-bold">
                          {itinerary.duration} {c.days}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={12} className="text-gold" />
                        <span className="text-gold text-xs font-sans uppercase tracking-wider">
                          {itinerary.destination}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl font-bold text-hero mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                        {itinerary.title[locale]}
                      </h2>
                      <p className="text-hero/55 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {itinerary.description[locale]}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {itinerary.highlights[locale].slice(0, 3).map((h) => (
                          <span key={h} className="text-[10px] font-sans px-2.5 py-1 border border-stone-200 text-hero/50 uppercase tracking-wide">
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div>
                          <span className="text-hero/40 text-[10px] font-sans uppercase tracking-wider block">
                            {c.from}
                          </span>
                          <span className="font-serif text-xl text-hero font-bold">
                            {locale === 'en' && itinerary.priceEn
                              ? formatPrice(itinerary.priceEn.amount, itinerary.priceEn.currency, 'en-GB')
                              : formatPrice(itinerary.price.amount, itinerary.price.currency, 'it-IT')}
                          </span>
                          <span className="text-hero/40 text-[9px] font-sans block">
                            {locale === 'it' ? 'a persona · indicativo' : 'per person · indicative'}
                          </span>
                        </div>
                        <Link
                          href={`/travel-ideas/${itinerary.slug}` as Parameters<typeof Link>[0]['href']}
                          className="inline-flex items-center gap-2 bg-gold text-white text-[10px] font-sans uppercase tracking-widest px-5 py-3 hover:opacity-80 transition-opacity duration-300"
                        >
                          {c.discover} <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
