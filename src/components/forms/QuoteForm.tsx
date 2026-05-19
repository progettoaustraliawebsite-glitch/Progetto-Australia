'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import { Minus, Plus, Check, ChevronDown, Plane, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { destinations as destData } from '@/data/destinations';

// ─── Types ────────────────────────────────────────────────────────────────────
type FlightOpt   = 'includi' | 'ho-gia' | 'autonomo' | '';
type AccomOpt    = 'standard' | 'superior' | 'lusso' | '';
type ContactPref = 'email' | 'telefono' | 'whatsapp' | '';

interface DestEntry { id: string; nights: number }

interface FormState {
  adulti: number;
  teen: number;
  bambini: number;
  infants: number;
  // destination mode
  multiDest: boolean;
  destination: string;           // single mode
  destinations: DestEntry[];     // multi mode
  dataInizio: string;
  dataFine: string;
  flessibilita: string;
  flightOpt: FlightOpt;
  departureCity: string;
  tripType: string;
  isHoneymoon: boolean;
  accom: AccomOpt;
  budget: string;
  note: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  contactPref: ContactPref;
}

const TOTAL = 8;

// ─── Translations ─────────────────────────────────────────────────────────────
const copy = {
  it: {
    s0: {
      title: 'Il tuo viaggio su misura\ninizia qui.',
      sub: 'Rispondi a poche domande — ti invieremo un preventivo personalizzato entro 24 ore.',
      cta: 'Iniziamo',
    },
    s1: {
      q: 'Quante persone viaggeranno?',
      adulti: 'Adulti (18+)',
      teen: 'Teen (12–17 anni)',
      bambini: 'Bambini (2–11 anni)',
      infants: 'Neonati (0–2 anni)',
    },
    s2: {
      q: 'Dove vuoi andare?',
      other: 'Non ho ancora deciso',
      multiCta: '+ Combina più destinazioni',
      singleCta: '← Torna a destinazione singola',
      nights: 'notti',
      addDest: '+ Aggiungi destinazione',
      selectDest: 'Scegli destinazione',
    },
    s3: {
      q: 'Quando desideri viaggiare?',
      start: 'Data di partenza',
      end: 'Data di ritorno',
      flex: 'Flessibilità sulle date',
      flexOpts: ['Date esatte', '± 3 giorni', '± 1 settimana', 'Date ancora da definire'],
      flexVals: ['esatta', '3gg', '1sett', 'indefinite'] as const,
    },
    s4: {
      q: 'Come gestisci i voli?',
      opts: ['✈️  Includi i voli nel preventivo', '✔️  Ho già i voli prenotati', '🔀  Li organizzo autonomamente'],
      vals: ['includi', 'ho-gia', 'autonomo'] as const,
      depQ: 'Da quale città parti?',
      cities: ['Milano', 'Roma', 'Torino', 'Venezia', 'Bologna', 'Napoli', 'Palermo', 'Altra città'],
    },
    s5: {
      q: 'Che tipo di viaggio cerchi?',
      opts: ['Viaggio di lusso', 'Viaggio family', 'On the road / Avventura', 'Self-Drive'],
      vals: ['lusso', 'family', 'avventura', 'self-drive'] as const,
      honeymoon: '💍 È anche un viaggio di nozze / luna di miele',
    },
    s6: {
      q: 'Che tipo di sistemazione preferisci?',
      opts: ['Standard', 'Superior', 'Lusso'],
      vals: ['standard', 'superior', 'lusso'] as const,
    },
    s7: {
      q: 'Qual è il tuo budget?',
      budgetQ: 'Budget indicativo per persona, esclusi i voli',
      budgetOpts: ['€2.500 – €3.500', '€3.500 – €5.000', '€5.000 – €7.500', 'Oltre €7.500'],
      budgetVals: ['2500-3500', '3500-5000', '5000-7500', '7500+'] as const,
      placeholder: 'Esperienze particolari, sogni nel cassetto, richieste speciali...',
    },
    s8: {
      q: 'Come ti contatto?',
      nome: 'Nome',
      cognome: 'Cognome',
      email: 'Email',
      tel: 'Telefono',
      cq: 'Come preferisci essere contattato?',
      copts: ['Email', 'Telefono', 'WhatsApp'],
      cvals: ['email', 'telefono', 'whatsapp'] as const,
    },
    back: 'Torna indietro',
    next: 'Avanti',
    send: 'Invia Richiesta',
    sending: 'Invio in corso…',
    stepOf: (s: number) => `Passo ${s} di ${TOTAL}`,
    success: {
      title: 'Richiesta ricevuta!',
      text: (n: string) => `Grazie ${n}! Ti contatteremo entro 24 ore con una proposta su misura per te.`,
      home: 'Torna alla Home',
    },
    err: 'Errore di connessione. Riprova più tardi.',
  },
  en: {
    s0: {
      title: 'Your tailor-made trip\nstarts here.',
      sub: "Answer a few questions — we'll send you a personalised quote within 24 hours.",
      cta: "Let's start",
    },
    s1: {
      q: 'How many people will travel?',
      adulti: 'Adults (18+)',
      teen: 'Teens (12–17)',
      bambini: 'Children (2–11)',
      infants: 'Infants (0–2)',
    },
    s2: {
      q: 'Where do you want to go?',
      other: "I haven't decided yet",
      multiCta: '+ Combine multiple destinations',
      singleCta: '← Back to single destination',
      nights: 'nights',
      addDest: '+ Add destination',
      selectDest: 'Choose destination',
    },
    s3: {
      q: 'When would you like to travel?',
      start: 'Departure date',
      end: 'Return date',
      flex: 'Date flexibility',
      flexOpts: ['Exact dates', '± 3 days', '± 1 week', 'Dates to be defined'],
      flexVals: ['esatta', '3gg', '1sett', 'indefinite'] as const,
    },
    s4: {
      q: 'How are you handling flights?',
      opts: ['✈️  Include flights in the quote', '✔️  I already have flights booked', "🔀  I'll arrange them myself"],
      vals: ['includi', 'ho-gia', 'autonomo'] as const,
      depQ: 'Which city do you depart from?',
      cities: ['Milan', 'Rome', 'Turin', 'Venice', 'Bologna', 'Naples', 'Palermo', 'Other city'],
    },
    s5: {
      q: 'What kind of trip are you looking for?',
      opts: ['Luxury travel', 'Family trip', 'Road trip / Adventure', 'Self-Drive'],
      vals: ['lusso', 'family', 'avventura', 'self-drive'] as const,
      honeymoon: '💍 This is also a honeymoon / wedding trip',
    },
    s6: {
      q: 'What type of accommodation do you prefer?',
      opts: ['Standard', 'Superior', 'Luxury'],
      vals: ['standard', 'superior', 'lusso'] as const,
    },
    s7: {
      q: 'What is your budget?',
      budgetQ: 'Indicative budget per person, excluding flights',
      budgetOpts: ['€2,500 – €3,500', '€3,500 – €5,000', '€5,000 – €7,500', 'Above €7,500'],
      budgetVals: ['2500-3500', '3500-5000', '5000-7500', '7500+'] as const,
      placeholder: 'Special experiences, bucket-list activities, particular requests...',
    },
    s8: {
      q: 'How shall we reach you?',
      nome: 'First name',
      cognome: 'Last name',
      email: 'Email',
      tel: 'Phone',
      cq: 'How do you prefer to be contacted?',
      copts: ['Email', 'Phone', 'WhatsApp'],
      cvals: ['email', 'telefono', 'whatsapp'] as const,
    },
    back: 'Go back',
    next: 'Continue',
    send: 'Send Request',
    sending: 'Sending…',
    stepOf: (s: number) => `Step ${s} of ${TOTAL}`,
    success: {
      title: 'Request received!',
      text: (n: string) => `Thank you ${n}! We'll get back to you within 24 hours with a personalised proposal.`,
      home: 'Back to Home',
    },
    err: 'Connection error. Please try again.',
  },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pill({
  selected, onClick, children,
}: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-5 py-3.5 rounded-full border-2 text-sm font-sans text-left transition-all duration-200 ${
        selected
          ? 'border-gold bg-gold text-white font-semibold'
          : 'border-stone-300 bg-white text-hero/85 hover:border-gold hover:text-gold'
      }`}
    >
      {children}
    </button>
  );
}

function Counter({
  value, onChange, min = 0, label,
}: { value: number; onChange: (v: number) => void; min?: number; label: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-stone-200 last:border-0">
      <span className="font-sans text-sm font-medium text-hero/85">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center text-hero/60 hover:border-gold hover:text-gold transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="font-serif text-2xl font-bold text-hero w-7 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center text-hero/60 hover:border-gold hover:text-gold transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

const inputCls =
  'w-full px-4 py-3 rounded-full border-2 border-stone-300 text-hero text-sm font-sans focus:border-gold outline-none transition-colors placeholder-stone-400 bg-white';
const selectCls =
  'w-full px-4 py-3 rounded-full border-2 border-stone-300 text-hero text-sm font-sans focus:border-gold outline-none transition-colors appearance-none bg-white';

// ─── Main wizard ──────────────────────────────────────────────────────────────

export default function QuoteForm() {
  const locale = useLocale() as 'it' | 'en';
  const router = useRouter();
  const searchParams = useSearchParams();
  const c = copy[locale];

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<FormState>({
    adulti: 2, teen: 0, bambini: 0, infants: 0,
    multiDest: false,
    destination: '',
    destinations: [{ id: '', nights: 7 }],
    dataInizio: '', dataFine: '', flessibilita: 'esatta',
    flightOpt: '', departureCity: '',
    tripType: '', isHoneymoon: searchParams.get('honeymoon') === '1',
    accom: '',
    budget: '', note: '',
    nome: '', cognome: '', email: '', telefono: '', contactPref: '',
  });

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  // ── Multi-dest helpers ──────────────────────────────────────────────────────
  const updateDestEntry = (idx: number, patch: Partial<DestEntry>) =>
    setForm(f => ({
      ...f,
      destinations: f.destinations.map((d, i) => i === idx ? { ...d, ...patch } : d),
    }));

  const addDestEntry = () =>
    setForm(f => ({ ...f, destinations: [...f.destinations, { id: '', nights: 7 }] }));

  const removeDestEntry = (idx: number) =>
    setForm(f => ({ ...f, destinations: f.destinations.filter((_, i) => i !== idx) }));

  // ── Validation ──────────────────────────────────────────────────────────────
  const canNext = (): boolean => {
    if (step === 0) return true;
    if (step === 1) return form.adulti >= 1;
    if (step === 2) {
      if (!form.multiDest) return form.destination !== '';
      return form.destinations.length > 0 && form.destinations.every(d => d.id !== '');
    }
    if (step === 3) return form.flessibilita === 'indefinite' || form.dataInizio !== '';
    if (step === 4) return form.tripType !== '' || form.isHoneymoon;
    if (step === 5) return form.accom !== '';
    if (step === 6) return true;
    if (step === 7) return form.flightOpt !== '' && (form.flightOpt !== 'includi' || form.departureCity !== '');
    if (step === 8) return form.nome.trim() !== '' && form.cognome.trim() !== '' && form.email.includes('@');
    return false;
  };

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goBack = () => { setDir(-1); setStep(s => s - 1); setTouched(false); setSubmitError(''); };

  const submit = async () => {
    setTouched(true);
    if (!canNext()) return;
    setIsSending(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome, cognome: form.cognome, email: form.email, telefono: form.telefono,
          adulti: form.adulti, teen: form.teen, bambini: form.bambini, infants: form.infants,
          multiDest: form.multiDest,
          destination: form.multiDest ? null : form.destination,
          destinations: form.multiDest ? form.destinations : null,
          dataInizio: form.dataInizio, dataFine: form.dataFine, flessibilita: form.flessibilita,
          voli: form.flightOpt, cittaPartenza: form.flightOpt === 'includi' ? form.departureCity : '',
          tripType: form.tripType, isHoneymoon: form.isHoneymoon,
          accommodation: form.accom,
          budget: form.budget, note: form.note, contactPref: form.contactPref,
        }),
      });
      if (res.ok) {
        setIsSuccess(true);
        // GTM / GA4 conversion event
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((window as any).dataLayer = (window as any).dataLayer || []).push({
            event: 'form_submit',
            form_name: 'quote_request',
          });
        }
      } else {
        setSubmitError(c.err);
      }
    } catch {
      setSubmitError(c.err);
    } finally {
      setIsSending(false);
    }
  };

  const variants = {
    initial: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    animate: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  // ── Success ──────────────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 md:p-12 text-center"
      >
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Progetto Australia" className="h-9" />
        </div>
        <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-gold" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-hero mb-3">{c.success.title}</h2>
        <p className="text-hero/70 font-sans text-sm leading-relaxed mb-8">{c.success.text(form.nome)}</p>
        <Link
          href="/"
          className="block w-full py-4 bg-gold text-white font-sans font-bold uppercase tracking-[0.2em] text-xs text-center rounded-full hover:opacity-85 transition-opacity"
        >
          {c.success.home}
        </Link>
      </motion.div>
    );
  }

  // ── Wizard card ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">

      {/* Close button */}
      <Link
        href="/"
        aria-label="Chiudi"
        className="absolute top-3 right-3 z-10 text-stone-400 hover:text-stone-600 transition-colors"
      >
        <X size={18} />
      </Link>

      {/* Logo */}
      <div className="flex justify-center pt-6 px-5">
        <img src="/logo.png" alt="Progetto Australia" className="h-7 md:h-9" />
      </div>

      {/* Step indicator */}
      {step > 0 && step <= TOTAL && (
        <div className="mt-5 px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: TOTAL }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-bold font-sans transition-all duration-300 shrink-0 ${
                  s < step
                    ? 'bg-gold text-white'
                    : s === step
                    ? 'bg-gold text-white shadow-md shadow-gold/30'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {s < step ? <Check size={10} /> : s}
              </div>
            ))}
          </div>
          <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.15em] text-stone-500">{c.stepOf(step)}</p>
        </div>
      )}

      {/* Step content */}
      <div className="px-5 md:px-10 pt-6 pb-8">
        <AnimatePresence mode="wait" custom={dir}>

          {/* ── STEP 0: Welcome ── */}
          {step === 0 && (
            <motion.div key="s0" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-hero mb-3 text-center whitespace-pre-line leading-tight">
                {c.s0.title}
              </h1>
              <p className="text-hero/65 text-sm text-center leading-relaxed mb-8 font-sans">{c.s0.sub}</p>
              <button
                type="button"
                onClick={goNext}
                className="w-full py-4 bg-gold text-white font-sans font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:opacity-85 transition-opacity rounded-full"
              >
                {c.s0.cta} <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 1: Travellers ── */}
          {step === 1 && (
            <motion.div key="s1" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s1.q}</h2>
              <Counter value={form.adulti}  onChange={(v) => set('adulti', v)}  min={1} label={c.s1.adulti} />
              <Counter value={form.teen}    onChange={(v) => set('teen', v)}    min={0} label={c.s1.teen} />
              <Counter value={form.bambini} onChange={(v) => set('bambini', v)} min={0} label={c.s1.bambini} />
              <Counter value={form.infants} onChange={(v) => set('infants', v)} min={0} label={c.s1.infants} />
            </motion.div>
          )}

          {/* ── STEP 2: Destination ── */}
          {step === 2 && (
            <motion.div key="s2" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s2.q}</h2>

              {!form.multiDest ? (
                /* ── Single destination mode ── */
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    {destData.map((dest) => (
                      <Pill key={dest.id} selected={form.destination === dest.id} onClick={() => set('destination', dest.id)}>
                        {dest.name[locale]}
                      </Pill>
                    ))}
                    <div className="col-span-2">
                      <Pill selected={form.destination === 'undecided'} onClick={() => set('destination', 'undecided')}>
                        {c.s2.other}
                      </Pill>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      set('multiDest', true);
                      set('destination', '');
                      setForm(f => ({ ...f, multiDest: true, destination: '', destinations: [{ id: '', nights: 7 }] }));
                    }}
                    className="mt-5 w-full py-3 text-xs font-sans font-semibold uppercase tracking-wider text-gold border-2 border-gold/40 rounded-full hover:border-gold hover:bg-gold/5 transition-all"
                  >
                    {c.s2.multiCta}
                  </button>
                </>
              ) : (
                /* ── Multi destination mode ── */
                <>
                  <div className="space-y-3">
                    {form.destinations.map((entry, idx) => (
                      <div key={idx} className="bg-stone-50 rounded-2xl px-4 py-3 border border-stone-200">
                        <div className="flex items-center gap-2">
                          {/* Destination select */}
                          <div className="relative flex-1">
                            <select
                              className="w-full py-2 pr-7 pl-2 rounded-xl border border-stone-300 text-hero text-sm font-sans focus:border-gold outline-none appearance-none bg-white"
                              value={entry.id}
                              onChange={(e) => updateDestEntry(idx, { id: e.target.value })}
                            >
                              <option value="">{c.s2.selectDest}</option>
                              {destData.map((dest) => (
                                <option key={dest.id} value={dest.id}>{dest.name[locale]}</option>
                              ))}
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                          </div>
                          {/* Remove row */}
                          {form.destinations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDestEntry(idx)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors shrink-0"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                        {/* Nights counter — below select on mobile */}
                        <div className="flex items-center gap-3 mt-2.5 justify-center">
                          <button
                            type="button"
                            onClick={() => updateDestEntry(idx, { nights: Math.max(1, entry.nights - 1) })}
                            className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold hover:text-gold transition-all"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-sans text-sm font-semibold text-hero min-w-[4rem] text-center">
                            {entry.nights} {c.s2.nights}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDestEntry(idx, { nights: entry.nights + 1 })}
                            className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold hover:text-gold transition-all"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Add destination */}
                  <button
                    type="button"
                    onClick={addDestEntry}
                    className="mt-3 w-full py-3 text-xs font-sans font-semibold uppercase tracking-wider text-gold border-2 border-gold/40 border-dashed rounded-full hover:border-gold hover:bg-gold/5 transition-all"
                  >
                    {c.s2.addDest}
                  </button>
                  {/* Switch back */}
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, multiDest: false, destinations: [{ id: '', nights: 7 }] }))}
                    className="mt-3 w-full text-xs font-sans text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
                  >
                    {c.s2.singleCta}
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* ── STEP 3: Dates ── */}
          {step === 3 && (
            <motion.div key="s3" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s3.q}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium block mb-1.5">{c.s3.start}</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={form.dataInizio}
                      onChange={(e) => {
                        set('dataInizio', e.target.value);
                        if (form.dataFine && form.dataFine < e.target.value) {
                          set('dataFine', '');
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium block mb-1.5">{c.s3.end}</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={form.dataFine}
                      min={form.dataInizio || undefined}
                      onChange={(e) => set('dataFine', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium block mb-1.5">{c.s3.flex}</label>
                  <div className="relative">
                    <select
                      className={selectCls}
                      value={form.flessibilita}
                      onChange={(e) => set('flessibilita', e.target.value)}
                    >
                      {c.s3.flexOpts.map((opt, i) => (
                        <option key={i} value={c.s3.flexVals[i]}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 7: Flights ── */}
          {step === 7 && (
            <motion.div key="s7" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s4.q}</h2>
              <div className="flex flex-col gap-3">
                {c.s4.opts.map((label, i) => (
                  <Pill
                    key={i}
                    selected={form.flightOpt === c.s4.vals[i]}
                    onClick={() => set('flightOpt', c.s4.vals[i] as FlightOpt)}
                  >
                    {label}
                  </Pill>
                ))}
              </div>
              <AnimatePresence>
                {form.flightOpt === 'includi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <label className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium block mb-2">{c.s4.depQ}</label>
                    <div className="relative">
                      <select
                        className={selectCls}
                        value={form.departureCity}
                        onChange={(e) => set('departureCity', e.target.value)}
                      >
                        <option value="">—</option>
                        {c.s4.cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── STEP 4: Trip type + honeymoon ── */}
          {step === 4 && (
            <motion.div key="s4" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s5.q}</h2>
              <div className="flex flex-col gap-3">
                {c.s5.opts.map((label, i) => (
                  <Pill
                    key={i}
                    selected={form.tripType === c.s5.vals[i]}
                    onClick={() => set('tripType', form.tripType === c.s5.vals[i] ? '' : c.s5.vals[i])}
                  >
                    {label}
                  </Pill>
                ))}
              </div>
              {/* Honeymoon checkbox */}
              <button
                type="button"
                onClick={() => set('isHoneymoon', !form.isHoneymoon)}
                className={`mt-5 w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                  form.isHoneymoon
                    ? 'border-gold bg-gold/5 text-hero'
                    : 'border-stone-200 bg-stone-50 text-hero/75 hover:border-gold/50'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  form.isHoneymoon ? 'bg-gold border-gold' : 'border-stone-400'
                }`}>
                  {form.isHoneymoon && <Check size={11} className="text-white" />}
                </div>
                <span className="text-sm font-sans font-medium">{c.s5.honeymoon}</span>
              </button>
            </motion.div>
          )}

          {/* ── STEP 5: Accommodation ── */}
          {step === 5 && (
            <motion.div key="s5" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s6.q}</h2>
              <div className="flex flex-col gap-3">
                {c.s6.opts.map((label, i) => (
                  <Pill
                    key={i}
                    selected={form.accom === c.s6.vals[i]}
                    onClick={() => set('accom', c.s6.vals[i] as AccomOpt)}
                  >
                    {label}
                  </Pill>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 6: Notes & Budget ── */}
          {step === 6 && (
            <motion.div key="s6" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s7.q}</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium mb-2">{c.s7.budgetQ}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {c.s7.budgetOpts.map((opt, i) => (
                      <Pill
                        key={i}
                        selected={form.budget === c.s7.budgetVals[i]}
                        onClick={() => set('budget', c.s7.budgetVals[i])}
                      >
                        {opt}
                      </Pill>
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full px-4 py-3 rounded-2xl border-2 border-stone-300 text-hero text-sm font-sans focus:border-gold outline-none transition-colors resize-none placeholder-stone-400"
                  rows={4}
                  value={form.note}
                  onChange={(e) => set('note', e.target.value)}
                  placeholder={c.s7.placeholder}
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 8: Contacts ── */}
          {step === 8 && (
            <motion.div key="s8" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-hero text-center mb-6">{c.s8.q}</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder={c.s8.nome}
                      className={`${inputCls} ${touched && !form.nome.trim() ? 'border-red-400' : ''}`}
                      value={form.nome}
                      onChange={(e) => set('nome', e.target.value)}
                    />
                    {touched && !form.nome.trim() && (
                      <p className="text-red-500 text-[11px] mt-1 pl-2">{locale === 'it' ? 'Campo obbligatorio' : 'Required'}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={c.s8.cognome}
                      className={`${inputCls} ${touched && !form.cognome.trim() ? 'border-red-400' : ''}`}
                      value={form.cognome}
                      onChange={(e) => set('cognome', e.target.value)}
                    />
                    {touched && !form.cognome.trim() && (
                      <p className="text-red-500 text-[11px] mt-1 pl-2">{locale === 'it' ? 'Campo obbligatorio' : 'Required'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={c.s8.email}
                    className={`${inputCls} ${touched && !form.email.includes('@') ? 'border-red-400' : ''}`}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  {touched && !form.email.includes('@') && (
                    <p className="text-red-500 text-[11px] mt-1 pl-2">{locale === 'it' ? 'Inserisci un\'email valida' : 'Enter a valid email'}</p>
                  )}
                </div>
                <input type="tel" placeholder={c.s8.tel} className={inputCls} value={form.telefono} onChange={(e) => set('telefono', e.target.value)} />
                <div className="pt-1">
                  <p className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium mb-3 text-center">{c.s8.cq}</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {c.s8.copts.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => set('contactPref', c.s8.cvals[i] as ContactPref)}
                        className={`px-5 py-2.5 rounded-full border-2 text-sm font-sans transition-all duration-200 ${
                          form.contactPref === c.s8.cvals[i]
                            ? 'border-gold bg-gold text-white font-semibold'
                            : 'border-stone-300 bg-white text-hero/85 hover:border-gold hover:text-gold'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Submit error */}
        {submitError && (
          <div className="mt-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-sans text-center">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        {step > 0 && (
          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goBack}
              className="py-2.5 px-4 md:px-5 rounded-full border-2 border-stone-300 text-[10px] md:text-xs font-sans uppercase tracking-widest text-stone-600 hover:border-stone-500 hover:text-hero transition-all shrink-0"
            >
              {c.back}
            </button>

            {step < TOTAL ? (
              <button
                type="button"
                disabled={!canNext()}
                onClick={goNext}
                className={`py-3 px-6 md:px-8 rounded-full text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                  canNext()
                    ? 'bg-gold text-white hover:opacity-85 cursor-pointer'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                {c.next} <ArrowRight size={13} />
              </button>
            ) : (
              <button
                type="button"
                disabled={!canNext() || isSending}
                onClick={submit}
                className={`py-3 px-6 md:px-8 rounded-full text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                  canNext() && !isSending
                    ? 'bg-gold text-white hover:opacity-85 cursor-pointer'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                {isSending ? c.sending : c.send}
                {!isSending && <Plane size={13} className="rotate-45" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
