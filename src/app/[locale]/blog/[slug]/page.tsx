export const revalidate = 60;

import { getLocale, getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/blog';
import { getAllMdxBlogPosts, getMdxBlogPost } from '@/lib/mdx-loader';
import { USE_SANITY, getBlogPostBySlug, getAllBlogPosts, normalizeSanityBlogPostForList } from '@/lib/sanity';
import BlogPostClient from '@/components/blog/BlogPostClient';
import SanityBlogPostClient from '@/components/blog/SanityBlogPostClient';
import MdxBlogPostClient from '@/components/blog/MdxBlogPostClient';
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

  // Try static first
  const post = blogPosts.find((p) => p.slug === slug);
  if (post) {
    const title = post.title[locale];
    const description = post.excerpt[locale];
    const imageUrl = post.image?.startsWith('http') ? post.image : `https://www.progettoaustralia.com${post.image ?? ''}`;
    const image = post.image ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined;
    return {
      title, description,
      alternates: {
        canonical: `/${locale}/blog/${slug}`,
        languages: { 'it': `/it/blog/${slug}`, 'en': `/en/blog/${slug}`, 'x-default': `/it/blog/${slug}` },
      },
      openGraph: { title, description, type: 'article', images: image, url: `/${locale}/blog/${slug}` },
      twitter: { title, description, ...(image ? { images: [imageUrl] } : {}) },
    };
  }

  // Try MDX
  const mdxPost = getMdxBlogPost(slug);
  if (mdxPost) {
    const title = mdxPost.title[locale] || mdxPost.title.it;
    const description = mdxPost.excerpt[locale] || mdxPost.excerpt.it;
    const imageUrl = mdxPost.heroImage || '';
    return {
      title, description,
      alternates: {
        canonical: `/${locale}/blog/${slug}`,
        languages: { 'it': `/it/blog/${slug}`, 'en': `/en/blog/${slug}`, 'x-default': `/it/blog/${slug}` },
      },
      openGraph: { title, description, type: 'article', ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] } : {}), url: `/${locale}/blog/${slug}` },
      twitter: { title, description, ...(imageUrl ? { images: [imageUrl] } : {}) },
    };
  }

  return {};
}

export async function generateStaticParams() {
  const staticSlugs = blogPosts.map((p) => ({ slug: p.slug }));
  const mdxSlugs = getAllMdxBlogPosts().map((p) => ({ slug: p.slug }));
  const seen = new Set<string>();
  return [...staticSlugs, ...mdxSlugs].filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
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
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, image: p.image,
  }));
  // Add MDX posts to related
  const mdxAll = getAllMdxBlogPosts();
  const existingSlugs = new Set(allPosts.map((p) => p.slug));
  for (const mp of mdxAll) {
    if (!existingSlugs.has(mp.slug)) {
      allPosts.push({ slug: mp.slug, title: mp.title, excerpt: mp.excerpt, category: mp.category, image: mp.image });
    }
  }

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

  // Try Sanity first when enabled
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
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://www.progettoaustralia.com/${locale}/blog` },
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

  // Try MDX post
  const mdxPost = getMdxBlogPost(slug);
  if (mdxPost) {
    const postUrl = `https://www.progettoaustralia.com/${locale}/blog/${slug}`;
    const mdxTitle = mdxPost.title[locale] || mdxPost.title.it;
    const mdxDesc = mdxPost.excerpt[locale] || mdxPost.excerpt.it;

    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: mdxTitle,
      description: mdxDesc,
      image: mdxPost.heroImage || undefined,
      url: postUrl,
      datePublished: mdxPost.date,
      dateModified: mdxPost.date,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Paola Messina',
        jobTitle: locale === 'it' ? 'Esperta di viaggi in Australia e Oceania' : 'Australia & Oceania Travel Expert',
        worksFor: { '@type': 'Organization', name: 'Progetto Australia' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Progetto Australia',
        url: 'https://www.progettoaustralia.com',
        logo: { '@type': 'ImageObject', url: 'https://www.progettoaustralia.com/logo.png' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.progettoaustralia.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://www.progettoaustralia.com/${locale}/blog` },
        { '@type': 'ListItem', position: 3, name: mdxTitle, item: postUrl },
      ],
    };

    return (
      <>
        <JsonLd data={blogSchema} />
        <JsonLd data={breadcrumbSchema} />
        <MdxBlogPostClient
          title={mdxTitle}
          content={mdxPost.mdxContent}
          date={mdxPost.date}
          image={mdxPost.heroImage}
          category={mdxPost.category[locale] || mdxPost.category.it}
          locale={locale}
          {...labels}
        />
      </>
    );
  }

  notFound();
}
