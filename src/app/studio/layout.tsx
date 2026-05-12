export const metadata = {
  title: 'Sanity Studio — Progetto Australia',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
