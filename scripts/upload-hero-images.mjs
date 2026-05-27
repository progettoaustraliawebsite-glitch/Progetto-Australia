/**
 * Upload hero images to Sanity and patch the 5 new itineraries.
 * Run: node scripts/upload-hero-images.mjs
 */

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET    || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token     = env.SANITY_API_TOKEN              || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

const publicDir = join(__dirname, '..', 'public', 'images');

// Map: Sanity document _id → local image file
const HERO_IMAGES = [
  {
    docId: 'itinerary-australia-selvaggia',
    file: join(publicDir, 'highlight-kakadu.jpg'),
    label: 'Australia Selvaggia',
  },
  {
    docId: 'itinerary-australia-fiji',
    file: join(publicDir, 'itin-fiji.jpg'),
    label: 'Australia e Fiji',
  },
  {
    docId: 'itinerary-australia-winter-explorer',
    file: join(publicDir, 'itin-western-au.jpg'),
    label: 'Australia Winter Explorer',
  },
  {
    docId: 'itinerary-nuova-zelanda-terra-di-mezzo',
    file: join(publicDir, 'itin-hobbiton.jpg'),
    label: 'NZ Terra di Mezzo',
  },
  {
    docId: 'itinerary-australia-summer-escape',
    file: join(publicDir, 'itin-au-deluxe.jpg'),
    label: 'Australia Summer Escape',
  },
];

async function main() {
  console.log(`\n🖼️  Uploading hero images to Sanity (${projectId}/${dataset})…\n`);

  for (const { docId, file, label } of HERO_IMAGES) {
    try {
      // Upload the image as a Sanity asset
      const asset = await client.assets.upload('image', createReadStream(file), {
        filename: file.split('/').pop(),
      });

      // Patch the itinerary document with the heroImage reference
      await client
        .patch(docId)
        .set({
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit();

      console.log(`  ✅  ${label} — heroImage set (${asset._id})`);
    } catch (err) {
      console.error(`  ❌  ${label}:`, err.message);
    }
  }

  console.log('\n✅  Done.\n');
}

main();
