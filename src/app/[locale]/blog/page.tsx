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
    openGraph: { title, description, url: `/${locale}/blog` },
    twitter: { title, description },
  };
}
import { blogPosts as staticBlogPosts } from '@/data/blog';
import { USE_SANITY, getAllBlogPosts, normalizeSanityBlogPostForList } from '@/lib/sanity';
import BlogListClient from '@/components/blog/BlogListClient';

export default async function BlogListPage() {
  const locale = (await getLocale()) as 'it' | 'en';

  let posts = staticBlogPosts;
  if (USE_SANITY) {
    const sanityData = await getAllBlogPosts();
    if (sanityData.length > 0) posts = sanityData.map((s) => normalizeSanityBlogPostForList(s));
  }

  return <BlogListClient posts={posts} locale={locale} />;
}
