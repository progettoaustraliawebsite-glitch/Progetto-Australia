import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ConditionalShell from '@/components/layout/ConditionalShell';
import { QuoteModalProvider } from '@/context/QuoteModalContext';
import WeddingQuoteModal from '@/components/modals/WeddingQuoteModal';
import NewsletterPopup from '@/components/modals/NewsletterPopup';
import JsonLd from '@/components/seo/JsonLd';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';
  const description = isIT
    ? 'Agenzia di viaggi specializzata in Australia, Nuova Zelanda e Isole del Pacifico. Itinerari su misura, luna di miele, viaggi di lusso.'
    : 'Travel agency specialised in Australia, New Zealand and Pacific Islands. Bespoke itineraries, honeymoons, luxury travel.';

  return {
    metadataBase: new URL('https://www.progettoaustralia.it'),
    title: {
      template: '%s | Progetto Australia',
      default: isIT
        ? 'Progetto Australia – Viaggi in Australia e Oceania'
        : 'Progetto Australia – Travel to Australia & Oceania',
    },
    description,
    openGraph: {
      siteName: 'Progetto Australia',
      locale: isIT ? 'it_IT' : 'en_AU',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Progetto Australia – Viaggi in Australia e Oceania',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.png'],
    },
  };
}

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Progetto Australia',
  url: 'https://www.progettoaustralia.it',
  logo: 'https://www.progettoaustralia.it/logo.png',
  image: 'https://www.progettoaustralia.it/og-image.png',
  description:
    'Agenzia di viaggi italiana specializzata in Australia, Nuova Zelanda, Fiji e Isole del Pacifico. Itinerari su misura, luna di miele, viaggi di lusso con assistenza italiana in loco.',
  foundingDate: '2008',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20 Lobelia Ave',
    addressLocality: 'Daisy Hill',
    addressRegion: 'QLD',
    postalCode: '4127',
    addressCountry: 'AU',
  },
  telephone: '+61733886838',
  email: 'info@progettoaustralia.com',
  areaServed: [
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'New Zealand' },
    { '@type': 'Country', name: 'Fiji' },
    { '@type': 'Country', name: 'French Polynesia' },
    { '@type': 'Country', name: 'Cook Islands' },
    { '@type': 'Country', name: 'Vanuatu' },
  ],
  knowsAbout: [
    'Australia travel', 'New Zealand travel', 'Fiji travel',
    'Pacific Islands travel', 'honeymoon travel', 'luxury travel',
    'self-drive Australia', 'Great Barrier Reef', 'Uluru', 'Milford Sound',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Travelife Partner' },
    { '@type': 'EducationalOccupationalCredential', name: 'Aussie Specialist' },
    { '@type': 'EducationalOccupationalCredential', name: 'New Zealand Specialist' },
    { '@type': 'EducationalOccupationalCredential', name: 'Fiji Specialist' },
  ],
  inLanguage: ['it', 'en'],
  sameAs: [
    'https://www.facebook.com/progettoaustralia',
    'https://www.instagram.com/progettoaustralia',
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={travelAgencySchema} />
      <QuoteModalProvider>
        <ConditionalShell>{children}</ConditionalShell>
        <WeddingQuoteModal />
        {/* <NewsletterPopup /> */}
      </QuoteModalProvider>
    </NextIntlClientProvider>
  );
}
