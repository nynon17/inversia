import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { Check, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    hcaptcha: any;
    onHCaptchaLoad: () => void;
  }
}

type PackageType = 'basic' | 'premium' | 'consultation' | 'custom';

const Order = () => {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageType = (searchParams.get('package') as PackageType) || 'basic';
  const source = searchParams.get('source');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaWidgetId = useRef<string | null>(null);

  // hCaptcha Site Key - zmień na swój klucz z hcaptcha.com
  const HCAPTCHA_SITE_KEY = 'be9af8da-8388-4902-b5b4-a83c28fcc616';

  useEffect(() => {
    // Load hCaptcha script
    if (!document.getElementById('hcaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'hcaptcha-script';
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onHCaptchaLoad';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.onHCaptchaLoad = () => {
      if (captchaRef.current && window.hcaptcha && !captchaWidgetId.current) {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          callback: (token: string) => {
            setCaptchaToken(token);
            setCaptchaError(false);
          },
          'expired-callback': () => {
            setCaptchaToken(null);
          },
        });
      }
    };

    // If script already loaded, render captcha
    if (window.hcaptcha && captchaRef.current && !captchaWidgetId.current) {
      window.onHCaptchaLoad();
    }

    return () => {
      captchaWidgetId.current = null;
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    style: '',
    budget: '',
    topic: '',
    description: '',
  });

  const packageNames: Record<PackageType, Record<string, string>> = {
    basic: { pl: 'Pakiet Podstawowy', en: 'Basic Package', de: 'Basispaket' },
    premium: { pl: 'Pakiet Premium', en: 'Premium Package', de: 'Premium-Paket' },
    consultation: { pl: 'Konsultacja', en: 'Consultation', de: 'Beratung' },
    custom: { pl: 'Pakiet Spersonalizowany', en: 'Custom Package', de: 'Individuelles Paket' },
  };

  const contactFormTitle: Record<string, string> = {
    pl: 'Formularz kontaktowy',
    en: 'Contact form',
    de: 'Kontaktformular',
  };

  const labels: Record<string, Record<string, string>> = {
    name: { pl: 'Imię i nazwisko', en: 'Full name', de: 'Vollständiger Name' },
    email: { pl: 'Adres e-mail', en: 'Email address', de: 'E-Mail-Adresse' },
    phone: { pl: 'Numer telefonu', en: 'Phone number', de: 'Telefonnummer' },
    area: { pl: 'Metraż (m²)', en: 'Area (m²)', de: 'Fläche (m²)' },
    style: { pl: 'Preferowany styl', en: 'Preferred style', de: 'Bevorzugter Stil' },
    budget: { pl: 'Budżet na realizację', en: 'Implementation budget', de: 'Umsetzungsbudget' },
    topic: { pl: 'Temat konsultacji', en: 'Consultation topic', de: 'Beratungsthema' },
    description: { pl: 'Opis projektu / dodatkowe informacje', en: 'Project description / additional info', de: 'Projektbeschreibung / zusätzliche Infos' },
    submit: { pl: 'Wyślij zapytanie', en: 'Send inquiry', de: 'Anfrage senden' },
    success: { pl: 'Dziękujemy! Wkrótce się odezwiemy.', en: 'Thank you! We\'ll get back to you soon.', de: 'Vielen Dank! Wir melden uns bald.' },
    back: { pl: 'Wróć do oferty', en: 'Back to services', de: 'Zurück zum Angebot' },
    backContact: { pl: 'Wróć do kontaktu', en: 'Back to contact', de: 'Zurück zum Kontakt' },
    captchaRequired: { pl: 'Proszę potwierdzić, że nie jesteś robotem', en: 'Please confirm you are not a robot', de: 'Bitte bestätigen Sie, dass Sie kein Roboter sind' },
    submitError: { pl: 'Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.', en: 'An error occurred. Please try again or contact us directly.', de: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.' },
  };

  const stylePlaceholders: Record<string, string> = {
    pl: 'np. minimalistyczny, skandynawski, nowoczesny...',
    en: 'e.g. minimalist, scandinavian, modern...',
    de: 'z.B. minimalistisch, skandinavisch, modern...',
  };

  const budgetPlaceholders: Record<string, string> = {
    pl: 'np. 20 000 - 50 000 zł',
    en: 'e.g. 5 000 - 15 000 EUR',
    de: 'z.B. 5 000 - 15 000 EUR',
  };

  const topicPlaceholders: Record<string, string> = {
    pl: 'np. dobór kolorów, układ mebli, styl wnętrza...',
    en: 'e.g. color selection, furniture layout, interior style...',
    de: 'z.B. Farbauswahl, Möbelanordnung, Einrichtungsstil...',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // CAPTCHA WYŁĄCZONA NA CZAS TESTÓW
    // if (!captchaToken) {
    //   setCaptchaError(true);
    //   return;
    // }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'abce11a8-1345-45bc-baf0-3fd58b1c3a98',
          botcheck: false,
          subject: source === 'contact' 
            ? `Formularz kontaktowy` 
            : `Nowe zapytanie: ${packageNames[packageType][lang]}`,
          from_name: formData.name,
          package: source === 'contact' ? 'Formularz kontaktowy (bez wyboru pakietu)' : packageNames[packageType][lang],
          source: source === 'contact' ? 'Strona kontakt' : 'Strona oferta',
          ...formData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="py-16">
        <div className="container max-w-xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif mb-4">{labels.success[lang]}</h1>
          <button
            onClick={() => navigate(source === 'contact' ? '/contact' : '/offer')}
            className="text-primary hover:underline mt-4"
          >
            {source === 'contact' ? labels.backContact[lang] : labels.back[lang]}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-16">
      <div className="container max-w-xl">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-4">
          {source === 'contact' ? contactFormTitle[lang] : packageNames[packageType][lang]}
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          {t('order.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Imię */}
          <div>
            <label className="block text-sm font-medium mb-2">{labels.name[lang]} *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">{labels.email[lang]} *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium mb-2">{labels.phone[lang]}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
            />
          </div>

          {/* Metraż - dla basic, premium, custom */}
          {(packageType === 'basic' || packageType === 'premium' || (packageType === 'custom' && source !== 'contact')) && (
            <div>
              <label className="block text-sm font-medium mb-2">{labels.area[lang]} *</label>
              <input
                type="text"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                placeholder="np. 65"
                className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {/* Styl - dla basic, premium */}
          {(packageType === 'basic' || packageType === 'premium') && (
            <div>
              <label className="block text-sm font-medium mb-2">{labels.style[lang]}</label>
              <input
                type="text"
                name="style"
                value={formData.style}
                onChange={handleChange}
                placeholder={stylePlaceholders[lang]}
                className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {/* Budżet - tylko dla premium */}
          {packageType === 'premium' && (
            <div>
              <label className="block text-sm font-medium mb-2">{labels.budget[lang]}</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder={budgetPlaceholders[lang]}
                className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {/* Temat - tylko dla konsultacji */}
          {packageType === 'consultation' && (
            <div>
              <label className="block text-sm font-medium mb-2">{labels.topic[lang]} *</label>
              <input
                type="text"
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                placeholder={topicPlaceholders[lang]}
                className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {/* Opis */}
          <div>
            <label className="block text-sm font-medium mb-2">{labels.description[lang]}</label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* CAPTCHA WYŁĄCZONA NA CZAS TESTÓW */}

          {submitError && (
            <p className="text-destructive text-sm text-center">
              {labels.submitError[lang]}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground px-6 py-4 text-sm font-sans tracking-wide hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {labels.submit[lang]}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Order;
