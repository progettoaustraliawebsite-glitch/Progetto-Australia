const logos = [
  { src: '/images/logos/aussie-specialist.png', alt: 'Aussie Specialist' },
  { src: '/images/logos/nz-specialist.png', alt: '100% Pure New Zealand Specialist' },
  { src: '/images/logos/fiji-specialist.png', alt: 'Matai Fiji Programme' },
  { src: '/images/logos/cook-specialist.png', alt: 'Cook Islands Specialist' },
  { src: '/images/logos/west-aussie-specialist.png', alt: 'West Aussie All Stars' },
  { src: '/images/logos/travellife-partner.png', alt: 'Travelife Partner' },
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
