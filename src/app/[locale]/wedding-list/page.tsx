import { getTranslations, getLocale } from 'next-intl/server';
import { Heart, Shield, Zap, ArrowRight } from 'lucide-react';
import OpenModalButton from '@/components/ui/OpenModalButton';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('weddingList');
  return { title: t('title') };
}

export default async function WeddingListPage() {
  const t = await getTranslations('weddingList');
  const locale = (await getLocale()) as 'it' | 'en';

  const icons = [Heart, Shield, Zap];

  const how = [
    {
      step: '01',
      title: { it: 'Scegli il tuo viaggio', en: 'Choose your journey' },
      desc: {
        it: 'Collaboriamo con te per progettare il viaggio di nozze dei tuoi sogni in Australia o Pacifico.',
        en: 'We work with you to design your dream honeymoon in Australia or the Pacific.',
      },
    },
    {
      step: '02',
      title: { it: 'Crea la tua lista', en: 'Create your list' },
      desc: {
        it: 'Dividiamo il viaggio in "esperienze" che i tuoi invitati possono regalare: dalla cena romantica al safari.',
        en: 'We divide the trip into "experiences" your guests can gift: from a romantic dinner to a wildlife safari.',
      },
    },
    {
      step: '03',
      title: { it: 'Condividi con i tuoi cari', en: 'Share with loved ones' },
      desc: {
        it: 'Invii il link della tua lista agli invitati e loro scelgono il regalo perfetto.',
        en: 'Share your list link with guests and they choose the perfect gift.',
      },
    },
    {
      step: '04',
      title: { it: 'Parti e goditi il viaggio', en: 'Depart and enjoy' },
      desc: {
        it: 'Raccogliamo i fondi e organizziamo ogni dettaglio. Tu pensi solo a goderti la luna di miele.',
        en: 'We collect the funds and organise every detail. You just focus on enjoying the honeymoon.',
      },
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#813318]/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.3em] mb-4 block">
            {locale === 'it' ? 'Il regalo più bello' : 'The most beautiful gift'}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-charcoal/70 text-lg leading-relaxed mb-12">
            {t('intro')}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[0, 1, 2].map((i) => {
              const Icon = icons[i];
              return (
                <div key={i} className="flex flex-col items-center gap-4 p-8 bg-stone-50">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {t(`features.${i}.title`)}
                  </h3>
                  <p className="text-charcoal/60 text-sm text-center">
                    {t(`features.${i}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4 block">
              {locale === 'it' ? 'Come funziona' : 'How it works'}
            </span>
            <h2 className="font-serif text-4xl font-bold text-charcoal">
              {locale === 'it' ? '4 Semplici Passi' : '4 Simple Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {how.map((step) => (
              <div key={step.step} className="relative">
                <span className="font-serif text-6xl font-bold text-gold/20 mb-4 block">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
                  {step.title[locale]}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {step.desc[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Heart size={40} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold mb-4">
            {locale === 'it' ? 'Inizia a Sognare' : 'Start Dreaming'}
          </h2>
          <p className="text-white/60 mb-10">
            {locale === 'it'
              ? 'Contattaci per creare insieme la tua lista nozze personalizzata.'
              : 'Contact us to create your personalised wedding list together.'}
          </p>
          <OpenModalButton
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white text-xs font-sans uppercase tracking-widest hover:opacity-80 transition-opacity duration-300"
          >
            {t('cta')} <ArrowRight size={16} />
          </OpenModalButton>
        </div>
      </section>
    </>
  );
}
