'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { itineraries } from '@/data/itineraries';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatPrice } from '@/lib/utils';

const itineraryPhotos = [
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=85',
  'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=85',
  'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=85',
  'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=85',
];

const accentColors = ['#813318', '#1a4a2a', '#0a3a5a', '#5a2a08'];

export default function FeaturedItineraries() {
  const t = useTranslations('home.itineraries');
  const locale = useLocale() as 'it' | 'en';

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} light />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itineraries.map((itinerary, i) => (
            <motion.article
              key={itinerary.id}
              initial={{ opacity: 1, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden"
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <div
                className="relative h-52 bg-cover bg-center overflow-hidden transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${itinerary.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/25" />
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 flex items-center gap-1.5"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                >
                  <Clock size={11} style={{ color: '#b0a377' }} />
                  <span className="text-xs font-sans" style={{ color: '#b0a377' }}>
                    {itinerary.duration} giorni
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
                <h3 className="font-serif text-xl font-bold mb-3 transition-colors duration-300 text-white">
                  {itinerary.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1 line-clamp-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {itinerary.description[locale]}
                </p>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider block" style={{ color: 'rgba(255,255,255,0.4)' }}>Da</span>
                    <p className="font-serif text-xl font-bold" style={{ color: '#b0a377' }}>
                      {formatPrice(itinerary.price.amount, itinerary.price.currency, locale === 'it' ? 'it-IT' : 'en-GB')}
                    </p>
                  </div>
                  <Link
                    href="/travel-ideas"
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 hover:gap-4"
                    style={{ color: '#b0a377' }}
                  >
                    {t('cta')} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
