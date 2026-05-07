'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useQuoteModal } from '@/context/QuoteModalContext';

const navLinks = [
  { href: '/destinations', labelKey: 'destinations' },
  { href: '/travel-ideas', labelKey: 'travelIdeas' },
  { href: '/highlights', labelKey: 'highlights' },
  { href: '/wedding-list', labelKey: 'weddingList' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/about', labelKey: 'about' },
] as const;

export default function Navbar() {
  const { open: openModal } = useQuoteModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const otherLocale = locale === 'it' ? 'en' : 'it';
  const router = useRouter();
  const t = useTranslations('nav');

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm border-b border-sand'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
          <img src="/logo.png" alt="Progetto Australia" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-sans uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors duration-300"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          
          <button
            onClick={openModal}
            className="bg-gold hover:bg-charcoal text-white px-6 py-2.5 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-gold/20"
          >
            {t('getQuote')}
          </button>
        </div>

        {/* Right side: Lang Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => switchLocale(otherLocale)}
            className="text-xs font-sans uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors duration-300 border border-charcoal/20 hover:border-gold px-3 py-1.5"
          >
            {otherLocale}
          </button>

          <button
            className="lg:hidden text-charcoal hover:text-gold transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-sand"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-sans uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <button
                  onClick={() => { setIsOpen(false); openModal(); }}
                  className="block w-full bg-gold text-white text-center py-4 rounded-xl text-xs font-sans uppercase tracking-[0.2em] font-bold shadow-xl shadow-gold/20"
                >
                  {t('getQuote')}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
