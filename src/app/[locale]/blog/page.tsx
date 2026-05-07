'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { blogPosts } from '@/data/blog';
import { Link } from '@/i18n/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import { Calendar, ChevronRight } from 'lucide-react';

export default function BlogListPage() {
  const locale = useLocale() as 'it' | 'en';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-32 pb-24 bg-sand/20 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader 
          label="Guide e Diari"
          title="Il Nostro Blog"
          subtitle="Ispirazioni, consigli e itinerari dettagliati per il tuo prossimo viaggio in Oceania."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {blogPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title[locale]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-hero text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {post.category[locale]}
                  </span>
                </div>
              </Link>
              <div className="p-8">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="font-serif text-2xl font-bold text-hero mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {post.title[locale]}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt[locale]}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
                >
                  Leggi Guida <ChevronRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
