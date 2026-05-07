'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Heart, Gem, Users, Mountain, Car, Globe, Backpack } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Link } from '@/i18n/navigation';

const travelTypes = [
  { id: 'honeymoon', icon: Heart, labelKey: 'honeymoon' },
  { id: 'luxury', icon: Gem, labelKey: 'luxury' },
  { id: 'family', icon: Users, labelKey: 'family' },
  { id: 'adventure', icon: Mountain, labelKey: 'adventure' },
  { id: 'selfDrive', icon: Car, labelKey: 'selfDrive' },
  { id: 'group', icon: Globe, labelKey: 'group' },
  { id: 'backpacking', icon: Backpack, labelKey: 'backpacking' },
];

function TypeCard({ type, label }: { type: typeof travelTypes[0]; label: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = type.icon;
  return (
    <Link
      href="/travel-ideas"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-4 p-6 transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? '#b0a377' : '#e7e5e4'}`,
        backgroundColor: hovered ? '#ffffff' : '#fafaf9',
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          border: `1px solid ${hovered ? '#b0a377' : '#e7e5e4'}`,
          backgroundColor: hovered ? '#b0a377' : 'transparent',
        }}
      >
        <Icon size={20} style={{ color: hovered ? '#ffffff' : '#474d4b' }} />
      </div>
      <span
        className="text-xs font-sans uppercase tracking-wider text-center leading-tight transition-colors duration-300"
        style={{ color: hovered ? '#b0a377' : '#474d4b' }}
      >
        {label}
      </span>
    </Link>
  );
}

export default function TravelTypes() {
  const t = useTranslations('home.travelTypes');

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {travelTypes.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <TypeCard type={type} label={t(`items.${type.labelKey}`)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
