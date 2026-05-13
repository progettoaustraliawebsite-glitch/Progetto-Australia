import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// ─── Feature flag ─────────────────────────────────────────────────────────────
// Set USE_SANITY=true in .env.local (or Vercel env vars) to switch from static
// data to Sanity CMS. Keep false during development/content migration.
export const USE_SANITY = process.env.USE_SANITY === 'true';

// ─── Client ──────────────────────────────────────────────────────────────────

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// ─── Image URL helper ─────────────────────────────────────────────────────────

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── TypeScript interfaces ────────────────────────────────────────────────────

export interface LocaleString {
  it: string;
  en: string;
}

export interface SanityItineraryDay {
  day: number;
  title: LocaleString;
  description: LocaleString;
}

export interface SanityItinerary {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  destination?: { _id: string; title: LocaleString };
  duration: number;
  price: { amount: number; currency: string };
  category: string;
  description: LocaleString;
  highlights: { it: string[]; en: string[] };
  program?: SanityItineraryDay[];
  included?: { it: string[]; en: string[] };
  notIncluded?: { it: string[]; en: string[] };
  heroImage?: SanityImageSource;
  featured?: boolean;
}

export interface SanityDestination {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  country: string;
  tagline: LocaleString;
  description: LocaleString;
  highlights?: { it: string[]; en: string[] };
  heroImage?: SanityImageSource;
  featured?: boolean;
}

export interface SanityBlogPost {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  publishedAt: string;
  author: string;
  category: LocaleString;
  excerpt: LocaleString;
  body: {
    it: unknown[];
    en: unknown[];
  };
  heroImage?: SanityImageSource;
}

export interface SanityHighlight {
  _id: string;
  title: LocaleString;
  description: LocaleString;
  category: LocaleString;
  destination?: { _id: string; title: LocaleString };
  image?: SanityImageSource;
}

export interface SanityWeddingPackage {
  _id: string;
  title: LocaleString;
  description: LocaleString;
  price: { amount: number; currency: string };
  inclusions: { it: string[]; en: string[] };
  image?: SanityImageSource;
}

// ─── Normalizers (Sanity → static data shapes) ───────────────────────────────
// Converts Sanity documents to the same interfaces used by existing components,
// so client components don't need to change.

import type { Itinerary } from '@/data/itineraries';
import type { Destination } from '@/data/destinations';
import type { BlogPost } from '@/data/blog';

const GRADIENT_DEFAULTS = [
  'from-amber-800 to-orange-900',
  'from-teal-800 to-emerald-900',
  'from-blue-900 to-indigo-900',
  'from-rose-900 to-pink-800',
  'from-violet-900 to-purple-800',
  'from-stone-700 to-zinc-900',
];

const ACCENT_DEFAULTS = ['#813318', '#0f766e', '#1e40af', '#881337', '#6d28d9', '#57534e'];

export function normalizeSanityItinerary(s: SanityItinerary, idx = 0): Itinerary {
  return {
    id: s._id,
    slug: s.slug.current,
    title: s.title,
    description: s.description,
    duration: s.duration,
    destination: s.destination?.title?.it ?? '',
    type: s.category ?? 'adventure',
    gradient: GRADIENT_DEFAULTS[idx % GRADIENT_DEFAULTS.length],
    image: s.heroImage ? urlFor(s.heroImage).width(800).height(520).url() : '',
    price: s.price ?? { amount: 0, currency: 'EUR' },
    highlights: s.highlights ?? { it: [], en: [] },
    program: (s.program ?? []).map((d) => ({
      day: d.day,
      title: d.title,
      description: d.description,
    })),
    included: s.included ?? { it: [], en: [] },
    notIncluded: s.notIncluded ?? { it: [], en: [] },
  };
}

export function normalizeSanityDestination(s: SanityDestination, idx = 0): Destination {
  return {
    id: s._id,
    slug: s.slug.current,
    name: s.title,
    tagline: s.tagline,
    description: s.description,
    gradient: GRADIENT_DEFAULTS[idx % GRADIENT_DEFAULTS.length],
    accentColor: ACCENT_DEFAULTS[idx % ACCENT_DEFAULTS.length],
    photo: s.heroImage ? urlFor(s.heroImage).width(900).height(600).url() : '',
    highlights: s.highlights ?? { it: [], en: [] },
  };
}

export function normalizeSanityBlogPostForList(s: SanityBlogPost): BlogPost {
  return {
    id: s._id,
    slug: s.slug.current,
    title: s.title,
    excerpt: s.excerpt ?? { it: '', en: '' },
    category: s.category ?? { it: '', en: '' },
    image: s.heroImage ? urlFor(s.heroImage).width(800).height(500).url() : '',
    date: s.publishedAt ?? new Date().toISOString(),
    content: { it: { intro: '', sections: [] }, en: { intro: '', sections: [] } },
  };
}

// ─── Fetch functions ──────────────────────────────────────────────────────────

export async function getAllItineraries(): Promise<SanityItinerary[]> {
  return sanityClient.fetch(
    `*[_type == "itinerary"] | order(_createdAt asc) {
      _id, title, slug, duration, price, category, description, highlights,
      program, included, notIncluded, heroImage, featured,
      destination->{ _id, title }
    }`
  );
}

export async function getItineraryBySlug(slug: string): Promise<SanityItinerary | null> {
  return sanityClient.fetch(
    `*[_type == "itinerary" && slug.current == $slug][0] {
      _id, title, slug, duration, price, category, description, highlights,
      program, included, notIncluded, heroImage, featured,
      destination->{ _id, title }
    }`,
    { slug }
  );
}

export async function getFeaturedItineraries(): Promise<SanityItinerary[]> {
  return sanityClient.fetch(
    `*[_type == "itinerary" && featured == true] | order(_createdAt asc) [0...6] {
      _id, title, slug, duration, price, category, description, highlights,
      program, included, notIncluded, heroImage,
      destination->{ _id, title }
    }`
  );
}

export async function getAllDestinations(): Promise<SanityDestination[]> {
  return sanityClient.fetch(
    `*[_type == "destination"] | order(_createdAt asc) {
      _id, title, slug, country, tagline, description, highlights, heroImage, featured
    }`
  );
}

export async function getDestinationBySlug(slug: string): Promise<SanityDestination | null> {
  return sanityClient.fetch(
    `*[_type == "destination" && slug.current == $slug][0] {
      _id, title, slug, country, tagline, description, highlights, heroImage, featured
    }`,
    { slug }
  );
}

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, category, excerpt, heroImage
    }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, author, category, excerpt, body, heroImage
    }`,
    { slug }
  );
}

export async function getHighlights(): Promise<SanityHighlight[]> {
  return sanityClient.fetch(
    `*[_type == "highlight"] | order(_createdAt asc) {
      _id, title, description, category, image,
      destination->{ _id, title }
    }`
  );
}

export async function getAllWeddingPackages(): Promise<SanityWeddingPackage[]> {
  return sanityClient.fetch(
    `*[_type == "weddingPackage"] | order(_createdAt asc) {
      _id, title, description, price, inclusions, image
    }`
  );
}
