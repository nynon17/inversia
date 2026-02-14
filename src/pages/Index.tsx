import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import Newsletter from '@/components/Newsletter';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const teaserProjects = [
  { image: portfolio1, titleKey: 'Salon minimalistyczny' },
  { image: portfolio2, titleKey: 'Sypialnia skandynawska' },
  { image: portfolio3, titleKey: 'Kuchnia loft' },
  { image: portfolio4, titleKey: 'Gabinet klasyczny' },
  { image: portfolio5, titleKey: 'Jadalnia japandi' },
  { image: portfolio6, titleKey: 'Łazienka modern' },
];

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
          <h2 className="text-2xl md:text-3xl font-serif mb-6">{t('specializations.title')}</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teaserProjects.map((project, i) => (
              <div key={i}>
                <img
                  src={project.image}
                  alt={project.titleKey}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground mt-2 font-sans">{project.titleKey}</p>
              </div>
            ))}
          </div>
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

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
};

export default Index;

// Need to import translations for direct access
import { translations } from '@/i18n/translations';
