import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import OpenModalButton from '@/components/ui/OpenModalButton';

const navLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/destinations', labelKey: 'destinations' },
  { href: '/travel-ideas', labelKey: 'travelIdeas' },
  { href: '/highlights', labelKey: 'highlights' },
  { href: '/wedding-list', labelKey: 'weddingList' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-hero text-white">
      {/* Top CTA Banner */}
      <div className="bg-brown py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-1">
              Pronto per la tua avventura?
            </h3>
            <p className="text-white/70 text-sm">
              {t('footer.tagline')}
            </p>
          </div>
          <OpenModalButton
            className="inline-flex items-center px-10 py-3 border border-gold text-gold text-xs font-sans uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 shrink-0"
          >
            {t('common.contactUs')}
          </OpenModalButton>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h4 className="font-serif text-2xl font-bold text-white mb-4">
            Progetto Australia
          </h4>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
            {t('footer.tagline')}. Specialists in Australia, New Zealand, and the Pacific Islands since 2005.
          </p>
          {/* Social */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Nav Links */}
        <div>
          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-6">
            {t('footer.links')}
          </h5>
          <ul className="flex flex-col gap-3">
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {t(`nav.${link.labelKey}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-xs font-sans uppercase tracking-widest text-gold mb-6">
            {t('footer.contact')}
          </h5>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <span className="text-sm text-white/60">
                {t('contact.info.address')}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gold shrink-0" />
              <a
                href={`tel:${t('contact.info.phone')}`}
                className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
              >
                {t('contact.info.phone')}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gold shrink-0" />
              <a
                href={`mailto:${t('contact.info.email')}`}
                className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
              >
                {t('contact.info.email')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-gold transition-colors duration-300">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-gold transition-colors duration-300">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
