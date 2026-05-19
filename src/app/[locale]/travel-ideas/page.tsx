export const revalidate = 60;

import { getTranslations, getLocale } from 'next-intl/server';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { USE_SANITY, getAllItineraries, normalizeSanityItinerary } from '@/lib/sanity';
import TravelIdeasClient from '@/components/travel-ideas/TravelIdeasClient';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT ? 'Idee di Viaggio – Itinerari in Australia e Oceania' : 'Travel Ideas – Itineraries for Australia & Oceania';
  const description = isIT
    ? 'Scopri i nostri itinerari in Australia, Nuova Zelanda, Fiji e Isole del Pacifico. Self-drive, lusso, avventura, famiglia: ogni viaggio è costruito su misura.'
    : 'Discover our itineraries across Australia, New Zealand, Fiji and the Pacific Islands. Self-drive, luxury, adventure, family: every trip is built around you.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/travel-ideas` },
    twitter: { title, description },
  };
}

export default async function TravelIdeasPage() {
  const t = await getTranslations('travelIdeas');
  const locale = (await getLocale()) as 'it' | 'en';

  let itineraries = staticItineraries;
  if (USE_SANITY) {
    try {
      const sanityData = await getAllItineraries();
      if (sanityData.length > 0) itineraries = sanityData.map((s, i) => normalizeSanityItinerary(s, i));
    } catch (e) { console.error('[Sanity] travel-ideas fetch failed:', e); }
  }

  return (
    <TravelIdeasClient
      itineraries={itineraries}
      locale={locale}
      heroLabel={locale === 'it' ? 'Ispirati' : 'Get Inspired'}
      heroTitle={t('title')}
      heroSubtitle={t('subtitle')}
    />
  );
}
