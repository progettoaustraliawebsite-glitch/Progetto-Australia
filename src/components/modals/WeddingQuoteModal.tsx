'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Trash2, Plane, CheckCircle2, Heart, Moon, MapPin, Calendar } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { destinations as destinationData } from '@/data/destinations';

type SelectedDest = {
  id: string;
  nights: number;
};

type FormData = {
  nome: string;
  cognome: string;
  email: string;
  phone: string;
  adults: number;
  teen: number;
  kids: number;
  isHoneymoon: boolean;
  destinazioni: SelectedDest[];
  startDate: string;
  endDate: string;
  flexibility: string;
  travelType: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const TOTAL_STEPS = 3;

export default function WeddingQuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const t = useTranslations('weddingQuote');
  const locale = useLocale() as 'it' | 'en';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    phone: '',
    adults: 2,
    teen: 0,
    kids: 0,
    isHoneymoon: false,
    destinazioni: [{ id: '', nights: 7 }],
    startDate: '',
    endDate: '',
    flexibility: 'esatta',
    travelType: 'avventura',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleClose() {
    close();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setForm({
        nome: '', cognome: '', email: '', phone: '', adults: 2, teen: 0, kids: 0,
        isHoneymoon: false, destinazioni: [{ id: '', nights: 7 }], startDate: '', endDate: '',
        flexibility: 'esatta', travelType: 'avventura', budget: '', message: ''
      });
      setErrors({});
    }, 300);
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    if (step === 1) {
      if (!form.nome.trim()) newErrors.nome = "Obbligatorio";
      if (!form.cognome.trim()) newErrors.cognome = "Obbligatorio";
      if (!form.email.trim() || !form.email.includes('@')) newErrors.email = "Email non valida";
      if (!form.phone.trim()) newErrors.phone = "Obbligatorio";
    } else if (step === 2) {
      if (form.destinazioni.some(d => !d.id)) newErrors.nome = "Seleziona le mete";
      if (!form.startDate) newErrors.nome = "Inserisci data inizio";
      if (!form.endDate) newErrors.nome = "Inserisci data ritorno";
    } else if (step === 3) {
      if (!form.budget) newErrors.nome = "Seleziona budget";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsSending(true);
    
    try {
      const apiData = {
        ...form,
        tipologia: form.isHoneymoon ? 'Viaggio di Nozze' : form.travelType,
        note: form.isHoneymoon ? `[LUNA DI MIELE] ${form.message}` : form.message,
        bambini: form.kids,
        dataInizio: form.startDate,
        dataFine: form.endDate,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });

      if (res.ok) setSubmitted(true);
      else alert("Errore nell'invio. Riprova.");
    } catch (e) {
      alert("Errore di connessione.");
    } finally {
      setIsSending(false);
    }
  }

  const handleDestChange = (index: number, id: string) => {
    const newDests = [...form.destinazioni];
    newDests[index] = { ...newDests[index], id };
    setForm({ ...form, destinazioni: newDests });
  };

  const handleNightsChange = (index: number, nights: number) => {
    const newDests = [...form.destinazioni];
    newDests[index] = { ...newDests[index], nights };
    setForm({ ...form, destinazioni: newDests });
  };

  const addDest = () => {
    if (form.destinazioni.length < destinationData.length) {
      setForm({ ...form, destinazioni: [...form.destinazioni, { id: '', nights: 7 }] });
    }
  };

  const removeDest = (index: number) => {
    const newDests = form.destinazioni.filter((_, i) => i !== index);
    setForm({ ...form, destinazioni: newDests.length ? newDests : [{ id: '', nights: 7 }] });
  };

  const totalNights = form.destinazioni.reduce((sum, d) => sum + d.nights, 0);

  const paxOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const nightOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => e.target === overlayRef.current && handleClose()}
        >
          <motion.div
            className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto bg-[#1a1a1a] border border-[#2e2e2e] shadow-2xl"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="p-8 border-b border-[#2e2e2e]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1 font-bold">Viaggio su Misura</p>
                  <h2 className="font-serif text-3xl text-white uppercase tracking-wider">Richiesta Preventivo</h2>
                </div>
                <button onClick={handleClose} className="text-gray-500 hover:text-gold transition-colors"><X size={24} /></button>
              </div>
              
              {!submitted && (
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${s <= step ? 'bg-gold text-black' : 'bg-[#2e2e2e] text-gray-600'}`}>{s}</div>
                      {s < 3 && <div className={`h-px w-8 ${s < step ? 'bg-gold' : 'bg-[#2e2e2e]'}`} />}
                    </div>
                  ))}
                  <span className="ml-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Step {step} di 3</span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-3xl text-white mb-4 uppercase tracking-widest">Grazie {form.nome}!</h3>
                    <p className="text-gray-400 mb-10 leading-relaxed italic">"Il tuo sogno è stato ricevuto. Iniziamo subito a disegnare la tua avventura."</p>
                    <button onClick={handleClose} className="bg-gold text-black px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">Chiudi</button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Nome *" error={errors.nome}>
                            <input type="text" placeholder="Es: Mario" className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold transition-colors" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} />
                          </Field>
                          <Field label="Cognome *" error={errors.cognome}>
                            <input type="text" placeholder="Es: Rossi" className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold transition-colors" value={form.cognome} onChange={(e) => setForm({...form, cognome: e.target.value})} />
                          </Field>
                        </div>
                        <Field label="Email *" error={errors.email}>
                          <input type="email" placeholder="mario.rossi@email.it" className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold transition-colors" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                        </Field>
                        <Field label="Telefono *" error={errors.phone}>
                          <input type="tel" placeholder="+39 123 4567890" className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold transition-colors" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                        </Field>

                        <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/10 rounded-xl group cursor-pointer hover:bg-gold/10 transition-all" onClick={() => setForm({...form, isHoneymoon: !form.isHoneymoon})}>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${form.isHoneymoon ? 'bg-gold border-gold' : 'border-[#333]'}`}>
                            {form.isHoneymoon && <Heart size={12} className="text-black fill-black" />}
                          </div>
                          <span className="text-xs uppercase tracking-widest font-bold text-gray-300">È un Viaggio di Nozze?</span>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                          <label className="text-[10px] uppercase text-gray-500 font-bold mb-4 block">Numero Viaggiatori</label>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center space-y-1">
                              <label className="text-[9px] uppercase text-gray-500">Adulti</label>
                              <select className="w-full text-center bg-[#111] border border-[#2e2e2e] text-white py-2 outline-none focus:border-gold cursor-pointer" value={form.adults} onChange={(e) => setForm({...form, adults: parseInt(e.target.value)})}>
                                {paxOptions.slice(1).map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                            <div className="text-center space-y-1">
                              <label className="text-[9px] uppercase text-gray-500">Teen (12-17)</label>
                              <select className="w-full text-center bg-[#111] border border-[#2e2e2e] text-white py-2 outline-none focus:border-gold cursor-pointer" value={form.teen} onChange={(e) => setForm({...form, teen: parseInt(e.target.value)})}>
                                {paxOptions.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                            <div className="text-center space-y-1">
                              <label className="text-[9px] uppercase text-gray-500">Bambini</label>
                              <select className="w-full text-center bg-[#111] border border-[#2e2e2e] text-white py-2 outline-none focus:border-gold cursor-pointer" value={form.kids} onChange={(e) => setForm({...form, kids: parseInt(e.target.value)})}>
                                {paxOptions.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase text-gray-500 font-bold flex items-center gap-2">
                            <MapPin size={14} className="text-gold" /> Destinazioni del Tour
                          </label>
                          
                          {form.destinazioni.map((dest, i) => (
                            <div key={i} className="bg-[#111] p-4 border border-[#2e2e2e] rounded-xl relative group">
                              <div className="grid grid-cols-12 gap-4 items-end">
                                <div className="col-span-7 space-y-1.5">
                                  <span className="text-[9px] uppercase text-gray-600 font-bold">Destinazione {i + 1}</span>
                                  <select 
                                    className="w-full bg-transparent text-white text-sm outline-none border-b border-[#333] py-2 cursor-pointer focus:border-gold transition-colors" 
                                    value={dest.id} 
                                    onChange={(e) => handleDestChange(i, e.target.value)}
                                  >
                                    <option value="" disabled className="bg-[#1a1a1a]">Seleziona meta</option>
                                    {destinationData.map(d => <option key={d.id} value={d.id} className="bg-[#1a1a1a]">{d.name[locale]}</option>)}
                                  </select>
                                </div>
                                <div className="col-span-4 space-y-1.5">
                                  <span className="text-[9px] uppercase text-gray-600 font-bold flex items-center gap-1"><Moon size={10} /> Notti</span>
                                  <select 
                                    className="w-full bg-transparent text-white text-sm outline-none border-b border-[#333] py-2 cursor-pointer focus:border-gold transition-colors text-center" 
                                    value={dest.nights} 
                                    onChange={(e) => handleNightsChange(i, parseInt(e.target.value))}
                                  >
                                    {nightOptions.map(n => <option key={n} value={n} className="bg-[#1a1a1a]">{n}</option>)}
                                  </select>
                                </div>
                                <div className="col-span-1 flex justify-end pb-2">
                                  {form.destinazioni.length > 1 && (
                                    <button type="button" onClick={() => removeDest(i)} className="text-gray-600 hover:text-red-500 transition-colors">
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <button type="button" onClick={addDest} className="text-gold text-[9px] uppercase font-bold flex items-center gap-2 hover:opacity-70 transition-all pt-2">
                            <PlusCircle size={14} /> Aggiungi un'altra tappa al viaggio
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          <Field label="Data Partenza *" error={errors['name' as keyof typeof errors] && !form.startDate ? "Richiesta" : ""}>
                            <input type="date" className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold cursor-pointer" style={{ colorScheme: 'dark' }} value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} />
                          </Field>
                          <Field label="Data Ritorno *" error={errors['name' as keyof typeof errors] && !form.endDate ? "Richiesta" : ""}>
                            <input 
                              type="date" 
                              min={form.startDate}
                              className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold cursor-pointer" 
                              style={{ colorScheme: 'dark' }} 
                              value={form.endDate} 
                              onChange={(e) => setForm({...form, endDate: e.target.value})} 
                            />
                          </Field>
                        </div>

                        <Field label="Flessibilità Date">
                          <select className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none cursor-pointer focus:border-gold" value={form.flexibility} onChange={(e) => setForm({...form, flexibility: e.target.value})}>
                            <option value="esatta">Date esatte</option>
                            <option value="3gg">+/- 3 giorni</option>
                            <option value="7gg">+/- 1 settimana</option>
                          </select>
                        </Field>

                        <div className="bg-gold/5 p-4 rounded-xl flex justify-between items-center border border-gold/10">
                          <div className="flex items-center gap-2">
                            <Moon size={16} className="text-gold/60" />
                            <span className="text-[10px] uppercase text-gold/60 font-bold">Durata Totale Pianificata:</span>
                          </div>
                          <span className="text-gold font-bold text-xl font-serif">{totalNights} Notti</span>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                        <Field label="Tipologia di Viaggio">
                          <select className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none cursor-pointer focus:border-gold" value={form.travelType} onChange={(e) => setForm({...form, travelType: e.target.value})}>
                            <option value="avventura">Avventura e Natura</option>
                            <option value="relax">Relax e Mare</option>
                            <option value="lusso">Lusso ed Esclusività</option>
                            <option value="famiglia">Famiglia</option>
                          </select>
                        </Field>
                        <Field label="Budget stimato a persona *" required>
                          <select className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none cursor-pointer focus:border-gold" value={form.budget} onChange={(e) => setForm({...form, budget: e.target.value})}>
                            <option value="" disabled>Seleziona fascia</option>
                            <option value="2.500€ - 3.500€">2.500€ - 3.500€</option>
                            <option value="3.500€ - 5.000€">3.500€ - 5.000€</option>
                            <option value="5.000€ - 7.500€">5.000€ - 7.500€</option>
                            <option value="Oltre 7.500€">Oltre 7.500€</option>
                          </select>
                        </Field>
                        <Field label="Note, Sogni e Desideri">
                          <textarea rows={5} className="w-full px-4 py-3 bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold resize-none text-sm leading-relaxed" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Raccontaci come immagini il tuo viaggio ideale..." />
                        </Field>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="p-8 border-t border-[#2e2e2e] flex justify-between items-center bg-[#161616]">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)} className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-white transition-colors">Indietro</button>
                ) : <div />}
                <button 
                  type="button"
                  onClick={step < 3 ? () => validate() && setStep(s => s + 1) : handleSubmit}
                  disabled={isSending}
                  className="bg-gold text-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all flex items-center gap-2 shadow-lg shadow-gold/10"
                >
                  {isSending ? 'Invio...' : (step < 3 ? 'Continua' : 'Invia Richiesta')}
                  {!isSending && step === 3 && <Plane size={14} className="rotate-45" />}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] uppercase tracking-widest font-bold" style={{ color: '#888' }}>
        {label}{required && <span className="text-gold"> *</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-500 uppercase font-bold">{error}</p>}
    </div>
  );
}
