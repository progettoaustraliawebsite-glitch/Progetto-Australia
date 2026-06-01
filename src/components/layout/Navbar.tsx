'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { destinations } from '@/data/destinations';
import { useNavbarContext } from '@/context/NavbarContext';

const navLinks = [
  { href: '/travel-ideas', labelKey: 'travelIdeas' },
  { href: '/how-it-works', labelKey: 'howItWorks' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/about', labelKey: 'about' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [destsOpen, setDestsOpen] = useState(false);
  const [mobileDestsOpen, setMobileDestsOpen] = useState(false);

  const pathname = usePathname();
  const locale = useLocale() as 'it' | 'en';
  const otherLocale = locale === 'it' ? 'en' : 'it';
  const router = useRouter();
  const t = useTranslations('nav');
  const { darkHero } = useNavbarContext();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const trackCta = (location: string) => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).dataLayer = (window as any).dataLayer || []).push({
        event: 'cta_click',
        cta_location: location,
      });
    }
  };

  const transparent = darkHero && !scrolled;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-lg'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
          <Image
            src="/logointeronuovo.png"
            alt="Progetto Australia"
            width={140}
            height={28}
            className="h-7 w-auto object-contain transition-all duration-500"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">

            {/* Destinations dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setDestsOpen(true)}
              onMouseLeave={() => setDestsOpen(false)}
            >
              <button className={`flex items-center gap-1 text-xs font-sans uppercase tracking-widest hover:text-gold transition-colors duration-300 ${transparent ? 'text-white/90' : 'text-charcoal/80'}`}>
                {t('destinations')}
                <ChevronDown size={11} className={`transition-transform duration-200 ${destsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {destsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-5 z-50"
                  >
                    <div className="bg-white shadow-2xl border border-stone-100 py-3 px-1 w-56 flex flex-col">
                      {destinations.map((dest) => (
                        <Link
                          key={dest.slug}
                          href={`/destinations/${dest.slug}`}
                          onClick={() => setDestsOpen(false)}
                          className="px-5 py-2.5 text-xs font-sans uppercase tracking-widest text-charcoal/80 hover:text-gold hover:bg-stone-50 transition-colors"
                        >
                          {dest.name[locale]}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Other nav links */}
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-sans uppercase tracking-widest hover:text-gold transition-colors duration-300 ${transparent ? 'text-white/90' : 'text-charcoal/80'}`}
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => { trackCta('navbar_desktop'); router.push('/quote'); }}
            className="bg-gold hover:bg-charcoal text-white px-6 py-2.5 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-gold/20"
          >
            {t('getQuote')}
          </button>
        </div>

        {/* Right side: Lang Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => switchLocale(otherLocale)}
            className={`text-xs font-sans uppercase tracking-widest hover:text-gold transition-colors duration-300 hover:border-gold px-3 py-1.5 border ${transparent ? 'text-white/80 border-white/30' : 'text-charcoal/60 border-charcoal/20'}`}
          >
            {otherLocale}
          </button>

          <button
            className={`lg:hidden hover:text-gold transition-colors duration-300 ${transparent ? 'text-white' : 'text-charcoal'}`}
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
            className="lg:hidden bg-white border-t border-sand overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">

              {/* Destinations accordion */}
              <li>
                <button
                  onClick={() => setMobileDestsOpen(!mobileDestsOpen)}
                  className="flex items-center justify-between w-full text-sm font-sans uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors duration-300"
                >
                  {t('destinations')}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileDestsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileDestsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pl-3 flex flex-col gap-3 border-l-2 border-gold/30 overflow-hidden"
                    >
                      {destinations.map((dest) => (
                        <li key={dest.slug}>
                          <Link
                            href={`/destinations/${dest.slug}`}
                            onClick={() => { setIsOpen(false); setMobileDestsOpen(false); }}
                            className="flex items-center gap-3 group"
                          >
                            <img
                              src={dest.photo}
                              alt={dest.name[locale]}
                              className="w-10 h-8 object-cover flex-shrink-0"
                            />
                            <span className="text-sm font-sans text-charcoal/70 group-hover:text-gold transition-colors">
                              {dest.name[locale]}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

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
                  onClick={() => { setIsOpen(false); trackCta('navbar_mobile'); router.push('/quote'); }}
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
