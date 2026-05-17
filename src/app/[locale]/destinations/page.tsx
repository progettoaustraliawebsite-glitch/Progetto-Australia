export const revalidate = 60;

import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowRight, Check } from 'lucide-react';
import { destinations as staticDestinations } from '@/data/destinations';
import { USE_SANITY, getAllDestinations, normalizeSanityDestination } from '@/lib/sanity';
import { Link } from '@/i18n/navigation';
import OpenModalButton from '@/components/ui/OpenModalButton';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT ? 'Destinazioni – Australia, Nuova Zelanda, Fiji e Oceania' : 'Destinations – Australia, New Zealand, Fiji & Oceania';
  const description = isIT
    ? 'Esplora le destinazioni più belle dell\'Oceania: Australia, Nuova Zelanda, Fiji, Polinesia Francese, Isole Cook e Vanuatu. Itinerari su misura per ogni tipo di viaggiatore.'
    : 'Explore the most beautiful destinations in Oceania: Australia, New Zealand, Fiji, French Polynesia, Cook Islands and Vanuatu. Bespoke itineraries for every traveller.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/destinations` },
    twitter: { title, description },
  };
}

export default async function DestinationsPage() {
  const t = await getTranslations('destinations');
  const locale = (await getLocale()) as 'it' | 'en';

  let destinations = staticDestinations;
  if (USE_SANITY) {
    const sanityData = await getAllDestinations();
    if (sanityData.length > 0) destinations = sanityData.map((s, i) => normalizeSanityDestination(s, i));
  }

  return (
    <>
      <section className="relative pt-24 md:pt-40 pb-14 md:pb-24 px-4 md:px-6 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-xs font-sans uppercase tracking-[0.3em] mb-4 block" style={{ color: '#b0a377' }}>
            Oceania
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col">
            {destinations.map((dest, i) => (
              <article key={dest.id} className="group grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                <div className={`relative overflow-hidden h-72 lg:h-auto order-1 ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${dest.photo}), linear-gradient(135deg, ${dest.accentColor}, #1a1a1a)` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-8xl font-bold text-white/10 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-6 md:p-10 lg:p-16 flex flex-col justify-center order-2 ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
                  style={{ backgroundColor: i % 2 === 0 ? '#fafaf9' : '#ffffff' }}
                >
                  <span className="text-xs font-sans uppercase tracking-[0.3em] mb-4 block" style={{ color: '#b0a377' }}>
                    {dest.tagline[locale]}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#474d4b' }}>
                    {dest.name[locale]}
                  </h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: '#474d4baa' }}>
                    {dest.description[locale]}
                  </p>

                  {dest.highlights[locale].length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {dest.highlights[locale].map((h) => (
                        <li key={h} className="flex items-center gap-2">
                          <Check size={14} style={{ color: '#b0a377', flexShrink: 0 }} />
                          <span className="text-sm" style={{ color: '#474d4b' }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="inline-flex items-center gap-3 text-xs font-sans uppercase tracking-widest hover:opacity-70 transition-opacity duration-300 self-start"
                    style={{ color: '#b0a377' }}
                  >
                    {t('explore')} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
