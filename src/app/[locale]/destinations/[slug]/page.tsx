export const revalidate = 60;

import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, Check, Clock, ArrowRight, MapPin } from 'lucide-react';
import { destinations as staticDestinations } from '@/data/destinations';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { USE_SANITY, getAllDestinations, getAllItineraries, normalizeSanityDestination, normalizeSanityItinerary } from '@/lib/sanity';
import OpenModalButton from '@/components/ui/OpenModalButton';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticDestinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  const dest = staticDestinations.find((d) => d.slug === slug);
  if (!dest) return {};
  const title = dest.name[locale];
  const description = dest.description[locale];
  const image = dest.photo ? [{ url: dest.photo, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    openGraph: { title, description, images: image, url: `/${locale}/destinations/${slug}` },
    twitter: { title, description, ...(image ? { images: [dest.photo] } : {}) },
  };
}

// Destination name → slug mapping for itinerary filtering
const DEST_NAME_TO_SLUG: Record<string, string> = {
  'Australia': 'australia',
  'New Zealand': 'new-zealand',
  'Pacific': 'fiji',
  'Fiji': 'fiji',
  'French Polynesia': 'french-polynesia',
  'Cook Islands': 'cook-islands',
  'Vanuatu': 'vanuatu',
};

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';

  let destinations = staticDestinations;
  let itineraries = staticItineraries;

  if (USE_SANITY) {
    try {
      const [sanityDests, sanityIts] = await Promise.all([getAllDestinations(), getAllItineraries()]);
      if (sanityDests.length > 0) destinations = sanityDests.map((s, i) => normalizeSanityDestination(s, i));
      if (sanityIts.length > 0) itineraries = sanityIts.map((s, i) => normalizeSanityItinerary(s, i));
    } catch (e) { console.error('[Sanity] destination slug fetch failed:', e); }
  }

  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  // Filter itineraries for this destination
  const destSlugForFilter = slug;
  const relatedItineraries = itineraries.filter((it) => {
    const itDestSlug = DEST_NAME_TO_SLUG[it.destination] ?? it.destination.toLowerCase().replace(/\s+/g, '-');
    return itDestSlug === destSlugForFilter;
  }).slice(0, 6);

  const backLabel = locale === 'it' ? 'Tutte le Destinazioni' : 'All Destinations';
  const highlightsLabel = locale === 'it' ? 'Highlights' : 'Highlights';
  const itinerariesLabel = locale === 'it' ? 'Itinerari per' : 'Itineraries for';
  const quoteLabel = locale === 'it' ? 'Richiedi Preventivo' : 'Request a Quote';
  const fromLabel = locale === 'it' ? 'Da' : 'From';
  const daysLabel = locale === 'it' ? 'giorni' : 'days';
  const viewLabel = locale === 'it' ? 'Vedi itinerario' : 'View itinerary';
  const noItinerariesLabel = locale === 'it'
    ? 'Itinerari personalizzati disponibili su richiesta.'
    : 'Custom itineraries available on request.';

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end">
        <div className="absolute inset-0">
          {dest.photo ? (
            <img src={dest.photo} alt={dest.name[locale]} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${dest.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-hero/95 via-hero/40 to-transparent" />
        </div>
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors mb-8 text-xs uppercase tracking-[0.2em] font-sans"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <div className="max-w-4xl">
            <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-3 block">
              {dest.tagline[locale]}
            </span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              {dest.name[locale]}
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">

            {/* Description */}
            <p className="text-base md:text-xl font-serif italic border-l-4 border-gold pl-6 md:pl-8 py-2 text-hero leading-relaxed">
              {dest.description[locale]}
            </p>

            {/* Highlights */}
            {dest.highlights[locale].length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-hero mb-6 uppercase tracking-widest">
                  {highlightsLabel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.highlights[locale].map((h) => (
                    <div key={h} className="flex items-center gap-3 bg-sand/10 border border-sand/30 p-4">
                      <Check size={14} className="text-gold shrink-0" />
                      <span className="text-sm font-sans text-hero/80">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Itineraries */}
            <div>
              <h2 className="font-serif text-xl font-bold text-hero mb-8 uppercase tracking-widest flex items-center gap-3">
                <MapPin size={20} className="text-gold" />
                {itinerariesLabel} {dest.name[locale]}
              </h2>

              {relatedItineraries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedItineraries.map((it) => (
                    <Link
                      key={it.id}
                      href={`/travel-ideas/${it.slug}`}
                      className="group border border-stone-100 hover:border-gold/40 transition-all duration-300 hover:shadow-lg"
                    >
                      {it.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={it.image}
                            alt={it.title[locale]}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-hero/60 to-transparent" />
                          <span className="absolute bottom-3 left-3 bg-gold text-white text-[9px] font-sans font-bold uppercase tracking-[0.2em] px-3 py-1">
                            {it.type}
                          </span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-bold text-hero mb-2 group-hover:text-gold transition-colors">
                          {it.title[locale]}
                        </h3>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-xs font-sans text-hero/50 flex items-center gap-1">
                            <Clock size={11} /> {it.duration} {daysLabel}
                          </span>
                          <span className="text-xs font-sans text-gold font-bold">
                            {fromLabel} {formatPrice(it.price.amount, it.price.currency, locale === 'it' ? 'it-IT' : 'en-GB')}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-gold group-hover:gap-2 transition-all">
                          {viewLabel} <ArrowRight size={11} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-hero/50 font-sans text-sm italic">{noItinerariesLabel}</p>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 border border-stone-100" style={{ backgroundColor: '#1a1a1a' }}>
                <p className="font-serif text-2xl font-bold text-white mb-2">{dest.name[locale]}</p>
                <p className="text-gold text-xs font-sans uppercase tracking-[0.2em] mb-6">{dest.tagline[locale]}</p>
                <p className="text-white/60 text-sm font-sans leading-relaxed mb-8">
                  {locale === 'it'
                    ? 'Vuoi scoprire questa destinazione? Contattaci per un itinerario su misura.'
                    : 'Want to explore this destination? Contact us for a bespoke itinerary.'}
                </p>
                <OpenModalButton className="block w-full text-center py-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] bg-gold text-white hover:opacity-80 transition-opacity">
                  {quoteLabel} <ArrowRight size={12} className="inline ml-1" />
                </OpenModalButton>
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 mt-3 font-sans uppercase tracking-[0.2em] text-[10px] border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all"
                >
                  {locale === 'it' ? 'Contattaci' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
