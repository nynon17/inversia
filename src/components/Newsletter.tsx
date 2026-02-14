import { useState, FormEvent } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Newsletter = () => {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(email)) {
      setError('Invalid email');
      return;
    }
    if (!consent) {
      setError('Consent required');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 bg-secondary">
        <div className="container text-center">
          <p className="font-serif text-xl">{t('newsletter.success')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="container max-w-md">
        <h2 className="text-2xl font-serif text-center mb-6">{t('newsletter.title')}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-background border border-border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-primary"
            />
            {t('newsletter.consent')}
          </label>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 text-sm font-sans tracking-wide hover:opacity-90"
          >
            {t('newsletter.button')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
