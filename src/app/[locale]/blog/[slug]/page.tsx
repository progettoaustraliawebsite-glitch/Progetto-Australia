export const revalidate = 60;

import { getLocale, getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/blog';
import { USE_SANITY, getBlogPostBySlug, getAllBlogPosts, normalizeSanityBlogPostForList } from '@/lib/sanity';
import BlogPostClient from '@/components/blog/BlogPostClient';
import SanityBlogPostClient from '@/components/blog/SanityBlogPostClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import type { RelatedPost } from '@/components/blog/BlogRelatedPosts';

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
  const imageUrl = post.image?.startsWith('http') ? post.image : `https://www.progettoaustralia.com${post.image ?? ''}`;
  const image = post.image ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'it': `/it/blog/${slug}`,
        'en': `/en/blog/${slug}`,
        'x-default': `/it/blog/${slug}`,
      },
    },
    openGraph: { title, description, type: 'article', images: image, url: `/${locale}/blog/${slug}` },
    twitter: { title, description, ...(image ? { images: [imageUrl] } : {}) },
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

  // Fetch all posts for "related" section
  let allPosts: RelatedPost[] = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    image: p.image,
  }));
  if (USE_SANITY) {
    try {
      const sanityAll = await getAllBlogPosts();
      if (sanityAll.length > 0) {
        allPosts = sanityAll.map((s) => {
          const n = normalizeSanityBlogPostForList(s);
          return { slug: n.slug, title: n.title, excerpt: n.excerpt, category: n.category, image: n.image };
        });
      }
    } catch { /* keep static fallback */ }
  }
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Try Sanity first when enabled (so heroImage set in Studio is always used)
  if (USE_SANITY) {
    try {
      const sanityPost = await getBlogPostBySlug(slug);
      if (sanityPost) {
        return <SanityBlogPostClient post={sanityPost} locale={locale} relatedPosts={relatedPosts} {...labels} />;
      }
    } catch (e) { console.error('[Sanity] blog slug fetch failed:', e); }
  }

  // Fallback to static data
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    const postUrl = `https://www.progettoaustralia.com/${locale}/blog/${slug}`;
    const postImage = staticPost.image?.startsWith('http')
      ? staticPost.image
      : `https://www.progettoaustralia.com${staticPost.image ?? ''}`;

    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: staticPost.title[locale],
      description: staticPost.excerpt[locale],
      image: staticPost.image ? postImage : undefined,
      url: postUrl,
      datePublished: staticPost.date ?? new Date().toISOString(),
      dateModified: staticPost.date ?? new Date().toISOString(),
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Paola Messina',
        jobTitle: locale === 'it' ? 'Esperta di viaggi in Australia e Oceania' : 'Australia & Oceania Travel Expert',
        worksFor: { '@type': 'Organization', name: 'Progetto Australia' },
        knowsAbout: ['Australia', 'New Zealand', 'Fiji', 'Pacific Islands travel', 'Oceania'],
      },
      publisher: {
        '@type': 'Organization',
        name: 'Progetto Australia',
        url: 'https://www.progettoaustralia.com',
        logo: { '@type': 'ImageObject', url: 'https://www.progettoaustralia.com/logo.png' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      about: [
        { '@type': 'Place', name: 'Australia' },
        { '@type': 'Place', name: 'Oceania' },
      ],
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.progettoaustralia.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: locale === 'it' ? 'Blog' : 'Blog', item: `https://www.progettoaustralia.com/${locale}/blog` },
        { '@type': 'ListItem', position: 3, name: staticPost.title[locale], item: postUrl },
      ],
    };

    return (
      <>
        <JsonLd data={blogSchema} />
        <JsonLd data={breadcrumbSchema} />
        <BlogPostClient post={staticPost} locale={locale} relatedPosts={relatedPosts} {...labels} />
      </>
    );
  }

  notFound();
}
