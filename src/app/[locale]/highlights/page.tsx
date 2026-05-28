export const revalidate = 60;

import { getTranslations, getLocale } from 'next-intl/server';
import { Star } from 'lucide-react';
import { USE_SANITY, getHighlights, urlFor } from '@/lib/sanity';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT ? 'Highlights – Le Esperienze da Non Perdere in Oceania' : 'Highlights – Must-Have Experiences in Oceania';
  const description = isIT
    ? 'Grande Barriera Corallina, Uluru, Fiordland, Bora Bora: le esperienze iconiche dell\'Oceania selezionate dai nostri esperti per il tuo viaggio perfetto.'
    : 'Great Barrier Reef, Uluru, Fiordland, Bora Bora: iconic Oceania experiences handpicked by our experts for your perfect trip.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/highlights` },
    twitter: { title, description },
  };
}

const staticHighlights = [
  {
    id: 'barrier-reef',
    image: '/images/highlight-reef.webp',
    category: { it: 'Natura', en: 'Nature' },
    title: { it: 'Great Barrier Reef', en: 'Great Barrier Reef' },
    description: {
      it: "La più grande barriera corallina del mondo, un ecosistema sottomarino di incredibile biodiversità. Snorkeling, diving e crociere per ammirare questo patrimonio dell'UNESCO.",
      en: "The world's largest coral reef system, an underwater ecosystem of incredible biodiversity. Snorkelling, diving and cruises to admire this UNESCO World Heritage site.",
    },
  },
  {
    id: 'uluru',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=70&auto=format',
    category: { it: 'Spirituale', en: 'Spiritual' },
    title: { it: 'Uluru al Tramonto', en: 'Uluru at Sunset' },
    description: {
      it: "Il monolite più famoso del mondo cambia colore all'alba e al tramonto, passando dall'arancio al viola intenso. Un'esperienza spirituale e visiva indimenticabile.",
      en: "The world's most famous monolith changes colour at dawn and dusk, shifting from orange to deep purple. An unforgettable spiritual and visual experience.",
    },
  },
  {
    id: 'milford',
    image: '/images/hero-nz.webp',
    category: { it: 'Paesaggio', en: 'Landscape' },
    title: { it: 'Milford Sound', en: 'Milford Sound' },
    description: {
      it: 'Definito da Rudyard Kipling "l\'ottava meraviglia del mondo", Milford Sound è un fiordo di straordinaria bellezza nella regione del Fiordland neozelandese.',
      en: "Described by Rudyard Kipling as \"the eighth wonder of the world\", Milford Sound is a fjord of extraordinary beauty in New Zealand's Fiordland region.",
    },
  },
  {
    id: 'bora-bora',
    image: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=800&q=70&auto=format',
    category: { it: 'Lusso', en: 'Luxury' },
    title: { it: 'Bora Bora', en: 'Bora Bora' },
    description: {
      it: "La \"Perla del Pacifico\" con la sua laguna color smeraldo e i bungalow sull'acqua è il simbolo del lusso tropicale. Un sogno che diventa realtà.",
      en: 'The "Pearl of the Pacific" with its emerald lagoon and overwater bungalows is the symbol of tropical luxury. A dream that becomes reality.',
    },
  },
  {
    id: 'queenstown',
    image: '/images/highlight-queenstown.webp',
    category: { it: 'Avventura', en: 'Adventure' },
    title: { it: 'Queenstown', en: 'Queenstown' },
    description: {
      it: "La capitale mondiale dell'avventura ai piedi delle Remarkables. Bungee jumping, skydiving, rafting e sci in un'ambientazione alpina mozzafiato.",
      en: "The world's adventure capital at the foot of the Remarkables. Bungee jumping, skydiving, rafting and skiing in a breathtaking alpine setting.",
    },
  },
  {
    id: 'daintree',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=70&auto=format',
    category: { it: 'Natura', en: 'Nature' },
    title: { it: 'Daintree Rainforest', en: 'Daintree Rainforest' },
    description: {
      it: "La foresta pluviale tropicale più antica del mondo, dove gli alberi incontrano l'oceano. Un ecosistema unico al mondo che risale all'era dei dinosauri.",
      en: "The world's oldest tropical rainforest, where the trees meet the ocean. A unique ecosystem that dates back to the age of the dinosaurs.",
    },
  },
];

export default async function HighlightsPage() {
  const t = await getTranslations('highlights');
  const locale = (await getLocale()) as 'it' | 'en';

  let highlights = staticHighlights;
  if (USE_SANITY) {
    try {
      const sanityData = await getHighlights();
      if (sanityData.length > 0) {
        highlights = sanityData.map((h) => ({
          id: h._id,
          image: h.image ? urlFor(h.image).width(800).height(520).url() : '',
          category: h.category,
          title: h.title,
          description: h.description,
        }));
      }
    } catch (e) { console.error('[Sanity] highlights fetch failed:', e); }
  }

  return (
    <>
      <section className="relative pt-40 pb-24 px-6 bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-4 block">
            {locale === 'it' ? 'Esperienze Top' : 'Top Experiences'}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <article key={item.id} className="group overflow-hidden bg-stone-50 hover:shadow-xl transition-shadow duration-500 rounded-lg">
                <div
                  className="h-64 bg-cover bg-center relative overflow-hidden transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="bg-gold text-hero text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-lg">
                      {item.category[locale]}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-hero mb-4 group-hover:text-gold transition-colors duration-300">
                    {item.title[locale]}
                  </h2>
                  <p className="text-hero/60 text-sm leading-relaxed mb-4">
                    {item.description[locale]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
