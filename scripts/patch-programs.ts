/**
 * Patch Sanity itineraries with their program (day-by-day) data.
 * Reads directly from src/data/itineraries.ts so data is always in sync.
 *
 * Run: npx tsx scripts/patch-programs.ts
 * Run specific slugs: npx tsx scripts/patch-programs.ts australia-fiji nuova-zelanda-terra-di-mezzo
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { itineraries } from '../src/data/itineraries';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const env: Record<string, string> = {};
try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) env[k.trim()] = rest.join('=').trim();
  }
} catch {
  console.warn('⚠️  Could not read .env.local');
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token     = env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

// Filter by CLI args if provided, otherwise patch all
const slugFilter = process.argv.slice(2);

const targets = slugFilter.length
  ? itineraries.filter((it) => slugFilter.includes(it.slug))
  : itineraries;

async function main() {
  console.log(`\n📅  Patching program for ${targets.length} itinerary/ies…\n`);

  for (const it of targets) {
    const docId = `itinerary-${it.slug}`;

    const program = it.program.map((day, idx) => ({
      _key: `day-${idx + 1}`,
      _type: 'object',
      day: day.day,
      title: { it: day.title.it, en: day.title.en },
      description: { it: day.description.it, en: day.description.en },
    }));

    try {
      await client.patch(docId).set({ program }).commit();
      console.log(`  ✅  ${docId} — ${program.length} giorni salvati`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌  ${docId}:`, msg);
    }
  }

  console.log('\n✅  Done.\n');
}

main();
