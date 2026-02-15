import { useLang } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const packageKeys = ['basic', 'premium', 'consultation', 'custom'] as const;

const Offer = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const packages = (() => {
    const pkgs = (translations as any)[lang]?.offer?.packages;
    return Array.isArray(pkgs) ? pkgs : [];
  })();

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('offer.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg: any, i: number) => (
            <div 
              key={i} 
              className={`border p-8 flex flex-col ${
                pkg.featured ? 'border-primary border-2 relative' : 'border-border'
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium">
                  {lang === 'pl' ? 'Najczęściej wybierany' : lang === 'de' ? 'Am beliebtesten' : 'Most popular'}
                </span>
              )}
              <h2 className="font-serif text-xl mb-2">{pkg.name}</h2>
              <p className="text-2xl font-sans font-semibold text-primary mb-6">{pkg.price}</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features?.map((feature: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <button
                  onClick={() => navigate(`/order?package=${packageKeys[i]}`)}
                  className={`px-6 py-3 text-sm font-sans tracking-wide hover:opacity-90 inline-block w-full text-center cursor-pointer ${
                    pkg.featured 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors'
                  }`}
                >
                  {t('offer.cta')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Offer;
