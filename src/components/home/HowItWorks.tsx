'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import {
  MessageSquare,
  FileText,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    icon: FileText,
    color: 'from-stone-500 to-stone-700',
    bg: 'bg-stone-50',
    border: 'border-stone-200',
    dot: 'bg-stone-500',
  },
  {
    icon: Sparkles,
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    dot: 'bg-yellow-500',
  },
  {
    icon: CheckCircle2,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    icon: HeartHandshake,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();
  const router = useRouter();
  const [active, setActive] = useState(0);

  const steps = [0, 1, 2, 3, 4].map((i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: t(`steps.${i}.title`),
    short: t(`steps.${i}.short`),
    description: t(`steps.${i}.description`),
    detail: t(`steps.${i}.detail`),
    cta: t(`steps.${i}.cta`),
    ctaHref: ['/quote', null, null, '/quote', '/contact'][i],
    ...STEPS[i],
  }));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold font-bold">
            {t('label')}
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-hero">
            {t('title')}
          </h2>
          <p className="mt-4 text-hero/60 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Desktop: two-column layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-0 mb-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex flex-col items-center gap-3 px-4 py-6 transition-all duration-300 group cursor-pointer border-b-2 ${
                  isActive ? 'border-gold' : 'border-transparent hover:border-sand'
                }`}
              >
                {/* Number */}
                <span className={`text-[10px] font-sans font-bold tracking-[0.3em] transition-colors ${
                  isActive ? 'text-gold' : 'text-hero/30 group-hover:text-hero/50'
                }`}>
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${step.color} shadow-lg`
                    : 'bg-stone-100 group-hover:bg-stone-200'
                }`}>
                  <Icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-hero/40'}
                  />
                </div>

                {/* Label */}
                <span className={`text-xs font-sans font-semibold text-center leading-tight transition-colors ${
                  isActive ? 'text-hero' : 'text-hero/50 group-hover:text-hero/70'
                }`}>
                  {step.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop: detail panel */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {steps.map((step, i) =>
              active === i ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`${step.bg} border ${step.border} p-10 grid grid-cols-2 gap-12 items-center`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-2 h-2 rounded-full ${step.dot}`} />
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-hero/50">
                        {t('stepLabel')} {step.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-hero mb-4">
                      {step.title}
                    </h3>
                    <p className="text-hero/65 font-sans text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <p className="text-hero/50 font-sans text-xs leading-relaxed">
                      {step.detail}
                    </p>
                    {step.ctaHref && (
                      <button
                        onClick={() => router.push(step.ctaHref as string)}
                        className="mt-8 inline-flex items-center gap-2 bg-gold text-white px-7 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
                      >
                        {step.cta} <ArrowRight size={12} />
                      </button>
                    )}
                  </div>

                  {/* Visual: step connector */}
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                      {(() => { const Icon = step.icon; return <Icon size={40} className="text-white" />; })()}
                    </div>
                    {/* Progress dots */}
                    <div className="flex gap-2 mt-6">
                      {steps.map((_, j) => (
                        <button
                          key={j}
                          onClick={() => setActive(j)}
                          className={`transition-all duration-300 rounded-full ${
                            j === i ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-hero/20 hover:bg-hero/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isOpen = active === i;
            return (
              <div key={i} className={`border ${isOpen ? step.border : 'border-stone-100'} transition-all`}>
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isOpen ? `bg-gradient-to-br ${step.color}` : 'bg-stone-100'
                  }`}>
                    <Icon size={18} className={isOpen ? 'text-white' : 'text-hero/40'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-sans font-bold tracking-[0.2em] ${isOpen ? 'text-gold' : 'text-hero/30'}`}>
                      {step.number}
                    </span>
                    <p className={`font-sans text-sm font-semibold mt-0.5 ${isOpen ? 'text-hero' : 'text-hero/60'}`}>
                      {step.short}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-hero/40 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 ${step.bg}`}>
                        <p className="text-hero/65 font-sans text-sm leading-relaxed mb-2">
                          {step.description}
                        </p>
                        <p className="text-hero/45 font-sans text-xs leading-relaxed">
                          {step.detail}
                        </p>
                        {step.ctaHref && (
                          <button
                            onClick={() => router.push(step.ctaHref as string)}
                            className="mt-5 inline-flex items-center gap-2 bg-gold text-white px-6 py-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
                          >
                            {step.cta} <ArrowRight size={11} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-hero/50 font-sans text-xs uppercase tracking-widest mb-5">
            {t('bottomLabel')}
          </p>
          <button
            onClick={() => router.push('/quote')}
            className="inline-flex items-center gap-3 bg-hero text-white px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.25em] hover:bg-gold transition-colors duration-300 shadow-xl"
          >
            {t('bottomCta')} <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
