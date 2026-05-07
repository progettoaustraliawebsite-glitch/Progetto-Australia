import { getTranslations, getLocale } from 'next-intl/server';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { itineraries } from '@/data/itineraries';
import { formatPrice } from '@/lib/utils';
import OpenModalButton from '@/components/ui/OpenModalButton';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('travelIdeas');
  return { title: t('title') };
}

export default async function TravelIdeasPage() {
  const t = await getTranslations('travelIdeas');
  const locale = (await getLocale()) as 'it' | 'en';

  const typeLabels: Record<string, string> = {
    adventure: locale === 'it' ? 'Avventura' : 'Adventure',
    luxury: locale === 'it' ? 'Lusso' : 'Luxury',
    honeymoon: locale === 'it' ? 'Luna di Miele' : 'Honeymoon',
    family: locale === 'it' ? 'Famiglia' : 'Family',
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 px-6 bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-4 block">
            {locale === 'it' ? 'Ispirati' : 'Get Inspired'}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Itineraries Grid */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {itineraries.map((itinerary) => (
              <article
                key={itinerary.id}
                className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
              >
                {/* Image */}
                <div 
                  className="h-64 bg-cover bg-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${itinerary.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-hero/80 backdrop-blur-sm text-gold text-xs font-sans uppercase tracking-widest px-3 py-1.5 font-bold">
                      {typeLabels[itinerary.type] || itinerary.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-hero/80 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                    <Clock size={12} className="text-gold" />
                    <span className="text-gold text-xs font-sans font-bold">
                      {itinerary.duration} {locale === 'it' ? 'giorni' : 'days'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={12} className="text-gold" />
                    <span className="text-gold text-xs font-sans uppercase tracking-wider">
                      {itinerary.destination}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-3 group-hover:text-brown transition-colors duration-300">
                    {itinerary.title[locale]}
                  </h2>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                    {itinerary.description[locale]}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {itinerary.highlights[locale].slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-xs font-sans px-3 py-1 border border-stone-200 text-charcoal/60"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <span className="text-charcoal/40 text-xs font-sans uppercase tracking-wider block">
                        {locale === 'it' ? 'Da' : 'From'}
                      </span>
                      <span className="font-serif text-2xl text-charcoal font-bold">
                        {formatPrice(itinerary.price.amount, itinerary.price.currency, locale === 'it' ? 'it-IT' : 'en-GB')}
                      </span>
                    </div>
                    <OpenModalButton
                      className="inline-flex items-center gap-2 bg-gold text-white text-xs font-sans uppercase tracking-widest px-6 py-3 hover:opacity-80 transition-opacity duration-300"
                    >
                      {locale === 'it' ? 'Richiedi Info' : 'Request Info'} <ArrowRight size={14} />
                    </OpenModalButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
