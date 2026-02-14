import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';

interface Review {
  name: string;
  location: string;
  text: string;
}

const reviewsData: Record<string, Review[]> = {
  pl: [
    { name: 'Anna K.', location: 'Warszawa, PL', text: 'Projekt przekroczył moje oczekiwania. Profesjonalne podejście i świetna komunikacja na każdym etapie.' },
    { name: 'Thomas M.', location: 'Berlin, DE', text: 'Sehr professionell und kreativ. Die Zusammenarbeit online war unkompliziert und das Ergebnis wunderbar.' },
    { name: 'Katarzyna W.', location: 'Kraków, PL', text: 'Piękne wizualizacje, trafiony dobór materiałów. Polecam każdemu, kto szuka nowoczesnego wnętrza.' },
    { name: 'Maria S.', location: 'Wien, AT', text: 'Tolle Arbeit! Das Büro sieht genau so aus, wie ich es mir vorgestellt habe. Schnell und zuverlässig.' },
    { name: 'Piotr L.', location: 'Gdańsk, PL', text: 'Współpraca zdalna przebiegła bez problemów. Otrzymaliśmy kompletny projekt gotowy do realizacji.' },
    { name: 'Sophie R.', location: 'München, DE', text: 'Kreative Lösungen für unsere kleine Wohnung. Die Raumaufteilung ist jetzt viel besser.' },
    { name: 'Ewa D.', location: 'Wrocław, PL', text: 'Bardzo dobry kontakt, szybka realizacja. Styl japandi idealnie oddaje to, czego szukałam.' },
    { name: 'Lukas B.', location: 'Zürich, CH', text: 'Professional service from start to finish. The visualizations were incredibly realistic.' },
  ],
  en: [
    { name: 'Anna K.', location: 'Warsaw, PL', text: 'The project exceeded my expectations. Professional approach and great communication at every stage.' },
    { name: 'Thomas M.', location: 'Berlin, DE', text: 'Very professional and creative. Online collaboration was smooth and the result wonderful.' },
    { name: 'Katarzyna W.', location: 'Kraków, PL', text: 'Beautiful visualizations, perfect material selection. I recommend to anyone seeking modern interiors.' },
    { name: 'Maria S.', location: 'Vienna, AT', text: 'Great work! The office looks exactly as I imagined. Fast and reliable.' },
    { name: 'Piotr L.', location: 'Gdańsk, PL', text: 'Remote collaboration went smoothly. We received a complete project ready for implementation.' },
    { name: 'Sophie R.', location: 'Munich, DE', text: 'Creative solutions for our small apartment. The layout is so much better now.' },
    { name: 'Ewa D.', location: 'Wrocław, PL', text: 'Great communication, quick delivery. The japandi style perfectly captures what I was looking for.' },
    { name: 'Lukas B.', location: 'Zurich, CH', text: 'Professional service from start to finish. The visualizations were incredibly realistic.' },
  ],
  de: [
    { name: 'Anna K.', location: 'Warschau, PL', text: 'Das Projekt hat meine Erwartungen übertroffen. Professioneller Ansatz und tolle Kommunikation.' },
    { name: 'Thomas M.', location: 'Berlin, DE', text: 'Sehr professionell und kreativ. Die Online-Zusammenarbeit war unkompliziert und das Ergebnis wunderbar.' },
    { name: 'Katarzyna W.', location: 'Kraków, PL', text: 'Wunderschöne Visualisierungen, perfekte Materialauswahl. Empfehle ich jedem.' },
    { name: 'Maria S.', location: 'Wien, AT', text: 'Tolle Arbeit! Das Büro sieht genau so aus, wie ich es mir vorgestellt habe.' },
    { name: 'Piotr L.', location: 'Gdańsk, PL', text: 'Remote-Zusammenarbeit verlief reibungslos. Komplettes Projekt zur Umsetzung erhalten.' },
    { name: 'Sophie R.', location: 'München, DE', text: 'Kreative Lösungen für unsere kleine Wohnung. Die Raumaufteilung ist jetzt viel besser.' },
    { name: 'Ewa D.', location: 'Wrocław, PL', text: 'Toller Kontakt, schnelle Umsetzung. Der Japandi-Stil trifft genau meinen Geschmack.' },
    { name: 'Lukas B.', location: 'Zürich, CH', text: 'Professioneller Service von Anfang bis Ende. Die Visualisierungen waren unglaublich realistisch.' },
  ],
};

const Reviews = () => {
  const { t, lang } = useLang();
  const reviews = reviewsData[lang] || reviewsData.pl;

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('reviews.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="border border-border p-6">
              <p className="text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
              <p className="text-xs font-sans font-medium">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.location}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm mb-6">{t('reviews.cta')}</p>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-sans tracking-wide hover:opacity-90 inline-block"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Reviews;
