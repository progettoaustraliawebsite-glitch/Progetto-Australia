export const revalidate = 60;

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT
    ? 'Progetto Australia – Viaggi su misura in Australia e Oceania'
    : 'Progetto Australia – Tailor-Made Travel to Australia & Oceania';
  const description = isIT
    ? 'Pianifica il tuo viaggio in Australia, Nuova Zelanda, Fiji e Isole del Pacifico con esperti italiani in loco. Itinerari personalizzati, luna di miele, viaggi di lusso.'
    : 'Plan your trip to Australia, New Zealand, Fiji and the Pacific Islands with Italian experts on the ground. Bespoke itineraries, honeymoons, luxury travel.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}` },
    twitter: { title, description },
  };
}

import HeroSlider from '@/components/home/HeroSlider';
import AboutStrip from '@/components/home/AboutStrip';
import FeaturedItineraries from '@/components/home/FeaturedItineraries';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import CertificationsBanner from '@/components/home/CertificationsBanner';
import HomeBlogSection from '@/components/home/HomeBlogSection';
import { USE_SANITY, getAllItineraries, normalizeSanityItinerary, getAllDestinations, normalizeSanityDestination } from '@/lib/sanity';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { destinations as staticDestinations } from '@/data/destinations';
import { blogPosts as staticBlogPosts } from '@/data/blog';

export default async function HomePage() {
  const locale = (await getLocale()) as 'it' | 'en';
  let itineraries = staticItineraries;
  let destinations = staticDestinations;

  if (USE_SANITY) {
    try {
      const [sanityItineraries, sanityDestinations] = await Promise.all([
        getAllItineraries(),
        getAllDestinations(),
      ]);
      if (sanityItineraries.length > 0) itineraries = sanityItineraries.map((s, i) => normalizeSanityItinerary(s, i));
      if (sanityDestinations.length > 0) destinations = sanityDestinations.map((s, i) => normalizeSanityDestination(s, i));
    } catch (e) {
      console.error('[Sanity] homepage fetch failed, falling back to static data:', e);
    }
  }

  return (
    <>
      <HeroSlider />
      <AboutStrip />
      <FeaturedItineraries itineraries={itineraries} />
      <DestinationsGrid destinations={destinations} />
      <TestimonialsSection />
      <CertificationsBanner />
      <HomeBlogSection posts={staticBlogPosts} locale={locale} />
      <NewsletterSection />
    </>
  );
}
