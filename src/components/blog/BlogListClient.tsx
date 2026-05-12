'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import { Calendar, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

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

  return (
    <div className="pt-32 pb-24 bg-sand/20 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: i * 0.1 }}
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
        </div>
      </div>
    </div>
  );
}
