'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AboutStrip() {
  const t = useTranslations('home.about');
  const locale = useLocale();

  const stats = [
    { num: '20+', label: t('stats.years') },
    { num: '5000+', label: t('stats.travellers') },
    { num: '50+', label: t('stats.itineraries') },
    { num: '7', label: t('stats.destinations') },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#b0a377', opacity: 0.5 }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
          >
            <span className="text-xs font-sans uppercase tracking-[0.3em] mb-4 block" style={{ color: '#b0a377' }}>
              {t('label')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-hero">
              {t('title')}
            </h2>
            <p className="text-hero/60 text-base md:text-lg leading-relaxed mb-10">
              {t('text')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-10 py-3 border text-xs font-sans uppercase tracking-widest transition-all duration-500 hover:bg-hero hover:text-white hover:border-hero"
              style={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}
            >
              {locale === 'it' ? 'Scopri di più su di noi' : 'Find out more about us'}
            </Link>
          </motion.div>

          {/* Stats — sfondo scuro per contrasto con la sezione bianca */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' as const }}
            className="grid grid-cols-2 gap-px"
            style={{ backgroundColor: '#b0a377' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.num}
                className="p-8 flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <span className="font-serif text-4xl font-bold mb-2" style={{ color: '#b0a377' }}>
                  {stat.num}
                </span>
                <span className="text-white/55 text-xs font-sans uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
