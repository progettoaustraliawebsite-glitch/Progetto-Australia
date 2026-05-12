export const revalidate = 60;

import { getLocale, getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/blog';
import { USE_SANITY, getBlogPostBySlug } from '@/lib/sanity';
import BlogPostClient from '@/components/blog/BlogPostClient';
import SanityBlogPostClient from '@/components/blog/SanityBlogPostClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.title[locale];
  const description = post.excerpt[locale];
  const image = post.image ? [{ url: post.image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', images: image, url: `/${locale}/blog/${slug}` },
    twitter: { title, description, ...(image ? { images: [post.image] } : {}) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');

  const labels = {
    backLabel: t('backToBlog'),
    quoteLabel: tNav('getQuote'),
    tocLabel: t('tableOfContents'),
    contactPrompt: t('contactPrompt'),
  };

  // Static data always available
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: staticPost.title[locale],
      description: staticPost.excerpt[locale],
      image: staticPost.image ? `https://www.progettoaustralia.it${staticPost.image}` : undefined,
      url: `https://www.progettoaustralia.it/${locale}/blog/${slug}`,
      inLanguage: locale,
      author: {
        '@type': 'Organization',
        name: 'Progetto Australia',
        url: 'https://www.progettoaustralia.it',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Progetto Australia',
        logo: { '@type': 'ImageObject', url: 'https://www.progettoaustralia.it/logo.png' },
      },
      about: [
        { '@type': 'Place', name: 'Australia' },
        { '@type': 'Place', name: 'Oceania' },
      ],
    };
    return (
      <>
        <JsonLd data={blogSchema} />
        <BlogPostClient post={staticPost} locale={locale} {...labels} />
      </>
    );
  }

  // Sanity fallback (only when USE_SANITY=true and slug not in static data)
  if (USE_SANITY) {
    const sanityPost = await getBlogPostBySlug(slug);
    if (sanityPost) {
      return <SanityBlogPostClient post={sanityPost} locale={locale} {...labels} />;
    }
  }

  notFound();
}
