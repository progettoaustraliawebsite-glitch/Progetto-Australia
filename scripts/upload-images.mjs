/**
 * Upload hero + map images to Sanity CDN and patch existing itinerary documents.
 * Run: node scripts/upload-images.mjs
 *
 * For each itinerary:
 *   - Reads hero image from public/images/
 *   - Reads map image from public/images/maps/
 *   - Uploads both to Sanity asset pipeline
 *   - Patches the Sanity document with the uploaded asset references
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { createReadStream } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Read .env.local ───────────────────────────────────────────────────────────
const env = {};
const raw = readFileSync(join(root, '.env.local'), 'utf8');
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

// ── Map: slug → local image paths ────────────────────────────────────────────
const IMAGES = {
  'australia-bora-bora': {
    hero: 'public/images/dest-whitehaven.jpg',
    map:  'public/images/maps/australia-bora-bora.png',
  },
  'meravigliosa-polinesia': {
    hero: 'public/images/hero-french-polynesia.png',
    map:  'public/images/maps/meravigliosa-polinesia.png',
  },
  'nuova-zelanda-polinesia': {
    hero: 'public/images/hero-new-zealand.png',
    map:  'public/images/maps/nuova-zelanda-polinesia.png',
  },
  'gruppo-nuova-zelanda': {
    hero: 'public/images/itin-nz-gruppo.jpg',
    map:  'public/images/maps/gruppo-nuova-zelanda.png',
  },
};

const SANITY_IDS = {
  'australia-bora-bora':     'itinerary-australia-bora-bora',
  'meravigliosa-polinesia':  'itinerary-meravigliosa-polinesia',
  'nuova-zelanda-polinesia': 'itinerary-nuova-zelanda-polinesia',
  'gruppo-nuova-zelanda':    'itinerary-gruppo-nuova-zelanda',
};

// ── Upload helper ─────────────────────────────────────────────────────────────
async function uploadImage(localPath) {
  const absPath = join(root, localPath);
  if (!existsSync(absPath)) {
    console.warn(`    ⚠️  File not found: ${localPath}`);
    return null;
  }
  const ext = extname(absPath).replace('.', '');
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
  const asset = await client.assets.upload('image', createReadStream(absPath), {
    filename: absPath.split('/').pop(),
    contentType: mimeType,
  });
  return asset._id;
}

// ── Main ─────────────────────────────────────────────────────────────────────
console.log('\n📸 Uploading images to Sanity…\n');

for (const [slug, paths] of Object.entries(IMAGES)) {
  const docId = SANITY_IDS[slug];
  console.log(`  ${slug}`);

  const patch = client.patch(docId);

  // Hero image
  const heroAssetId = await uploadImage(paths.hero);
  if (heroAssetId) {
    patch.set({ heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroAssetId } } });
    console.log(`    ✅ hero  → ${heroAssetId}`);
  }

  // Map image
  const mapAssetId = await uploadImage(paths.map);
  if (mapAssetId) {
    patch.set({ mapImage: { _type: 'image', asset: { _type: 'reference', _ref: mapAssetId } } });
    console.log(`    ✅ map   → ${mapAssetId}`);
  }

  if (heroAssetId || mapAssetId) {
    await patch.commit();
    console.log(`    💾 Patched ${docId}`);
  }
}

console.log('\n✅ Done. Images are now stored in Sanity CDN.\n');
