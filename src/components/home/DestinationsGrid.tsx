'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import SectionHeader from '@/components/ui/SectionHeader';

const photos = [
  '/images/dest-australia.png',
  '/images/dest-nz.jpg',
  'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=900&q=85',
  'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=900&q=85',
  'https://images.unsplash.com/photo-1552250575-e508473b090f?w=900&q=85',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=85',
  'https://images.unsplash.com/photo-1542048917-90f3de90dd0d?w=900&q=85',
];

export default function DestinationsGrid() {
  const t = useTranslations('home.destinations');
  const locale = useLocale() as 'it' | 'en';

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 row-span-2 group relative overflow-hidden cursor-pointer"
            style={{ minHeight: '400px' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${photos[0]}), linear-gradient(135deg, #813318, #1a1a1a)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Link href="/destinations" className="absolute inset-0 z-10">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs font-sans uppercase tracking-widest mb-2 block" style={{ color: '#b0a377' }}>
                  Destinazione Principale
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-2">
                  {destinations[0].name[locale]}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {destinations[0].tagline[locale]}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest group-hover:gap-4 transition-all duration-300" style={{ color: '#b0a377' }}>
                  Esplora <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Regular cards */}
          {destinations.slice(1).map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: '240px' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${photos[i + 1] || photos[0]}), linear-gradient(135deg, ${dest.accentColor}, #1a1a1a)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <Link href="/destinations" className="absolute inset-0 z-10">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {dest.name[locale]}
                  </h3>
                  <p className="text-white/50 text-xs">
                    {dest.tagline[locale]}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
