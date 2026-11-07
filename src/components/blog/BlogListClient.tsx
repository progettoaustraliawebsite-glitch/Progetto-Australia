'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import { Calendar, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { destinations } from '@/data/destinations';

interface Props {
  posts: BlogPost[];
  locale: 'it' | 'en';
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BlogListClient({ posts, locale }: Props) {
  const t = useTranslations('blog');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Build destination options dynamically from posts that have a destination
  const destinationOptions = useMemo(() => {
    const slugs = new Set<string>();
    for (const post of posts) {
      if (post.destination) slugs.add(post.destination);
    }
    return Array.from(slugs).map((slug) => {
      const dest = destinations.find((d) => d.slug === slug);
      return {
        slug,
        label: dest ? dest.name[locale] : slug,
      };
    });
  }, [posts, locale]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return posts;
    return posts.filter((p) => p.destination === activeFilter);
  }, [posts, activeFilter]);

  return (
    <div className="pt-32 pb-24 bg-sand/20 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Filter pills */}
        {destinationOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 text-[11px] font-sans font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-white text-hero/60 border border-hero/15 hover:border-gold hover:text-gold'
              }`}
            >
              {locale === 'it' ? 'Tutti' : 'All'}
            </button>
            {destinationOptions.map((opt) => (
              <button
                key={opt.slug}
                onClick={() => setActiveFilter(opt.slug)}
                className={`px-5 py-2 text-[11px] font-sans font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === opt.slug
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white text-hero/60 border border-hero/15 hover:border-gold hover:text-gold'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[locale]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg">
                      {post.category[locale]}
                    </span>
                  </div>
                </Link>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-hero/40 text-xs mb-4">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <h3 className="font-serif text-lg md:text-2xl font-bold text-hero mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                    {post.title[locale]}
                  </h3>
                  <p className="text-hero/55 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt[locale]}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 hover:gap-4"
                    style={{ color: '#b0a377' }}
                  >
                    {t('readArticle')} <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-hero/40">
            <p className="text-lg font-serif">
              {locale === 'it'
                ? 'Nessun articolo per questa destinazione.'
                : 'No articles for this destination.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
