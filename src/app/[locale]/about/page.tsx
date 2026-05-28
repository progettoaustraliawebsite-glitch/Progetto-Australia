'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { team } from '@/data/team';
import type { TeamMember } from '@/data/team';
import { ShieldCheck, Globe, Clock, X, ChevronLeft, ChevronRight, Leaf, Heart, TreePine, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import OpenModalButton from '@/components/ui/OpenModalButton';

const steps = {
  it: [
    {
      n: '1',
      title: 'Raccontaci il viaggio che immagini',
      body: 'Compila il modulo di richiesta indicando destinazione, periodo, numero di viaggiatori e stile di viaggio. Puoi scegliere una singola meta oppure combinare più destinazioni come Australia, Nuova Zelanda e Pacifico. Che si tratti di una luna di miele, un viaggio on the road o un itinerario più rilassato, queste informazioni ci aiutano a costruire una proposta davvero adatta a te.',
      bullets: ['Destinazione singola o itinerari multi-country', 'Stile di viaggio e budget indicativo', 'Date preferite e flessibilità'],
    },
    {
      n: '2',
      title: 'Analizziamo la tua richiesta',
      body: 'La tua richiesta viene presa in carico da uno specialista della destinazione scelta, con esperienza diretta sul territorio. Entro circa 24 ore lavorative riceverai un primo riscontro e, se necessario, ti contatteremo per approfondire alcuni dettagli e capire meglio come immagini il viaggio.',
      bullets: ['Esperto dedicato in base alla destinazione', 'Contatto diretto e comunicazione chiara', "Consulenza personalizzata fin dall'inizio"],
    },
    {
      n: '3',
      title: 'Ricevi il tuo itinerario su misura',
      body: 'Prepariamo una proposta costruita attorno al tuo modo di viaggiare: itinerario, alloggi, trasporti, esperienze ed eventuali estensioni. Ogni preventivo è personalizzabile e pensato per trovare il giusto equilibrio tra tempi, spostamenti ed esperienze, evitando itinerari troppo intensi o poco fluidi.',
      bullets: ['Itinerario dettagliato giorno per giorno', 'Costi chiari e trasparenti', 'Modifiche possibili prima della conferma'],
    },
    {
      n: '4',
      title: "Pensiamo noi all'organizzazione",
      body: 'Una volta confermato il viaggio, gestiamo tutte le prenotazioni necessarie: alloggi, trasporti, escursioni, noleggi auto, assicurazioni e servizi collegati. Prima della partenza riceverai tutta la documentazione di viaggio con informazioni pratiche, dettagli delle prenotazioni e consigli utili per ogni tappa.',
      bullets: ['Gestione completa delle prenotazioni', 'Documentazione di viaggio dettagliata', 'Informazioni pratiche e consigli locali'],
    },
    {
      n: '5',
      title: 'Assistenza italiana durante il viaggio',
      body: 'Durante il viaggio rimani sempre in contatto con il nostro team italiano in Australia. In caso di necessità o imprevisti, avrai un supporto reale e diretto, senza intermediari. La nostra presenza in Oceania ci permette di offrirti assistenza concreta, con conoscenza diretta del territorio e fusi orari compatibili con la destinazione.',
      bullets: ['Supporto italiano durante il viaggio', 'Assistenza rapida in caso di necessità', 'Team con esperienza diretta in Oceania'],
    },
  ],
  en: [
    {
      n: '1',
      title: 'Tell us about the trip you have in mind',
      body: "Fill in the request form with your destination, travel dates, number of travellers and travel style. You can choose a single destination or combine several, such as Australia, New Zealand and the Pacific. Whether it's a honeymoon, a road trip or a relaxed itinerary, this information helps us build a proposal that truly suits you.",
      bullets: ['Single destination or multi-country itineraries', 'Travel style and indicative budget', 'Preferred dates and flexibility'],
    },
    {
      n: '2',
      title: 'We analyse your request',
      body: 'Your request is handled by a specialist for the chosen destination, with first-hand experience on the ground. Within approximately 24 working hours you will receive an initial response and, if needed, we will contact you to clarify details and better understand how you picture the trip.',
      bullets: ['Dedicated expert per destination', 'Direct contact and clear communication', 'Personalised advice from the very start'],
    },
    {
      n: '3',
      title: 'Receive your tailor-made itinerary',
      body: 'We prepare a proposal built around your way of travelling: itinerary, accommodation, transport, experiences and any extensions. Every quote is customisable and designed to find the right balance between timing, transfers and experiences, avoiding itineraries that are too intense or poorly paced.',
      bullets: ['Detailed day-by-day itinerary', 'Clear and transparent costs', 'Revisions possible before confirmation'],
    },
    {
      n: '4',
      title: 'We take care of everything',
      body: 'Once the trip is confirmed, we manage all the necessary bookings: accommodation, transport, excursions, car hire, insurance and related services. Before departure you will receive all travel documentation with practical information, booking details and useful tips for each stage.',
      bullets: ['Complete booking management', 'Detailed travel documentation', 'Practical info and local tips'],
    },
    {
      n: '5',
      title: 'Italian support during your trip',
      body: 'During your trip you stay in constant contact with our Italian team in Australia. Should anything come up, you have real, direct support — no intermediaries. Our presence in Oceania means we can offer hands-on assistance, with direct knowledge of the territory and time zones aligned with your destination.',
      bullets: ['Italian support throughout the trip', 'Rapid assistance when needed', 'Team with direct experience in Oceania'],
    },
  ],
};

const copy = {
  it: {
    heroLabel: 'La Nostra Storia',
    heroTitle: 'Chi Siamo',
    howLabel: 'Come funziona',
    howTitle: 'Prenotare con noi è semplice',
    howIntro: 'Ti accompagniamo in ogni fase del viaggio, dalla prima richiesta fino al rientro. Nessun call center impersonale: parlerai sempre con persone reali, con esperienza diretta delle destinazioni che proponiamo.',
    howStepsTitle: 'Il tuo viaggio in 5 passi',
    storyLabel: 'Il Nostro Progetto',
    storyTitle: 'Da chi viaggia per chi viaggia',
    storyP1: "Progetto Australia nasce da una passione autentica per l'Oceania e dal desiderio di farti vivere queste terre nel modo giusto: attraverso itinerari cuciti su di te, lontani dai soliti pacchetti standard.",
    storyP2: "Negli anni abbiamo trasformato questa dedizione in un progetto specializzato per Australia, Nuova Zelanda e isole del Pacifico. Selezioniamo personalmente ogni luogo, struttura ed esperienza, testandoli direttamente sul territorio per garantirti solo il meglio.",
    storyP3: 'Crediamo in un modo di viaggiare fatto di equilibrio, cura dei dettagli e ritmi sostenibili. Perché conoscere davvero una destinazione significa, prima di tutto, sapere come viverla.',
    val1Title: 'Esperienza diretta sul territorio',
    val1Text: "Viviamo e lavoriamo in Australia dal 2007. La nostra conoscenza delle destinazioni nasce dall'esperienza quotidiana, dai viaggi fatti personalmente e da un contatto diretto con il territorio e i partner locali.",
    val2Title: 'Viaggi costruiti su misura',
    val2Text: "Ogni itinerario viene progettato in base al modo di viaggiare della persona: dai ritmi agli spostamenti, dalla scelta delle esperienze fino all'equilibrio tra scoperta, relax e autenticità. Non proponiamo pacchetti standardizzati, ma viaggi costruiti davvero attorno a chi parte.",
    val3Title: 'Assistenza reale durante il viaggio',
    val3Text: 'Durante il viaggio rimani sempre in contatto con il nostro team italiano in Oceania. In caso di necessità, hai un supporto diretto, rapido e nella tua lingua, con persone che conoscono realmente le destinazioni.',
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
    howLabel: 'How it works',
    howTitle: 'Booking with us is simple',
    howIntro: 'We accompany you at every stage of the journey, from the first enquiry to your return. No impersonal call centre: you will always speak with real people who have first-hand experience of the destinations we offer.',
    howStepsTitle: 'Your trip in 5 steps',
    storyLabel: 'Our Project',
    storyTitle: 'From Travellers, For Travellers',
    storyP1: 'Progetto Australia was born from a genuine passion for Oceania and the desire to help you experience these lands the right way: through itineraries tailored to you, far from standard off-the-shelf packages.',
    storyP2: 'Over the years we have turned this dedication into a specialist project for Australia, New Zealand and the Pacific Islands. We personally select every place, property and experience, testing them directly on the ground to guarantee only the best.',
    storyP3: 'We believe in travel built on balance, attention to detail and sustainable pacing. Because truly knowing a destination means, first and foremost, knowing how to live it.',
    val1Title: 'Expertise on the Ground',
    val1Text: 'We have lived and worked in Australia since 2007. Our knowledge of these destinations comes from daily experience, personal travel and direct contact with the territory and local partners.',
    val2Title: 'Tailor-Made Journeys',
    val2Text: 'Every itinerary is designed around how you like to travel: from pace and transfers to choice of experiences and the balance between discovery, relaxation and authenticity. We do not offer standard packages — we build trips truly around the person.',
    val3Title: 'Real Assistance During Your Trip',
    val3Text: 'Throughout your journey you stay in constant contact with our Italian team in Oceania. Should you need anything, you have direct, fast support in your own language from people who genuinely know these destinations.',
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
          style={{ backgroundImage: "url('/images/hero-sydney.webp')" }}
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
              <p>{c.storyP3}</p>
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
                className="group flex-none w-[290px] flex flex-col overflow-hidden snap-start cursor-pointer"
                style={{ backgroundColor: '#2a2a2a' }}
                onClick={() => setSelectedMember(member)}
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: member.photoPosition ?? 'top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
            <Image src="/images/logos/travellife-partner.webp" alt="Travelife Partner" width={120} height={56} className="h-14 w-auto object-contain opacity-80" />
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
