import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'maps');

// Read OpenAI key from adframelab .env.local
const envPath = '/Users/lorenzotalia/Desktop/adframelab/.env.local';
const envContent = readFileSync(envPath, 'utf-8');
const OPENAI_KEY = envContent.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();

if (!OPENAI_KEY) {
  console.error('❌ OpenAI key not found');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ITINERARIES = [
  {
    slug: 'australia-self-drive',
    prompt: `Vintage illustrated travel map of Australia. Warm cream parchment background. The Australian continent is drawn in soft watercolor earth tones (terracotta, sand, ochre). A golden dashed route line connects 8 numbered stops in order: 1-Perth (southwest coast), 2-Rottnest Island (tiny island near Perth), 3-Pinnacles Desert (west coast), 4-Adelaide (south coast), 5-Kangaroo Island (small island south of Adelaide), 6-Sydney (east coast), 7-Uluru/Ayers Rock (red center desert), 8-Cairns (far northeast). Each stop has a small gold circle with white number. The Indian Ocean (west) and Pacific Ocean (east) are deep blue watercolor. Compass rose in bottom-right corner. Small plane ✈ icons on flight segments, car 🚗 on driving segments, boat ⛵ on ferry segments. Elegant sans-serif location labels. No extra decorations. Clean, editorial travel magazine style. 16:9 landscape format.`,
  },
  {
    slug: 'magica-australia',
    prompt: `Vintage illustrated travel map of Australia. Warm cream parchment background. The Australian continent drawn in soft watercolor earth tones. A golden dashed route line connects 10 numbered luxury travel stops: 1-Melbourne (southeast), 2-Great Ocean Road (south Victoria coast), 3-Adelaide (south), 4-Kangaroo Island (island south of Adelaide), 5-Darwin (far north), 6-Kakadu National Park (north), 7-Cairns (northeast), 8-Cape Tribulation (north Queensland coast), 9-Uluru (red center), 10-Sydney (east coast). Gold circle markers with white numbers. Deep blue oceans. Compass rose. Small transport icons (plane, car, boat). Elegant typography. Luxury travel editorial style. 16:9 landscape.`,
  },
  {
    slug: 'australia-on-the-road-isole-cook',
    prompt: `Vintage illustrated travel map showing Australia and the Cook Islands in the Pacific Ocean. Warm cream parchment background, watercolor style. Route starts in Melbourne (southeast Australia), goes to Sydney, then Uluru (center), Cairns (northeast), then a long dashed line crosses the Pacific Ocean eastward to Rarotonga (Cook Islands, small tropical island), then to Aitutaki (nearby atoll). Australia drawn in ochre/terracotta tones, Pacific islands in lush green. Deep blue Pacific Ocean. 7 numbered gold circle stops. Compass rose. Plane icons on flight legs. Elegant editorial travel style. Wide panoramic 16:9 format.`,
  },
  {
    slug: 'fiji-self-drive',
    prompt: `Vintage illustrated travel map of the Fiji Islands. Warm cream parchment background, watercolor style. The main island Viti Levu in the center-left in lush tropical green. A golden dashed route connects 5 numbered stops: 1-Nadi/Viti Levu (main island west coast), 2-Coral Coast (south coast of Viti Levu), 3-Taveuni (small island to the northeast, the Garden Island), 4-Mamanuca Islands (small island group west of Viti Levu), back to 5-Nadi. Surrounding Pacific Ocean in deep turquoise blue. Coral reef areas shown in lighter aqua. Small plane and boat icons. Compass rose. Tropical editorial travel style. 16:9 landscape.`,
  },
  {
    slug: 'nuova-zelanda-nuova-caledonia',
    prompt: `Vintage illustrated travel map showing New Zealand and New Caledonia. Warm cream parchment background, watercolor style. New Zealand's North Island and South Island drawn in forest green watercolor. A golden dashed route connects 10 numbered stops: 1-Auckland (North Island north), 2-Waitomo (North Island center-west), 3-Rotorua (North Island center), 4-Wellington (North Island south tip), 5-Christchurch (South Island northeast), 6-Franz Josef Glacier (South Island west), 7-Queenstown (South Island south), 8-Milford Sound (South Island far southwest), then crossing northwest to 9-Noumea (New Caledonia, long narrow island), 10-Île des Pins (small island south of New Caledonia). Deep blue Tasman Sea and Pacific Ocean. Compass rose. Transport icons. 16:9 landscape.`,
  },
  {
    slug: 'australia-deluxe-isole-cook',
    prompt: `Vintage illustrated travel map showing eastern Australia and Cook Islands. Warm cream parchment background, watercolor style. Eastern Australia coastline prominent, drawn in ochre and terracotta. Golden dashed route connects 7 numbered stops: 1-Sydney (east coast), 2-Blue Mountains (just inland from Sydney), 3-Uluru (red center desert), 4-Darwin (far north), 5-Cairns (northeast coast), then long dashed line across Pacific to 6-Rarotonga (Cook Islands), 7-Aitutaki (Cook Islands atoll). Deep blue Pacific. Small tropical islands in lush green. Compass rose. Plane and car icons. Elegant luxury travel style. 16:9.`,
  },
  {
    slug: 'australia-rossa-selvaggia',
    prompt: `Vintage illustrated travel map of Australia showing the western and northern adventure route. Warm cream parchment background, watercolor style. Australia drawn in vivid red-ochre outback tones. A golden dashed route connects 11 numbered stops clockwise up the west coast and across the north: 1-Perth (southwest), 2-Pinnacles Desert (west coast north of Perth), 3-Monkey Mia (western coast), 4-Coral Bay (northwest), 5-Exmouth/Cape Range (northwest), 6-Broome (northwest coast), 7-Darwin (far north), 8-Kakadu National Park (north), 9-Uluru/Ayers Rock (red center), 10-Cairns (northeast), 11-Sydney (east coast). Indian Ocean bright blue on left, Coral Sea on right. Compass rose. Car, plane, and boat icons. Adventure travel editorial style. 16:9.`,
  },
  {
    slug: 'nuova-zelanda-isole-samoa',
    prompt: `Vintage illustrated travel map showing New Zealand and Samoa Islands. Warm cream parchment background, watercolor style. New Zealand's two islands in forest green. Golden dashed route connects 7 numbered stops: 1-Auckland (North Island), 2-Rotorua (North Island center), 3-Christchurch (South Island), 4-Queenstown (South Island south), 5-Milford Sound (South Island southwest), then long line northwest across Pacific to 6-Apia/Samoa (Samoa Islands, tropical green islands), 7-Savai'i (larger Samoa island). Deep blue Pacific Ocean. Lush tropical style for Samoa. Compass rose. Plane and car icons. Family travel editorial style. 16:9.`,
  },
  {
    slug: 'australia-classica',
    prompt: `Vintage illustrated travel map of Australia showing the classic route. Warm cream parchment background, watercolor style. Australian continent in ochre and terracotta. Golden dashed route connects 8 numbered stops: 1-Adelaide (south coast), 2-Kangaroo Island (island south of Adelaide), 3-Melbourne (southeast), 4-Great Ocean Road (south Victoria), 5-Sydney (east coast), 6-Uluru/Ayers Rock (red center), 7-Darwin and Kakadu National Park (far north), 8-Cairns (northeast). Deep blue oceans surrounding Australia. Compass rose in corner. Plane, car, and boat icons. Clean editorial travel style. 16:9 landscape.`,
  },
  {
    slug: 'grande-terre-nuova-caledonia',
    prompt: `Vintage illustrated travel map of New Caledonia (Grande Terre). Warm cream parchment background, watercolor style. The long narrow main island Grande Terre drawn in lush tropical green, surrounded by turquoise coral lagoon (UNESCO World Heritage). Golden dashed route connects 4 numbered stops: 1-Noumea (southern capital), 2-Côte Oubliée (forgotten coast, middle section), 3-Île des Pins (beautiful small island southeast of Grande Terre), 4-Noumea return. Deep blue Pacific Ocean. Coral reef areas in light aqua. Compass rose. Car and boat icons. Elegant Pacific island travel style. 16:9.`,
  },
  {
    slug: 'nuova-zelanda-gruppo',
    prompt: `Vintage illustrated travel map of New Zealand. Warm cream parchment background, watercolor style. New Zealand's North Island and South Island beautifully drawn in forest and emerald green watercolor. Golden dashed route connects 9 numbered stops: 1-Auckland (North Island north), 2-Rotorua (North Island center), 3-Napier (North Island east coast), 4-Wellington (North Island south), 5-Kaikōura (South Island northeast coast), 6-Christchurch (South Island east), 7-Franz Josef Glacier (South Island west coast), 8-Queenstown (South Island south), 9-Milford Sound (South Island far southwest). Tasman Sea on the left, Pacific Ocean on the right, both in deep blue. Snow-capped mountains hinted in the South Island. Compass rose. Car, plane icons. Group tour editorial style. 16:9.`,
  },
];

async function generateImage(slug, prompt) {
  const outPath = path.join(OUT_DIR, `${slug}.png`);
  if (fs.existsSync(outPath)) {
    console.log(`⏭  ${slug} — already exists, skipping`);
    return;
  }

  console.log(`🎨 Generating: ${slug}...`);

  const body = JSON.stringify({
    model: 'gpt-image-1',
    prompt,
    n: 1,
    size: '1536x1024',
    quality: 'high',
    output_format: 'png',
  });

  const b64 = await new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.openai.com',
        path: '/v1/images/generations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) return reject(new Error(json.error.message));
            // gpt-image-1 returns base64
            const item = json.data[0];
            resolve(item.b64_json ?? item.url);
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });

  // Save image (base64 or URL)
  if (b64.startsWith('http')) {
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(outPath);
      https.get(b64, (res) => {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', (e) => { fs.unlink(outPath, () => {}); reject(e); });
    });
  } else {
    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
  }

  console.log(`✅ Saved: public/images/maps/${slug}.png`);
}

// Generate sequentially to avoid rate limits
for (const { slug, prompt } of ITINERARIES) {
  try {
    await generateImage(slug, prompt);
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1500));
  } catch (err) {
    console.error(`❌ Failed ${slug}:`, err.message);
  }
}

console.log('\n🗺  All maps generated!');
