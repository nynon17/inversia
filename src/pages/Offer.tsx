import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';

const Offer = () => {
  const { t, lang } = useLang();

  const packages = (() => {
    const pkgs = (translations as any)[lang]?.offer?.packages;
    return Array.isArray(pkgs) ? pkgs : [];
  })();

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('offer.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg: any, i: number) => (
            <div key={i} className="border border-border p-8 flex flex-col">
              <h2 className="font-serif text-xl mb-2">{pkg.name}</h2>
              <p className="text-lg font-sans font-medium text-primary mb-4">{pkg.price}</p>
              <p className="text-xs text-muted-foreground mb-3">{pkg.forWho}</p>
              <p className="text-sm text-foreground mb-2">{pkg.includes}</p>
              <p className="text-xs text-muted-foreground mb-6">{pkg.deliverables}</p>
              <div className="mt-auto">
                <Link
                  to="/contact"
                  className="bg-primary text-primary-foreground px-6 py-3 text-sm font-sans tracking-wide hover:opacity-90 inline-block"
                >
                  {t('offer.cta')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Offer;
