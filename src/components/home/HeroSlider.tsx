'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const SLIDE_COUNT = 4;

export default function HeroSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('home.hero');
  const tNav = useTranslations('nav');

  const next = useCallback(() => {
    setCurrent((prev) => (prev === SLIDE_COUNT - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hero">
      {/* Static image background — mobile only */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-sydney.jpg)' }}
      />

      {/* YouTube video background — desktop only */}
      <iframe
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.78vh',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          pointerEvents: 'none',
        }}
        src="https://www.youtube.com/embed/IcZhtJZP7eY?controls=0&autoplay=1&mute=1&loop=1&playlist=IcZhtJZP7eY&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&start=5"
        title="Progetto Australia"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/38" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-10">
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-6 block drop-shadow-md">
                {t(`slides.${current}.location`)}
              </span>
              <h1 className="font-serif text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-lg">
                {t(`slides.${current}.title`)}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans drop-shadow-md">
                {t(`slides.${current}.subtitle`)}
              </p>
              <button
                onClick={() => router.push('/quote')}
                className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20"
              >
                {tNav('getQuote')}
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {!mounted && (
          <div className="max-w-4xl opacity-0">
            <h1 className="font-serif text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
              {t('slides.0.title')}
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
