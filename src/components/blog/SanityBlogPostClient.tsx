'use client';

import { PortableText } from '@portabletext/react';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, Globe } from 'lucide-react';
import type { SanityBlogPost } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import OpenModalButton from '@/components/ui/OpenModalButton';

interface Props {
  post: SanityBlogPost;
  locale: 'it' | 'en';
  backLabel: string;
  quoteLabel: string;
  tocLabel: string;
  contactPrompt: string;
}

export default function SanityBlogPostClient({ post, locale, backLabel, quoteLabel, contactPrompt }: Props) {
  const imageUrl = post.heroImage ? urlFor(post.heroImage).width(1920).height(800).url() : '';
  const body = post.body?.[locale] ?? [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end">
        <div className="absolute inset-0">
          {imageUrl && (
            <img src={imageUrl} alt={post.title[locale]} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-hero/95 via-hero/20 to-transparent" />
        </div>
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors mb-8 text-xs uppercase tracking-[0.2em] font-sans"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <div className="max-w-4xl">
            <span className="bg-gold text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em] px-4 py-2 mb-6 inline-block shadow-lg">
              {post.category?.[locale]}
            </span>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {post.title[locale]}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none text-hero/80 font-sans leading-relaxed">
              <PortableText value={body as Parameters<typeof PortableText>[0]['value']} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="p-10 border border-stone-100" style={{ backgroundColor: '#1a1a1a' }}>
                <h3 className="font-serif text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-2" style={{ color: '#b0a377' }}>
                  <Globe size={20} /> {post.title[locale]}
                </h3>
                <div className="mt-12 pt-10 border-t border-white/10">
                  <p className="text-sm text-white/65 font-sans mb-8 leading-relaxed">
                    {contactPrompt}
                  </p>
                  <OpenModalButton
                    className="block w-full text-center py-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] transition-all border"
                    style={{ borderColor: '#b0a377', color: '#b0a377' }}
                  >
                    {quoteLabel}
                  </OpenModalButton>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
