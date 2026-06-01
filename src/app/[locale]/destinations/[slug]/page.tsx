export const revalidate = 60;

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ArrowRight, Plane, CreditCard, Globe, Clock3, FileText, BookOpen } from 'lucide-react';
import { destinations as staticDestinations } from '@/data/destinations';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { blogPosts as staticBlogPosts } from '@/data/blog';
import { destinationContent } from '@/data/destination-content';
import { USE_SANITY, getAllDestinations, getAllItineraries, normalizeSanityDestination, normalizeSanityItinerary, getAllBlogPosts, normalizeSanityBlogPostForList, getDestinationBySlug, normalizeSanityDestinationContent } from '@/lib/sanity';
import OpenModalButton from '@/components/ui/OpenModalButton';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import { formatPrice, renderTitle } from '@/lib/utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticDestinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';
  const dest = staticDestinations.find((d) => d.slug === slug);
  if (!dest) return {};
  const title = dest.name[locale];
  const description = dest.description[locale];
  const image = dest.heroPhoto ?? dest.photo;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/destinations/${slug}`,
      languages: {
        'it': `/it/destinations/${slug}`,
        'en': `/en/destinations/${slug}`,
        'x-default': `/it/destinations/${slug}`,
      },
    },
    openGraph: { title, description, images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined, url: `/${locale}/destinations/${slug}` },
    twitter: { title, description },
  };
}

// Blog post slugs relevant to each destination
const DEST_BLOG_MAP: Record<string, string[]> = {
  'australia': ['guida-viaggio-australia', 'nuotare-con-gli-squali-balena-australia'],
  'new-zealand': ['guida-viaggio-nuova-zelanda', 'hobbiton-la-contea-esiste'],
};

// Keywords to match itinerary destination strings to destination page slugs
const DEST_KEYWORDS: Record<string, string[]> = {
  'australia':        ['australia'],
  'new-zealand':      ['zealand', 'nuova zelanda', 'aotearoa', 'new zealand'],
  'french-polynesia': ['polynesia', 'polinesia', 'bora bora', 'moorea', 'tahiti', 'raiatea'],
  'fiji':             ['fiji'],
  'cook-islands':     ['cook'],
  'samoa':            ['samoa'],
  'new-caledonia':    ['caledonia', 'caledonie', 'caledonie'],
};

const RATING_COLORS: Record<string, string> = {
  best: 'bg-emerald-500 text-white',
  good: 'bg-amber-400 text-white',
  avoid: 'bg-stone-200 text-stone-400',
};

const RATING_LABELS: Record<string, { it: string; en: string }> = {
  best: { it: 'Ottimo', en: 'Best' },
  good: { it: 'Buono', en: 'Good' },
  avoid: { it: 'Sconsigliato', en: 'Avoid' },
};

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as 'it' | 'en';

  let destinations = staticDestinations;
  let itineraries = staticItineraries;
  let blogPosts = staticBlogPosts;
  let content = destinationContent.find((c) => c.slug === slug) ?? null;

  if (USE_SANITY) {
    try {
      const [sanityDests, sanityIts, sanityPosts, sanityDest] = await Promise.all([
        getAllDestinations(),
        getAllItineraries(),
        getAllBlogPosts(),
        getDestinationBySlug(slug),
      ]);
      if (sanityDests.length > 0) {
        const sanityNormalized = sanityDests.map((s, i) => normalizeSanityDestination(s, i));
        // For the current destination, always prefer static data (canonical copy)
        destinations = sanityNormalized.map((d) => {
          if (d.slug === slug) return staticDestinations.find((s) => s.slug === slug) ?? d;
          return d;
        });
      }
      if (sanityIts.length > 0) {
        const normalized = sanityIts.map((s, i) => normalizeSanityItinerary(s, i));
        const seen = new Set<string>();
        itineraries = normalized.filter((it) => {
          if (seen.has(it.slug)) return false;
          seen.add(it.slug);
          return true;
        });
      }
      if (sanityPosts.length > 0) blogPosts = sanityPosts.map(normalizeSanityBlogPostForList);
      // Static destinationContent takes priority — only use Sanity if no static entry exists
      if (sanityDest && !content) {
        const sanityContent = normalizeSanityDestinationContent(sanityDest);
        if (sanityContent) content = sanityContent;
      }
    } catch (e) { console.error('[Sanity] destination slug fetch failed:', e); }
  }

  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  // Related itineraries — keyword match on destination, title and slug for robustness
  const relatedItineraries = itineraries.filter((it) => {
    const combined = [
      it.destination,
      it.title.it,
      it.title.en,
      it.slug,
    ].join(' ').toLowerCase();
    const keywords = DEST_KEYWORDS[slug] ?? [slug.replace(/-/g, ' ')];
    return keywords.some((k) => combined.includes(k));
  }).slice(0, 12);

  // Related blog posts
  const relatedBlogSlugs = DEST_BLOG_MAP[slug] ?? [];
  const relatedBlogPosts = blogPosts.filter((p) => relatedBlogSlugs.includes(p.slug));

  const isIT = locale === 'it';

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {(dest.heroPhoto ?? dest.photo) ? (
            <Image
              src={dest.heroPhoto ?? dest.photo}
              alt={dest.name[locale]}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${dest.gradient}`} />
          )}
          <div className="absolute inset-0 bg-black/38" />
        </div>

        {/* Back link — top left */}
        <div className="absolute top-24 left-0 right-0 z-10 container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-xs uppercase tracking-[0.25em] font-sans"
          >
            <ChevronLeft size={14} /> {isIT ? 'Home' : 'Home'}
          </Link>
        </div>

        {/* Centered content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-10">
          <div className="max-w-4xl">
            <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-6 block drop-shadow-md">
              {dest.tagline[locale]}
            </span>
            <h1 className="font-serif text-3xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-lg">
              {(() => {
                if (!isIT) return `Travel to ${dest.name[locale]}`;
                if (dest.slug === 'fiji') return 'Viaggi alle Isole Fiji';
                if (dest.slug === 'cook-islands') return 'Viaggi alle Isole Cook';
                if (dest.slug === 'samoa') return 'Viaggi alle Isole Samoa';
                return `Viaggi in ${dest.name[locale]}`;
              })()}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans drop-shadow-md">
              {dest.description[locale]}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <OpenModalButton className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20">
                {isIT ? 'Inizia a progettare il tuo viaggio' : 'Start planning your trip'}
              </OpenModalButton>
            </div>

            {/* Scroll indicator — mobile only */}
            <div className="md:hidden mt-10 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/50 text-[10px] font-sans uppercase tracking-[0.3em]">
                {isIT ? 'Scopri di più' : 'Discover more'}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
                <path d="M10 4v12M10 16l-4-4M10 16l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ───────────────────────────────────────────────────────────── */}
      {content && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                {content.introLabel ? content.introLabel[locale] : (isIT ? 'Tour Privati e su Misura' : 'Private & Tailor-Made Tours')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-6 leading-tight">
                {isIT ? `Perché scegliere ${dest.name[locale]}?` : `Why choose ${dest.name[locale]}?`}
              </h2>
              <p
                className="text-hero/70 text-base leading-relaxed font-sans [&_strong]:text-gold [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: content.intro[locale] }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── MUST SEE ────────────────────────────────────────────────────────── */}
      {content && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: big photo */}
              <div className="relative h-[480px] lg:h-full min-h-[420px] overflow-hidden">
                <img
                  src={content.mustSeeImage ?? (dest.heroPhoto ?? dest.photo)}
                  alt={dest.name[locale]}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: title + list */}
              <div className="py-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1 h-px bg-gold/40" />
                  <span className="text-gold text-xs font-sans uppercase tracking-[0.2em] text-center">
                    {isIT ? `${dest.name[locale]}, raccomandazioni di viaggio` : `${dest.name[locale]}, travel recommendations`}
                  </span>
                  <div className="flex-1 h-px bg-gold/40" />
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero text-center mb-5">
                  {isIT ? `${content.mustSee.length} esperienze da vivere in ${dest.name[locale]}` : `${content.mustSee.length} experiences to live in ${dest.name[locale]}`}
                </h2>

                <p className="text-hero/60 text-base font-sans leading-relaxed mb-6">
                  {isIT
                    ? `Alcuni dei punti più rilevanti che potresti considerare nella pianificazione del tuo viaggio in ${dest.name[locale]}:`
                    : `Some of the most relevant highlights to consider when planning your trip to ${dest.name[locale]}:`}
                </p>

                <ul className="space-y-4">
                  {content.mustSee.map((item, i) => (
                    <li key={i} className="flex gap-3 text-base font-sans text-hero/70 leading-relaxed">
                      <span className="text-gold mt-1 shrink-0">•</span>
                      <span>
                        <strong className="text-gold font-bold">{item.title[locale]}</strong>
                        {': '}
                        {item.description[locale]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── QUANDO ANDARE ───────────────────────────────────────────────────── */}
      {content && slug !== 'australia' && slug !== 'new-zealand' && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                {isIT ? 'Clima & Stagioni' : 'Climate & Seasons'}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
                {isIT ? `Quando andare in ${dest.name[locale]}` : `When to visit ${dest.name[locale]}`}
              </h2>
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-6">
              {content.whenToGo.months.map((m) => (
                <div key={m.it} className="flex flex-col items-center gap-1.5">
                  <div className={`w-full py-3 flex items-center justify-center text-xs font-sans font-bold rounded ${RATING_COLORS[m.rating]}`}>
                    {m[locale]}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {(['best', 'good', 'avoid'] as const).map((r) => (
                <span key={r} className="flex items-center gap-2 text-xs font-sans text-hero/60">
                  <span className={`w-3 h-3 rounded-sm inline-block ${RATING_COLORS[r]}`} />
                  {RATING_LABELS[r][locale]}
                </span>
              ))}
            </div>

            <p className="text-hero/60 text-base font-sans leading-relaxed max-w-3xl mx-auto text-center mb-8">
              {content.whenToGo.description[locale]}
            </p>
            <div className="flex justify-center">
              <OpenModalButton className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-white font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-full hover:opacity-80 transition-opacity">
                {isIT ? 'Pianifica il Tuo Viaggio' : 'Plan Your Trip'} <ArrowRight size={12} />
              </OpenModalButton>
            </div>
          </div>
        </section>
      )}

      {/* ── ITINERARIES / DOVE ANDARE ────────────────────────────────────────── */}
      {relatedItineraries.length > 0 && (
        <section className="py-16 bg-white border-t border-stone-100 overflow-hidden">
          <div className="text-center px-6 mb-10">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
              {isIT ? 'Le nostre proposte' : 'Our Proposals'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero leading-snug mb-4">
              {isIT ? `Le nostre proposte per ${dest.name[locale]}` : `Our proposals for ${dest.name[locale]}`}
            </h2>
            <p className="text-hero/55 text-base font-sans leading-relaxed max-w-xl mx-auto mb-2">
              {isIT
                ? `Questi itinerari sono le nostre proposte di viaggio: punti di partenza che costruiamo e adattiamo alle tue esigenze, al tuo stile e ai giorni disponibili. Nessun pacchetto da catalogo — ogni viaggio viene disegnato attorno a te.`
                : `These itineraries are our travel proposals: starting points that we build and adapt to your needs, travel style and available time. No fixed packages — every journey is designed around you.`}
            </p>
            <p className="text-hero/40 text-sm font-sans leading-relaxed italic">
              {isIT
                ? '"Organizziamo anche tour privati completamente su misura, senza partenze di gruppo."'
                : '"We also organise fully private tours, tailored to you — no group departures."'}
            </p>
          </div>
          <div className="flex justify-center gap-1 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 lg:px-10">
            {relatedItineraries.map((it) => (
              <Link
                key={it.id}
                href={`/travel-ideas/${it.slug}`}
                className="group relative flex-shrink-0 w-[280px] md:w-[320px] h-[420px] md:h-[480px] snap-start overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: it.image ? `url(${it.image})` : undefined }}
                />
                {!it.image && <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient}`} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="text-white/80 text-xs font-sans">
                    {it.duration - 1} {isIT ? 'notti' : 'nights'} · {it.duration} {isIT ? 'giorni' : 'days'}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white leading-tight mb-2">
                      {renderTitle(it.title[locale])}
                    </h3>
                    <p className="text-white/70 text-sm font-sans leading-relaxed mb-1 line-clamp-2">
                      {it.description[locale]}
                    </p>
                    {it.price.amount > 0 && (
                      <p className="text-gold text-sm font-sans font-bold mb-4">
                        {isIT ? 'A partire da' : 'From'} {formatPrice(it.price.amount, it.price.currency, isIT ? 'it-IT' : 'en-GB')}
                      </p>
                    )}
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/60 text-white text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-hero transition-all duration-300">
                      {isIT ? 'Vedi di più' : 'See more'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            <div className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[420px] md:h-[480px] snap-start overflow-hidden bg-stone-900 flex flex-col items-center justify-center text-center p-8">
              <span className="text-4xl mb-4">✨</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Tailor Made</h3>
              <p className="text-white/50 text-sm font-sans mb-6 leading-relaxed">
                {isIT
                  ? 'Non trovi quello che cerchi? Creiamo l\'itinerario perfetto su misura per te.'
                  : 'Can\'t find what you\'re looking for? We create the perfect custom itinerary for you.'}
              </p>
              <OpenModalButton className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/60 text-gold text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-white transition-all duration-300">
                {isIT ? 'Personalizza' : 'Customise'}
              </OpenModalButton>
            </div>
          </div>
        </section>
      )}

      {/* ── PRACTICAL INFO ──────────────────────────────────────────────────── */}
      {content && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                {isIT ? 'Prima di Partire' : 'Before You Go'}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero">
                {isIT ? 'Informazioni pratiche' : 'Practical information'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: { it: 'Visto', en: 'Visa' }, value: content.practical.visa },
                { icon: Plane, label: { it: 'Voli', en: 'Flights' }, value: content.practical.flights },
                { icon: CreditCard, label: { it: 'Valuta', en: 'Currency' }, value: content.practical.currency },
                { icon: Globe, label: { it: 'Lingua', en: 'Language' }, value: content.practical.language },
                { icon: Clock3, label: { it: 'Fuso Orario', en: 'Time Zone' }, value: content.practical.timezone },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label.it} className="flex gap-4 p-5 bg-stone-50 border border-stone-100">
                  <div className="shrink-0 mt-0.5">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold block mb-1">
                      {label[locale]}
                    </span>
                    <p className="text-hero/70 text-base font-sans leading-relaxed">{value[locale]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA strip */}
            <div className="mt-10 p-6 bg-stone-50 border border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-hero/70 text-base font-sans">
                {isIT
                  ? `Hai altre domande su come organizzare il tuo viaggio in ${dest.name[locale]}?`
                  : `Do you have more questions about organising your trip to ${dest.name[locale]}?`}
              </p>
              <OpenModalButton className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-opacity shrink-0">
                {isIT ? 'Inizia a progettare il tuo viaggio' : 'Start planning your trip'}
              </OpenModalButton>
            </div>
          </div>
        </section>
      )}

      {/* ── BLOG / INFORMAZIONI UTILI ────────────────────────────────────────── */}
      {relatedBlogPosts.length > 0 && (
        <section className="border-t border-stone-100">
          <div className="flex flex-col items-center justify-center text-center py-10 bg-stone-50 border-t border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-4">
              {isIT ? 'Informazioni utili' : 'Useful information'}
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center px-5 py-1.5 border border-hero/30 text-hero/60 text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              {isIT ? 'Vedi tutti gli articoli' : 'See all articles'}
            </Link>
          </div>

          <div className="flex gap-1 bg-stone-100">
            {relatedBlogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex-1 h-56 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: post.image ? `url(${post.image})` : undefined }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <BookOpen size={22} className="text-white mb-2" />
                  <h3 className="font-sans font-bold uppercase tracking-[0.15em] text-white text-sm mb-3 leading-snug">
                    {post.title[locale]}
                  </h3>
                  <span className="inline-flex items-center px-4 py-1.5 border border-white/70 text-white text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-full group-hover:bg-white group-hover:text-hero transition-all duration-300">
                    {isIT ? 'Leggi di più' : 'Read more'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── OTHER DESTINATIONS ──────────────────────────────────────────────── */}
      <DestinationsGrid
        destinations={destinations.filter((d) => d.slug !== slug)}
        label={isIT ? 'Destinazioni' : 'Destinations'}
        title={isIT ? 'Altre destinazioni' : 'Other destinations'}
        subtitle={isIT ? 'Esplora le altre mete che organizziamo in Oceania' : 'Explore the other destinations we organise across Oceania'}
      />


    </div>
  );
}
