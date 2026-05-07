'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'newsletter_popup_dismissed';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Inserisci un indirizzo email valido');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="relative bg-[#1a1a1a] border border-[#2e2e2e] shadow-2xl overflow-hidden">
            {/* Gold accent bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-gray-500 hover:text-gold transition-colors z-10"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            <div className="p-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-white uppercase tracking-widest mb-2">
                      Benvenuto!
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Il tuo codice sconto <span className="text-gold font-bold">AUSSIE10</span> è in arrivo nella tua casella email.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Tag */}
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">
                      Offerta Esclusiva
                    </p>

                    {/* Headline */}
                    <h3 className="font-serif text-2xl text-white uppercase tracking-wide leading-tight mb-1">
                      10% di Sconto
                    </h3>
                    <p className="font-serif text-sm text-gray-400 italic mb-4">
                      sul tuo prossimo viaggio in Australia
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mb-5" />

                    <p className="text-xs text-gray-400 leading-relaxed mb-5">
                      Iscriviti alla nostra newsletter e ricevi subito il codice sconto + ispirazioni di viaggio, offerte speciali e itinerari esclusivi.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="email"
                          placeholder="La tua email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-[#111] border border-[#2e2e2e] text-white text-sm outline-none focus:border-gold transition-colors placeholder:text-gray-600"
                        />
                      </div>
                      {error && (
                        <p className="text-[10px] text-red-500 uppercase font-bold">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold text-black py-3 text-[10px] font-bold uppercase tracking-[0.25em] hover:opacity-85 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/10"
                      >
                        {loading ? 'Un attimo...' : (
                          <>Ottieni lo Sconto <ArrowRight size={13} /></>
                        )}
                      </button>
                    </form>

                    <p className="text-[10px] text-gray-600 text-center mt-3 leading-relaxed">
                      Niente spam. Disdici quando vuoi.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
