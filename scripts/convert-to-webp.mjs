/**
 * Convert all PNG/JPG images in public/images/ to WebP.
 * Keeps originals as .bak so we can roll back if needed.
 * Skip: files that are already .webp
 */

import sharp from 'sharp';
import { readdir, rename, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const ROOT = new URL('../public/images', import.meta.url).pathname;
const QUALITY = 82;

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findImages(full)));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function convert(src) {
  const ext = extname(src);
  const dest = src.slice(0, -ext.length) + '.webp';

  const before = (await stat(src)).size;
  await sharp(src).webp({ quality: QUALITY }).toFile(dest);
  const after = (await stat(dest)).size;

  const saving = (((before - after) / before) * 100).toFixed(1);
  console.log(`✓ ${basename(src)} → ${basename(dest)}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (${saving}% smaller)`);

  // Rename original to .bak (keep as fallback)
  await rename(src, src + '.bak');
}

const images = await findImages(ROOT);
console.log(`Found ${images.length} images to convert…\n`);

let ok = 0, fail = 0;
for (const img of images) {
  try {
    await convert(img);
    ok++;
  } catch (e) {
    console.error(`✗ ${basename(img)}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} converted, ${fail} failed.`);
