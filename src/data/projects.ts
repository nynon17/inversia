// ===========================================
// KONFIGURACJA ALBUMÓW - UZUPEŁNIJ NAZWY
// ===========================================
// Zdjęcia wrzuć do: src/assets/projects/
// 
// NAZEWNICTWO ZDJĘĆ:
// - projekt-1-1.jpg, projekt-1-2.jpg, projekt-1-3.jpg (album 1)
// - projekt-2-1.jpg, projekt-2-2.jpg, projekt-2-3.jpg (album 2)
// - projekt-3-1.jpg, projekt-3-2.jpg (album 3)
// - projekt-4-1.jpg, projekt-4-2.jpg (album 4)
//
// Pierwsze zdjęcie (np. projekt-1-1.jpg) będzie okładką albumu.
// ===========================================

export interface Album {
  id: number;
  title: {
    pl: string;
    en: string;
    de: string;
  };
  images: string[];
}

// Funkcja do importowania zdjęć z folderu projects
const projectImages = import.meta.glob('/src/assets/projects/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });

// Grupowanie zdjęć po numerze projektu
const getProjectImages = (projectNumber: number): string[] => {
  const prefix = `projekt-${projectNumber}-`;
  return Object.entries(projectImages)
    .filter(([path]) => path.includes(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
};

// ALBUMY - UZUPEŁNIJ NAZWY PROJEKTÓW
export const albums: Album[] = [
  {
    id: 1,
    title: {
      pl: '', // np. 'Mieszkanie na Mokotowie'
      en: '', // np. 'Apartment in Mokotów'
      de: '', // np. 'Wohnung in Mokotów'
    },
    images: getProjectImages(1),
  },
  {
    id: 2,
    title: {
      pl: '', // Uzupełnij nazwę projektu
      en: '',
      de: '',
    },
    images: getProjectImages(2),
  },
  {
    id: 3,
    title: {
      pl: '', // Uzupełnij nazwę projektu
      en: '',
      de: '',
    },
    images: getProjectImages(3),
  },
  {
    id: 4,
    title: {
      pl: '', // Uzupełnij nazwę projektu
      en: '',
      de: '',
    },
    images: getProjectImages(4),
  },
];
