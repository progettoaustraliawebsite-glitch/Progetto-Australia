'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { blogPosts } from '@/data/blog';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, Info, FileText, CloudSun, Bus, Globe, Shirt, Zap, Coins } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const locale = useLocale() as 'it' | 'en';
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div className="pt-40 text-center text-charcoal font-serif text-2xl">Post non trovato</div>;

  const content = post.content[locale];

  // Helper per assegnare icone alle sezioni
  const getIcon = (id: string) => {
    switch (id) {
      case 'documenti': return <FileText size={24} className="text-gold" />;
      case 'quando-andare': return <CloudSun size={24} className="text-gold" />;
      case 'clima': return <CloudSun size={24} className="text-gold" />;
      case 'trasporti': return <Bus size={24} className="text-gold" />;
      case 'lingua-moneta': return <Coins size={24} className="text-gold" />;
      case 'abbigliamento': return <Shirt size={24} className="text-gold" />;
      case 'elettricita': return <Zap size={24} className="text-gold" />;
      default: return <Info size={24} className="text-gold" />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-end">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title[locale]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-hero/95 via-hero/20 to-transparent" />
        </div>
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors mb-8 text-xs uppercase tracking-[0.2em] font-bold">
            <ChevronLeft size={16} /> Torna alle Guide
          </Link>
          <div className="max-w-4xl">
            <span className="bg-gold text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block shadow-lg">
              {post.category[locale]}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {post.title[locale]}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Content Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Intro Integrale con Formattazione */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg text-charcoal/80 leading-relaxed font-sans space-y-6">
                {content.intro.split('\n\n').map((para, i) => (
                  <p key={i} className={i === 0 ? "text-xl font-serif italic border-l-4 border-gold pl-8 py-2 text-charcoal" : ""}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Renderizziamo ogni sezione come una "Card Informativa" elegante */}
            {content.sections.map((section) => (
              <div key={section.id} id={section.id} className="pt-4 scroll-mt-32">
                <div className="bg-sand/10 rounded-3xl p-8 md:p-12 border border-sand/30 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      {getIcon(section.id)}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal uppercase tracking-widest">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="text-charcoal/70 leading-relaxed font-sans whitespace-pre-line text-sm md:text-base">
                    {/* Rendiamo bold alcune parole chiave dinamicamente o tramite formattazione manuale nel testo */}
                    {section.content.split('\n').map((line, idx) => {
                      // Semplice logica per mettere in bold i titoli interni (es. AEREO:, MONETA LOCALE:)
                      if (line.includes(': ')) {
                        const [title, rest] = line.split(': ');
                        return (
                          <p key={idx} className="mb-4">
                            <strong className="text-charcoal font-bold">{title}:</strong> {rest}
                          </p>
                        );
                      }
                      return <p key={idx} className="mb-4">{line}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Column (Index) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-charcoal p-10 rounded-3xl border border-gold/20 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16" />
                
                <h3 className="font-serif text-xl font-bold text-gold mb-8 uppercase tracking-widest flex items-center gap-2 relative z-10">
                  <Globe size={20} /> Indice Guida
                </h3>
                
                <nav className="relative z-10">
                  <ul className="space-y-5">
                    {content.sections.map((section, idx) => (
                      <li key={section.id}>
                        <a 
                          href={`#${section.id}`} 
                          className="text-white/50 hover:text-gold font-bold transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] group"
                        >
                          <span className="w-6 h-px bg-gold/20 group-hover:w-10 transition-all" />
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
                  <p className="text-xs text-white/40 italic mb-8 leading-relaxed">
                    Organizziamo viaggi di gruppo e individuali in tutta la Nuova Zelanda.
                  </p>
                  <Link 
                    href="/quote"
                    className="block w-full bg-gold text-white text-center py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-charcoal transition-all shadow-xl shadow-gold/20"
                  >
                    Richiedi Preventivo
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
