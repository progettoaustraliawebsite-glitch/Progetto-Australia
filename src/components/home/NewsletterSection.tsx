'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';

const copy = {
  it: {
    label: 'Resta Aggiornato',
    title: 'Non perdere nessuna avventura',
    subtitle: 'Iscriviti alla nostra newsletter e ricevi itinerari esclusivi, offerte speciali e ispirazioni di viaggio direttamente nella tua casella email.',
    placeholder: 'La tua email',
    cta: 'Iscriviti',
    privacy: 'Nessuno spam. Puoi disiscriverti in qualsiasi momento.',
    success: 'Grazie! Ti aggiungeremo alla lista.',
    error: 'Inserisci un indirizzo email valido.',
  },
  en: {
    label: 'Stay Updated',
    title: 'Don\'t miss any adventure',
    subtitle: 'Subscribe to our newsletter and receive exclusive itineraries, special offers and travel inspiration straight to your inbox.',
    placeholder: 'Your email address',
    cta: 'Subscribe',
    privacy: 'No spam. Unsubscribe at any time.',
    success: 'Thank you! We\'ll add you to the list.',
    error: 'Please enter a valid email address.',
  },
};

export default function NewsletterSection() {
  const locale = useLocale() as 'it' | 'en';
  const c = copy[locale];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    // TODO: integrate with email service (Mailchimp, ConvertKit, etc.)
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-sans uppercase tracking-[0.3em] mb-4 block" style={{ color: '#b0a377' }}>
          {c.label}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          {c.title}
        </h2>
        <p className="text-white/70 font-sans text-sm leading-relaxed mb-10 max-w-md mx-auto">
          {c.subtitle}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-5">
            <CheckCircle size={22} style={{ color: '#b0a377' }} />
            <p className="font-sans text-sm font-bold uppercase tracking-widest" style={{ color: '#b0a377' }}>
              {c.success}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder={c.placeholder}
              className="flex-1 px-5 py-4 text-sm font-sans bg-white/8 border border-white/15 text-white placeholder-white/50 outline-none focus:border-gold transition-colors duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-4 text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85 shrink-0"
              style={{ backgroundColor: '#b0a377', color: '#1a1a1a' }}
            >
              {c.cta} <Send size={13} />
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-xs font-sans text-red-400">{c.error}</p>
        )}

        <p className="mt-5 text-white/50 text-xs font-sans">{c.privacy}</p>
      </div>
    </section>
  );
}
