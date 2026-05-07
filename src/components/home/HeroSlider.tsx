'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQuoteModal } from '@/context/QuoteModalContext';

const slides = [
  {
    id: 0,
    image: '/images/hero-sydney.jpg',
  },
  {
    id: 1,
    image: '/images/hero-nz.jpg',
  },
  {
    id: 2,
    image: '/images/hero-whitehaven.jpg',
  },
  {
    id: 3,
    image: '/images/hero-queenstown.jpg',
  },
];

export default function HeroSlider() {
  const { open: openModal } = useQuoteModal();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('home.hero');
  const tNav = useTranslations('nav');

  const next = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[current].image})`,
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-10">
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-6 block drop-shadow-md">
                {t(`slides.${current}.location`)}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-lg">
                {t(`slides.${current}.title`)}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans drop-shadow-md">
                {t(`slides.${current}.subtitle`)}
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20"
              >
                {tNav('getQuote')}
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {!mounted && (
          <div className="max-w-4xl opacity-0">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
              {t('slides.0.title')}
            </h1>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20"
            >
              {tNav('getQuote')}
            </button>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-x-0 bottom-12 z-20 flex items-center justify-center gap-10">
        <button
          onClick={prev}
          className="p-2 text-white/40 hover:text-gold transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-8 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 text-white/40 hover:text-gold transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
