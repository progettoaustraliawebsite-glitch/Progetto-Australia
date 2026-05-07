'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { ChevronRight, ChevronLeft, PlusCircle, X, CheckCircle2, Plane, Users, Baby, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { destinations } from '@/data/destinations';

interface SelectedDest {
  id: string;
  nights: number;
}

const QuoteForm = () => {
  const router = useRouter();
  const locale = useLocale() as 'it' | 'en';
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    nome: '', cognome: '', email: '', telefono: '',
    adulti: 2, teen: 0, bambini: 0,
    destinazioni: [{ id: '', nights: 7 }] as SelectedDest[], 
    dataInizio: '', dataFine: '',
    flessibilita: 'esatta', tipologia: 'avventura', budget: '', note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDestChange = (index: number, id: string) => {
    const newDest = [...formData.destinazioni];
    newDest[index] = { ...newDest[index], id };
    setFormData({ ...formData, destinazioni: newDest });
  };

  const handleNightsChange = (index: number, nights: number) => {
    const newDest = [...formData.destinazioni];
    newDest[index] = { ...newDest[index], nights: Math.max(1, nights) };
    setFormData({ ...formData, destinazioni: newDest });
  };

  const addDest = () => {
    if (formData.destinazioni.length < destinations.length) {
      setFormData({ ...formData, destinazioni: [...formData.destinazioni, { id: '', nights: 7 }] });
    }
  };

  const removeDest = (index: number) => {
    const newDest = formData.destinazioni.filter((_, i) => i !== index);
    setFormData({ ...formData, destinazioni: newDest.length ? newDest : [{ id: '', nights: 7 }] });
  };

  const totalNights = formData.destinazioni.reduce((sum, d) => sum + d.nights, 0);
  const totalTravelers = Number(formData.adulti) + Number(formData.teen) + Number(formData.bambini);

  const isStep1Valid = formData.nome.trim() !== '' && formData.cognome.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@');
  const isStep2Valid = formData.destinazioni.every(d => d.id !== '') && formData.dataInizio !== '' && formData.dataFine !== '';
  const isStep3Valid = formData.budget !== '';

  const nextStep = () => {
    if ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid)) {
      setStep(prev => prev + 1);
    }
  };
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const err = await response.json();
        alert(`Errore durante l'invio a HubSpot: ${err.error || 'Riprova più tardi'}`);
      }
    } catch (error) {
      alert("Errore di connessione. Controlla la tua rete e riprova.");
    } finally {
      setIsSending(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const getAvailableDestinations = (currentIndex: number) => {
    const selectedOtherIds = formData.destinazioni
      .map((d, i) => i !== currentIndex ? d.id : null)
      .filter(Boolean);
    return destinations.filter(d => !selectedOtherIds.includes(d.id));
  };

  const TOTAL_STEPS = 3;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4" style={{ backgroundColor: '#111' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg p-12 text-center"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(249, 178, 51, 0.1)', border: '1px solid #f9b233' }}>
            <CheckCircle2 size={32} style={{ color: '#f9b233' }} />
          </div>
          <h2 className="font-serif text-3xl text-white mb-4 uppercase tracking-widest">Richiesta Ricevuta!</h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: '#999' }}>
            Grazie <span style={{ color: '#f9b233' }}>{formData.nome}</span>, il tuo progetto per un viaggio su misura è in buone mani.
          </p>
          <div className="p-6 rounded-xl mb-10 text-sm space-y-2 text-left" style={{ backgroundColor: '#111', border: '1px solid #2e2e2e', color: '#888' }}>
            <p>Riepilogo: <span className="font-bold text-white">{totalTravelers} viaggiatori</span> ({formData.adulti} Ad, {formData.teen} Tn, {formData.bambini} Bb)</p>
            <p>Durata: <span className="font-bold text-white">{totalNights} notti</span></p>
            <p>Budget: <span className="font-bold text-white">{formData.budget}</span></p>
          </div>
          <p className="mb-10" style={{ color: '#666' }}>
            I nostri esperti analizzeranno i dettagli e ti invieranno una proposta via email entro 48 ore.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: '#f9b233', color: '#1a1a1a' }}
          >
            Torna alla Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4" style={{ backgroundColor: '#111' }}>
      <div className="w-full max-w-lg shadow-2xl overflow-hidden" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2e2e2e' }}>
          <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: '#f9b233' }}>
            Preventivo Personalizzato
          </p>
          <h2 className="font-serif text-3xl text-white">Pianifica il tuo Viaggio</h2>
          
          {/* Step indicator */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                    style={{
                      backgroundColor: s <= step ? '#f9b233' : '#2e2e2e',
                      color: s <= step ? '#1a1a1a' : '#666',
                    }}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className="h-px w-6 transition-all duration-300"
                      style={{ backgroundColor: s < step ? '#f9b233' : '#2e2e2e' }}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#555' }}>
              Passaggio {step} di {TOTAL_STEPS}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" {...variants} className="space-y-5">
                  <Field label="Nome *" required>
                    <input type="text" name="nome" className="w-full px-4 py-3 text-sm bg-transparent outline-none border transition-colors focus:border-gold" style={inputStyle(false)} value={formData.nome} onChange={handleChange} required />
                  </Field>
                  <Field label="Cognome *" required>
                    <input type="text" name="cognome" className="w-full px-4 py-3 text-sm bg-transparent outline-none border transition-colors focus:border-gold" style={inputStyle(false)} value={formData.cognome} onChange={handleChange} required />
                  </Field>
                  <Field label="Email *" required>
                    <input type="email" name="email" className="w-full px-4 py-3 text-sm bg-transparent outline-none border transition-colors focus:border-gold" style={inputStyle(false)} value={formData.email} onChange={handleChange} required />
                  </Field>
                  <Field label="Telefono">
                    <input type="tel" name="telefono" className="w-full px-4 py-3 text-sm bg-transparent outline-none border transition-colors focus:border-gold" style={inputStyle(false)} value={formData.telefono} onChange={handleChange} />
                  </Field>
                  
                  <div className="pt-4 border-t border-white/5">
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: '#888' }}>Composizione Viaggiatori</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 text-center">
                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Adulti</label>
                        <input type="number" name="adulti" min="1" className="w-full text-center p-2 bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none" value={formData.adulti} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 text-center">
                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Teen (12-17)</label>
                        <input type="number" name="teen" min="0" className="w-full text-center p-2 bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none" value={formData.teen} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 text-center">
                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bambini (2-11)</label>
                        <input type="number" name="bambini" min="0" className="w-full text-center p-2 bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none" value={formData.bambini} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" {...variants} className="space-y-5">
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest font-bold" style={{ color: '#888' }}>Destinazioni e Notti *</label>
                    {formData.destinazioni.map((dest, index) => (
                      <div key={index} className="flex gap-2 items-end bg-[#111] p-4 border border-[#2e2e2e]">
                        <div className="flex-1 space-y-1">
                          <select 
                            className="w-full p-2 bg-transparent text-white focus:border-gold outline-none border-b border-[#2e2e2e] text-sm cursor-pointer" 
                            value={dest.id} 
                            onChange={(e) => handleDestChange(index, e.target.value)} 
                            required
                          >
                            <option value="" disabled className="bg-[#1a1a1a]">Scegli una meta</option>
                            {getAvailableDestinations(index).map(d => (
                              <option key={d.id} value={d.id} className="bg-[#1a1a1a]">{d.name[locale]}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-20 space-y-1">
                          <input 
                            type="number" 
                            min="1" 
                            className="w-full p-2 bg-transparent text-white focus:border-gold outline-none border-b border-[#2e2e2e] text-sm text-center" 
                            value={dest.nights} 
                            onChange={(e) => handleNightsChange(index, parseInt(e.target.value))}
                            required
                          />
                        </div>
                        {formData.destinazioni.length > 1 && (
                          <button type="button" onClick={() => removeDest(index)} className="text-gray-600 hover:text-red-500 transition-colors p-2">
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {formData.destinazioni.length < destinations.length && (
                      <button type="button" onClick={addDest} className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-all">
                        <PlusCircle size={14} /> Aggiungi un'altra meta
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <Field label="Inizio *">
                      <input type="date" name="dataInizio" className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] text-white focus:border-gold" style={{ colorScheme: 'dark' }} value={formData.dataInizio} onChange={handleChange} required />
                    </Field>
                    <Field label="Fine *">
                      <input type="date" name="dataFine" className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] text-white focus:border-gold" style={{ colorScheme: 'dark' }} value={formData.dataFine} onChange={handleChange} required />
                    </Field>
                  </div>

                  <Field label="Flessibilità">
                    <select name="flessibilita" className="w-full px-4 py-3 text-sm bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none cursor-pointer" value={formData.flessibilita} onChange={handleChange}>
                      <option value="esatta">Date esatte</option>
                      <option value="3gg">+/- 3 giorni</option>
                      <option value="7gg">+/- 1 settimana</option>
                    </select>
                  </Field>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" {...variants} className="space-y-5">
                  <Field label="Tipologia">
                    <select name="tipologia" className="w-full px-4 py-3 text-sm bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none cursor-pointer" value={formData.tipologia} onChange={handleChange}>
                      <option value="avventura">Avventura</option>
                      <option value="nozze">Viaggio di Nozze</option>
                      <option value="relax">Relax</option>
                      <option value="famiglia">Famiglia</option>
                    </select>
                  </Field>
                  <Field label="Budget *">
                    <select name="budget" className="w-full px-4 py-3 text-sm bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none cursor-pointer" value={formData.budget} onChange={handleChange} required>
                      <option value="" disabled>Seleziona fascia budget</option>
                      <option value="2.500€ - 3.500€">2.500€ - 3.500€</option>
                      <option value="3.500€ - 5.000€">3.500€ - 5.000€</option>
                      <option value="5.000€ - 7.500€">5.000€ - 7.500€</option>
                      <option value="Oltre 7.500€">Oltre 7.500€</option>
                    </select>
                  </Field>
                  
                  <Field label="Note e Desideri">
                    <textarea name="note" className="w-full px-4 py-3 text-sm bg-[#111] border border-[#2e2e2e] text-white focus:border-gold outline-none resize-none" rows={5} value={formData.note} onChange={handleChange} placeholder="Alloggi particolari, sogni nel cassetto..."></textarea>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer buttons */}
            <div className="mt-10 pt-8 flex items-center justify-between gap-3" style={{ borderTop: '1px solid #2e2e2e' }}>
              <div>
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-gold transition-colors">
                    Indietro
                  </button>
                )}
              </div>
              <button 
                type={step === TOTAL_STEPS ? 'submit' : 'button'}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && (!isStep3Valid || isSending))}
                onClick={step < TOTAL_STEPS ? nextStep : undefined}
                className={`px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                  ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid && !isSending))
                  ? 'bg-gold text-hero hover:opacity-80' 
                  : 'bg-[#2e2e2e] text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSending ? 'Invio...' : (step < TOTAL_STEPS ? 'Avanti' : 'Invia Richiesta')}
                {!isSending && step === TOTAL_STEPS && <Plane size={14} className="rotate-45" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    border: `1px solid ${hasError ? '#c0392b' : '#2e2e2e'}`,
    color: '#fff',
    backgroundColor: '#111',
  };
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] uppercase tracking-widest font-bold" style={{ color: '#888' }}>
        {label}{required && <span style={{ color: '#f9b233' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

export default QuoteForm;
