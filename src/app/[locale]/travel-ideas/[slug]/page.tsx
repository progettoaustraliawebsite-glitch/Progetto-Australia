export const revalidate = 60;

import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, Clock, MapPin, CheckCircle, XCircle, Calendar, ArrowRight } from 'lucide-react';
import OpenModalButton from '@/components/ui/OpenModalButton';
import DayImages from '@/components/ui/DayImages';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { USE_SANITY, getAllItineraries, getItineraryBySlug, normalizeSanityItinerary } from '@/lib/sanity';

import { formatPrice, renderTitle } from '@/lib/utils';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (USE_SANITY) {
    const docs = await getAllItineraries();
    return docs.map((d) => ({ slug: d.slug.current }));
  }
  return staticItineraries.map((it) => ({ slug: it.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  let it;
  if (USE_SANITY) {
    const doc = await getItineraryBySlug(slug);
    if (!doc) return {};
    it = normalizeSanityItinerary(doc);
  } else {
    it = staticItineraries.find((i) => i.slug === slug);
    if (!it) return {};
  }
  const title = it.title[locale];
  const description = it.description[locale];
  const image = it.image ? [{ url: it.image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', images: image, url: `/${locale}/travel-ideas/${slug}` },
    twitter: { title, description, ...(image ? { images: [it.image] } : {}) },
  };
}

export default async function ItineraryDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  const t = await getTranslations('travelIdeas');

  let itinerary;
  if (USE_SANITY) {
    const doc = await getItineraryBySlug(slug);
    if (!doc) notFound();
    itinerary = normalizeSanityItinerary(doc);
  } else {
    itinerary = staticItineraries.find((it) => it.slug === slug);
    if (!itinerary) notFound();
  }

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: itinerary.title[locale],
    description: itinerary.description[locale],
    image: itinerary.image ? `https://www.progettoaustralia.it${itinerary.image}` : undefined,
    url: `https://www.progettoaustralia.it/${locale}/travel-ideas/${slug}`,
    inLanguage: locale,
    touristType: itinerary.type,
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: itinerary.duration,
      itemListElement: itinerary.program.map((day, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: day.title[locale],
        description: day.description[locale],
      })),
    },
    offers: {
      '@type': 'Offer',
      price: itinerary.price.amount,
      priceCurrency: itinerary.price.currency,
      seller: {
        '@type': 'TravelAgency',
        name: 'Progetto Australia',
        url: 'https://www.progettoaustralia.it',
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Progetto Australia',
      url: 'https://www.progettoaustralia.it',
    },
  };

  const typeLabels: Record<string, { it: string; en: string }> = {
    adventure: { it: 'Avventura', en: 'Adventure' },
    luxury: { it: 'Lusso', en: 'Luxury' },
    honeymoon: { it: 'Luna di Miele', en: 'Honeymoon' },
    family: { it: 'Famiglia', en: 'Family' },
    group: { it: 'Gruppo', en: 'Group Tour' },
    selfDrive: { it: 'Self-Drive', en: 'Self-Drive' },
    'road-trip': { it: 'Road Trip', en: 'Road Trip' },
  };
  const typeLabel = typeLabels[itinerary.type]?.[locale] ?? itinerary.type;

  const daysLabel = locale === 'it' ? 'giorni' : 'days';
  const fromLabel = locale === 'it' ? 'Da' : 'From';
  const backLabel = locale === 'it' ? 'Torna agli Itinerari' : 'Back to Itineraries';
  const quoteLabel = locale === 'it' ? 'Richiedi Preventivo' : 'Request a Quote';
  const programLabel = locale === 'it' ? 'Programma Giorno per Giorno' : 'Day-by-Day Programme';
  const includedLabel = locale === 'it' ? 'Cosa Include' : "What's Included";
  const notIncludedLabel = locale === 'it' ? 'Non Include' : 'Not Included';
  const contactLabel = locale === 'it'
    ? 'Vuoi personalizzare questo itinerario? Contattaci per un preventivo su misura.'
    : 'Want to customise this itinerary? Contact us for a tailored quote.';

  return (
    <>
    <JsonLd data={tripSchema} />
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={itinerary.image}
            alt={itinerary.title[locale]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hero/95 via-hero/30 to-transparent" />
        </div>
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <Link
            href="/travel-ideas"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors mb-8 text-xs uppercase tracking-[0.2em] font-sans"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-gold text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em] px-4 py-2 shadow-lg">
                {typeLabel}
              </span>
              <span className="bg-hero/60 backdrop-blur-sm text-gold text-[10px] font-sans uppercase tracking-widest px-4 py-2 flex items-center gap-1.5">
                <Clock size={11} /> {itinerary.duration} {daysLabel}
              </span>
              <span className="bg-hero/60 backdrop-blur-sm text-gold text-[10px] font-sans uppercase tracking-widest px-4 py-2 flex items-center gap-1.5">
                <MapPin size={11} /> {itinerary.destination}
              </span>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {renderTitle(itinerary.title[locale])}
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
            <div>
              <p className="text-base md:text-xl font-serif italic border-l-4 border-gold pl-6 md:pl-8 py-2 text-hero leading-relaxed">
                {itinerary.description[locale]}
              </p>
            </div>

            {/* Map */}
            {itinerary.mapImage && (
              <div>
                <h2 className="font-serif text-lg md:text-2xl font-bold text-hero mb-4 uppercase tracking-wide flex items-center gap-3">
                  <MapPin size={22} className="text-gold" />
                  {locale === 'it' ? 'Il Percorso' : 'The Route'}
                </h2>
                <img
                  src={itinerary.mapImage}
                  alt={`Mappa ${itinerary.title[locale]}`}
                  className="w-full lg:w-3/4 rounded-xl shadow-md border border-stone-200"
                />
              </div>
            )}

            {/* Programme */}
            <div>
              <h2 className="font-serif text-lg md:text-2xl font-bold text-hero mb-8 uppercase tracking-wide md:tracking-widest flex items-center gap-3">
                <Calendar size={24} className="text-gold" /> {programLabel}
              </h2>
              <div className="space-y-0 border-l-2 border-gold/30 ml-4">
                {itinerary.program.map((day, idx) => (
                  <div key={idx} className="relative pl-8 pb-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-2 border-white shadow-sm" />
                    <div className="bg-stone-50 border border-stone-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gold">
                          {locale === 'it' ? `Giorno ${day.day}` : `Day ${day.day}`}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-hero mb-1">{day.title[locale]}</h3>
                      <p className="text-hero/60 text-sm leading-relaxed">{day.description[locale]}</p>
                      <DayImages images={day.images ?? []} altPrefix={day.title[locale]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 border border-emerald-100 p-8">
                <h3 className="font-serif text-base md:text-xl font-bold text-hero mb-6 flex items-center gap-2">
                  <CheckCircle size={20} className="text-emerald-600" /> {includedLabel}
                </h3>
                <ul className="space-y-3">
                  {itinerary.included[locale].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-hero/70">
                      <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 p-8">
                <h3 className="font-serif text-base md:text-xl font-bold text-hero mb-6 flex items-center gap-2">
                  <XCircle size={20} className="text-red-400" /> {notIncludedLabel}
                </h3>
                <ul className="space-y-3">
                  {itinerary.notIncluded[locale].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-hero/70">
                      <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">

              {/* Price Card */}
              <div className="p-8 border border-stone-100" style={{ backgroundColor: '#1a1a1a' }}>
                <p className="text-white/65 text-[10px] font-sans uppercase tracking-[0.2em] mb-1">{fromLabel}</p>
                <p className="font-serif text-4xl font-bold mb-1" style={{ color: '#b0a377' }}>
                  {locale === 'en' && itinerary.priceEn
                    ? formatPrice(itinerary.priceEn.amount, itinerary.priceEn.currency, 'en-GB')
                    : formatPrice(itinerary.price.amount, itinerary.price.currency, 'it-IT')}
                </p>
                <p className="text-white/55 text-xs font-sans mb-8">
                  {locale === 'it'
                    ? 'a persona · servizi a terra · prezzo indicativo, soggetto a variazioni'
                    : 'per person · land services · indicative price, subject to change'}
                </p>
                <p className="text-sm text-white/65 font-sans mb-6 leading-relaxed">{contactLabel}</p>
                <OpenModalButton className="block w-full text-center py-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] transition-all bg-gold text-white hover:opacity-80">
                  {quoteLabel} <ArrowRight size={12} className="inline ml-1" />
                </OpenModalButton>
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 mt-3 font-sans uppercase tracking-[0.2em] text-[10px] transition-all border border-white/20 text-white/50 hover:text-white hover:border-white/50"
                >
                  {locale === 'it' ? 'Contattaci' : 'Contact Us'}
                </Link>
              </div>

              {/* Quick Info */}
              <div className="p-6 border border-stone-100 bg-stone-50 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-hero/50 font-sans uppercase tracking-wider text-xs">{locale === 'it' ? 'Durata' : 'Duration'}</span>
                  <span className="font-sans font-bold text-hero">{itinerary.duration} {daysLabel}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-hero/50 font-sans uppercase tracking-wider text-xs">{locale === 'it' ? 'Destinazione' : 'Destination'}</span>
                  <span className="font-sans font-bold text-hero">{itinerary.destination}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-hero/50 font-sans uppercase tracking-wider text-xs">{locale === 'it' ? 'Tipo' : 'Type'}</span>
                  <span className="font-sans font-bold text-hero">{typeLabel}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
    </>
  );
}
