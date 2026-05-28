'use client';

import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, Globe, Info, FileText, CloudSun, Bus, Coins, Shirt, Zap, MapPin, Calendar, Bookmark } from 'lucide-react';
import type { SanityBlogPost } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import OpenModalButton from '@/components/ui/OpenModalButton';
import BlogRelatedPosts, { type RelatedPost } from '@/components/blog/BlogRelatedPosts';

interface Props {
  post: SanityBlogPost;
  locale: 'it' | 'en';
  backLabel: string;
  quoteLabel: string;
  tocLabel: string;
  contactPrompt: string;
  relatedPosts?: RelatedPost[];
}

function getIcon(id: string) {
  switch (id) {
    case 'documenti': return <FileText size={24} className="text-gold" />;
    case 'quando-andare': return <CloudSun size={24} className="text-gold" />;
    case 'clima': return <CloudSun size={24} className="text-gold" />;
    case 'trasporti': return <Bus size={24} className="text-gold" />;
    case 'lingua-moneta': return <Coins size={24} className="text-gold" />;
    case 'abbigliamento': return <Shirt size={24} className="text-gold" />;
    case 'elettricita': return <Zap size={24} className="text-gold" />;
    case 'dove-quando': return <MapPin size={24} className="text-gold" />;
    case 'cosa-aspettarsi': return <Calendar size={24} className="text-gold" />;
    case 'come-prenotare': return <Bookmark size={24} className="text-gold" />;
    default: return <Info size={24} className="text-gold" />;
  }
}

export default function SanityBlogPostClient({ post, locale, backLabel, quoteLabel, tocLabel, contactPrompt, relatedPosts = [] }: Props) {
  const imageUrl = post.heroImage ? urlFor(post.heroImage).width(1920).height(800).url() : '';
  const intro = post.intro?.[locale] ?? '';
  const sections = post.sections ?? [];
  const body = post.body?.[locale] ?? [];
  const hasSections = sections.length > 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end">
        <div className="absolute inset-0">
          {imageUrl && (
            <Image src={imageUrl} alt={post.title[locale]} fill className="object-cover" sizes="100vw" priority unoptimized />
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
          <div className="lg:col-span-8 space-y-16">

            {/* Intro */}
            {intro && (
              <div className="prose prose-lg max-w-none">
                <div className="text-lg text-hero/80 leading-relaxed font-sans space-y-6">
                  {intro.split('\n\n').map((para, i) => (
                    <p key={i} className={i === 0 ? 'text-xl font-serif italic border-l-4 border-gold pl-8 py-2 text-hero' : ''}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Sections (structured) */}
            {hasSections && sections.map((section) => {
              const title = section.title?.[locale] ?? '';
              const content = section.content?.[locale] ?? '';
              return (
                <div key={section._key ?? section.id} id={section.id} className="pt-4 scroll-mt-32">
                  <div className="bg-sand/10 p-8 md:p-12 border border-sand/30 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm">
                        {getIcon(section.id)}
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-hero uppercase tracking-widest">
                        {title}
                      </h2>
                    </div>
                    <div className="text-hero/70 leading-relaxed font-sans whitespace-pre-line text-sm md:text-base">
                      {content.split('\n').map((line, idx) => {
                        if (line.includes(': ')) {
                          const colonIdx = line.indexOf(': ');
                          const label = line.slice(0, colonIdx);
                          const rest = line.slice(colonIdx + 2);
                          return (
                            <p key={idx} className="mb-4">
                              <strong className="text-hero font-bold">{label}:</strong> {rest}
                            </p>
                          );
                        }
                        return <p key={idx} className="mb-4">{line}</p>;
                      })}
                    </div>
                    {section.image && (
                      <div className="mt-8 relative w-full aspect-video overflow-hidden">
                        <Image
                          src={urlFor(section.image).width(900).height(506).url()}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Body (Portable Text — fallback for posts without sections) */}
            {!hasSections && body.length > 0 && (
              <div className="prose prose-lg max-w-none text-hero/80 font-sans leading-relaxed">
                <PortableText value={body as Parameters<typeof PortableText>[0]['value']} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 border border-stone-100" style={{ backgroundColor: '#1a1a1a' }}>
                <h3 className="font-serif text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-2" style={{ color: '#b0a377' }}>
                  <Globe size={20} /> {hasSections ? tocLabel : post.title[locale]}
                </h3>
                {hasSections && (
                  <nav>
                    <ul className="space-y-5">
                      {sections.map((section) => (
                        <li key={section._key ?? section.id}>
                          <a
                            href={`#${section.id}`}
                            className="text-white/70 hover:text-gold font-sans transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] group"
                          >
                            <span className="w-6 h-px bg-gold/20 group-hover:w-10 transition-all" />
                            {section.title?.[locale]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
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

      {relatedPosts.length > 0 && (
        <section className="py-16 container mx-auto px-6">
          <BlogRelatedPosts posts={relatedPosts} locale={locale} />
        </section>
      )}
    </div>
  );
}
