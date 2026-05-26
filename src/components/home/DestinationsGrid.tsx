'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Destination } from '@/data/destinations';

interface Props {
  destinations: Destination[];
  label?: string;
  title?: string;
  subtitle?: string;
}

export default function DestinationsGrid({ destinations, label, title, subtitle }: Props) {
  const t = useTranslations('home.destinations');
  const locale = useLocale() as 'it' | 'en';
  const discoverLabel = locale === 'it' ? 'Scopri' : 'Discover';

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <SectionHeader
          label={label ?? t('label')}
          title={title ?? t('title')}
          subtitle={subtitle ?? t('subtitle')}
        />
      </div>

      {/* Cards strip — scroll orizzontale su tutti i breakpoint */}
      <div className="flex gap-0.5 overflow-x-auto overflow-y-hidden scrollbar-hide px-6 lg:px-10 [scroll-snap-type:x_mandatory]">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative overflow-hidden cursor-pointer shrink-0 [scroll-snap-align:start] h-[460px] w-[80vw] sm:w-[340px] lg:w-[380px] xl:w-[420px]"
          >
            {/* Photo */}
            <div className="absolute inset-0">
              <Image
                src={dest.photo}
                alt={dest.name[locale]}
                fill
                className={dest.photoFit === 'contain' ? 'object-contain' : 'object-cover'}
                sizes="80vw, 420px"
                quality={80}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {/* Subtle dark tint on non-hovered siblings */}
            <div className="absolute inset-0 bg-black/25 lg:group-hover:bg-black/0 transition-colors duration-500" />

            {/* Content */}
            <Link href={`/destinations/${dest.slug}`} className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3 className="font-serif text-2xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
                {dest.name[locale]}
              </h3>
              <span className="inline-block self-start px-5 py-2 border border-white/80 text-white text-[10px] font-sans uppercase tracking-widest rounded-full backdrop-blur-sm hover:bg-white hover:text-hero transition-all duration-300">
                {discoverLabel}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
