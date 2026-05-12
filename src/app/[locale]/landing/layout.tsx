// Landing pages override the parent [locale]/layout.tsx — no Navbar, no Footer, no modals.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
