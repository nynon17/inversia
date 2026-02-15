import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

const Reviews = () => {
  const { t, lang } = useLang();

  useEffect(() => {
    // Load Facebook SDK
    if (!(window as any).FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v19.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    } else {
      (window as any).FB.XFBML.parse();
    }
  }, []);

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('reviews.title')}</h1>

        <div className="max-w-2xl mx-auto flex justify-center">
          <div
            className="fb-page"
            data-href="https://www.facebook.com/profile.php?id=61574567780622"
            data-tabs="reviews"
            data-width="500"
            data-height=""
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="false"
          />
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6">
          {lang === 'pl' ? 'Zmień "YOUR_PAGE_NAME" na nazwę swojej strony na Facebooku' : 
           lang === 'de' ? 'Ersetze "YOUR_PAGE_NAME" durch deinen Facebook-Seitennamen' :
           'Replace "YOUR_PAGE_NAME" with your Facebook page name'}
        </p>

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
