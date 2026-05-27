/**
 * Migrate itinerary.destination from single reference to array of references.
 * Also sets correct multi-destination arrays for combined itineraries.
 *
 * Run: node scripts/migrate-destination-to-array.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = {};
try {
  const raw = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) env[k.trim()] = rest.join('=').trim();
  }
} catch { /* use process.env */ }

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const DEST = {
  australia:      'lNDLDcJDNKD9RGLRgAshcJ',
  'new-zealand':  'A14fgkHr4pHTBtF8PLmntJ',
  fiji:           'flMRirtHyxeVC5lXmYg5xe',
  'french-poly':  'hUOGzIk1Ng7WfZKwnQguye',
  'new-caledonia':'A14fgkHr4pHTBtF8PLmopN',
  'cook-islands': 'A14fgkHr4pHTBtF8PLmoB3',
};

const ref = (id, key) => ({ _type: 'reference', _ref: id, _key: key });

// Full destination mapping for all 14 itineraries
const destinationMap = {
  'australia-bora-bora':          [ref(DEST['australia'], 'au'), ref(DEST['french-poly'], 'fp')],
  'meravigliosa-polinesia':       [ref(DEST['french-poly'], 'fp')],
  'nuova-zelanda-polinesia':      [ref(DEST['new-zealand'], 'nz'), ref(DEST['french-poly'], 'fp')],
  'gruppo-nuova-zelanda':         [ref(DEST['new-zealand'], 'nz')],
  'australia-selvaggia':          [ref(DEST['australia'], 'au')],
  'australia-fiji':               [ref(DEST['australia'], 'au'), ref(DEST['fiji'], 'fj')],
  'australia-winter-explorer':    [ref(DEST['australia'], 'au')],
  'nuova-zelanda-terra-di-mezzo': [ref(DEST['new-zealand'], 'nz')],
  'australia-summer-escape':      [ref(DEST['australia'], 'au')],
  'nuova-zelanda-road-trip':      [ref(DEST['new-zealand'], 'nz')],
  'nuova-zelanda-cook':           [ref(DEST['new-zealand'], 'nz'), ref(DEST['cook-islands'], 'ck')],
  'australia-cook':               [ref(DEST['australia'], 'au'), ref(DEST['cook-islands'], 'ck')],
  'nuova-caledonia-grande-terre': [ref(DEST['new-caledonia'], 'nc')],
  'australia-rossa-selvaggia':    [ref(DEST['australia'], 'au')],
};

async function main() {
  console.log('\n🗺️  Migrating destination → array for all itineraries…\n');

  for (const [slug, destArray] of Object.entries(destinationMap)) {
    const docId = `itinerary-${slug}`;
    try {
      await client.patch(docId).set({ destination: destArray }).commit();
      const names = destArray.map(r => Object.keys(DEST).find(k => DEST[k] === r._ref)).join(' + ');
      console.log(`  ✅  ${slug} → [${names}]`);
    } catch (err) {
      console.error(`  ❌  ${slug}: ${err.message}`);
    }
  }

  console.log('\n✨  Done!\n');
}

main().catch(console.error);
