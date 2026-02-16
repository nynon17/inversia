import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { albums, Album } from '@/data/projects';
import { facebookPostUrls } from '@/data/facebookPosts';
import FacebookPost from '@/components/FacebookPost';

const Portfolio = () => {
  const { t, lang } = useLang();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openAlbum = (album: Album) => {
    if (album.images.length > 0) {
      setSelectedAlbum(album);
      setCurrentImageIndex(0);
    }
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => 
        prev < selectedAlbum.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedAlbum.images.length - 1
      );
    }
  };

  // Filtruj albumy które mają zdjęcia
  const albumsWithImages = albums.filter(album => album.images.length > 0);

  const placeholderText: Record<string, string> = {
    pl: 'Brak zdjęć - dodaj zdjęcia do src/assets/projects/',
    en: 'No images - add images to src/assets/projects/',
    de: 'Keine Bilder - fügen Sie Bilder zu src/assets/projects/ hinzu',
  };

  const projectLabel: Record<string, string> = {
    pl: 'Projekt',
    en: 'Project',
    de: 'Projekt',
  };

  const facebookSectionTitle: Record<string, string> = {
    pl: 'Realizacje z Facebooka',
    en: 'Projects from Facebook',
    de: 'Projekte von Facebook',
  };

  const fullPortfolioButton: Record<string, string> = {
    pl: 'Pełne portfolio',
    en: 'Full portfolio',
    de: 'Vollständiges Portfolio',
  };

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-10">{t('portfolio.title')}</h1>

        {/* Sekcja postów z Facebooka */}
        {facebookPostUrls.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-serif text-center mb-8">{facebookSectionTitle[lang]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
              {facebookPostUrls.map((url, index) => (
                <FacebookPost key={index} url={url} width={450} />
              ))}
            </div>
          </section>
        )}

        {/* Przycisk do pełnego portfolio na Instagramie */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/inversia.spatialdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram size={20} />
            {fullPortfolioButton[lang]}
          </a>
        </div>
      </div>

      {/* Lightbox / Gallery Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={closeAlbum}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-5xl max-h-[85vh] px-16">
            <img
              src={selectedAlbum.images[currentImageIndex]}
              alt={`${selectedAlbum.title[lang as keyof typeof selectedAlbum.title]} - ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            <div className="text-center mt-4">
              <p className="text-white font-serif text-lg">
                {selectedAlbum.title[lang as keyof typeof selectedAlbum.title] || `${projectLabel[lang]} ${selectedAlbum.id}`}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {currentImageIndex + 1} / {selectedAlbum.images.length}
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
            {selectedAlbum.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-16 h-12 ${
                  idx === currentImageIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Portfolio;
