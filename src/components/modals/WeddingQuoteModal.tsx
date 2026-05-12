'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Trash2, Plane, CheckCircle2, Heart, Moon, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { destinations as destinationData } from '@/data/destinations';

type SelectedDest = { id: string; nights: number };
type FormData = {
  nome: string; cognome: string; email: string; phone: string;
  adults: number; teen: number; kids: number;
  isHoneymoon: boolean;
  destinazioni: SelectedDest[];
  startDate: string; endDate: string; flexibility: string;
  travelType: string; budget: string; message: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

const copy = {
  it: {
    label: 'Viaggio su Misura', title: 'Richiesta Preventivo',
    stepOf: (s: number) => `Step ${s} di 3`,
    nome: 'Nome *', cognome: 'Cognome *', email: 'Email *', phone: 'Telefono *',
    nomePh: 'Mario', cognomePh: 'Rossi', emailPh: 'mario@email.it', phonePh: '+39 123 456 7890',
    honeymoon: 'È un Viaggio di Nozze?',
    travelers: 'Numero Viaggiatori',
    adults: 'Adulti', teen: 'Teen (12-17)', kids: 'Bambini',
    destinations: 'Destinazioni del Tour',
    dest: (i: number) => `Destinazione ${i + 1}`,
    selectDest: 'Seleziona meta',
    nights: 'Notti',
    addDest: "Aggiungi tappa",
    departure: 'Data Partenza *', returnDate: 'Data Ritorno *',
    flexibility: 'Flessibilità Date',
    flexExact: 'Date esatte', flex3: '+/- 3 giorni', flex7: '+/- 1 settimana',
    totalNights: 'Durata Totale',
    tripType: 'Tipologia di Viaggio',
    adventure: 'Avventura e Natura', relax: 'Relax e Mare', luxury: 'Lusso ed Esclusività', family: 'Famiglia',
    budget: 'Budget a persona *', selectBudget: 'Seleziona fascia',
    above: 'Oltre €7.500',
    notes: 'Note e Desideri',
    notesPh: 'Raccontaci il tuo viaggio ideale...',
    back: 'Indietro', next: 'Continua', send: 'Invia Richiesta', sending: 'Invio...',
    successTitle: (n: string) => `Grazie ${n}!`,
    successText: '"Il tuo sogno è stato ricevuto. Iniziamo subito a disegnare la tua avventura."',
    close: 'Chiudi',
    errRequired: 'Obbligatorio', errEmail: 'Email non valida', errDest: 'Seleziona le mete', errBudget: 'Seleziona budget',
    errSend: "Errore nell'invio. Riprova.", errNetwork: 'Errore di connessione.',
  },
  en: {
    label: 'Bespoke Travel', title: 'Request a Quote',
    stepOf: (s: number) => `Step ${s} of 3`,
    nome: 'First Name *', cognome: 'Last Name *', email: 'Email *', phone: 'Phone *',
    nomePh: 'John', cognomePh: 'Smith', emailPh: 'john@email.com', phonePh: '+1 234 567 8900',
    honeymoon: 'Is this a Honeymoon?',
    travelers: 'Number of Travellers',
    adults: 'Adults', teen: 'Teens (12-17)', kids: 'Children',
    destinations: 'Tour Destinations',
    dest: (i: number) => `Destination ${i + 1}`,
    selectDest: 'Select destination',
    nights: 'Nights',
    addDest: 'Add stop',
    departure: 'Departure Date *', returnDate: 'Return Date *',
    flexibility: 'Date Flexibility',
    flexExact: 'Exact dates', flex3: '+/- 3 days', flex7: '+/- 1 week',
    totalNights: 'Total Duration',
    tripType: 'Trip Type',
    adventure: 'Adventure & Nature', relax: 'Relaxation & Beach', luxury: 'Luxury & Exclusivity', family: 'Family',
    budget: 'Budget per person *', selectBudget: 'Select range',
    above: 'Above €7,500',
    notes: 'Notes & Wishes',
    notesPh: 'Tell us about your ideal trip...',
    back: 'Back', next: 'Continue', send: 'Send Request', sending: 'Sending...',
    successTitle: (n: string) => `Thank you ${n}!`,
    successText: '"Your dream has been received. Let\'s start designing your adventure."',
    close: 'Close',
    errRequired: 'Required', errEmail: 'Invalid email', errDest: 'Select destinations', errBudget: 'Select budget',
    errSend: 'Submission error. Please try again.', errNetwork: 'Connection error.',
  },
} as const;

const TOTAL_STEPS = 3;
const paxOptions = [0,1,2,3,4,5,6,7,8,9,10];
const nightOptions = Array.from({ length: 30 }, (_, i) => i + 1);

export default function WeddingQuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const locale = useLocale() as 'it' | 'en';
  const t = copy[locale];

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState<FormData>({
    nome: '', cognome: '', email: '', phone: '',
    adults: 2, teen: 0, kids: 0, isHoneymoon: false,
    destinazioni: [{ id: '', nights: 7 }],
    startDate: '', endDate: '', flexibility: 'esatta',
    travelType: 'avventura', budget: '', message: '',
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
      setStep(1); setSubmitted(false); setErrors({});
      setForm({ nome: '', cognome: '', email: '', phone: '', adults: 2, teen: 0, kids: 0, isHoneymoon: false, destinazioni: [{ id: '', nights: 7 }], startDate: '', endDate: '', flexibility: 'esatta', travelType: 'avventura', budget: '', message: '' });
    }, 300);
  }

  function validate(): boolean {
    const e: Errors = {};
    if (step === 1) {
      if (!form.nome.trim()) e.nome = t.errRequired;
      if (!form.cognome.trim()) e.cognome = t.errRequired;
      if (!form.email.trim() || !form.email.includes('@')) e.email = t.errEmail;
      if (!form.phone.trim()) e.phone = t.errRequired;
    } else if (step === 2) {
      if (form.destinazioni.some(d => !d.id)) e.nome = t.errDest;
      if (!form.startDate) e.startDate = t.errRequired;
      if (!form.endDate) e.endDate = t.errRequired;
    } else if (step === 3) {
      if (!form.budget) e.budget = t.errBudget;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsSending(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipologia: form.isHoneymoon ? 'Viaggio di Nozze' : form.travelType, note: form.isHoneymoon ? `[HONEYMOON] ${form.message}` : form.message, bambini: form.kids, dataInizio: form.startDate, dataFine: form.endDate }),
      });
      if (res.ok) setSubmitted(true);
      else alert(t.errSend);
    } catch { alert(t.errNetwork); }
    finally { setIsSending(false); }
  }

  const handleDestChange = (i: number, id: string) => {
    const n = [...form.destinazioni]; n[i] = { ...n[i], id };
    setForm({ ...form, destinazioni: n });
  };
  const handleNightsChange = (i: number, nights: number) => {
    const n = [...form.destinazioni]; n[i] = { ...n[i], nights };
    setForm({ ...form, destinazioni: n });
  };
  const addDest = () => {
    if (form.destinazioni.length < destinationData.length)
      setForm({ ...form, destinazioni: [...form.destinazioni, { id: '', nights: 7 }] });
  };
  const removeDest = (i: number) => {
    const n = form.destinazioni.filter((_, idx) => idx !== i);
    setForm({ ...form, destinazioni: n.length ? n : [{ id: '', nights: 7 }] });
  };

  const totalNights = form.destinazioni.reduce((s, d) => s + d.nights, 0);
  const inp = 'w-full px-3 py-2.5 text-base bg-[#111] border border-[#2e2e2e] text-white outline-none focus:border-gold transition-colors';
  const sel = `${inp} cursor-pointer`;

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
            className="relative w-full max-w-sm max-h-[92vh] overflow-y-auto bg-[#1a1a1a] border border-[#2e2e2e] shadow-2xl"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-[#2e2e2e]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold mb-0.5 font-bold">{t.label}</p>
                  <h2 className="font-serif text-xl text-white uppercase tracking-wider">{t.title}</h2>
                </div>
                <button onClick={handleClose} className="text-gray-500 hover:text-gold transition-colors mt-0.5"><X size={18} /></button>
              </div>

              {!submitted && (
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${s <= step ? 'bg-gold text-black' : 'bg-[#2e2e2e] text-white/50'}`}>{s}</div>
                      {s < 3 && <div className={`h-px w-5 ${s < step ? 'bg-gold' : 'bg-[#2e2e2e]'}`} />}
                    </div>
                  ))}
                  <span className="ml-3 text-xs text-white/60 uppercase tracking-widest font-bold">{t.stepOf(step)}</span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-white mb-3 uppercase tracking-widest">{t.successTitle(form.nome)}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed italic text-sm">{t.successText}</p>
                    <button onClick={handleClose} className="bg-gold text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all">{t.close}</button>
                  </motion.div>
                ) : (
                  <div>
                    {step === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Field label={t.nome} error={errors.nome}><input type="text" placeholder={t.nomePh} className={inp} value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></Field>
                          <Field label={t.cognome} error={errors.cognome}><input type="text" placeholder={t.cognomePh} className={inp} value={form.cognome} onChange={e => setForm({ ...form, cognome: e.target.value })} /></Field>
                        </div>
                        <Field label={t.email} error={errors.email}><input type="email" placeholder={t.emailPh} className={inp} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
                        <Field label={t.phone} error={errors.phone}><input type="tel" placeholder={t.phonePh} className={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>

                        <div className="flex items-center gap-2.5 p-3 bg-gold/5 border border-gold/10 cursor-pointer hover:bg-gold/10 transition-all" onClick={() => setForm({ ...form, isHoneymoon: !form.isHoneymoon })}>
                          <div className={`w-4 h-4 border flex items-center justify-center transition-all shrink-0 ${form.isHoneymoon ? 'bg-gold border-gold' : 'border-[#333]'}`}>
                            {form.isHoneymoon && <Heart size={10} className="text-black fill-black" />}
                          </div>
                          <span className="text-xs uppercase tracking-widest font-bold text-white/80">{t.honeymoon}</span>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                          <label className="text-xs uppercase text-white/60 font-bold mb-2 block">{t.travelers}</label>
                          <div className="grid grid-cols-3 gap-2">
                            {([['adults', t.adults] as const, ['teen', t.teen] as const, ['kids', t.kids] as const]).map(([field, label]) => (
                              <div key={field} className="text-center space-y-1">
                                <label className="text-xs uppercase text-white/60">{label}</label>
                                <select className={`${sel} text-center`} value={form[field]} onChange={e => setForm({ ...form, [field]: parseInt(e.target.value) })}>
                                  {(field === 'adults' ? paxOptions.slice(1) : paxOptions).map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-white/60 font-bold flex items-center gap-1.5">
                            <MapPin size={12} className="text-gold" /> {t.destinations}
                          </label>
                          {form.destinazioni.map((dest, i) => (
                            <div key={i} className="bg-[#111] p-3 border border-[#2e2e2e]">
                              <div className="grid grid-cols-12 gap-2 items-end">
                                <div className="col-span-7 space-y-1">
                                  <span className="text-xs uppercase text-white/55 font-bold">{t.dest(i)}</span>
                                  <select className="w-full bg-transparent text-white text-sm outline-none border-b border-[#333] py-1.5 cursor-pointer focus:border-gold" value={dest.id} onChange={e => handleDestChange(i, e.target.value)}>
                                    <option value="" disabled className="bg-[#1a1a1a]">{t.selectDest}</option>
                                    {destinationData.map(d => <option key={d.id} value={d.id} className="bg-[#1a1a1a]">{d.name[locale]}</option>)}
                                  </select>
                                </div>
                                <div className="col-span-4 space-y-1">
                                  <span className="text-xs uppercase text-white/55 font-bold flex items-center gap-1"><Moon size={9} /> {t.nights}</span>
                                  <select className="w-full bg-transparent text-white text-sm outline-none border-b border-[#333] py-1.5 cursor-pointer text-center focus:border-gold" value={dest.nights} onChange={e => handleNightsChange(i, parseInt(e.target.value))}>
                                    {nightOptions.map(n => <option key={n} value={n} className="bg-[#1a1a1a]">{n}</option>)}
                                  </select>
                                </div>
                                <div className="col-span-1 flex justify-end pb-1">
                                  {form.destinazioni.length > 1 && <button type="button" onClick={() => removeDest(i)} className="text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button type="button" onClick={addDest} className="text-xs uppercase font-bold flex items-center gap-1.5 hover:opacity-70 transition-all" style={{ color: '#b0a377' }}>
                            <PlusCircle size={12} /> {t.addDest}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                          <Field label={t.departure} error={errors.startDate}>
                            <input type="date" className={inp} style={{ colorScheme: 'dark' }} value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                          </Field>
                          <Field label={t.returnDate} error={errors.endDate}>
                            <input type="date" min={form.startDate} className={inp} style={{ colorScheme: 'dark' }} value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                          </Field>
                        </div>

                        <Field label={t.flexibility}>
                          <select className={sel} value={form.flexibility} onChange={e => setForm({ ...form, flexibility: e.target.value })}>
                            <option value="esatta">{t.flexExact}</option>
                            <option value="3gg">{t.flex3}</option>
                            <option value="7gg">{t.flex7}</option>
                          </select>
                        </Field>

                        <div className="bg-gold/5 px-3 py-2 flex justify-between items-center border border-gold/10">
                          <span className="text-xs uppercase text-gold/80 font-bold flex items-center gap-1.5"><Moon size={12} className="text-gold/60" />{t.totalNights}:</span>
                          <span className="text-gold font-bold text-lg font-serif">{totalNights}</span>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                        <Field label={t.tripType}>
                          <select className={sel} value={form.travelType} onChange={e => setForm({ ...form, travelType: e.target.value })}>
                            <option value="avventura">{t.adventure}</option>
                            <option value="relax">{t.relax}</option>
                            <option value="lusso">{t.luxury}</option>
                            <option value="famiglia">{t.family}</option>
                          </select>
                        </Field>
                        <Field label={t.budget} error={errors.budget}>
                          <select className={sel} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                            <option value="" disabled>{t.selectBudget}</option>
                            <option value="2.500€ - 3.500€">€2,500 – €3,500</option>
                            <option value="3.500€ - 5.000€">€3,500 – €5,000</option>
                            <option value="5.000€ - 7.500€">€5,000 – €7,500</option>
                            <option value="Oltre 7.500€">{t.above}</option>
                          </select>
                        </Field>
                        <Field label={t.notes}>
                          <textarea rows={3} className={`${inp} resize-none leading-relaxed`} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={t.notesPh} />
                        </Field>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="px-5 py-4 border-t border-[#2e2e2e] flex justify-between items-center bg-[#161616]">
                {step > 1
                  ? <button type="button" onClick={() => setStep(s => s - 1)} className="text-xs uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors">{t.back}</button>
                  : <div />}
                <button
                  type="button"
                  onClick={step < 3 ? () => validate() && setStep(s => s + 1) : handleSubmit}
                  disabled={isSending}
                  className="text-black px-7 py-2.5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all flex items-center gap-2 shadow-lg"
                  style={{ backgroundColor: '#b0a377' }}
                >
                  {isSending ? t.sending : (step < 3 ? t.next : t.send)}
                  {!isSending && step === 3 && <Plane size={12} className="rotate-45" />}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs uppercase tracking-widest font-bold text-white/65">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 uppercase font-bold">{error}</p>}
    </div>
  );
}
