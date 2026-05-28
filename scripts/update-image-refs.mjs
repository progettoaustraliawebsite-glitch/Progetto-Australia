/**
 * Replace .png/.jpg/.jpeg extensions in /images/ paths → .webp
 * across all .tsx, .ts, .css files in src/
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SRC = new URL('../src', import.meta.url).pathname;

async function findFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...(await findFiles(full)));
    } else if (['.tsx', '.ts', '.css'].includes(extname(e.name))) {
      results.push(full);
    }
  }
  return results;
}

const files = await findFiles(SRC);
let changed = 0;

for (const file of files) {
  const orig = await readFile(file, 'utf8');
  // Replace /images/anything.(png|jpg|jpeg) → /images/anything.webp
  const updated = orig.replace(/(?<=\/images\/[^"'\s)]+)\.(png|jpg|jpeg)/gi, '.webp');
  if (updated !== orig) {
    await writeFile(file, updated, 'utf8');
    console.log(`Updated: ${file.replace(SRC + '/', '')}`);
    changed++;
  }
}

console.log(`\n${changed} file(s) updated.`);
