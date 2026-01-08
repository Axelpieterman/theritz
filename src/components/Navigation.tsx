import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import type { Language } from '../i18n/languages';
import { useTranslations } from '../i18n/ui';
import { cn } from '../lib/utils';

interface NavigationProps {
  currentLang: Language;
  showMenuTabs?: boolean;
}

export default function Navigation({ currentLang, showMenuTabs = false }: NavigationProps) {
  const t = useTranslations(currentLang);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('cocktails');
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const isManualScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Check scroll position immediately on mount
    handleScroll();
    // Enable transitions after initial render
    setTimeout(() => setIsInitialMount(false), 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active tab highlighting for menu page
  useEffect(() => {
    if (!showMenuTabs) return;

    const sections = menuTabs.map(tab => document.getElementById(tab.id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update active tab if not manually scrolling
          if (entry.isIntersecting && !isManualScroll.current) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-144px 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [showMenuTabs]);

  // Update sliding indicator position when active tab changes
  useEffect(() => {
    if (!showMenuTabs) return;
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const container = activeTabElement.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        setTabIndicator({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }
    }
  }, [activeTab, showMenuTabs]);

  const menuTabs = [
    { id: 'cocktails', label: '🍹 Cocktails', href: '#cocktails' },
    { id: 'mocktails', label: '🥤 Mocktails', href: '#mocktails' },
    { id: 'breakfast', label: '🍳 Breakfast', href: '#breakfast' },
    { id: 'lunch', label: '🥖 Lunch', href: '#lunch' },
    { id: 'warm-lunch', label: '🍲 Warm Lunch', href: '#warm-lunch' },
    { id: 'evening', label: '🌙 Evening', href: '#evening' },
    { id: 'desserts', label: '🍰 Desserts', href: '#desserts' },
    { id: 'drinks', label: '☕ Special Drinks', href: '#drinks' },
  ];

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
          "fixed top-0 w-full z-50 px-6",
          !isInitialMount && "transition-all duration-700",
          isScrolled ? "pt-3" : "pt-6"
        )}
      >
        <div 
          className={cn(
            "max-w-[90rem] mx-auto rounded-full glass-dark",
            !isInitialMount && "transition-all duration-700",
            isScrolled 
              ? "py-3 px-6 md:px-8" 
              : "py-4 md:py-5 px-6 md:px-10"
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
                    "w-auto group-hover:scale-110 group-hover:rotate-3",
                    !isInitialMount && "transition-all duration-700",
                    isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"
                  )}
                  style={{filter: 'none'}}
                />
              </div>
              <div className={cn(
                "font-black uppercase tracking-[0.3em] md:tracking-[0.4em] whitespace-nowrap text-foreground",
                !isInitialMount && "transition-all duration-700",
                isScrolled ? "text-sm md:text-base" : "text-base md:text-xl"
              )}>
                THE RITZ
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-[11px] font-black uppercase tracking-[0.35em] transition-all duration-500 hover:scale-105 relative group/link text-foreground/70 hover:text-foreground"
                >
                  {link.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover/link:w-full"></div>
                </a>
              ))}
              
              <div className="h-5 w-[1px] mx-1 bg-foreground/20"></div>

              {/* Language Selector */}
              <div className="relative group/lang">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2.5 transition-all duration-500 text-foreground/70 hover:text-foreground"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-[0.35em]">{currentLang}</span>
                </button>
                
                <div className="absolute right-0 mt-6 py-4 w-48 glass-dark rounded-[2rem] opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-500 transform translate-y-4 group-hover/lang:translate-y-0">
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
                    "rounded-full px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] stripe-button transition-all duration-500",
                    isScrolled ? "bg-primary text-white hover:bg-foreground hover:text-white" : "bg-primary text-white hover:bg-foreground hover:text-white"
                  )}
                >
                  {t('hero.cta.reserve')}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full transition-all duration-300 text-foreground bg-primary/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Separate Menu Tabs Pill - Smaller Add-on Below Main Nav */}
      {showMenuTabs && (
        <div className="fixed top-[5.5rem] md:top-24 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]">
          <div className="glass-light rounded-full px-3 md:px-4 py-2 relative">
            <nav className="flex overflow-x-auto hide-scrollbar gap-0.5 items-center relative">
              {/* Sliding Background Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] bg-primary/20 rounded-full transition-all duration-500 ease-out"
                style={{
                  left: `${tabIndicator.left}px`,
                  width: `${tabIndicator.width}px`,
                }}
              />
              
              {menuTabs.map((tab, index) => (
                <>
                  <a
                    key={tab.id}
                    ref={(el) => (tabRefs.current[tab.id] = el)}
                    href={tab.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // Disable observer during manual scroll
                      isManualScroll.current = true;
                      
                      // Scroll to section
                      const section = document.getElementById(tab.id);
                      if (section) {
                        const headerOffset = 144;
                        const elementPosition = section.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        
                        // Re-enable observer and verify correct section after scroll completes
                        setTimeout(() => {
                          // Find which section is actually in view
                          const sections = menuTabs.map(t => ({ id: t.id, el: document.getElementById(t.id) })).filter(s => s.el);
                          
                          // Check which section is closest to the target scroll position (144px from top)
                          let closestSection = null;
                          let closestDistance = Infinity;
                          
                          for (const sec of sections) {
                            const rect = sec.el!.getBoundingClientRect();
                            const distance = Math.abs(rect.top - 144);
                            if (distance < closestDistance && rect.top <= 300) {
                              closestDistance = distance;
                              closestSection = sec.id;
                            }
                          }
                          
                          if (closestSection) {
                            setActiveTab(closestSection);
                          }
                          
                          // Re-enable observer
                          isManualScroll.current = false;
                        }, 800);
                      }
                    }}
                    className={cn(
                      "menu-tab relative z-10 whitespace-nowrap px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-full font-black uppercase tracking-[0.15em] text-[10px] md:text-[11px] transition-colors duration-300 cursor-pointer",
                      activeTab === tab.id 
                        ? "text-foreground" 
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </a>
                  {index < menuTabs.length - 1 && (
                    <div className="h-4 w-[1px] bg-primary/25 mx-0.5 relative z-10"></div>
                  )}
                </>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

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
                  className="block text-4xl font-black text-white hover:text-primary transition-all duration-300 transform hover:translate-x-4"
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
        <div className="glass-dark rounded-3xl p-2.5 flex items-center justify-between">
          <a href={`/${currentLang}/menu`} className="flex-1 flex flex-col items-center py-2 text-foreground/70 hover:text-foreground transition-colors">
            <div className="p-2 rounded-xl bg-primary/10 mb-1"><Phone className="w-4 h-4" /></div>
            <span className="text-[9px] font-bold uppercase tracking-tight">Contact</span>
          </a>
          <a href="https://wa.me/31618758383" className="flex-[2] px-2">
            <button className="w-full bg-primary hover:bg-foreground text-white py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-500">
              {t('hero.cta.reserve')}
            </button>
          </a>
          <a href="https://maps.google.com/?q=Carrer+del+Carme+43+Lloret+de+Mar" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center py-2 text-foreground/70 hover:text-foreground transition-colors">
            <div className="p-2 rounded-xl bg-primary/10 mb-1"><MapPin className="w-4 h-4" /></div>
            <span className="text-[9px] font-bold uppercase tracking-tight">Find Us</span>
          </a>
        </div>
      </div>
    </>
  );
}


