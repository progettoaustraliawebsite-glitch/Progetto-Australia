'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalShell({ children, locale }: { children: React.ReactNode; locale: 'it' | 'en' }) {
  const pathname = usePathname();
  const isLanding = pathname.includes('/landing/');

  return (
    <>
      {!isLanding && <Navbar />}
      <main>{children}</main>
      {!isLanding && <Footer locale={locale} />}
    </>
  );
}
