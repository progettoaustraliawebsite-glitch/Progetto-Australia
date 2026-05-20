'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface NavbarContextValue {
  darkHero: boolean;
  setDarkHero: (v: boolean) => void;
}

const NavbarContext = createContext<NavbarContextValue>({
  darkHero: false,
  setDarkHero: () => {},
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [darkHero, setDarkHero] = useState(false);
  const set = useCallback((v: boolean) => setDarkHero(v), []);
  return (
    <NavbarContext.Provider value={{ darkHero, setDarkHero: set }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}

/**
 * Drop this anywhere inside a page that has a dark hero at the top.
 * It sets darkHero=true on mount and resets to false on unmount (page change).
 */
export function DarkHeroNavbar() {
  const { setDarkHero } = useNavbarContext();
  useEffect(() => {
    setDarkHero(true);
    return () => setDarkHero(false);
  }, [setDarkHero]);
  return null;
}
