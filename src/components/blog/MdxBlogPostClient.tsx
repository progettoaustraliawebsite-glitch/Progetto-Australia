"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

/** Recursively extract plain text from React children */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText(
      (node as React.ReactElement<{ children?: React.ReactNode }>).props
        .children
    );
  }
  return "";
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Pre-process content:
 * 1. Strip hero image duplicate
 * 2. Extract FAQ section into structured data
 */
function preprocessContent(
  raw: string,
  heroImage?: string
): { body: string; faqs: FaqItem[] } {
  let out = raw;

  // 1. Strip first image if it matches the hero
  if (heroImage) {
    const heroBase = heroImage.split("?")[0];
    const firstImgMatch = out.match(/^!\[[^\]]*\]\(([^)]+)\)/m);
    if (firstImgMatch) {
      const firstImgBase = firstImgMatch[1].split("?")[0];
      if (firstImgBase === heroBase) {
        out = out.replace(firstImgMatch[0], "").replace(/^\s*\n/, "");
      }
    }
  }

  // 2. Extract FAQ section
  const faqs: FaqItem[] = [];
  const faqMatch = out.match(
    /## (?:Domande Frequenti|FAQ)\s*\n([\s\S]*?)(?=\n## |\n*$)/
  );
  if (faqMatch) {
    const faqBlock = faqMatch[1].trim();
    // FAQ structure: alternating paragraphs — question then answer, separated by blank lines
    const paragraphs = faqBlock
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    for (let i = 0; i < paragraphs.length - 1; i += 2) {
      faqs.push({
        question: paragraphs[i],
        answer: paragraphs[i + 1] || "",
      });
    }
    // Remove the FAQ content from body but keep the heading marker for TOC
    out = out.replace(faqMatch[0], "## Domande Frequenti\n\n<!-- faq-placeholder -->");
  }

  // 3. Remove ## Fonti section entirely
  out = out.replace(/\n## Fonti[\s\S]*$/, "");

  return { body: out, faqs };
}

export default function MdxBlogPostClient({
  title,
  content: rawContent,
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
  const { body, faqs } = useMemo(
    () => preprocessContent(rawContent, image),
    [rawContent, image]
  );

  // Extract H2 headings for TOC
  const headings = useMemo(() => {
    const matches = body.match(/^## .+$/gm) || [];
    return matches
      .map((h) => {
        const text = h.replace(/^## /, "").replace(/\*\*/g, "");
        return { text, id: toId(text) };
      })
      .filter((h) => h.text !== "Fonti");
  }, [body]);

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
          <div className="lg:col-span-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                /* ── Headings ── */
                h2: ({ children }) => {
                  const text = extractText(children).replace(/\*\*/g, "");
                  const id = toId(text);

                  // After "Domande Frequenti" heading, render FAQ cards
                  if (
                    text.includes("Domande Frequenti") ||
                    text.includes("FAQ")
                  ) {
                    return (
                      <>
                        <h2
                          id={id}
                          className="font-serif text-2xl md:text-3xl font-bold text-hero mt-20 mb-8 scroll-mt-32 uppercase tracking-widest"
                        >
                          {children}
                        </h2>
                        {faqs.length > 0 && (
                          <div className="space-y-6 mb-12">
                            {faqs.map((faq, i) => (
                              <div key={i} className="border border-stone-200 rounded-sm overflow-hidden">
                                <div className="bg-hero/5 border-l-4 border-gold px-6 py-4">
                                  <p className="font-serif font-bold text-hero text-lg leading-snug">
                                    {faq.question}
                                  </p>
                                </div>
                                <div className="px-6 py-4">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      p: ({ children: c }) => (
                                        <p className="text-hero/75 leading-relaxed font-sans text-base">
                                          {c}
                                        </p>
                                      ),
                                      a: ({ href, children: c }) => (
                                        <a
                                          href={href}
                                          className="text-gold underline hover:text-gold/70 transition-colors"
                                          target={href?.startsWith("http") ? "_blank" : undefined}
                                          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                          {c}
                                        </a>
                                      ),
                                      strong: ({ children: c }) => (
                                        <strong className="font-bold text-hero">{c}</strong>
                                      ),
                                    }}
                                  >
                                    {faq.answer}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  }

                  return (
                    <h2
                      id={id}
                      className="font-serif text-2xl md:text-3xl font-bold text-hero mt-20 mb-6 scroll-mt-32 uppercase tracking-widest"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-hero mt-12 mb-5">
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

                  const text = extractText(children);

                  // Hide faq-placeholder comment
                  if (text.includes("faq-placeholder")) return null;

                  // Key Takeaways title line
                  if (text.includes("📌") && text.includes("Key Takeaways")) {
                    return null;
                  }

                  // Pro tip blocks
                  if (text.startsWith("💡")) {
                    return (
                      <div className="bg-gold/5 border border-gold/20 rounded-sm p-6 my-8">
                        <p className="text-hero/80 leading-relaxed font-sans text-base">
                          {children}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p className="text-hero/80 leading-relaxed font-sans text-base md:text-lg mb-6">
                      {children}
                    </p>
                  );
                },

                /* ── Images ── */
                img: ({ src, alt }) => {
                  const srcStr = String(src || "");
                  // Skip hero duplicate
                  if (
                    image &&
                    srcStr.split("?")[0] === image.split("?")[0]
                  ) {
                    return null;
                  }
                  // SVG infographics — use native img
                  if (srcStr.endsWith(".svg")) {
                    return (
                      <figure className="my-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={srcStr}
                          alt={String(alt || "")}
                          className="w-full h-auto rounded-sm border border-stone-100"
                          loading="lazy"
                        />
                      </figure>
                    );
                  }
                  return (
                    <figure className="my-10">
                      <Image
                        src={srcStr}
                        alt={String(alt || "")}
                        width={900}
                        height={500}
                        className="w-full h-auto rounded-sm shadow-md object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </figure>
                  );
                },

                /* ── Links ── */
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-gold underline hover:text-gold/70 transition-colors"
                    target={href?.startsWith("http") ? "_blank" : undefined}
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
                ul: ({ children }) => {
                  const childArray = React.Children.toArray(children);
                  const isKeyTakeaways = childArray.some((child) => {
                    const t = extractText(
                      React.isValidElement(child)
                        ? (
                            child as React.ReactElement<{
                              children?: React.ReactNode;
                            }>
                          ).props.children
                        : ""
                    );
                    return t.includes("✓");
                  });
                  if (isKeyTakeaways) {
                    return (
                      <div className="bg-sand border border-gold/20 rounded-sm p-8 my-10">
                        <div className="flex items-center gap-2 mb-5">
                          <span className="text-xl">📌</span>
                          <h3 className="font-serif font-bold text-hero text-lg uppercase tracking-wider">
                            Key Takeaways
                          </h3>
                        </div>
                        <ul className="space-y-4">{children}</ul>
                      </div>
                    );
                  }
                  return <ul className="space-y-3 my-6">{children}</ul>;
                },
                ol: ({ children }) => (
                  <ol className="space-y-3 my-6 list-decimal list-outside pl-6">
                    {children}
                  </ol>
                ),
                li: ({ children }) => {
                  const text = extractText(children);
                  if (text.includes("✓")) {
                    return (
                      <li className="flex gap-3 text-hero/80 font-sans text-sm leading-relaxed list-none">
                        <span className="text-gold font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="flex-1">{children}</span>
                      </li>
                    );
                  }
                  return (
                    <li className="flex gap-3 text-hero/80 font-sans text-base md:text-lg leading-relaxed list-none">
                      <span className="text-gold shrink-0 mt-1">•</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  );
                },

                /* ── Blockquote ── */
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gold bg-sand/60 py-4 px-6 my-8 rounded-r font-serif italic text-hero/80">
                    {children}
                  </blockquote>
                ),

                /* ── Table (GFM) ── */
                table: ({ children }) => (
                  <div className="overflow-x-auto my-10 rounded-sm shadow-sm border border-stone-200">
                    <table className="w-full text-sm font-sans border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead style={{ backgroundColor: "#2a1b15" }}>
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-5 py-3.5 text-left font-semibold text-[11px] uppercase tracking-wider text-white border-b border-stone-300">
                    {children}
                  </th>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-stone-100">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-sand/30 hover:bg-sand/50 transition-colors">
                    {children}
                  </tr>
                ),
                td: ({ children }) => (
                  <td className="px-5 py-3.5 text-hero/75 leading-relaxed">
                    {children}
                  </td>
                ),

                /* ── Emphasis ── */
                strong: ({ children }) => (
                  <strong className="font-bold text-hero">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,

                /* ── Horizontal rule ── */
                hr: () => <hr className="my-12 border-t border-stone-200" />,

                /* ── Code ── */
                code: ({ children }) => (
                  <code className="bg-sand/50 text-hero px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {body}
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
