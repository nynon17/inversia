import { Facebook, Instagram, Mail, Phone, Cookie } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const Footer = () => {
  const { t } = useLang();
  const { showBanner } = useCookieConsent();

  return (
    <footer className="border-t border-border bg-[#f5f0e8]">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-xl tracking-widest mb-3">INVERSIA</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} INVERSIA. {t('footer.rights')}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a href="mailto:contact@inversia.eu" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
              <Mail size={14} /> contact@inversia.eu
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574567780622"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/Inversia.spatialdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            <button
              onClick={showBanner}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <Cookie size={12} />
              {t('cookies.changeSettings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
