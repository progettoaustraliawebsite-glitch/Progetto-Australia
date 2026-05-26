/**
 * Fix Sanity itinerary documents so they are editable in Studio:
 * - Creates a draft copy of each published document (so Studio can edit via draft flow)
 * - Initializes images:[] on each program day (so the field is writable)
 *
 * Run: node scripts/fix-sanity-docs.mjs
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
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     env.SANITY_API_TOKEN,
  useCdn:    false,
});

const IDS = [
  'itinerary-australia-bora-bora',
  'itinerary-meravigliosa-polinesia',
  'itinerary-nuova-zelanda-polinesia',
  'itinerary-gruppo-nuova-zelanda',
];

console.log('\n🔧 Fixing Sanity itinerary documents…\n');

for (const id of IDS) {
  // Fetch the published document
  const doc = await client.getDocument(id);
  if (!doc) { console.warn(`  ⚠️  ${id} not found`); continue; }

  // 1. Patch the published doc: ensure each program day has images: []
  const fixedProgram = (doc.program ?? []).map((day) => ({
    ...day,
    images: day.images ?? [],
  }));

  await client.patch(id).set({ program: fixedProgram }).commit();
  console.log(`  ✅ Patched published: ${id}`);

  // 2. Create (or overwrite) the draft so Studio can edit it
  const draftId = `drafts.${id}`;
  const draft = {
    ...doc,
    _id: draftId,
    program: fixedProgram,
  };
  await client.createOrReplace(draft);
  console.log(`  ✅ Created draft:    ${draftId}`);
}

console.log('\n✅ Done. Refresh Sanity Studio — the fields should now be editable.\n');
