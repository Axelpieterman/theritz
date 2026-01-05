import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import type { Language } from '../i18n/languages';
import { useTranslations } from '../i18n/ui';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = useTranslations(currentLang);
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/ritzlogo.png" alt="The Ritz Logo" className="h-10 w-auto brightness-0 invert" />
              <h3 className="text-2xl font-bold uppercase tracking-wide">THE RITZ</h3>
            </div>
            <p className="text-white/70 mb-4">
              {t('footer.tagline')} • {t('footer.location')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">{t('nav.contact')}</h4>
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{t('contact.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+31618758383" className="hover:text-primary transition-colors">
                  +31 6 18758383
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">{t('contact.hours')}</h4>
            <p className="text-white/70">
              Open Till Night
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} The Ritz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

