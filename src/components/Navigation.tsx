import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import type { Language } from '../i18n/languages';
import { useTranslations } from '../i18n/ui';
import { cn } from '../lib/utils';

interface NavigationProps {
  currentLang: Language;
}

export default function Navigation({ currentLang }: NavigationProps) {
  const t = useTranslations(currentLang);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'fr', label: 'Français' },
  ];

  const navLinks = [
    { href: `/${currentLang}`, label: t('nav.home') },
    { href: `/${currentLang}/menu`, label: t('nav.menu') },
    { href: `/${currentLang}/about`, label: t('nav.about') },
    { href: `/${currentLang}/events`, label: t('nav.events') },
    { href: `/${currentLang}/contact`, label: t('nav.contact') },
  ];

  return (
    <>
      {/* Desktop & Mobile Top Nav */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-700 px-6 pt-6",
          isScrolled ? "pt-4" : "pt-8"
        )}
      >
        <div 
          className={cn(
            "max-w-[90rem] mx-auto transition-all duration-700 rounded-full border",
            isScrolled 
              ? "glass-dark py-3 px-6 md:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10" 
              : "bg-transparent py-4 md:py-5 px-6 md:px-10 border-transparent shadow-none"
          )}
        >
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <a href={`/${currentLang}`} className="flex items-center gap-2 md:gap-4 group">
              <div className="relative">
                <img 
                  src="/ritzlogo.png" 
                  alt="The Ritz Logo" 
                  className={cn(
                    "w-auto transition-all duration-700 group-hover:scale-110 group-hover:rotate-3",
                    isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"
                  )}
                  style={{filter: 'brightness(0) invert(1)'}}
                />
              </div>
              <div className={cn(
                "font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all duration-700 whitespace-nowrap text-white",
                isScrolled ? "text-sm md:text-base" : "text-base md:text-xl"
              )}>
                THE RITZ
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 hover:scale-110 relative group/link",
                    isScrolled ? "text-white/80 hover:text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover/link:w-full"></div>
                </a>
              ))}
              
              <div className="h-4 w-[1px] bg-white/20 mx-2"></div>

              {/* Language Selector */}
              <div className="relative group/lang">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    isScrolled ? "text-white/80 hover:text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">{currentLang}</span>
                </button>
                
                <div className="absolute right-0 mt-6 py-4 w-48 glass-dark rounded-[2rem] opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-500 transform translate-y-4 group-hover/lang:translate-y-0 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10">
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={`/${lang.code}`}
                      className="flex items-center justify-between px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      {lang.label}
                      {currentLang === lang.code && <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(197,160,89,0.8)]" />}
                    </a>
                  ))}
                </div>
              </div>

              <a href="https://wa.me/31618758383" target="_blank" rel="noopener noreferrer">
                <Button 
                  className={cn(
                    "rounded-full px-10 py-7 text-[10px] font-black uppercase tracking-[0.4em] stripe-button shadow-2xl",
                    isScrolled ? "bg-white text-black hover:bg-primary hover:text-white" : "bg-primary text-white"
                  )}
                >
                  {t('hero.cta.reserve')}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden p-2 rounded-full transition-all duration-300",
                isScrolled ? "text-white bg-white/10" : "text-foreground bg-black/5"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white p-2"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col h-full justify-between p-10 pt-24">
          <div className="space-y-8">
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Menu</p>
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-4xl font-bold text-white hover:text-primary transition-all duration-300 transform hover:translate-x-4"
                  style={{ transitionDelay: `${i * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-4">
              <a href="https://wa.me/31618758383" className="col-span-2">
                <Button className="w-full py-8 text-lg font-bold uppercase tracking-widest bg-primary hover:bg-white hover:text-black transition-all duration-500 rounded-2xl">
                  {t('hero.cta.reserve')}
                </Button>
              </a>
            </div>

            <div className="space-y-6">
              <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Select Language</p>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={cn(
                      "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300",
                      currentLang === lang.code 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                    )}
                  >
                    {lang.code}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Quick Actions (Stripe Style) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <div className="glass-dark rounded-3xl p-2 flex items-center justify-between shadow-2xl border border-white/10">
          <a href={`/${currentLang}/menu`} className="flex-1 flex flex-col items-center py-2 text-white/70 hover:text-white transition-colors">
            <div className="p-2 rounded-xl bg-white/5 mb-1"><Phone className="w-4 h-4" /></div>
            <span className="text-[9px] font-bold uppercase tracking-tighter">Contact</span>
          </a>
          <a href="https://wa.me/31618758383" className="flex-[2] px-2">
            <button className="w-full bg-primary hover:bg-accent text-white py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
              {t('hero.cta.reserve')}
            </button>
          </a>
          <a href={`/${currentLang}/contact`} className="flex-1 flex flex-col items-center py-2 text-white/70 hover:text-white transition-colors">
            <div className="p-2 rounded-xl bg-white/5 mb-1"><MapPin className="w-4 h-4" /></div>
            <span className="text-[9px] font-bold uppercase tracking-tighter">Find Us</span>
          </a>
        </div>
      </div>
    </>
  );
}


