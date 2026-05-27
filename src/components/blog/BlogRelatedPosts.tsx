'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export interface RelatedPost {
  slug: string;
  title: { it: string; en: string };
  excerpt: { it: string; en: string };
  category: { it: string; en: string };
  image: string;
}

interface Props {
  posts: RelatedPost[];
  locale: 'it' | 'en';
}

export default function BlogRelatedPosts({ posts, locale }: Props) {
  if (!posts.length) return null;

  const label = locale === 'it' ? 'Leggi anche' : 'Read also';
  const readMore = locale === 'it' ? 'Leggi' : 'Read';

  return (
    <section className="border-t border-stone-100 pt-16 mt-16">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-hero mb-10 uppercase tracking-widest">
        {label}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}` as Parameters<typeof Link>[0]['href']}
            className="group block bg-stone-50 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title[locale]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15" />
              <span className="absolute top-3 left-3 bg-gold text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                {post.category[locale]}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-base font-bold text-hero mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                {post.title[locale]}
              </h3>
              <p className="text-hero/55 text-xs leading-relaxed line-clamp-2 mb-4">
                {post.excerpt[locale]}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-gold group-hover:gap-3 transition-all duration-300">
                {readMore} <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
