/**
 * Delete all Sanity itineraries EXCEPT the 4 new ones imported today.
 * Run: node scripts/cleanup-itineraries.mjs
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = {};
const raw = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
for (const line of raw.split('\n')) {
  const [k, ...rest] = line.split('=');
  if (k && rest.length) env[k.trim()] = rest.join('=').trim();
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const KEEP_IDS = [
  'itinerary-australia-bora-bora',
  'itinerary-meravigliosa-polinesia',
  'itinerary-nuova-zelanda-polinesia',
  'itinerary-gruppo-nuova-zelanda',
];

const all = await client.fetch('*[_type == "itinerary"]{ _id, title }');

console.log(`\nFound ${all.length} itineraries total:`);
for (const d of all) {
  const keep = KEEP_IDS.includes(d._id);
  console.log(`  ${keep ? '✅ keep' : '🗑  delete'} ${d._id} | ${d.title?.it ?? '(no title)'}`);
}

const toDelete = all.filter(d => !KEEP_IDS.includes(d._id));

if (toDelete.length === 0) {
  console.log('\nNothing to delete.\n');
  process.exit(0);
}

console.log(`\nDeleting ${toDelete.length} old itineraries…\n`);
for (const d of toDelete) {
  await client.delete(d._id);
  console.log(`  🗑  Deleted ${d._id}`);
}

console.log('\n✅ Done.\n');
