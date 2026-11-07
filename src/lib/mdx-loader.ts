import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/data/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface MdxBlogPost extends BlogPost {
  isMdx: true;
  mdxContent: string;
  heroImage?: string;
  fileLocale?: string;
}

function parseMdxFile(filePath: string): MdxBlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data: fm, content } = matter(raw);

    if (!fm.title || !fm.slug) return null;

    const slug = fm.slug as string;
    const title = typeof fm.title === 'string' ? fm.title : '';
    const description = typeof fm.description === 'string' ? fm.description : '';
    const date = typeof fm.date === 'string' ? fm.date : new Date().toISOString().slice(0, 10);
    const image = typeof fm.image === 'string' ? fm.image : '';
    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    const category = tags[0] || 'Blog';

    return {
      id: slug,
      slug,
      title: { it: title, en: title },
      excerpt: { it: description, en: description },
      category: { it: category, en: category },
      image,
      date,
      content: {
        it: { intro: '', sections: [] },
        en: { intro: '', sections: [] },
      },
      isMdx: true,
      mdxContent: content,
      heroImage: image || undefined,
      fileLocale: typeof fm.locale === 'string' ? fm.locale : undefined,
    };
  } catch (e) {
    console.error(`[mdx-loader] Failed to parse ${filePath}:`, e);
    return null;
  }
}

export function getAllMdxBlogPosts(locale?: string): MdxBlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts: MdxBlogPost[] = [];
  for (const file of files) {
    const post = parseMdxFile(path.join(CONTENT_DIR, file));
    if (!post) continue;
    // If the article has a locale AND a locale filter is requested, skip mismatches.
    // Articles without a locale field are always shown (backwards compat).
    if (post.fileLocale && locale && post.fileLocale !== locale) continue;
    posts.push(post);
  }
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getMdxBlogPost(slug: string, locale?: string): MdxBlogPost | null {
  return getAllMdxBlogPosts(locale).find((p) => p.slug === slug) ?? null;
}
