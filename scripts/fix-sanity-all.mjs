/**
 * Comprehensive Sanity fix script:
 * 1. Uploads missing hero images for 12 itineraries
 * 2. Patches missing destination refs for 5 itineraries
 *
 * Run: node scripts/fix-sanity-all.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const env = {};
try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) env[k.trim()] = rest.join('=').trim();
  }
} catch {
  console.warn('⚠️  Could not read .env.local — using process.env');
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token     = env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

const IMG_DIR = join(__dirname, '..', 'public', 'images');

// ── Hero image mapping (slug → local image file) ──────────────────────────
const heroImages = {
  'australia-bora-bora':          'dest-whitehaven.jpg',
  'australia-cook':               'itin-au-cook.jpg',
  'australia-fiji':               'itin-fiji.jpg',
  'australia-selvaggia':          'dest-hero-australia.png',
  'australia-summer-escape':      'itin-east-coast.jpg',
  'australia-winter-explorer':    'itin-selfdrive.jpg',
  'gruppo-nuova-zelanda':         'itin-nz-gruppo.jpg',
  'meravigliosa-polinesia':       'hero-french-polynesia.png',
  'nuova-zelanda-cook':           'hero-new-zealand.png',
  'nuova-zelanda-polinesia':      'itin-nz-caledonia.jpg',
  'nuova-zelanda-road-trip':      'itin-self-drive.jpg',
  'nuova-zelanda-terra-di-mezzo': 'itin-hobbiton.jpg',
};

// ── Destination ref mapping (slug → Sanity destination doc ID) ────────────
const DEST_IDS = {
  australia:        'lNDLDcJDNKD9RGLRgAshcJ',
  'new-zealand':    'A14fgkHr4pHTBtF8PLmntJ',
  fiji:             'flMRirtHyxeVC5lXmYg5xe',
  'french-poly':    'hUOGzIk1Ng7WfZKwnQguye',
  'new-caledonia':  'A14fgkHr4pHTBtF8PLmopN',
  'cook-islands':   'A14fgkHr4pHTBtF8PLmoB3',
};

const destRefs = {
  'australia-bora-bora':      DEST_IDS['australia'],
  'australia-selvaggia':      DEST_IDS['australia'],
  'gruppo-nuova-zelanda':     DEST_IDS['new-zealand'],
  'meravigliosa-polinesia':   DEST_IDS['french-poly'],
  'nuova-zelanda-polinesia':  DEST_IDS['new-zealand'],
};

// ── Step 1: Upload hero images ─────────────────────────────────────────────
console.log('\n🖼️  Uploading hero images…\n');

for (const [slug, filename] of Object.entries(heroImages)) {
  const docId = `itinerary-${slug}`;
  const filePath = join(IMG_DIR, filename);

  try {
    const stream = createReadStream(filePath);
    const asset = await client.assets.upload('image', stream, {
      filename,
      contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
    });
    await client.patch(docId).set({
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }).commit();
    console.log(`  ✅  ${slug} → ${filename}`);
  } catch (err) {
    console.error(`  ❌  ${slug}: ${err.message}`);
  }
}

// ── Step 2: Patch destination refs ────────────────────────────────────────
console.log('\n🗺️  Patching destination refs…\n');

for (const [slug, destId] of Object.entries(destRefs)) {
  const docId = `itinerary-${slug}`;
  try {
    await client.patch(docId).set({
      destination: { _type: 'reference', _ref: destId }
    }).commit();
    console.log(`  ✅  ${slug} → ${destId}`);
  } catch (err) {
    console.error(`  ❌  ${slug}: ${err.message}`);
  }
}

console.log('\n✨  Done!\n');
