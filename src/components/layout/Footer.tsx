import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { team } from '@/data/team';

export default function Footer({ locale }: { locale: 'it' | 'en' }) {
  const t = useTranslations();

  return (
    <footer className="bg-hero text-white">
      {/* Main Footer — 4 colonne come il sito originale */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

        {/* Col 1 — Brand + tagline + social */}
        <div className="lg:col-span-1">
          <h4 className="font-serif text-xl font-bold text-white mb-4">Progetto Australia</h4>
          <p className="text-white/55 text-sm leading-relaxed mb-8">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/progettoaustralia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/ProgettoAustralia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Col 2 — Chi Siamo + Viaggi */}
        <div>
          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-5">
            {t('footer.colAbout')}
          </h5>
          <ul className="flex flex-col gap-2.5 mb-8">
            {team.map((member) => (
              <li key={member.id}>
                <Link
                  href="/about"
                  className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
                >
                  {member.name}
                </Link>
              </li>
            ))}
          </ul>

          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-5">
            {t('footer.colTrips')}
          </h5>
          <ul className="flex flex-col gap-2.5">
            {(
              [
                ['footer.tripHoneymoon', '/travel-ideas'],
                ['footer.tripLuxury', '/travel-ideas'],
                ['footer.tripFamily', '/travel-ideas'],
                ['footer.tripFriends', '/travel-ideas'],
                ['footer.tripAdventure', '/travel-ideas'],
                ['footer.tripGroup', '/travel-ideas'],
              ] as [string, string][]
            ).map(([key, href]) => (
              <li key={key}>
                <Link href={href} className="text-sm text-white/55 hover:text-gold transition-colors duration-300">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Destinazioni + Sostenibilità */}
        <div>
          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-5">
            {t('footer.colDest')}
          </h5>
          <ul className="flex flex-col gap-2.5 mb-8">
            {destinations.map((dest) => (
              <li key={dest.id}>
                <Link
                  href={`/destinations/${dest.slug}` as never}
                  className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
                >
                  {dest.name[locale]}
                </Link>
              </li>
            ))}
          </ul>

          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-5">
            {t('footer.colSustain')}
          </h5>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="/sustainability" className="text-sm text-white/55 hover:text-gold transition-colors duration-300">
                {t('footer.sustainability')}
              </Link>
            </li>
            <li>
              <a
                href="https://www.progettoaustralia.it/wp-content/uploads/2024/11/SUSTAINABILITY-POLICY-PROGETTO-AUSTRALIA-IT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
              >
                {t('footer.sustainPolicy')}
              </a>
            </li>
            <li>
              <a
                href={locale === 'en' ? '/PRIVACY-POLICY-of-PROGETTO-AUSTRALIA-EN.pdf' : 'https://www.progettoaustralia.it/wp-content/uploads/2024/11/PRIVACY-POLICY-of-PROGETTO-AUSTRALIA.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
              >
                {t('footer.privacyPolicy')}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 — Contatti */}
        <div>
          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-5">
            {t('footer.colContact')}
          </h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
              <span className="text-sm text-white/55 leading-relaxed">
                {t('contact.info.address')}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={15} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <a
                  href={`tel:${t('contact.info.phone').replace(/\s/g, '')}`}
                  className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
                >
                  🇦🇺 {t('contact.info.phone')}
                </a>
                <a
                  href={`tel:${t('contact.info.phoneUS').replace(/\s/g, '')}`}
                  className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
                >
                  🇺🇸 {t('contact.info.phoneUS')}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-gold shrink-0" />
              <a
                href={`mailto:${t('contact.info.email')}`}
                className="text-sm text-white/55 hover:text-gold transition-colors duration-300"
              >
                {t('contact.info.email')}
              </a>
            </li>
          </ul>

          {/* Logo */}
          <div className="mt-8">
            <Image
              src="/images/logo-full.webp"
              alt="Progetto Australia — il tuo viaggio su misura"
              width={260}
              height={156}
              className="w-[260px] h-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a
              href={locale === 'en' ? '/PRIVACY-POLICY-of-PROGETTO-AUSTRALIA-EN.pdf' : 'https://www.progettoaustralia.it/wp-content/uploads/2024/11/PRIVACY-POLICY-of-PROGETTO-AUSTRALIA.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/35 hover:text-gold transition-colors duration-300"
            >
              {t('footer.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
