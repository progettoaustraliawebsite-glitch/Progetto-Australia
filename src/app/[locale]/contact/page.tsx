'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useQuoteModal } from '@/context/QuoteModalContext';

export default function ContactPage() {
  const t = useTranslations('contact');
  const { open: openModal } = useQuoteModal();

  return (
    <div className="bg-sand/20 min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-4 block">
            Brisbane, Australia
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto italic font-sans">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold/10 grid grid-cols-1 md:grid-cols-2">
          
          {/* Info Side */}
          <div className="p-12 md:p-16 bg-charcoal text-white">
            <h2 className="font-serif text-3xl font-bold mb-10 text-gold">{t('info.based')}</h2>
            
            <ul className="space-y-8">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Indirizzo</span>
                  <p className="text-sm leading-relaxed">{t('info.address')}</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Telefono</span>
                  <p className="text-sm">{t('info.phone')}</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Email</span>
                  <p className="text-sm">{t('info.email')}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Side */}
          <div className="p-12 md:p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mb-8">
              <MessageSquare size={32} className="text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-6 uppercase tracking-widest">Inizia a Progettare</h3>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-10">
              Preferiamo ascoltare i tuoi sogni a voce o tramite il nostro modulo guidato per offrirti un servizio davvero su misura.
            </p>
            <button 
              onClick={openModal}
              className="bg-gold text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-charcoal transition-all shadow-xl shadow-gold/20"
            >
              Apri Modulo di Contatto
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
