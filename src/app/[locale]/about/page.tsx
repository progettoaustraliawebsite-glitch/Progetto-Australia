'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { team } from '@/data/team';
import { ShieldCheck, Globe, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';

export default function AboutPage() {
  const locale = useLocale() as 'it' | 'en';
  const t = useTranslations('nav');

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' as const }
  };

  return (
    <div className="bg-sand/30 overflow-hidden">
      {/* Hero Section - Coerente con lo stile del sito */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
          style={{ backgroundImage: "url('/images/hero-sydney.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero/40 via-transparent to-hero/90" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-4 block">
            {locale === 'it' ? 'La Nostra Storia' : 'Our Story'}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-none">
            {locale === 'it' ? 'Chi Siamo' : 'About Us'}
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </motion.div>
      </section>

      {/* Value Proposition - Pulita ed Elegante */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <motion.div {...fadeIn} className="group text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:bg-gold transition-all duration-500">
              <Globe className="text-gold group-hover:text-hero transition-colors duration-500" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-hero mb-4 uppercase tracking-wider">Esperti Locali</h3>
            <p className="text-hero/60 leading-relaxed font-sans text-sm">
              Viviamo l'Australia ogni giorno dal 2007. La nostra non è solo una professione, è la nostra vita nel Pacifico.
            </p>
          </motion.div>
          
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="group text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:bg-gold transition-all duration-500">
              <ShieldCheck className="text-gold group-hover:text-hero transition-colors duration-500" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-hero mb-4 uppercase tracking-wider">Senza Intermediari</h3>
            <p className="text-hero/60 leading-relaxed font-sans text-sm">
              Siamo operatori locali diretti. Questo significa prezzi trasparenti e un controllo totale sulla qualità del tuo viaggio.
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="group text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:bg-gold transition-all duration-500">
              <Clock className="text-gold group-hover:text-hero transition-colors duration-500" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-hero mb-4 uppercase tracking-wider">Sempre al tuo fianco</h3>
            <p className="text-hero/60 leading-relaxed font-sans text-sm">
              In caso di necessità, siamo qui. Assistenza in tempo reale nella tua lingua, 24 ore su 24, 7 giorni su 7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Section - Mix di Immagini e Testo */}
      <section className="py-24 bg-sand">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img 
                src="/images/about-story.jpg"
                alt="Viaggiatori in Australia"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-gold/20 rounded-lg -z-0 translate-x-4 translate-y-4" />
          </motion.div>
          
          <motion.div {...fadeIn} className="order-1 lg:order-2">
            <SectionHeader 
              label={locale === 'it' ? 'Il Nostro Progetto' : 'Our Project'}
              title={locale === 'it' ? 'Oltre i Confini del Viaggio' : 'Beyond the Travel Boundaries'}
              align="left"
              className="mb-8"
            />
            <div className="space-y-6 text-hero/70 leading-relaxed font-sans">
              <p>
                Progetto Australia non è una semplice agenzia, è un sogno condiviso. Tutto è nato dalla passione per l'esplorazione e dal desiderio di mostrare a chiunque la bellezza selvaggia dell'Oceania.
              </p>
              <p>
                Il nostro approccio è sartoriale: non vendiamo pacchetti pronti, ma cuciamo su misura ogni itinerario, ascoltando le tue passioni e i tuoi ritmi. Ogni destinazione che proponiamo è un luogo che abbiamo vissuto, amato e testato personalmente.
              </p>
            </div>
            <div className="mt-12">
              <Link 
                href="/quote"
                className="inline-flex items-center gap-4 px-12 py-5 bg-gold text-hero font-bold uppercase tracking-[0.2em] text-xs hover:bg-hero hover:text-white transition-all duration-500 shadow-xl shadow-gold/20"
              >
                Inizia a Sognare
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Grid - Personale e Professionale */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <SectionHeader 
          label={locale === 'it' ? 'Il Team' : 'The Team'}
          title={locale === 'it' ? 'Incontra i tuoi Consulenti' : 'Meet your Advisors'}
          subtitle={locale === 'it' ? 'Persone reali, esperti certificati, pronti a disegnare il tuo viaggio perfetto.' : 'Real people, certified experts, ready to design your perfect journey.'}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {team.map((member, i) => (
            <motion.div 
              key={member.id}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-8 shadow-lg group-hover:shadow-2xl transition-shadow duration-500 grayscale group-hover:grayscale-0">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-hero/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-hero mb-2 tracking-wide uppercase">{member.name}</h4>
              <p className="text-gold text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4">{member.role[locale]}</p>
              <div className="w-8 h-0.5 bg-gold/30 mb-6 mx-auto group-hover:w-20 transition-all duration-500" />
              <p className="text-hero/60 text-sm italic font-sans px-4 leading-relaxed line-clamp-4">
                "{member.bio[locale]}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - Coerente con il footer e lo stile */}
      <section className="py-24 bg-hero relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Il tuo viaggio inizia qui.
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto italic">
            "Viaggiare è la nostra passione. Condividerla con te è il nostro lavoro."
          </p>
          <Link 
            href="/quote"
            className="inline-flex items-center gap-4 px-12 py-5 bg-gold text-hero font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 shadow-2xl shadow-gold/20"
          >
            Prenota Consulenza Gratuita
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
