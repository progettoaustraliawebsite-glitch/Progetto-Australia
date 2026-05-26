/**
 * Upload destination hero + card images to Sanity CDN and patch destination documents.
 *
 * Usage:
 *   node scripts/upload-destination-images.mjs
 *
 * What it does:
 *   1. Uploads each image file to Sanity asset pipeline
 *   2. Patches the destination document with the new asset reference
 *   3. Also patches description + tagline from destinations.ts
 *
 * Idempotent: safe to re-run (re-uploads asset but patches with latest ref).
 * Last updated: 2026-05-26
 */

import { createClient } from '@sanity/client';
import { createReadStream, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Load .env.local ───────────────────────────────────────────────────────────

const env = {};
const raw = readFileSync(join(ROOT, '.env.local'), 'utf8');
for (const line of raw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
  env[key] = env[key] ?? value;
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     env.SANITY_API_TOKEN,
  useCdn:    false,
});

// ── Destination data (mirrors src/data/destinations.ts) ──────────────────────
// heroImage: local path relative to project root (public/images/...)
// photo:     card image
// description + tagline: patched into the Sanity document

const DESTINATIONS = [
  {
    slug: 'australia',
    heroImage: 'public/images/hero-australia-v2.png',
    photo: null, // unchanged
    tagline: { it: 'Infinita e meravigliosa', en: 'Boundless and beautiful' },
    description: {
      it: 'Dalle spiagge tropicali del Queensland agli spazi immensi dell\'Outback, l\'Australia è un viaggio che cambia continuamente paesaggi, ritmi ed emozioni. Un paese da vivere con il tempo giusto, attraverso itinerari costruiti su misura e pensati nei minimi dettagli.',
      en: 'From Queensland\'s tropical beaches to the vast spaces of the Outback, Australia is a journey of ever-changing landscapes, rhythms and emotions. A country to experience at the right pace, through tailor-made itineraries planned to the finest detail.',
    },
  },
  {
    slug: 'new-zealand',
    heroImage: null, // unchanged
    photo: 'public/images/dest-card-nz-v2.png',
    tagline: { it: 'Terra di meraviglie', en: 'Land of wonders' },
    description: {
      it: 'Fiordi, vulcani, ghiacciai, oceani e montagne che cambiano continuamente il paesaggio lungo la strada. La Nuova Zelanda è uno di quei viaggi che danno la sensazione di trovarsi lontanissimi da tutto, immersi in una natura ancora autentica e sorprendentemente accessibile.',
      en: 'Fjords, volcanoes, glaciers, oceans and mountains that continuously change the landscape along the road. New Zealand is one of those journeys that give the feeling of being far away from everything, immersed in a nature that is still authentic and surprisingly accessible.',
    },
  },
  {
    slug: 'fiji',
    heroImage: null, // unchanged
    photo: null,
    tagline: { it: 'Il sorriso del Pacifico', en: 'The smile of the Pacific' },
    description: {
      it: 'Lagune trasparenti, isole tropicali circondate dalla barriera corallina e un ritmo di vita che sembra rallentare tutto. Le Fiji sono uno di quei luoghi in cui il mare, la natura e l\'accoglienza delle persone diventano parte stessa del viaggio.',
      en: 'Crystal-clear lagoons, tropical islands surrounded by coral reef and a pace of life that seems to slow everything down. Fiji is one of those places where the sea, nature and the warmth of the people become part of the journey itself.',
    },
  },
  {
    slug: 'cook-islands',
    heroImage: null, // unchanged
    photo: null,
    tagline: { it: 'Autenticità tropicale', en: 'Tropical authenticity' },
    description: {
      it: 'Le Isole Cook sono uno degli angoli più autentici del Pacifico. Lagune spettacolari, piccole isole circondate dall\'oceano e una cultura polinesiana ancora profondamente presente creano un\'atmosfera rilassata e genuina, lontana dalle destinazioni tropicali più costruite.',
      en: 'The Cook Islands are one of the most authentic corners of the Pacific. Spectacular lagoons, small islands surrounded by ocean and a Polynesian culture still deeply alive create a relaxed, genuine atmosphere, far from the more built-up tropical destinations.',
    },
  },
  {
    slug: 'samoa',
    heroImage: 'public/images/dest-hero-samoa-v2.png',
    photo: null,
    tagline: { it: 'Il Pacifico autentico', en: 'The authentic Pacific' },
    description: {
      it: 'Villaggi tradizionali, natura tropicale e una cultura polinesiana ancora profondamente presente nella vita quotidiana. Le Samoa sono una delle destinazioni più autentiche del Pacifico, dove il tempo segue ancora i ritmi della comunità, dell\'oceano e della natura.',
      en: 'Traditional villages, tropical nature and a Polynesian culture still deeply present in everyday life. Samoa is one of the most authentic destinations in the Pacific, where time still follows the rhythms of community, ocean and nature.',
    },
  },
  {
    slug: 'french-polynesia',
    heroImage: 'public/images/dest-hero-polynesia-v2.png',
    photo: null,
    tagline: { it: 'Il sogno del Pacifico', en: 'The dream of the Pacific' },
    description: {
      it: 'Lagune dai colori irreali, montagne vulcaniche che emergono dall\'oceano e piccoli atolli dove il tempo sembra rallentare davvero. La Polinesia Francese è molto più di un viaggio tropicale: è un\'esperienza fatta di luce, silenzio, mare e atmosfera.',
      en: 'Lagoons of unreal colours, volcanic mountains rising from the ocean and small atolls where time seems to truly slow down. French Polynesia is much more than a tropical trip: it is an experience made of light, silence, sea and atmosphere.',
    },
  },
  {
    slug: 'new-caledonia',
    heroImage: null, // unchanged
    photo: null,
    tagline: { it: 'Un angolo di Francia nel Pacifico', en: 'A corner of France in the Pacific' },
    description: {
      it: 'Lagune immense, isole tropicali e un\'atmosfera che unisce cultura francese e tradizioni melanesiane. La Nuova Caledonia è una delle destinazioni più particolari del Pacifico, ancora poco conosciuta ma capace di sorprendere per la varietà dei paesaggi e l\'eleganza rilassata che si respira ovunque.',
      en: 'New Caledonia\'s lagoon is a UNESCO World Heritage Site and considered the most beautiful in the world. Noumea, the Forgotten Coast and the enchanting Île des Pins offer a unique blend of French culture and tropical nature.',
    },
  },
];

// ── Upload helper ─────────────────────────────────────────────────────────────

async function uploadImage(localPath) {
  const fullPath = join(ROOT, localPath);
  if (!existsSync(fullPath)) {
    console.warn(`    ⚠️  File not found: ${localPath}`);
    return null;
  }
  const ext = extname(localPath).slice(1).toLowerCase();
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
  console.log(`    ⬆️  Uploading ${localPath}…`);
  const asset = await client.assets.upload('image', createReadStream(fullPath), {
    filename: localPath.split('/').pop(),
    contentType: mimeType,
  });
  console.log(`    ✅ Uploaded → ${asset._id}`);
  return asset._id;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🖼️  Uploading destination images to Sanity…\n');

  for (const dest of DESTINATIONS) {
    console.log(`\n📍 ${dest.slug}`);

    // Find Sanity document
    const doc = await client.fetch(
      `*[_type == "destination" && slug.current == $slug][0]{ _id, title }`,
      { slug: dest.slug }
    );

    if (!doc) {
      console.warn(`  ⚠️  No Sanity document found — skipping`);
      continue;
    }

    const patch = client.patch(doc._id);

    // Always patch text fields
    patch.set({
      tagline: dest.tagline,
      description: dest.description,
    });

    // Upload + patch heroImage if provided
    if (dest.heroImage) {
      const assetId = await uploadImage(dest.heroImage);
      if (assetId) {
        patch.set({
          heroPhoto: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        });
      }
    }

    // Upload + patch card photo if provided
    if (dest.photo) {
      const assetId = await uploadImage(dest.photo);
      if (assetId) {
        patch.set({
          photo: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        });
      }
    }

    await patch.commit();
    console.log(`  ✅ Patched ${doc.title?.it ?? dest.slug}`);
  }

  console.log('\n🎉 All done!');
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
