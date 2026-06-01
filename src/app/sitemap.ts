import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { itineraries } from '@/data/itineraries';
import { destinations } from '@/data/destinations';

const BASE_URL = 'https://www.progettoaustralia.com';
const LOCALES = ['it', 'en'] as const;

function urls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ...urls('', 1.0, 'weekly'),
    ...urls('/destinations', 0.9, 'weekly'),
    ...urls('/travel-ideas', 0.9, 'weekly'),
    ...urls('/highlights', 0.8, 'monthly'),
    ...urls('/blog', 0.8, 'weekly'),
    ...urls('/about', 0.7, 'monthly'),
    ...urls('/contact', 0.7, 'monthly'),
    ...urls('/sustainability', 0.6, 'monthly'),
    ...urls('/wedding-list', 0.6, 'monthly'),
  ];

  const blogRoutes = blogPosts.flatMap((post) =>
    urls(`/blog/${post.slug}`, 0.7, 'monthly')
  );

  const itineraryRoutes = itineraries.flatMap((it) =>
    urls(`/travel-ideas/${it.slug}`, 0.8, 'monthly')
  );

  const destinationRoutes = destinations.flatMap((dest) =>
    urls(`/destinations/${dest.slug}`, 0.8, 'monthly')
  );

  return [...staticRoutes, ...blogRoutes, ...itineraryRoutes, ...destinationRoutes];
}
