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

// Delete all draft itinerary documents (prefixed with "drafts.")
const drafts = await client.fetch('*[_type == "itinerary" && _id in path("drafts.**")]{ _id, "slug": slug.current }');

if (drafts.length === 0) {
  console.log('✅ No draft itineraries found.');
  process.exit(0);
}

console.log(`Found ${drafts.length} draft itinerary documents — deleting…\n`);

for (const d of drafts) {
  await client.delete(d._id);
  console.log(`  🗑️  Deleted draft: ${d._id} (${d.slug})`);
}

console.log('\n✅ Done. Re-run check-dup-itineraries.mjs to verify.');
