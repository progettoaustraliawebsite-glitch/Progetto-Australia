export const revalidate = 60;

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT ? 'Blog di Viaggio – Consigli su Australia e Oceania' : 'Travel Blog – Tips & Guides for Australia & Oceania';
  const description = isIT
    ? 'Articoli, guide e consigli di viaggio per l\'Australia, la Nuova Zelanda e le Isole del Pacifico. Scritti da esperti italiani con anni di esperienza sul campo.'
    : 'Articles, guides and travel tips for Australia, New Zealand and the Pacific Islands. Written by Italian experts with years of on-the-ground experience.';
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { 'it': '/it/blog', 'en': '/en/blog', 'x-default': '/it/blog' },
    },
    openGraph: { title, description, url: `/${locale}/blog` },
    twitter: { title, description },
  };
}
import { blogPosts as staticBlogPosts } from '@/data/blog';
import { getAllMdxBlogPosts } from '@/lib/mdx-loader';
import { USE_SANITY, getAllBlogPosts, normalizeSanityBlogPostForList } from '@/lib/sanity';
import BlogListClient from '@/components/blog/BlogListClient';
import type { BlogPost } from '@/data/blog';

/** Strip heavy fields (mdxContent, full content) that the listing page doesn't need */
function toListItem(post: BlogPost): BlogPost {
  return {
    ...post,
    mdxContent: undefined,
    content: { it: { intro: '', sections: [] }, en: { intro: '', sections: [] } },
  };
}

export default async function BlogListPage() {
  const locale = (await getLocale()) as 'it' | 'en';

  // Static posts (from blog.ts)
  const staticPosts = staticBlogPosts.map(toListItem);
  const existingSlugs = new Set(staticPosts.map((p) => p.slug));

  // MDX posts (from content/blog/*.mdx) — only add if slug not in static
  const mdxPosts = getAllMdxBlogPosts(locale)
    .filter((p) => !existingSlugs.has(p.slug))
    .map(toListItem);

  let allPosts: BlogPost[] = [...staticPosts, ...mdxPosts];

  // Sanity override (if enabled)
  if (USE_SANITY) {
    try {
      const sanityData = await getAllBlogPosts(locale);
      if (sanityData.length > 0) allPosts = sanityData.map((s) => normalizeSanityBlogPostForList(s));
    } catch (e) { console.error('[Sanity] blog fetch failed:', e); }
  }

  // Sort by date descending
  allPosts.sort((a, b) => (b.date > a.date ? 1 : a.date > b.date ? -1 : 0));

  return <BlogListClient posts={allPosts} locale={locale} />;
}
