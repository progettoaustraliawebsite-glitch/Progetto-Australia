const logos = [
  { src: '/images/logos/aussie-specialist.webp', alt: 'Aussie Specialist' },
  { src: '/images/logos/nz-specialist.webp', alt: '100% Pure New Zealand Specialist' },
  { src: '/images/logos/fiji-specialist.webp', alt: 'Matai Fiji Programme' },
  { src: '/images/logos/cook-specialist.webp', alt: 'Cook Islands Specialist' },
  { src: '/images/logos/west-aussie-specialist.webp', alt: 'West Aussie All Stars' },
  { src: '/images/logos/travellife-partner.webp', alt: 'Travelife Partner' },
];

export default function CertificationsBanner() {
  return (
    <section className="border-t border-b border-stone-100 bg-stone-50/60 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-14 md:h-16 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
