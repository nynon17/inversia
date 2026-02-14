import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useLang, Lang } from '@/contexts/LanguageContext';

const langLabels: Lang[] = ['pl', 'en', 'de'];

const navKeys = [
  { key: 'home', path: '/' },
  { key: 'offer', path: '/offer' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'reviews', path: '/reviews' },
  { key: 'contact', path: '/contact' },
];

const Header = () => {
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" aria-label="INVERSIA">
          <Logo className="h-8 w-auto text-foreground" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navKeys.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`text-sm font-sans tracking-wide hover:text-primary ${
                location.pathname === path ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          {langLabels.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 text-xs font-sans uppercase tracking-wider ${
                lang === l ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}
              aria-label={`Switch to ${l.toUpperCase()}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-3" aria-label="Mobile navigation">
            {navKeys.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-sans tracking-wide py-1 ${
                  location.pathname === path ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border">
              {langLabels.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMenuOpen(false); }}
                  className={`px-2 py-1 text-xs uppercase tracking-wider ${
                    lang === l ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
