'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  content: string;
  date: string;
  image?: string;
  category?: string;
  locale: 'it' | 'en';
  backLabel: string;
  quoteLabel: string;
  tocLabel: string;
  contactPrompt: string;
}

export default function MdxBlogPostClient({
  title, content, date, image, category, locale,
  backLabel, quoteLabel, tocLabel, contactPrompt,
}: Props) {
  // Extract H2 headings for TOC
  const headings = useMemo(() => {
    const matches = content.match(/^## .+$/gm) || [];
    return matches.map((h) => {
      const text = h.replace(/^## /, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { text, id };
    });
  }, [content]);

  const formattedDate = new Date(date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl mx-auto">
          {category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-full mb-4">
              {category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3">
            {title}
          </h1>
          <time className="text-white/70 text-sm">{formattedDate}</time>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-3xl prose prose-lg prose-stone
          prose-headings:font-serif prose-headings:text-[#2c2c2c]
          prose-a:text-[#c9a96e] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-[#c9a96e] prose-blockquote:bg-[#c9a96e]/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
          prose-img:rounded-xl prose-img:shadow-md
          prose-table:border prose-th:bg-[#2c2c2c] prose-th:text-white prose-th:p-3 prose-td:p-3 prose-td:border">
          <ReactMarkdown
            components={{
              h2: ({ children }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return <h2 id={id} className="scroll-mt-24">{children}</h2>;
              },
              img: ({ src, alt }) => (
                <span className="block my-6">
                  <Image
                    src={src || ''}
                    alt={alt || ''}
                    width={800}
                    height={450}
                    className="rounded-xl shadow-md w-full h-auto"
                  />
                </span>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Sidebar TOC */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 bg-[#2c2c2c] text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9a96e] mb-4">
                {tocLabel}
              </h3>
              <nav className="space-y-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-sm text-white/70 hover:text-[#c9a96e] transition-colors leading-snug"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-white/60 mb-3">{contactPrompt}</p>
                <Link
                  href={`/${locale}/contatti`}
                  className="block w-full text-center px-4 py-2.5 bg-[#c9a96e] text-[#2c2c2c] font-semibold text-sm rounded-lg hover:bg-[#b8944f] transition-colors"
                >
                  {quoteLabel}
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Back to blog */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-[#c9a96e] hover:text-[#b8944f] font-medium transition-colors"
        >
          ← {backLabel}
        </Link>
      </div>
    </article>
  );
}
