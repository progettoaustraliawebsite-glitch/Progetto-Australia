'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { team } from '@/data/team';
import type { TeamMember } from '@/data/team';
import { ShieldCheck, Globe, Clock, X, ChevronLeft, ChevronRight, Leaf, Heart, TreePine, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import OpenModalButton from '@/components/ui/OpenModalButton';

const copy = {
  it: {
    heroLabel: 'La Nostra Storia',
    heroTitle: 'Chi Siamo',
    storyLabel: 'Il Nostro Progetto',
    storyTitle: 'Oltre i Confini del Viaggio',
    storyP1: "Progetto Australia non è una semplice agenzia, è un sogno condiviso. Tutto è nato dalla passione per l'esplorazione e dal desiderio di mostrare a chiunque la bellezza selvaggia dell'Oceania.",
    storyP2: 'Il nostro approccio è sartoriale: non vendiamo pacchetti pronti, ma cuciamo su misura ogni itinerario, ascoltando le tue passioni e i tuoi ritmi. Ogni destinazione che proponiamo è un luogo che abbiamo vissuto, amato e testato personalmente.',
    val1Title: 'Esperti Locali',
    val1Text: "Viviamo l'Australia ogni giorno dal 2007. La nostra non è solo una professione, è la nostra vita nel Pacifico.",
    val2Title: 'Senza Intermediari',
    val2Text: 'Siamo operatori locali diretti. Questo significa prezzi trasparenti e un controllo totale sulla qualità del tuo viaggio.',
    val3Title: 'Sempre al Tuo Fianco',
    val3Text: 'In caso di necessità, siamo qui. Assistenza in tempo reale nella tua lingua, 24 ore su 24, 7 giorni su 7.',
    teamLabel: 'Il Team',
    teamTitle: 'Incontra i tuoi Consulenti',
    teamSubtitle: 'Persone reali, esperti certificati, pronti a disegnare il tuo viaggio perfetto.',
    readMore: 'Leggi di più',
    sustainLabel: 'Il Nostro Impegno',
    sustainTitle: 'Viaggiare con Responsabilità',
    sustainIntro: 'Viaggiare è vivere, crescere, sognare. Per noi è anche rispettare, proteggere, amare. La sostenibilità non è un optional — è il cuore del nostro modo di fare turismo.',
    sustain1Title: 'Ecoturismo',
    sustain1Text: 'Selezioniamo partner e operatori locali certificati, privilegiando esperienze a basso impatto ambientale e strutture eco-sostenibili.',
    sustain2Title: 'Comunità Locali',
    sustain2Text: 'Supportiamo progetti sociali come Still I Rise e Thank You, e lavoriamo a stretto contatto con le comunità indigene australiane.',
    sustain3Title: 'Travelife Partner',
    sustain3Text: 'Siamo certificati Travelife Partner: rispettiamo oltre 100 criteri di sostenibilità nella gestione, nelle operazioni e nella filiera dei fornitori.',
    sustainCta: 'Scopri la nostra politica di sostenibilità',
    ctaTitle: 'Il tuo viaggio inizia qui.',
    ctaQuote: '"Viaggiare è la nostra passione. Condividerla con te è il nostro lavoro."',
    ctaBtn: 'Prenota Consulenza Gratuita',
  },
  en: {
    heroLabel: 'Our Story',
    heroTitle: 'About Us',
    storyLabel: 'Our Project',
    storyTitle: 'Beyond the Boundaries of Travel',
    storyP1: 'Progetto Australia is more than a travel agency — it is a shared dream. Everything started from a passion for exploration and a desire to show everyone the wild beauty of Oceania.',
    storyP2: 'Our approach is tailor-made: we do not sell off-the-shelf packages, we craft every itinerary around your passions and your pace. Every destination we propose is a place we have lived, loved and personally tested.',
    val1Title: 'Local Experts',
    val1Text: 'We have lived and breathed Australia since 2007. This is not just a job for us — it is our life in the Pacific.',
    val2Title: 'No Middlemen',
    val2Text: 'We are direct local operators. That means transparent pricing and full control over the quality of your journey.',
    val3Title: 'Always by Your Side',
    val3Text: 'Whenever you need us, we are here. Real-time assistance in your language, 24 hours a day, 7 days a week.',
    teamLabel: 'The Team',
    teamTitle: 'Meet your Consultants',
    teamSubtitle: 'Real people, certified experts, ready to design your perfect journey.',
    readMore: 'Read more',
    sustainLabel: 'Our Commitment',
    sustainTitle: 'Travel with Responsibility',
    sustainIntro: 'Travelling means living, growing, dreaming. For us, it also means respecting, protecting and loving. Sustainability is not an option — it is at the heart of how we do tourism.',
    sustain1Title: 'Ecotourism',
    sustain1Text: 'We select certified local partners and operators, favouring low-impact experiences and eco-friendly accommodations.',
    sustain2Title: 'Local Communities',
    sustain2Text: 'We support social projects including Still I Rise and Thank You, and work closely with indigenous Australian communities.',
    sustain3Title: 'Travelife Partner',
    sustain3Text: 'We are Travelife Partner certified: we meet over 100 sustainability criteria in management, operations and our supplier chain.',
    sustainCta: 'Discover our sustainability policy',
    ctaTitle: 'Your journey starts here.',
    ctaQuote: '"Travel is our passion. Sharing it with you is our work."',
    ctaBtn: 'Book a Free Consultation',
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

export default function AboutPage() {
  const locale = useLocale() as 'it' | 'en';
  const c = copy[locale];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 280;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  };

  return (
    <div className="bg-sand/30 overflow-hidden">

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-hero overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
          style={{ backgroundImage: "url('/images/hero-sydney.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero/40 via-transparent to-hero/90" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' as const }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-4 block">
            {c.heroLabel}
          </span>
          <h1 className="font-serif text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-none">
            {c.heroTitle}
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </motion.div>
      </section>

      {/* Story text */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
          <motion.div {...fadeIn}>
            <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-3 block">
              {c.storyLabel}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-hero mb-5">
              {c.storyTitle}
            </h2>
            <div className="space-y-4 text-hero/65 leading-relaxed font-sans text-sm">
              <p>{c.storyP1}</p>
              <p>{c.storyP2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-sand/40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div {...fadeIn} className="group text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold transition-all duration-500">
                <Globe className="text-gold group-hover:text-hero transition-colors duration-500" size={22} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg font-bold text-hero mb-3 uppercase tracking-wider">{c.val1Title}</h3>
              <p className="text-hero/60 leading-relaxed font-sans text-sm">{c.val1Text}</p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="group text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold transition-all duration-500">
                <ShieldCheck className="text-gold group-hover:text-hero transition-colors duration-500" size={22} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg font-bold text-hero mb-3 uppercase tracking-wider">{c.val2Title}</h3>
              <p className="text-hero/60 leading-relaxed font-sans text-sm">{c.val2Text}</p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="group text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold transition-all duration-500">
                <Clock className="text-gold group-hover:text-hero transition-colors duration-500" size={22} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg font-bold text-hero mb-3 uppercase tracking-wider">{c.val3Title}</h3>
              <p className="text-hero/60 leading-relaxed font-sans text-sm">{c.val3Text}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Carousel */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div className="flex-1">
              <SectionHeader label={c.teamLabel} title={c.teamTitle} subtitle={c.teamSubtitle} light />
            </div>
            <div className="flex gap-2 mb-2 shrink-0 ml-6">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {team.map((member) => (
              <article
                key={member.id}
                className="group flex-none w-[240px] flex flex-col overflow-hidden snap-start cursor-pointer"
                style={{ backgroundColor: '#2a2a2a' }}
                onClick={() => setSelectedMember(member)}
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-serif text-base font-bold text-white mb-0.5">{member.name}</h4>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] mb-4" style={{ color: '#b0a377' }}>
                    {member.role[locale]}
                  </p>
                  <p className="text-xs font-sans leading-relaxed line-clamp-3 flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {member.bio[locale]}
                  </p>
                  <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em]" style={{ color: '#b0a377' }}>
                      {c.readMore}
                    </span>
                    <ChevronRight size={14} style={{ color: '#b0a377' }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div {...fadeIn} className="text-center mb-14">
            <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-3 block">{c.sustainLabel}</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-hero mb-5">{c.sustainTitle}</h2>
            <p className="text-hero/65 font-sans text-sm max-w-2xl mx-auto leading-relaxed">{c.sustainIntro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[
              { icon: <Leaf size={28} strokeWidth={1.5} />, title: c.sustain1Title, text: c.sustain1Text },
              { icon: <Heart size={28} strokeWidth={1.5} />, title: c.sustain2Title, text: c.sustain2Text },
              { icon: <TreePine size={28} strokeWidth={1.5} />, title: c.sustain3Title, text: c.sustain3Text },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="bg-emerald-50/60 border border-emerald-100 p-8 flex flex-col items-start gap-4"
              >
                <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center text-emerald-700">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-hero">{item.title}</h3>
                <p className="text-hero/60 text-sm font-sans leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Image src="/images/logos/travellife-partner.png" alt="Travelife Partner" width={120} height={56} className="h-14 w-auto object-contain opacity-80" />
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-3 px-8 py-3 border border-hero text-hero text-xs font-sans uppercase tracking-widest hover:bg-hero hover:text-white transition-all duration-300"
            >
              {c.sustainCta} <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-hero relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 relative z-10"
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">{c.ctaTitle}</h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto italic">{c.ctaQuote}</p>
          <OpenModalButton className="inline-flex items-center gap-4 px-12 py-5 bg-gold text-hero font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 shadow-2xl shadow-gold/20">
            {c.ctaBtn}
          </OpenModalButton>
        </motion.div>
      </section>

      {/* Member bio modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="bg-white max-w-sm w-full relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo — full, uncropped */}
              <div className="bg-stone-100 flex items-center justify-center">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-full h-auto object-contain max-h-72"
                />
              </div>
              <div className="px-6 pt-5 pb-1">
                <h4 className="font-serif text-xl font-bold text-hero">{selectedMember.name}</h4>
                <p className="text-gold text-[10px] font-sans font-bold uppercase tracking-[0.2em] mt-1">{selectedMember.role[locale]}</p>
              </div>

              {/* Bio */}
              <div className="px-6 pb-6 pt-3">
                <p className="text-hero/70 text-sm font-sans leading-relaxed">{selectedMember.bio[locale]}</p>
                {selectedMember.logos.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-sand flex flex-wrap items-center gap-3">
                    {selectedMember.logos.map((logo) => (
                      <Image key={logo.src} src={logo.src} alt={logo.alt} title={logo.alt} width={80} height={28} className="h-7 w-auto object-contain opacity-70" />
                    ))}
                  </div>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <X size={14} className="text-hero" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
