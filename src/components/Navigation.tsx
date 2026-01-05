import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import type { Language } from '../i18n/languages';
import { useTranslations } from '../i18n/ui';

interface NavigationProps {
  currentLang: Language;
}

export default function Navigation({ currentLang }: NavigationProps) {
  const t = useTranslations(currentLang);
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'ca', label: 'CA' },
    { code: 'nl', label: 'NL' },
    { code: 'fr', label: 'FR' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href={`/${currentLang}`} className="flex items-center gap-3 group">
            <img 
              src="/ritzlogo.png" 
              alt="The Ritz Logo" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-110" 
              style={{filter: 'brightness(0) saturate(100%) invert(48%) sepia(15%) saturate(1088%) hue-rotate(346deg) brightness(91%) contrast(87%)'}}
            />
            <div className="text-2xl font-bold text-primary uppercase tracking-wide">
              THE RITZ
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href={`/${currentLang}`} className="text-foreground font-semibold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              {t('nav.home')}
            </a>
            <a href={`/${currentLang}/menu`} className="text-foreground font-semibold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              {t('nav.menu')}
            </a>
            <a href={`/${currentLang}/about`} className="text-foreground font-semibold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              {t('nav.about')}
            </a>
            <a href={`/${currentLang}/events`} className="text-foreground font-semibold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              {t('nav.events')}
            </a>
            <a href={`/${currentLang}/contact`} className="text-foreground font-semibold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              {t('nav.contact')}
            </a>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{currentLang}</span>
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 py-2 w-32 bg-card border rounded-md shadow-lg">
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={`/${lang.code}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {lang.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Button variant="default" size="lg" className="uppercase tracking-wide font-bold">
              {t('hero.cta.reserve')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href={`/${currentLang}`}
              className="block py-2 text-foreground font-semibold uppercase tracking-wide hover:text-accent transition-colors"
            >
              {t('nav.home')}
            </a>
            <a
              href={`/${currentLang}/menu`}
              className="block py-2 text-foreground font-semibold uppercase tracking-wide hover:text-accent transition-colors"
            >
              {t('nav.menu')}
            </a>
            <a
              href={`/${currentLang}/about`}
              className="block py-2 text-foreground font-semibold uppercase tracking-wide hover:text-accent transition-colors"
            >
              {t('nav.about')}
            </a>
            <a
              href={`/${currentLang}/events`}
              className="block py-2 text-foreground font-semibold uppercase tracking-wide hover:text-accent transition-colors"
            >
              {t('nav.events')}
            </a>
            <a
              href={`/${currentLang}/contact`}
              className="block py-2 text-foreground font-semibold uppercase tracking-wide hover:text-accent transition-colors"
            >
              {t('nav.contact')}
            </a>
            
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-2">Language:</p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={`px-3 py-1 rounded text-sm ${
                      currentLang === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground hover:bg-accent'
                    }`}
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            <Button variant="default" size="lg" className="w-full mt-4 uppercase tracking-wide font-bold">
              {t('hero.cta.reserve')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

