export const revalidate = 60;

import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ArrowRight, Plane, CreditCard, Globe, Clock3, FileText, BookOpen } from 'lucide-react';
import { destinations as staticDestinations } from '@/data/destinations';
import { itineraries as staticItineraries } from '@/data/itineraries';
import { blogPosts as staticBlogPosts } from '@/data/blog';
import { destinationContent } from '@/data/destination-content';
import { USE_SANITY, getAllDestinations, getAllItineraries, normalizeSanityDestination, normalizeSanityItinerary, getAllBlogPosts, normalizeSanityBlogPostForList, getDestinationBySlug, normalizeSanityDestinationContent } from '@/lib/sanity';
import OpenModalButton from '@/components/ui/OpenModalButton';
import { formatPrice } from '@/lib/utils';
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
    openGraph: { title, description, images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined, url: `/${locale}/destinations/${slug}` },
    twitter: { title, description },
  };
}

// Blog post slugs relevant to each destination
const DEST_BLOG_MAP: Record<string, string[]> = {
  'australia': ['guida-viaggio-australia', 'nuotare-con-gli-squali-balena-australia'],
  'new-zealand': ['guida-viaggio-nuova-zelanda', 'hobbiton-la-contea-esiste'],
};

// Destination name → slug mapping for itinerary filtering
const DEST_NAME_TO_SLUG: Record<string, string> = {
  'Australia': 'australia',
  'New Zealand': 'new-zealand',
  'Pacific': 'fiji',
  'Fiji': 'fiji',
  'French Polynesia': 'french-polynesia',
  'Cook Islands': 'cook-islands',
  'Vanuatu': 'vanuatu',
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
      if (sanityDests.length > 0) destinations = sanityDests.map((s, i) => normalizeSanityDestination(s, i));
      if (sanityIts.length > 0) itineraries = sanityIts.map((s, i) => normalizeSanityItinerary(s, i));
      if (sanityPosts.length > 0) blogPosts = sanityPosts.map(normalizeSanityBlogPostForList);
      if (sanityDest) {
        const sanityContent = normalizeSanityDestinationContent(sanityDest);
        if (sanityContent) content = sanityContent;
      }
    } catch (e) { console.error('[Sanity] destination slug fetch failed:', e); }
  }

  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  // Related itineraries
  const relatedItineraries = itineraries.filter((it) => {
    const itDestSlug = DEST_NAME_TO_SLUG[it.destination] ?? it.destination.toLowerCase().replace(/\s+/g, '-');
    return itDestSlug === slug;
  }).slice(0, 8);

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
            <img src={dest.heroPhoto ?? dest.photo} alt={dest.name[locale]} className="w-full h-full object-cover" />
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
              {isIT ? `Viaggi in ${dest.name[locale]}` : `Travel to ${dest.name[locale]}`}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans drop-shadow-md">
              {dest.description[locale]}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <OpenModalButton className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gold bg-gold/10 backdrop-blur-sm text-white text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-hero transition-all duration-500 shadow-2xl shadow-gold/20">
                {isIT ? 'Crea il tuo viaggio' : 'Create your trip'}
              </OpenModalButton>
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
                {isIT ? 'Tour Privati e su Misura' : 'Private & Tailor-Made Tours'}
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

      {/* ── ITINERARIES ─────────────────────────────────────────────────────── */}
      {relatedItineraries.length > 0 && (
        <section className="py-16 bg-white border-t border-stone-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-0">

            {/* Left fixed column */}
            <div className="lg:w-80 xl:w-96 shrink-0 px-6 lg:px-10 xl:px-16 pb-8 lg:pb-0 flex flex-col justify-center">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                {isIT ? `Viaggi in ${dest.name[locale]}` : `Travel to ${dest.name[locale]}`}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero leading-snug mb-4">
                {isIT
                  ? `Le Nostre Migliori Proposte per Viaggiare in ${dest.name[locale]}`
                  : `Our Best Proposals for Travelling to ${dest.name[locale]}`}
              </h2>
              <p className="text-hero/55 text-base font-sans leading-relaxed mb-2">
                {isIT
                  ? `Itinerari organizzati in ${dest.name[locale]}, in base ai giorni di vacanza che hai.`
                  : `Organised itineraries to ${dest.name[locale]}, based on the days you have available.`}
              </p>
              <p className="text-hero/45 text-base font-sans leading-relaxed mb-6">
                {isIT
                  ? 'Puoi anche pianificare il tuo viaggio privato su misura o un itinerario personalizzato senza andare in gruppo.'
                  : 'You can also plan your own private tailor-made trip or a personalised itinerary without joining a group.'}
              </p>
            </div>

            {/* Horizontal scroll cards */}
            <div className="flex-1 min-w-0">
              <div className="flex gap-1 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
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
                          {it.title[locale]}
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

                {/* Tailor Made card */}
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
                  {isIT ? `5 Must nei viaggi in ${dest.name[locale]}` : `5 Must-Sees in ${dest.name[locale]}`}
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
      {content && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
              {isIT ? 'Clima & Stagioni' : 'Climate & Seasons'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-8">
              {isIT ? `Quando andare in ${dest.name[locale]}` : `When to visit ${dest.name[locale]}`}
            </h2>

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
            <div className="flex flex-wrap gap-4 mb-6">
              {(['best', 'good', 'avoid'] as const).map((r) => (
                <span key={r} className="flex items-center gap-2 text-xs font-sans text-hero/60">
                  <span className={`w-3 h-3 rounded-sm inline-block ${RATING_COLORS[r]}`} />
                  {RATING_LABELS[r][locale]}
                </span>
              ))}
            </div>

            <p className="text-hero/60 text-base font-sans leading-relaxed max-w-3xl border-l-4 border-gold/30 pl-4 mb-8">
              {content.whenToGo.description[locale]}
            </p>
            <OpenModalButton className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-white font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-full hover:opacity-80 transition-opacity">
              {isIT ? 'Pianifica il Tuo Viaggio' : 'Plan Your Trip'} <ArrowRight size={12} />
            </OpenModalButton>
          </div>
        </section>
      )}


      {/* ── BLOG ────────────────────────────────────────────────────────────── */}
      {relatedBlogPosts.length > 0 && (
        <section className="border-t border-stone-100">
          <div className="flex flex-col items-center justify-center text-center py-10 bg-stone-50 border-t border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-4">
              {isIT ? 'Articoli di Blog' : 'Blog Articles'}
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

      {/* ── PRACTICAL INFO ──────────────────────────────────────────────────── */}
      {content && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
              {isIT ? 'Prima di Partire' : 'Before You Go'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-hero mb-10">
              {isIT ? 'Informazioni pratiche' : 'Practical information'}
            </h2>
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
                {isIT ? 'Crea il tuo viaggio' : 'Create your trip'}
              </OpenModalButton>
            </div>
          </div>
        </section>
      )}


      {/* ── OTHER DESTINATIONS ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-stone-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-5 mb-8">
            <div className="flex-1 h-px bg-gold/40" />
            <span className="text-sm font-sans text-hero/60 whitespace-nowrap">
              {isIT ? 'Altre ' : 'Other '}<strong className="text-hero font-bold">{isIT ? 'destinazioni' : 'destinations'}</strong>
            </span>
            <div className="flex-1 h-px bg-gold/40" />
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {destinations
              .filter((d) => d.slug !== slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group flex-1 min-w-[180px] max-w-[280px] flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={d.photo}
                      alt={d.name[locale]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-sans font-semibold text-sm text-hero/80 group-hover:text-gold transition-colors pt-3 pb-1 text-center">
                    {d.name[locale]}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>


    </div>
  );
}
