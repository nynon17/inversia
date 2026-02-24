import { useLang } from '@/contexts/LanguageContext';
import { Check, Home, Sparkles, Building2, Compass, BedDouble, Key, Info } from 'lucide-react';
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

        {/* Rodzaje projektowanych wnętrz */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-10">
            {lang === 'pl' ? 'Rodzaje projektowanych wnętrz' : lang === 'de' ? 'Arten von Innenräumen' : 'Types of Interior Design'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <Home className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Mieszkalne' : lang === 'de' ? 'Wohnräume' : 'Residential'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Pojedyncze pomieszczenia, całe mieszkania i domy.' 
                    : lang === 'de' 
                    ? 'Einzelne Räume, ganze Wohnungen und Häuser.' 
                    : 'Single rooms, entire apartments and houses.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Przestrzenie tematyczne' : lang === 'de' ? 'Themenräume' : 'Themed Spaces'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Sexroom, schron, męska jaskinia, kobieca przestrzeń, pokój do medytacji, garderoba, dziecięcy i inne nietypowe wnętrza.'
                    : lang === 'de' 
                    ? 'Sexroom, Männerhöhle, Unterschlupf, Frauenraum, Meditationsraum, Ankleidezimmer, Kinderzimmer und andere ungewöhnliche Innenräume.'
                    : 'Sexroom, man cave, vault, female space, meditation room, dressing room, children\'s room and other unique interiors.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Wnętrza komercyjne' : lang === 'de' ? 'Gewerberäume' : 'Commercial Interiors'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Lokale gastronomiczne, gabinety kosmetyczne, biura, przestrzenie wspólne i inne przestrzenie użytkowe.' 
                    : lang === 'de' 
                    ? 'Gastronomiebetriebe, Kosmetikstudios, Büros, Gemeinschaftsräume und andere Nutzräume.' 
                    : 'Restaurants, beauty salons, offices, common areas and other commercial spaces.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <Compass className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Unikalne przestrzenie' : lang === 'de' ? 'Einzigartige Räume' : 'Unique Spaces'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Balkony, tarasy, kampery, jachty, domki letniskowe i inne nietypowe projekty.' 
                    : lang === 'de' 
                    ? 'Balkone, Terrassen, Wohnmobile, Yachten, Ferienhäuser und andere ungewöhnliche Projekte.' 
                    : 'Balconies, terraces, campers, yachts, summer houses and other unusual projects.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <BedDouble className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Miejsca na wynajem i hotelowe' : lang === 'de' ? 'Miet- und Hotelräume' : 'Rental & Hotel Spaces'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Apartamenty na wynajem krótkoterminowy, hotele, pensjonaty, hostele i inne przestrzenie przeznaczone dla gości.' 
                    : lang === 'de' 
                    ? 'Kurzzeit-Mietwohnungen, Hotels, Pensionen, Hostels und andere Gästeräume.' 
                    : 'Short-term rental apartments, hotels, guesthouses, hostels and other guest spaces.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded-lg">
              <Key className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">
                  {lang === 'pl' ? 'Na sprzedaż lub wynajem' : lang === 'de' ? 'Zum Verkauf oder zur Miete' : 'For Sale or Rent'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'pl' 
                    ? 'Projekty przygotowane pod sprzedaż lub wynajem, dostosowane do oczekiwań przyszłych nabywców lub najemców.' 
                    : lang === 'de' 
                    ? 'Projekte für Verkauf oder Vermietung, angepasst an die Erwartungen zukünftiger Käufer oder Mieter.' 
                    : 'Projects prepared for sale or rent, tailored to the expectations of future buyers or tenants.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dodatkowe informacje */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-10">
            {lang === 'pl' ? 'Dodatkowe informacje' : lang === 'de' ? 'Zusätzliche Informationen' : 'Additional Information'}
          </h2>

          <div className="space-y-4">
            {[
              {
                pl: 'Ceny dotyczą metrażu powyżej 10 m². W przypadku mniejszych pomieszczeń cena ustalana jest indywidualnie.',
                en: 'Prices apply to spaces larger than 10 m². For smaller rooms, pricing is determined individually.',
                de: 'Die Preise gelten für Flächen über 10 m². Bei kleineren Räumen wird der Preis individuell festgelegt.',
              },
              {
                pl: 'Umożliwiam wykorzystanie elementów, które klient już posiada. Pomagam dopasować je do nowej aranżacji oraz doradzam, w jaki sposób można je odświeżyć, zmienić lub poddać renowacji.',
                en: 'I enable the use of elements that the client already owns. I help integrate them into the new design and advise on how they can be refreshed, modified, or renovated.',
                de: 'Ich ermögliche die Nutzung von Elementen, die der Kunde bereits besitzt. Ich helfe, diese in das neue Konzept zu integrieren und berate, wie sie aufgefrischt, verändert oder renoviert werden können.',
              },
              {
                pl: 'Proponuję kreatywne rozwiązania DIY, które nadają wnętrzu unikalny i indywidualny charakter.',
                en: 'I suggest creative DIY solutions that give the interior a unique and individual character.',
                de: 'Ich schlage kreative DIY-Lösungen vor, die dem Innenraum einen einzigartigen und individuellen Charakter verleihen.',
              },
              {
                pl: 'Każdą współpracę rozpoczynam od rozmowy wstępnej, wliczonej w cenę usługi. W przypadku rezygnacji pierwsza godzina konsultacji pozostaje bezpłatna.',
                en: 'Each collaboration begins with an initial consultation included in the service price. If the client decides not to proceed, the first hour remains free of charge.',
                de: 'Jede Zusammenarbeit beginnt mit einem im Preis enthaltenen Erstgespräch. Entscheidet sich der Kunde gegen eine Zusammenarbeit, bleibt die erste Stunde kostenlos.',
              },
              {
                pl: 'Każdy projekt dostosowuję do indywidualnego stylu życia klienta, dbając o komfort, funkcjonalność oraz estetykę przestrzeni.',
                en: 'I tailor each project to the client’s individual lifestyle, ensuring comfort, functionality, and refined aesthetics.',
                de: 'Ich passe jedes Projekt an den individuellen Lebensstil des Kunden an und achte dabei auf Komfort, Funktionalität und eine hochwertige Ästhetik.',
              },
              {
                pl: 'Czas realizacji uzależniony jest od stopnia skomplikowania projektu oraz liczby niezbędnych korekt. Średnio 7–10 dni na jedno pomieszczenie.',
                en: 'The completion time depends on the project’s complexity and the number of required revisions. On average, 7–10 days per room.',
                de: 'Die Umsetzungszeit hängt vom Projektumfang und der Anzahl erforderlicher Korrekturen ab. Durchschnittlich 7–10 Tage pro Raum.',
              },
              {
                pl: 'Podczas realizacji projektu pozostaję w stałym kontakcie z klientem.',
                en: 'During the project, I remain in constant contact with the client.',
                de: 'Während der Projektumsetzung bleibe ich in ständigem Kontakt mit dem Kunden.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{item[lang as keyof typeof item] || item.en}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Offer;
