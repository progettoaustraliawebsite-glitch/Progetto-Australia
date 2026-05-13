'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Destination } from '@/data/destinations';

interface Props {
  destinations: Destination[];
}

export default function DestinationsGrid({ destinations }: Props) {
  const t = useTranslations('home.destinations');
  const locale = useLocale() as 'it' | 'en';
  const discoverLabel = locale === 'it' ? 'Scopri' : 'Discover';

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />
      </div>

      {/* Cards strip */}
      <div
        className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide px-6 lg:px-10"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer shrink-0 h-[360px] lg:h-[520px]"
            style={{
              flex: '0 0 180px',
              scrollSnapAlign: 'start',
            }}
          >
            {/* Photo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${dest.photo})` }}
            />

            {/* Bottom gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent rounded-2xl" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 rounded-2xl" />

            {/* Content */}
            <Link href="/destinations" className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3 className="font-serif text-xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                {dest.name[locale]}
              </h3>
              <span className="inline-block self-start px-4 py-1.5 border border-white/70 text-white text-[10px] font-sans uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {discoverLabel}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
