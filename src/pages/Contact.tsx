import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import Newsletter from '@/components/Newsletter';

const Contact = () => {
  const { t } = useLang();

  return (
    <main className="py-16">
      <div className="container max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">{t('contact.title')}</h1>

        <div className="space-y-6 text-center">
          <a
            href="tel:+48123456789"
            className="flex items-center justify-center gap-3 text-foreground hover:text-primary"
          >
            <Phone size={18} />
            <span className="text-lg font-sans">+48 123 456 789</span>
          </a>

          <a
            href="mailto:hello@inversia.design"
            className="flex items-center justify-center gap-3 text-foreground hover:text-primary"
          >
            <Mail size={18} />
            <span className="text-lg font-sans">hello@inversia.design</span>
          </a>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-10">{t('contact.info')}</p>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-serif mb-4">{t('contact.social')}</h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/profile.php?id=61574567780622"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              aria-label="Facebook"
            >
              <Facebook size={18} />
              <span className="text-sm font-sans">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/Inversia.spatialdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              aria-label="Instagram"
            >
              <Instagram size={18} />
              <span className="text-sm font-sans">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Newsletter />
      </div>
    </main>
  );
};

export default Contact;
