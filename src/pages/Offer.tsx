import { useLang } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrencyRates, formatPriceWithConversion } from '@/hooks/useCurrencyRates';

const packageKeys = ['basic', 'premium', 'consultation', 'custom'] as const;

// Pakiety z cenami w PLN
interface Package {
  name: Record<string, string>;
  pricePLN: number | null; // null = wycena indywidualna
  unit: 'm2' | 'hour' | 'custom';
  featured: boolean;
  features: Record<string, string[]>;
}

const packagesData: Package[] = [
  {
    name: { pl: 'Pakiet Podstawowy', en: 'Basic Package', de: 'Basispaket' },
    pricePLN: 70,
    unit: 'm2',
    featured: false,
    features: {
      pl: [
        'Pełny projekt wnętrza',
        'Konsultacja',
        'Rzut 2D',
        'Wizualizacje 3D',
        '3 korekty',
        'Opis projektu + wskazówki do realizacji (prezentacja)',
      ],
      en: [
        'Full interior design',
        'Consultation',
        '2D floor plan',
        '3D visualizations',
        '3 revisions',
        'Project description + implementation guidelines (presentation)',
      ],
      de: [
        'Vollständige Innenraumgestaltung',
        'Beratung',
        '2D-Grundriss',
        '3D-Visualisierungen',
        '3 Korrekturen',
        'Projektbeschreibung + Umsetzungshinweise (Präsentation)',
      ],
    },
  },
  {
    name: { pl: 'Pakiet Premium', en: 'Premium Package', de: 'Premium-Paket' },
    pricePLN: 130,
    unit: 'm2',
    featured: true,
    features: {
      pl: [
        'Pełny projekt wnętrza',
        'Konsultacja',
        'Rzut 2D',
        'Wizualizacje 3D',
        '3 korekty',
        'Opis projektu + wskazówki do realizacji (prezentacja)',
        'Lista zakupów dopasowana do budżetu',
        'Materiały, kolorystyka, zamienniki, moodboard',
        'Dokładny opis projektu',
        'Wsparcie i zmiany na każdym etapie',
        'Rabaty do 15% na zakup wyposażenia wnętrz',
      ],
      en: [
        'Full interior design',
        'Consultation',
        '2D floor plan',
        '3D visualizations',
        '3 revisions',
        'Project description + implementation guidelines (presentation)',
        'Shopping list tailored to budget',
        'Materials, colors, alternatives, moodboard',
        'Detailed project description',
        'Support and changes at every stage',
        'Up to 15% discounts on interior furnishings',
      ],
      de: [
        'Vollständige Innenraumgestaltung',
        'Beratung',
        '2D-Grundriss',
        '3D-Visualisierungen',
        '3 Korrekturen',
        'Projektbeschreibung + Umsetzungshinweise (Präsentation)',
        'Einkaufsliste angepasst an das Budget',
        'Materialien, Farben, Alternativen, Moodboard',
        'Detaillierte Projektbeschreibung',
        'Unterstützung und Änderungen in jeder Phase',
        'Bis zu 15% Rabatt auf Einrichtungsgegenstände',
      ],
    },
  },
  {
    name: { pl: 'Konsultacja', en: 'Consultation', de: 'Beratung' },
    pricePLN: 100,
    unit: 'hour',
    featured: false,
    features: {
      pl: [
        'Konsultacja online',
        'Możliwość wysłania zdjęć / planu przed spotkaniem',
        'Konkretne porady dot. układu, kolorystyki i stylu',
        'Podsumowanie w formie prezentacji',
      ],
      en: [
        'Online consultation',
        'Option to send photos / floor plan before the meeting',
        'Specific advice on layout, colors and style',
        'Summary in presentation format',
      ],
      de: [
        'Online-Beratung',
        'Möglichkeit, Fotos / Grundriss vor dem Treffen zu senden',
        'Konkrete Tipps zu Layout, Farben und Stil',
        'Zusammenfassung als Präsentation',
      ],
    },
  },
  {
    name: { pl: 'Pakiet Spersonalizowany', en: 'Custom Package', de: 'Individuelles Paket' },
    pricePLN: null,
    unit: 'custom',
    featured: false,
    features: {
      pl: [
        'Zakres ustalany na podstawie potrzeb klienta',
        'Dla nietypowych przestrzeni lub szczególnych wymagań',
        'Dopasowany pakiet dokumentów i wizualizacji',
        'Elastyczne warunki współpracy',
      ],
      en: [
        'Scope determined based on client needs',
        'For unusual spaces or special requirements',
        'Customized set of documents and visualizations',
        'Flexible collaboration terms',
      ],
      de: [
        'Umfang wird nach Kundenbedürfnissen festgelegt',
        'Für ungewöhnliche Räume oder besondere Anforderungen',
        'Maßgeschneidertes Dokumenten- und Visualisierungspaket',
        'Flexible Zusammenarbeitsbedingungen',
      ],
    },
  },
];

const Offer = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { convertPrice, loading } = useCurrencyRates();

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('offer.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packagesData.map((pkg, i) => (
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
              <h2 className="font-serif text-xl mb-2">{pkg.name[lang] || pkg.name.en}</h2>
              <p className="text-2xl font-sans font-semibold text-primary mb-6">
                {loading ? '...' : formatPriceWithConversion(pkg.pricePLN, pkg.unit, lang, convertPrice)}
              </p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {(pkg.features[lang] || pkg.features.en)?.map((feature: string, j: number) => (
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
