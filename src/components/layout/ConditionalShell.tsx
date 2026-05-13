'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname.includes('/landing/');

  return (
    <>
      {!isLanding && <Navbar />}
      <main>{children}</main>
      {!isLanding && <Footer />}
    </>
  );
}
