import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';
import ProjectModal from '@/components/ProjectModal';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

type Category = 'all' | 'apartment' | 'house' | 'office' | 'commercial' | 'thematic';

interface Project {
  title: string;
  description: string;
  scope: string;
  image: string;
  category: Category;
}

const projectsData: Record<string, Project[]> = {
  pl: [
    { title: 'Mieszkanie na Mokotowie', description: 'Jasne, minimalistyczne wnętrze z oliwkowymi akcentami.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio1, category: 'apartment' },
    { title: 'Dom pod Berlinem', description: 'Skandynawska sypialnia z naturalnymi materiałami.', scope: 'Koncepcja, wizualizacje', image: portfolio2, category: 'house' },
    { title: 'Loft na Pradze', description: 'Kuchnia w stylu industrial z cegłą i metalem.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio3, category: 'apartment' },
    { title: 'Gabinet w Wiedniu', description: 'Elegancki gabinet w stylu modern classic.', scope: 'Koncepcja, wizualizacje', image: portfolio4, category: 'office' },
    { title: 'Restauracja japońska', description: 'Przestrzeń inspirowana tradycyjnym japandi.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio5, category: 'thematic' },
    { title: 'Łazienka premium', description: 'Minimalistyczna łazienka z marmurowym wykończeniem.', scope: 'Wizualizacje, dobór materiałów', image: portfolio6, category: 'apartment' },
    { title: 'Mieszkanie w Monachium', description: 'Ciepły minimalizm z drewnianymi detalami.', scope: 'Koncepcja, wizualizacje', image: portfolio2, category: 'apartment' },
    { title: 'Biuro coworkingowe', description: 'Funkcjonalna przestrzeń do pracy zespołowej.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio1, category: 'office' },
    { title: 'Dom jednorodzinny, Kraków', description: 'Projekt salonu z jadalnią w stylu boho.', scope: 'Koncepcja, wizualizacje', image: portfolio5, category: 'house' },
    { title: 'Salon kosmetyczny', description: 'Luksusowe wnętrze lokalu usługowego.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio6, category: 'commercial' },
    { title: 'Apartament wakacyjny', description: 'Bright, airy interior near the seaside.', scope: 'Koncepcja, wizualizacje', image: portfolio3, category: 'apartment' },
    { title: 'Showroom meblowy', description: 'Przestrzeń wystawiennicza z podziałem na strefy.', scope: 'Koncepcja, wizualizacje, dobór materiałów', image: portfolio4, category: 'commercial' },
  ],
  en: [
    { title: 'Apartment in Mokotów', description: 'Bright, minimalist interior with olive accents.', scope: 'Concept, visualizations, material selection', image: portfolio1, category: 'apartment' },
    { title: 'House near Berlin', description: 'Scandinavian bedroom with natural materials.', scope: 'Concept, visualizations', image: portfolio2, category: 'house' },
    { title: 'Loft in Praga district', description: 'Industrial-style kitchen with brick and metal.', scope: 'Concept, visualizations, material selection', image: portfolio3, category: 'apartment' },
    { title: 'Office in Vienna', description: 'Elegant modern classic office space.', scope: 'Concept, visualizations', image: portfolio4, category: 'office' },
    { title: 'Japanese restaurant', description: 'Space inspired by traditional japandi style.', scope: 'Concept, visualizations, material selection', image: portfolio5, category: 'thematic' },
    { title: 'Premium bathroom', description: 'Minimalist bathroom with marble finishes.', scope: 'Visualizations, material selection', image: portfolio6, category: 'apartment' },
    { title: 'Apartment in Munich', description: 'Warm minimalism with wooden details.', scope: 'Concept, visualizations', image: portfolio2, category: 'apartment' },
    { title: 'Coworking office', description: 'Functional space for team collaboration.', scope: 'Concept, visualizations, material selection', image: portfolio1, category: 'office' },
    { title: 'Family house, Kraków', description: 'Living room with dining area in boho style.', scope: 'Concept, visualizations', image: portfolio5, category: 'house' },
    { title: 'Beauty salon', description: 'Luxurious commercial interior.', scope: 'Concept, visualizations, material selection', image: portfolio6, category: 'commercial' },
    { title: 'Holiday apartment', description: 'Bright, airy interior near the seaside.', scope: 'Concept, visualizations', image: portfolio3, category: 'apartment' },
    { title: 'Furniture showroom', description: 'Exhibition space with zone divisions.', scope: 'Concept, visualizations, material selection', image: portfolio4, category: 'commercial' },
  ],
  de: [
    { title: 'Wohnung in Mokotów', description: 'Helles, minimalistisches Interieur mit Olivakzenten.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio1, category: 'apartment' },
    { title: 'Haus bei Berlin', description: 'Skandinavisches Schlafzimmer mit natürlichen Materialien.', scope: 'Konzept, Visualisierungen', image: portfolio2, category: 'house' },
    { title: 'Loft im Praga-Viertel', description: 'Küche im Industrial-Stil mit Ziegel und Metall.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio3, category: 'apartment' },
    { title: 'Büro in Wien', description: 'Eleganter Modern-Classic Büroraum.', scope: 'Konzept, Visualisierungen', image: portfolio4, category: 'office' },
    { title: 'Japanisches Restaurant', description: 'Raum inspiriert vom traditionellen Japandi-Stil.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio5, category: 'thematic' },
    { title: 'Premium-Badezimmer', description: 'Minimalistisches Bad mit Marmoroberflächen.', scope: 'Visualisierungen, Materialauswahl', image: portfolio6, category: 'apartment' },
    { title: 'Wohnung in München', description: 'Warmer Minimalismus mit Holzdetails.', scope: 'Konzept, Visualisierungen', image: portfolio2, category: 'apartment' },
    { title: 'Coworking-Büro', description: 'Funktionaler Raum für Teamarbeit.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio1, category: 'office' },
    { title: 'Einfamilienhaus, Kraków', description: 'Wohnzimmer mit Essbereich im Boho-Stil.', scope: 'Konzept, Visualisierungen', image: portfolio5, category: 'house' },
    { title: 'Kosmetiksalon', description: 'Luxuriöses Gewerbeinterieur.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio6, category: 'commercial' },
    { title: 'Ferienwohnung', description: 'Helles, luftiges Interieur am Meer.', scope: 'Konzept, Visualisierungen', image: portfolio3, category: 'apartment' },
    { title: 'Möbel-Showroom', description: 'Ausstellungsraum mit Zoneneinteilung.', scope: 'Konzept, Visualisierungen, Materialauswahl', image: portfolio4, category: 'commercial' },
  ],
};

const filterKeys: Category[] = ['all', 'apartment', 'house', 'office', 'commercial', 'thematic'];

const Portfolio = () => {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = projectsData[lang] || projectsData.pl;
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const filters = (translations as any)[lang]?.portfolio?.filters || {};

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-10">{t('portfolio.title')}</h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-xs font-sans tracking-wide border ${
                filter === key
                  ? 'border-foreground text-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {filters[key] || key}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <button
              key={i}
              onClick={() => setSelectedProject(project)}
              className="text-left group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <h3 className="text-sm font-sans font-medium mt-3 group-hover:text-primary">{project.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
              <p className="text-xs text-muted-foreground mt-1 italic">{project.scope}</p>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
};

export default Portfolio;
