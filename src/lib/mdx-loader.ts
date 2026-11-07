import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/data/blog';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

interface ParsedMdxFile {
  post: BlogPost;
  fileLocale: string | undefined;
}

function parseMdxFile(filename: string): ParsedMdxFile | null {
  try {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data: fm, content } = matter(raw);

    if (!fm.slug || !fm.title) return null;

    const fileLocale = fm.locale as string | undefined;
    const loc = (fileLocale ?? 'it') as 'it' | 'en';
    const other = loc === 'it' ? 'en' : 'it';

    const post: BlogPost = {
      id: fm.slug,
      slug: fm.slug,
      title: { [loc]: fm.title, [other]: fm.title } as { it: string; en: string },
      excerpt: { [loc]: fm.excerpt ?? '', [other]: fm.excerpt ?? '' } as { it: string; en: string },
      category: { [loc]: fm.category ?? '', [other]: fm.category ?? '' } as { it: string; en: string },
      image: fm.image ?? '',
      date: fm.date ?? '',
      content: {
        [loc]: { intro: content.trim(), sections: [] },
        [other]: { intro: '', sections: [] },
      } as unknown as BlogPost['content'],
    };

    return { post, fileLocale };
  } catch {
    return null;
  }
}

export function getAllMdxBlogPosts(locale?: string): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const result = parseMdxFile(file);
    if (!result) continue;

    const { post, fileLocale } = result;

    // If the article has a locale AND a locale filter is requested, skip mismatches.
    // Articles without a locale field are always shown (backwards compat).
    if (fileLocale && locale && fileLocale !== locale) continue;

    posts.push(post);
  }

  return posts;
}

export function getMdxBlogPost(slug: string, locale?: string): BlogPost | null {
  return getAllMdxBlogPosts(locale).find((p) => p.slug === slug) ?? null;
}
