'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const SLIDES = [
  { image: '/images/hero-australia.png' },
  { image: '/images/hero-new-zealand.png' },
  { image: '/images/hero-fiji.png' },
  { image: '/images/hero-samoa.png' },
  { image: '/images/hero-french-polynesia.png' },
];

const SLIDE_COUNT = SLIDES.length;

export default function HeroSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('home.hero');

  const next = useCallback(() => {
    setCurrent((prev) => (prev === SLIDE_COUNT - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden bg-hero mb-[-2px]">

      {/* Background images — crossfade */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/42" />

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
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((window as any).dataLayer = (window as any).dataLayer || []).push({ event: 'cta_click', cta_location: 'hero' });
                  }
                  router.push('/quote');
                }}
                className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20"
              >
                {t('cta')}
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

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-6 h-2 bg-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
