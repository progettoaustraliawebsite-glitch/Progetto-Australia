export const revalidate = 60;

import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  MessageSquare,
  FileText,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Mail,
} from 'lucide-react';
import OpenModalButton from '@/components/ui/OpenModalButton';
import HowItWorksFaq from '@/components/how-it-works/HowItWorksFaq';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT
    ? 'Come Funziona – Progetto Australia'
    : 'How It Works – Progetto Australia';
  const description = isIT
    ? 'Scopri come prenotare il tuo viaggio su misura in Australia, Nuova Zelanda e Isole del Pacifico. Un processo semplice, trasparente e guidato da esperti italiani in loco.'
    : 'Find out how to book your tailor-made trip to Australia, New Zealand and the Pacific Islands. A simple, transparent process guided by Italian experts on the ground.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/how-it-works` },
    twitter: { title, description },
  };
}

const STEP_ICONS = [MessageSquare, FileText, Sparkles, CheckCircle2, HeartHandshake];
const STEP_COLORS = [
  { gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-500', text: 'text-amber-600' },
  { gradient: 'from-stone-500 to-stone-700', light: 'bg-stone-50', border: 'border-stone-200', dot: 'bg-stone-500', text: 'text-stone-600' },
  { gradient: 'from-yellow-500 to-amber-600', light: 'bg-yellow-50', border: 'border-yellow-100', dot: 'bg-yellow-500', text: 'text-yellow-600' },
  { gradient: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  { gradient: 'from-blue-500 to-indigo-600', light: 'bg-blue-50', border: 'border-blue-100', dot: 'bg-blue-500', text: 'text-blue-600' },
];

export default async function HowItWorksPage() {
  const locale = (await getLocale()) as 'it' | 'en';
  const t = await getTranslations('howItWorksPage');
  const tNav = await getTranslations('nav');

  const steps = [0, 1, 2, 3, 4].map((i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    detail: t(`steps.${i}.detail`),
    bullets: [
      t(`steps.${i}.b1`),
      t(`steps.${i}.b2`),
      t(`steps.${i}.b3`),
    ].filter(Boolean),
    hasCta: i === 3,
    ctaHref: '/quote',
    ctaLabel: t('ctaQuote'),
    color: STEP_COLORS[i],
    Icon: STEP_ICONS[i],
  }));

  const faqItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('heroTitle'),
    description: t('heroSubtitle'),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  return (
    <>
      <JsonLd data={howToSchema} />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #b0a377 0%, transparent 60%)' }}
        />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <span className="inline-block text-[10px] font-sans uppercase tracking-[0.3em] text-gold font-bold mb-4">
            {t('heroLabel')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
            {t('heroTitle')}
          </h1>
          <p className="text-white/65 font-sans text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-hero">
              {t('stepsTitle')}
            </h2>
            <p className="mt-3 text-hero/55 font-sans text-sm max-w-xl mx-auto">
              {t('stepsSubtitle')}
            </p>
          </div>

          <div className="space-y-6 md:space-y-0 relative">
            {/* Vertical connector — visible only md+ */}
            <div className="absolute left-[47px] top-8 bottom-8 w-px bg-stone-100 hidden md:block" />

            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={i} className="relative md:flex md:gap-10 md:pb-12 md:last:pb-0">

                  {/* Mobile: horizontal header row */}
                  <div className="flex items-center gap-4 mb-3 md:hidden">
                    <div className="relative flex-shrink-0 z-10">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color.gradient} flex items-center justify-center shadow-md`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${step.color.dot} flex items-center justify-center text-white text-[8px] font-bold font-sans`}>
                        {i + 1}
                      </span>
                    </div>
                    <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.25em] ${step.color.text}`}>
                      {t('stepLabel')} {step.number}
                    </span>
                  </div>

                  {/* Desktop: icon column */}
                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon size={36} className="text-white" />
                    </div>
                    <span className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${step.color.dot} flex items-center justify-center text-white text-[9px] font-bold font-sans`}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Content box */}
                  <div className={`flex-1 ${step.color.light} border ${step.color.border} p-5 md:p-8 rounded-2xl`}>
                    <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.25em] ${step.color.text} hidden md:block mb-2`}>
                      {t('stepLabel')} {step.number}
                    </span>
                    <h3 className="font-serif text-lg md:text-2xl font-bold text-hero mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-hero/65 font-sans text-sm leading-relaxed mb-3 md:mb-4">
                      {step.description}
                    </p>
                    <p className="text-hero/50 font-sans text-sm leading-relaxed mb-4 md:mb-5">
                      {step.detail}
                    </p>
                    {step.bullets.length > 0 && (
                      <ul className="space-y-2 mb-4 md:mb-5">
                        {step.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-hero/60 font-sans">
                            <span className={`w-1.5 h-1.5 rounded-full ${step.color.dot} mt-2 flex-shrink-0`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.hasCta && (
                      <Link
                        href={step.ctaHref}
                        className="inline-flex items-center gap-2 bg-hero text-white px-6 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-gold transition-colors"
                      >
                        {step.ctaLabel} <ArrowRight size={11} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US STRIP ── */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <p className="font-serif text-3xl font-bold text-gold">{t(`why.${i}.stat`)}</p>
                <p className="font-sans font-bold text-sm text-hero">{t(`why.${i}.title`)}</p>
                <p className="font-sans text-xs text-hero/55 leading-relaxed max-w-xs">{t(`why.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold font-bold">{t('faqLabel')}</span>
            <h2 className="mt-3 font-serif text-2xl md:text-4xl font-bold text-hero">{t('faqTitle')}</h2>
          </div>
          <HowItWorksFaq items={faqItems} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-20 bg-hero">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold font-bold">{t('ctaLabel')}</span>
          <h2 className="mt-4 font-serif text-2xl md:text-4xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/60 font-sans text-sm mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <OpenModalButton className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity shadow-xl">
              {tNav('getQuote')} <ArrowRight size={14} />
            </OpenModalButton>
            <a
              href="mailto:info@progettoaustralia.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:border-white/60 transition-colors"
            >
              <Mail size={13} /> Email
            </a>
          </div>
          <p className="mt-8 text-white/35 font-sans text-xs">
            {t('ctaNote')}
          </p>
        </div>
      </section>
    </>
  );
}
