import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { QuoteModalProvider } from '@/context/QuoteModalContext';
import WeddingQuoteModal from '@/components/modals/WeddingQuoteModal';
import NewsletterPopup from '@/components/modals/NewsletterPopup';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: {
      template: `%s | Progetto Australia`,
      default: 'Progetto Australia – Viaggi in Australia e Oceania',
    },
    description:
      locale === 'it'
        ? 'Agenzia di viaggi specializzata in Australia, Nuova Zelanda e Isole del Pacifico. Itinerari su misura, luna di miele, viaggi di lusso.'
        : 'Travel agency specialised in Australia, New Zealand and Pacific Islands. Bespoke itineraries, honeymoons, luxury travel.',
    openGraph: {
      locale: locale === 'it' ? 'it_IT' : 'en_AU',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <QuoteModalProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WeddingQuoteModal />
        <NewsletterPopup />
      </QuoteModalProvider>
    </NextIntlClientProvider>
  );
}
