import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import type { Language } from '../i18n/languages';
import { useTranslations } from '../i18n/ui';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = useTranslations(currentLang);
  return (
    <footer className="bg-[#D4C4A8] text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/ritzlogo.png" alt="The Ritz Logo" className="h-12 w-auto" style={{filter: 'brightness(0) saturate(100%) invert(48%) sepia(15%) saturate(1088%) hue-rotate(346deg) brightness(91%) contrast(87%)'}} />
              <h3 className="text-2xl font-black uppercase tracking-[0.3em] text-primary">THE RITZ</h3>
            </div>
            <p className="text-foreground/70 mb-6 text-lg leading-relaxed">
              {t('footer.tagline')} • {t('footer.location')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-6 uppercase tracking-[0.3em] text-sm text-primary">{t('nav.contact')}</h4>
            <div className="space-y-4 text-foreground/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{t('contact.address')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="tel:+31618758383" className="hover:text-primary transition-colors text-sm font-medium">
                  +31 6 18758383
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-black mb-6 uppercase tracking-[0.3em] text-sm text-primary">{t('contact.hours')}</h4>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Open Till Night
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-12 pt-8 text-center text-foreground/40 text-xs uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} The Ritz Lloret. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

