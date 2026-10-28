"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, Globe } from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import BlogRelatedPosts, {
  type RelatedPost,
} from "@/components/blog/BlogRelatedPosts";

interface Props {
  title: string;
  content: string;
  date: string;
  image?: string;
  category?: string;
  locale: "it" | "en";
  backLabel: string;
  quoteLabel: string;
  tocLabel: string;
  contactPrompt: string;
  relatedPosts?: RelatedPost[];
}

/** Derive an anchor id from heading text */
function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MdxBlogPostClient({
  title,
  content,
  date,
  image,
  category,
  locale,
  backLabel,
  quoteLabel,
  tocLabel,
  contactPrompt,
  relatedPosts = [],
}: Props) {
  // Extract H2 headings for TOC
  const headings = useMemo(() => {
    const matches = content.match(/^## .+$/gm) || [];
    return matches.map((h) => {
      const text = h.replace(/^## /, "").replace(/\*\*/g, "");
      return { text, id: toId(text) };
    });
  }, [content]);

  const formattedDate = new Date(date).toLocaleDateString(
    locale === "it" ? "it-IT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="relative h-[65vh] flex items-end">
        <div className="absolute inset-0">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
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
            {category && (
              <span className="bg-gold text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em] px-4 py-2 mb-6 inline-block shadow-lg">
                {category}
              </span>
            )}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {title}
            </h1>
            <time className="block mt-4 text-white/60 text-sm font-sans">
              {formattedDate}
            </time>
          </div>
        </div>
      </section>

      {/* ─── Content + Sidebar ─── */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Content Column */}
          <div className="lg:col-span-8 mdx-content">
            <ReactMarkdown
              components={{
                /* ── Headings ── */
                h1: ({ children }) => (
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-hero mt-16 mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, "");
                  const id = toId(text);
                  return (
                    <h2
                      id={id}
                      className="font-serif text-2xl md:text-3xl font-bold text-hero mt-16 mb-6 scroll-mt-32 uppercase tracking-widest"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-hero mt-10 mb-4">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="font-serif text-lg font-bold text-hero mt-8 mb-3">
                    {children}
                  </h4>
                ),

                /* ── Paragraphs ── */
                p: ({ children, node }) => {
                  // Check if paragraph contains only an image
                  const hasOnlyImage =
                    node?.children?.length === 1 &&
                    node.children[0].type === "element" &&
                    node.children[0].tagName === "img";
                  if (hasOnlyImage) return <>{children}</>;
                  return (
                    <p className="text-hero/80 leading-relaxed font-sans text-base md:text-lg mb-6">
                      {children}
                    </p>
                  );
                },

                /* ── Images ── */
                img: ({ src, alt }) => (
                  <figure className="my-10">
                    <Image
                      src={String(src || "")}
                      alt={String(alt || "")}
                      width={900}
                      height={500}
                      className="w-full h-auto rounded-sm shadow-md object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                    {alt && (
                      <figcaption className="text-center text-xs text-hero/40 font-sans mt-3 italic">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                ),

                /* ── Links ── */
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-gold underline hover:text-gold/70 transition-colors"
                    target={
                      href?.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {children}
                  </a>
                ),

                /* ── Lists ── */
                ul: ({ children }) => (
                  <ul className="space-y-3 my-6 ml-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-3 my-6 ml-1 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children, ordered }) => (
                  <li className="flex gap-3 text-hero/80 font-sans text-base md:text-lg leading-relaxed">
                    {!ordered && (
                      <span className="text-gold mt-1.5 shrink-0">•</span>
                    )}
                    <span className="flex-1">{children}</span>
                  </li>
                ),

                /* ── Blockquote ── */
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gold bg-sand/40 py-4 px-6 my-8 rounded-r font-serif italic text-hero/80">
                    {children}
                  </blockquote>
                ),

                /* ── Table ── */
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 rounded-sm shadow-sm border border-sand/50">
                    <table className="w-full text-sm font-sans">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-hero text-white">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-semibold text-[11px] uppercase tracking-wider">
                    {children}
                  </th>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-sand/30">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-sand/20 hover:bg-sand/30 transition-colors">
                    {children}
                  </tr>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-hero/70">{children}</td>
                ),

                /* ── Emphasis ── */
                strong: ({ children }) => (
                  <strong className="font-bold text-hero">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-hero/70">{children}</em>
                ),

                /* ── Horizontal rule ── */
                hr: () => (
                  <hr className="my-12 border-t border-sand/50" />
                ),

                /* ── Code ── */
                code: ({ children }) => (
                  <code className="bg-sand/40 text-hero px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div
                className="p-10 border border-stone-100"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <h3
                  className="font-serif text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-2"
                  style={{ color: "#b0a377" }}
                >
                  <Globe size={20} /> {tocLabel}
                </h3>
                <nav>
                  <ul className="space-y-5">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-white/70 hover:text-gold font-sans transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] group"
                        >
                          <span className="w-6 h-px bg-gold/20 group-hover:w-10 transition-all" />
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-12 pt-10 border-t border-white/10">
                  <p className="text-sm text-white/65 font-sans mb-8 leading-relaxed">
                    {contactPrompt}
                  </p>
                  <OpenModalButton
                    className="block w-full text-center py-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] transition-all border"
                    style={{ borderColor: "#b0a377", color: "#b0a377" }}
                  >
                    {quoteLabel}
                  </OpenModalButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Posts ─── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 container mx-auto px-6">
          <BlogRelatedPosts posts={relatedPosts} locale={locale} />
        </section>
      )}
    </div>
  );
}
