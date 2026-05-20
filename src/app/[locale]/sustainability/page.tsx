import { getLocale } from 'next-intl/server';
import { ExternalLink, Leaf, Heart, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isIT = locale === 'it';
  const title = isIT ? 'Sostenibilità – Il Turismo Responsabile di Progetto Australia' : 'Sustainability – Responsible Travel at Progetto Australia';
  const description = isIT
    ? 'Il nostro impegno per un turismo sostenibile: certificazione Travelife, riduzione dell\'impatto ambientale, supporto alle comunità locali in Australia e Oceania.'
    : 'Our commitment to sustainable tourism: Travelife certification, reducing environmental impact, and supporting local communities across Australia and Oceania.';
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/sustainability` },
    twitter: { title, description },
  };
}

const copy = {
  it: {
    heroLabel: 'Il Nostro Impegno',
    heroTitle: 'Sostenibilità',
    acknowledgement: 'Progetto Australia riconosce i proprietari tradizionali del paese in tutta l\'Australia e il loro continuo legame con la terra, le acque e la comunità. Rendiamo omaggio alle persone, alle culture e agli Anziani passati e presenti.',
    missionLabel: 'Mission Statement',
    missionText: 'Noi di Progetto Australia ci impegniamo a integrare pratiche responsabili dal punto di vista ambientale in ogni aspetto delle nostre operazioni. La nostra missione è creare esperienze di viaggio indimenticabili che non solo mostrino la bellezza e la diversità dell\'Australia, della Nuova Zelanda e delle Isole del Pacifico, ma promuovano anche un profondo rispetto per l\'ambiente. Il nostro impegno comprende un approccio olistico alla sostenibilità a vantaggio sia delle persone che del pianeta.',
    missionText2: 'A Progetto Australia sappiamo che viaggiare è vivere, crescere, sognare. Per noi viaggiare è anche rispettare, proteggere, amare. La sostenibilità è uno stile di vita, un modo di viaggiare, di essere, di sentire che vogliamo condividere con tutti i nostri viaggiatori.',
    ecoTitle: 'Come promuoviamo l\'ecoturismo',
    travelifeTitle: 'Travelife Partner Award',
    travelifeText: 'Il premio Travelife Partner è un riconoscimento del nostro impegno verso la sostenibilità sociale e ambientale. Rispettiamo più di 100 criteri relativi alla gestione della sostenibilità, alle operazioni d\'ufficio, al lavoro con i fornitori e alla comunicazione con i clienti. Travelife è un programma di certificazione in tre fasi: (1) Travelife Engaged; (2) Travelife Partner; (3) Certificato Travelife. Siamo alla fase 2 – Travelife Partner.',
    travelifeLink: 'Visualizza il nostro certificato',
    conductTitle: 'Codice di Condotta Sostenibile',
    conductText: 'La trasparenza è fondamentale per noi. Abbiamo reso pubblico il nostro codice di condotta sulla sostenibilità, che condividiamo con i nostri partner locali e con i nostri clienti per rafforzare gli impegni presi a protezione dell\'ambiente e delle comunità.',
    conductLink: 'Leggi il Code of Conduct',
    carbonTitle: 'Impronta di Carbonio',
    carbonText: 'Viaggia in Australia con coscienza e lascia un segno positivo. Compensando le emissioni del tuo viaggio, potrai goderti la bellezza di questo paese con la consapevolezza di aver contribuito a proteggerlo.',
    carbonLink: 'Scopri come compensare le emissioni',
    projectsTitle: 'Progetti che Sosteniamo',
    project1Title: 'Still I Rise',
    project1Text: 'La nostra partnership con Still I Rise riflette la nostra convinzione che l\'istruzione sia un diritto umano fondamentale. Questa ONG internazionale opera in contesti difficili — inclusi i campi profughi — per offrire istruzione di alta qualità e protezione a bambini vulnerabili.',
    project2Title: 'Association of Volunteer Missionaries (Zambia)',
    project2Text: 'Supportiamo questa organizzazione in prima linea nello sviluppo locale, concentrandosi sull\'offerta di istruzione di qualità e servizi sanitari essenziali alle comunità rurali dello Zambia.',
    project3Title: 'Ambasciatori di "Thank You"',
    project3Text: 'Siamo ambasciatori di Thank You, impresa sociale dedicata a colmare il divario della povertà globale finanziando progetti che portano acqua potabile, servizi igienico-sanitari e sicurezza alimentare nelle aree più povere del mondo.',
    ctaTitle: 'Unisciti a Noi per Fare la Differenza',
    ctaText: 'Invitiamo i nostri viaggiatori a far parte di questo cammino. Per domande sulla nostra politica di sostenibilità, scrivici a:',
    ctaEmail: 'celia.progettoaustralia@gmail.com',
    policyLink: 'Leggi la Politica di Sostenibilità',
  },
  en: {
    heroLabel: 'Our Commitment',
    heroTitle: 'Sustainability',
    acknowledgement: 'Progetto Australia acknowledges the Traditional Owners of Country throughout Australia and their continuing connection to land, waters and community. We pay respect to people, cultures and Elders past and present.',
    missionLabel: 'Mission Statement',
    missionText: 'At Progetto Australia we are committed to integrating environmentally responsible practices into every aspect of our operations. Our mission is to create unforgettable travel experiences that not only showcase the beauty and diversity of Australia, New Zealand and the Pacific Islands, but also promote a deep respect for the environment. Our commitment goes beyond providing exceptional travel services — it encompasses a holistic approach to sustainability for the benefit of both people and the planet.',
    missionText2: 'At Progetto Australia we know that travelling means living, growing, dreaming. For us, travelling also means respecting, protecting and loving. Sustainability is a lifestyle, a way of travelling, of being and of feeling that we want to share with all our travellers.',
    ecoTitle: 'How We Promote Ecotourism',
    travelifeTitle: 'Travelife Partner Award',
    travelifeText: 'The Travelife Partner Award recognises our commitment to social and environmental sustainability. We meet over 100 criteria related to sustainability management, office operations, working with suppliers and communicating with clients. Travelife is a three-stage certification programme: (1) Travelife Engaged; (2) Travelife Partner; (3) Travelife Certified. We are at stage 2 – Travelife Partner.',
    travelifeLink: 'View our certificate',
    conductTitle: 'Sustainable Code of Conduct',
    conductText: 'Transparency is fundamental to us. We have made our sustainability code of conduct public. In this document, which we share with our local partners and clients, we reinforce the commitments we have made to protect the environment and Australian communities.',
    conductLink: 'Read the Code of Conduct',
    carbonTitle: 'Carbon Footprint',
    carbonText: 'Travel to Australia with a conscience and leave a positive mark. By offsetting the emissions from your trip to Australia, you can enjoy the beauty of this country knowing you have helped protect it.',
    carbonLink: 'Find out how to offset your emissions',
    projectsTitle: 'Projects We Support',
    project1Title: 'Still I Rise',
    project1Text: 'Our partnership with Still I Rise reflects our belief that education is a fundamental human right. This international NGO operates in some of the world\'s most challenging contexts — including refugee camps — to provide high-quality education and protection to vulnerable children.',
    project2Title: 'Association of Volunteer Missionaries (Zambia)',
    project2Text: 'We support this organisation at the forefront of local development, focusing on providing quality education and essential healthcare services to rural communities in Zambia.',
    project3Title: 'Ambassadors of "Thank You"',
    project3Text: 'We are ambassadors of Thank You, a social enterprise dedicated to bridging the global poverty gap by funding projects that bring clean water, sanitation and food security to the world\'s poorest areas.',
    ctaTitle: 'Join Us in Making a Difference',
    ctaText: 'We invite our travellers to be part of this journey. For any questions about our sustainability policy, write to us at:',
    ctaEmail: 'celia.progettoaustralia@gmail.com',
    policyLink: 'Read the Sustainability Policy',
  },
};

export default async function SustainabilityPage() {
  const locale = (await getLocale()) as 'it' | 'en';
  const c = copy[locale];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-hero overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/dest-australia.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero/60 via-transparent to-hero/80" />
        <div className="relative z-10 text-center px-6">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.4em] mb-4 block">
            {c.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 leading-none">
            {c.heroTitle}
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 space-y-20">

        {/* Acknowledgement of Country */}
        <section className="border-l-2 border-gold pl-8 py-2">
          <p className="text-hero/70 text-base leading-relaxed italic font-sans">
            {c.acknowledgement}
          </p>
          <a
            href="https://www.indigenous.gov.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs text-gold font-sans uppercase tracking-widest hover:underline"
          >
            indigenous.gov.au <ExternalLink size={12} />
          </a>
        </section>

        {/* Mission */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Leaf size={20} className="text-gold" />
            <h2 className="font-serif text-3xl font-bold text-hero">{c.missionLabel}</h2>
          </div>
          <div className="space-y-5 text-hero/70 leading-relaxed font-sans">
            <p>{c.missionText}</p>
            <p>{c.missionText2}</p>
          </div>
        </section>

        {/* Ecoturismo */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-hero mb-10">{c.ecoTitle}</h2>

          {/* Travelife */}
          <div className="bg-sand/40 p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <img
                src="/images/logos/travellife-partner.png"
                alt="Travelife Partner"
                className="h-16 w-auto object-contain shrink-0"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-hero mb-3">{c.travelifeTitle}</h3>
                <p className="text-hero/70 text-sm leading-relaxed font-sans mb-4">{c.travelifeText}</p>
                <a
                  href="/docs/travelife-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-gold font-sans uppercase tracking-widest hover:underline"
                >
                  {c.travelifeLink} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Conduct */}
          <div className="bg-sand/40 p-8 mb-8">
            <h3 className="font-serif text-xl font-bold text-hero mb-3">{c.conductTitle}</h3>
            <p className="text-hero/70 text-sm leading-relaxed font-sans mb-4">{c.conductText}</p>
            <a
              href="https://www.progettoaustralia.it/wp-content/uploads/2024/11/CODE-OF-CONDUCT-of-PROGETTO-AUSTRALIA-IT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-gold font-sans uppercase tracking-widest hover:underline"
            >
              {c.conductLink} <ExternalLink size={12} />
            </a>
          </div>

          {/* Carbon */}
          <div className="bg-sand/40 p-8">
            <h3 className="font-serif text-xl font-bold text-hero mb-3">{c.carbonTitle}</h3>
            <p className="text-hero/70 text-sm leading-relaxed font-sans mb-4">{c.carbonText}</p>
            <a
              href="https://www.reteclima.it/compensazione-co2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-gold font-sans uppercase tracking-widest hover:underline"
            >
              {c.carbonLink} <ExternalLink size={12} />
            </a>
          </div>
        </section>

        {/* Progetti */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Heart size={20} className="text-gold" />
            <h2 className="font-serif text-3xl font-bold text-hero">{c.projectsTitle}</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: c.project1Title, text: c.project1Text, href: 'https://www.stillirise.org/en' },
              { title: c.project2Title, text: c.project2Text, href: null },
              { title: c.project3Title, text: c.project3Text, href: 'https://thankyou.co/' },
            ].map((p) => (
              <div key={p.title} className="border-t border-sand pt-6">
                <h3 className="font-serif text-lg font-bold text-hero mb-2">{p.title}</h3>
                <p className="text-hero/70 text-sm leading-relaxed font-sans mb-3">{p.text}</p>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-gold font-sans uppercase tracking-widest hover:underline"
                  >
                    {p.href.replace('https://', '')} <ExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-hero text-white p-10 text-center">
          <Globe size={32} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold mb-4">{c.ctaTitle}</h2>
          <p className="text-white/70 mb-4 font-sans">{c.ctaText}</p>
          <a
            href={`mailto:${c.ctaEmail}`}
            className="text-gold font-sans text-sm hover:underline"
          >
            {c.ctaEmail}
          </a>
          <div className="mt-8">
            <a
              href="https://www.progettoaustralia.it/wp-content/uploads/2024/11/SUSTAINABILITY-POLICY-PROGETTO-AUSTRALIA-IT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 border border-gold text-gold text-xs font-sans uppercase tracking-widest hover:bg-gold hover:text-hero transition-all duration-300"
            >
              {c.policyLink} <ExternalLink size={13} />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
