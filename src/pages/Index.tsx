import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { albums } from '@/data/projects';

const Index = () => {
  const { t, lang } = useLang();

  const stylesList = (() => {
    const items = (translations as any)[lang]?.stylesList;
    return Array.isArray(items) ? items : [];
  })();

  const collaborationSteps = (() => {
    const steps = (translations as any)[lang]?.collaboration?.steps;
    return Array.isArray(steps) ? steps : [];
  })();

  return (
    <main>
      {/* Hero */}
      <section className="py-24 md:py-36">
        <div className="container text-center">
          <h1 className="text-5xl md:text-7xl font-serif tracking-[0.15em] font-light mb-6">
            INVERSIA
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-10">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/offer"
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-sans tracking-wide hover:opacity-90"
            >
              {t('hero.cta_offer')}
            </Link>
            <Link
              to="/contact"
              className="border border-foreground text-foreground px-8 py-3 text-sm font-sans tracking-wide hover:bg-foreground hover:text-background"
            >
              {t('hero.cta_contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">{t('forWho.title')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('forWho.desc')}</p>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 flex justify-center align-bottom items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 className="lucide lucide-sparkles w-6 h-6 text-primary flex-shrink-0 mt-1">
              <path
                  d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            <span className="ml-2">{t('specializations.title')}</span>
            </h2>
          <p className="text-sm text-muted-foreground">{t('specializations.items')}</p>
        </div>
      </section>

      {/* Styles */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">{t('styles.title')}</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {stylesList.map((style: string) => (
                <span
                    key={style}
                    className="px-4 py-2 text-xs font-sans tracking-wide border border-border text-muted-foreground"
                >
                {style}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">{t('collaboration.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationSteps.map((step: { title: string; desc: string }, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-serif text-primary mb-2">{i + 1}</p>
                <h3 className="font-sans text-sm font-medium mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">{t('portfolioTeaser.title')}</h2>
          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="border border-foreground text-foreground px-8 py-3 text-sm font-sans tracking-wide hover:bg-foreground hover:text-background inline-block"
            >
              {t('portfolioTeaser.cta')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

// Need to import translations for direct access
import { translations } from '@/i18n/translations';
