'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useQuoteModal } from '@/context/QuoteModalContext';

const stats = [
  { num: '20+', label: 'Anni di esperienza' },
  { num: '5000+', label: 'Viaggiatori felici' },
  { num: '50+', label: 'Itinerari curati' },
  { num: '7', label: 'Destinazioni Oceania' },
];

export default function AboutStrip() {
  const t = useTranslations('home.about');
  const { open } = useQuoteModal();

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#474d4b' }}>
      <div className="absolute top-0 left-0 w-1 h-full opacity-40" style={{ backgroundColor: '#b0a377' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text — opacity:1 explicitly overrides framer-motion's default hidden state */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="text-xs font-sans uppercase tracking-[0.3em] mb-4 block" style={{ color: '#b0a377' }}>
              {t('label')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {t('title')}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
              {t('text')}
            </p>
            <button
              type="button"
              onClick={open}
              className="inline-flex items-center gap-3 px-10 py-3 border text-xs font-sans uppercase tracking-widest transition-all duration-500 hover:opacity-70"
              style={{ borderColor: '#b0a377', color: '#b0a377' }}
            >
              {t('cta')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
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
                <span className="text-white/50 text-xs font-sans uppercase tracking-wider">
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
