'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'rgba(249, 178, 51, 0.1)', border: '1px solid #f9b233' }}
        >
          <CheckCircle2 size={28} style={{ color: '#f9b233' }} />
        </motion.div>
        <h3 className="font-serif text-2xl text-white mb-3 uppercase tracking-widest">
          {t('form.successTitle')}
        </h3>
        <p style={{ color: '#999' }}>
          {t('form.successText')}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('form.name')} required>
            <input
              type="text"
              required
              style={inputStyle(false)}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300"
              placeholder="Mario Rossi"
            />
          </Field>
          <Field label={t('form.email')} required>
            <input
              type="email"
              required
              style={inputStyle(false)}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300"
              placeholder="mario@example.com"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('form.phone')}>
            <input
              type="tel"
              style={inputStyle(false)}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300"
              placeholder="+39 333 000 0000"
            />
          </Field>
          <Field label={t('form.travelers')}>
            <select 
              style={inputStyle(false)}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300 cursor-pointer"
            >
              <option value="" className="bg-[#1a1a1a]">—</option>
              <option value="1" className="bg-[#1a1a1a]">1</option>
              <option value="2" className="bg-[#1a1a1a]">2</option>
              <option value="3-4" className="bg-[#1a1a1a]">3–4</option>
              <option value="5+" className="bg-[#1a1a1a]">5+</option>
            </select>
          </Field>
        </div>

        <Field label={t('form.departure')}>
          <input
            type="text"
            style={inputStyle(false)}
            className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300"
            placeholder="Estate 2025 / Dicembre 2025"
          />
        </Field>

        <Field label={t('form.message')} required>
          <textarea
            required
            rows={5}
            style={inputStyle(false)}
            className="w-full px-4 py-3 text-sm bg-transparent outline-none border border-[#2e2e2e] focus:border-gold transition-colors duration-300 resize-none"
            placeholder="..."
          />
        </Field>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 py-4 px-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80 self-start"
          style={{ backgroundColor: '#f9b233', color: '#1a1a1a' }}
        >
          {t('form.submit')} <Send size={14} />
        </button>
      </form>
    </div>
  );
}

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
