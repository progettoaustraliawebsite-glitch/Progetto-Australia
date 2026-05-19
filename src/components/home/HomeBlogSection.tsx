import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

interface Props {
  posts: BlogPost[];
  locale: 'it' | 'en';
}

export default function HomeBlogSection({ posts, locale }: Props) {
  const isIT = locale === 'it';
  const preview = posts.slice(0, 4);

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
              {isIT ? 'Guide & Ispirazione' : 'Guides & Inspiration'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-hero leading-tight">
              {isIT
                ? <>Scopri l&apos;Australia e<br /><span className="text-gold">l&apos;Oceania</span></>
                : <>Explore Australia &<br /><span className="text-gold">Oceania</span></>
              }
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-hero/50 hover:text-gold transition-colors self-start lg:self-auto"
          >
            {isIT ? 'Tutti gli articoli' : 'All articles'} <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          {preview.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex-shrink-0 w-[280px] md:w-[320px] h-[420px] snap-start overflow-hidden"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-gold mb-3">
                  {post.category[locale]}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-snug mb-2">
                  {post.title[locale]}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt[locale]}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gold group-hover:gap-3 transition-all">
                  {isIT ? 'Leggi di più' : 'Read more'} <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
