import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, X, Globe, Phone, MapPin } from 'lucide-react';
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
  
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('cocktails');
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // ============================================================================
  // REFS
  // ============================================================================
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuTabsContainerRef = useRef<HTMLDivElement>(null);
  const disableObserverRef = useRef(false);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  const getScrollOffset = (): number => {
    let totalOffset = 0;
    
    // Get actual navbar height
    if (navbarRef.current) {
      totalOffset += navbarRef.current.offsetHeight;
    }
    
    // Get actual menu tabs height (if visible)
    if (showMenuTabs && menuTabsContainerRef.current) {
      totalOffset += menuTabsContainerRef.current.offsetHeight;
    }
    
    // Add buffer for better UX
    const buffer = 20;
    
    // Fallback if refs aren't ready yet
    return totalOffset > 0 ? totalOffset + buffer : 164; // 144 + 20 fallback
  };

  // ============================================================================
  // MENU TABS CONFIGURATION
  // ============================================================================
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


  // ============================================================================
  // TAB CLICK HANDLER - Simple & Reliable
  // ============================================================================
  const handleTabClick = (tabId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // 1. Instant visual feedback
    setActiveTab(tabId);
    setIsScrolling(true);
    
    // 2. Disable scroll observer during navigation
    disableObserverRef.current = true;
    
    // 3. Find target section
    const section = document.getElementById(tabId);
    if (!section) {
      disableObserverRef.current = false;
      setIsScrolling(false);
      return;
    }
    
    // 4. Calculate scroll position with dynamic offset
    const offset = getScrollOffset();
    const targetY = section.offsetTop - offset;
    
    // 5. Calculate dynamic timeout based on scroll distance
    const distance = Math.abs(targetY - window.scrollY);
    const scrollDuration = Math.min(distance / 2, 1000); // Max 1 second
    const timeout = scrollDuration + 200; // Add buffer
    
    // 6. Perform smooth scroll
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
    
    // 7. Re-enable observer after scroll completes
    setTimeout(() => {
      disableObserverRef.current = false;
      setIsScrolling(false);
    }, timeout);
  };

  // ============================================================================
  // NAVBAR SCROLL BEHAVIOR - Optimized Performance
  // ============================================================================
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const shouldShrink = scrollY > 20;
          
          // Only update if state actually changes (performance optimization)
          setIsScrolled(prev => prev !== shouldShrink ? shouldShrink : prev);
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial state immediately (no flash on refresh)
    handleScroll();
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================================================
  // SCROLL-TO-HIGHLIGHT OBSERVER - Simple & Throttled
  // ============================================================================
  useEffect(() => {
    if (!showMenuTabs) return;
    
    const checkVisibleSection = () => {
      // Skip if user just clicked a tab (waiting for scroll to complete)
      if (disableObserverRef.current) return;
      
      // Calculate current scroll position with same offset as click handler
      const scrollPosition = window.scrollY + getScrollOffset();
      
      // Find which section is closest to the scroll position
      let closestSection = 'cocktails';
      let closestDistance = Infinity;
      
      menuTabs.forEach(tab => {
        const section = document.getElementById(tab.id);
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const distance = Math.abs(scrollPosition - sectionTop);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = tab.id;
        }
      });
      
      setActiveTab(closestSection);
    };
    
    // Throttle scroll checks to every 200ms for performance
    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(checkVisibleSection, 200);
    };
    
    // Initial check on mount
    checkVisibleSection();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [showMenuTabs, menuTabs]);

  // ============================================================================
  // SLIDING INDICATOR ANIMATION - Pure CSS
  // ============================================================================
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (!showMenuTabs) return;
    
    // Find the active tab button
    const activeButton = document.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
    const container = menuTabsContainerRef.current;
    
    if (!activeButton || !container) {
      setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
      return;
    }
    
    // Calculate position relative to container
    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    
    const left = buttonRect.left - containerRect.left;
    const width = buttonRect.width;
    
    setIndicatorStyle({ left, width, opacity: 1 });
  }, [activeTab, showMenuTabs]);

  // ============================================================================
  // INITIAL MOUNT ANIMATION PREVENTION - Zero Flash
  // ============================================================================
  useLayoutEffect(() => {
    // Check if page is already scrolled before first paint
    const initialScroll = window.scrollY > 20;
    setIsScrolled(initialScroll);
    
    // Enable animations after layout is painted and stable
    const enableAnimations = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    };
    
    if (document.readyState === 'complete') {
      enableAnimations();
    } else {
      window.addEventListener('load', enableAnimations);
      return () => window.removeEventListener('load', enableAnimations);
    }
  }, []);


  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      {/* Desktop & Mobile Top Nav */}
      <nav 
        ref={navbarRef}
        className={cn(
          "fixed top-0 w-full z-50 px-6",
          shouldAnimate && "transition-all duration-700",
          isScrolled ? "pt-3" : "pt-6"
        )}
      >
        <div 
          className={cn(
            "max-w-[90rem] mx-auto rounded-full glass-dark",
            shouldAnimate && "transition-all duration-700",
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
                    shouldAnimate && "transition-all duration-700",
                    isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"
                  )}
                  style={{filter: 'none'}}
                />
              </div>
              <div className={cn(
                "font-black uppercase tracking-[0.3em] md:tracking-[0.4em] whitespace-nowrap text-foreground",
                shouldAnimate && "transition-all duration-700",
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
                  aria-label="Select language"
                  aria-expanded={showLangMenu}
                  aria-haspopup="true"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="text-[11px] font-black uppercase tracking-[0.35em]">{currentLang}</span>
                </button>
                
                <div 
                  className="absolute right-0 mt-6 py-4 w-48 glass-dark rounded-[2rem] opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-500 transform translate-y-4 group-hover/lang:translate-y-0"
                  role="menu"
                  aria-label="Language options"
                >
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={`/${lang.code}`}
                      role="menuitem"
                      className="flex items-center justify-between px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                      aria-current={currentLang === lang.code ? 'true' : undefined}
                    >
                      {lang.label}
                      {currentLang === lang.code && (
                        <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(197,160,89,0.8)]" aria-hidden="true" />
                      )}
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
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Menu Tabs Bar - NEW SYSTEM */}
      {showMenuTabs && (
        <div 
          ref={menuTabsContainerRef}
          className="fixed top-[5.5rem] md:top-24 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]"
        >
          <div className="glass-light rounded-full px-3 md:px-4 py-2 relative">
            <nav 
              className="flex overflow-x-auto hide-scrollbar gap-0.5 items-center relative"
              role="navigation"
              aria-label="Menu sections"
            >
              {/* Sliding Background Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] bg-primary/20 rounded-full pointer-events-none transition-all duration-500 ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
                aria-hidden="true"
              />
              
              {menuTabs.map((tab, index) => (
                <div key={tab.id} className="flex items-center gap-0.5">
                  <button
                    data-tab={tab.id}
                    onClick={(e) => handleTabClick(tab.id, e)}
                    disabled={isScrolling && activeTab === tab.id}
                    className={cn(
                      "relative z-10 whitespace-nowrap px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-full font-black uppercase tracking-[0.15em] text-[10px] md:text-[11px] transition-colors duration-300 cursor-pointer",
                      activeTab === tab.id 
                        ? "text-foreground" 
                        : "text-foreground/60 hover:text-foreground",
                      isScrolling && activeTab === tab.id && "opacity-70"
                    )}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                    aria-label={`Navigate to ${tab.label} section`}
                  >
                    {tab.label}
                  </button>
                  {index < menuTabs.length - 1 && (
                    <div className="h-4 w-[1px] bg-primary/25 mx-0.5 relative z-10" aria-hidden="true"></div>
                  )}
                </div>
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
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
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
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col h-full justify-between p-10 pt-24">
          <div className="space-y-8">
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Menu</p>
            <nav className="space-y-6">
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
            </nav>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-4">
              <a href="https://wa.me/31618758383" className="col-span-2">
                <Button className="w-full py-8 text-lg font-black uppercase tracking-widest bg-primary hover:bg-white hover:text-black transition-all duration-500 rounded-2xl">
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

      {/* Mobile Sticky Quick Actions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <div className="glass-dark rounded-3xl p-2 flex items-center justify-between border-2 border-primary/40">
          <a href={`/${currentLang}/contact`} className="flex-1 flex flex-col items-center py-2 text-foreground/70 hover:text-foreground transition-colors">
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
