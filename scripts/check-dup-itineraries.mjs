import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = readFileSync(join(ROOT, '.env.local'), 'utf8');
const env = {};
for (const line of raw.split('\n')) {
  const i = line.indexOf('='); if (i < 1) continue;
  env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const docs = await client.fetch('*[_type == "itinerary"]{ _id, "slug": slug.current, title }');
console.log('Total itineraries in Sanity:', docs.length);

const bySlug = {};
for (const d of docs) {
  const s = d.slug || d._id;
  (bySlug[s] = bySlug[s] || []).push(d);
}

const dups = Object.entries(bySlug).filter(([, v]) => v.length > 1);
console.log('Duplicated slugs:', dups.length);
dups.forEach(([s, v]) => {
  console.log(`\n  slug: ${s} (${v.length} copies)`);
  v.forEach(d => console.log(`    _id: ${d._id}  title: ${d.title?.it || d.title || '—'}`));
});

if (dups.length === 0) console.log('✅ No duplicates found.');
