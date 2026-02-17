"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Menu, X, Globe, Palette, ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../../i18n/routing';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DiscoverStyle() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('/design/aaa.jpeg');
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    document.cookie = 'cookie_consent=accepted; path=/; max-age=31536000; SameSite=Lax';
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    document.cookie = 'cookie_consent=rejected; path=/; max-age=31536000; SameSite=Lax';
    setShowCookieBanner(false);
  };

  const languages = [
    { code: 'cs', name: 'Cestina', flag: '\u{1F1E8}\u{1F1FF}' },
    { code: 'en', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
    { code: 'de', name: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}' },
    { code: 'pl', name: 'Polski', flag: '\u{1F1F5}\u{1F1F1}' },
    { code: 'sk', name: 'Slovencina', flag: '\u{1F1F8}\u{1F1F0}' },
    { code: 'ru', name: 'Russkij', flag: '\u{1F1F7}\u{1F1FA}' },
  ];

  const styles = [
    { key: 'rustic', image: '/design/rust.png' },
    { key: 'artdeco', image: '/design/ArtDeko.png' },
    { key: 'boho', image: '/design/boho.png' },
    { key: 'glamour', image: '/design/glamour.png' },
    { key: 'industrial', image: '/design/industrial.jpg' },
    { key: 'minimalism', image: '/design/minim.png' },
    { key: 'provencal', image: '/design/provens.png' },
    { key: 'scandinavian', image: '/design/scand.png' },
    { key: 'country', image: '/design/venkovsky.png' },
    { key: 'vintage', image: '/design/vintage.png' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    setLanguageMenuOpen(false);
  };

  const handleStyleHover = (styleKey: string, imagePath: string) => {
    setHoveredStyle(styleKey);
    setCurrentImage(imagePath);
  };

  const handleStyleLeave = () => {
    setHoveredStyle(null);
    setCurrentImage('/design/aaa.jpeg');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[60] focus:bg-white focus:text-black focus:p-4 focus:text-lg">
        Skip to main content
      </a>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b p-3 z-50" role="dialog" aria-label="Cookie consent">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-gray-600 flex-1 min-w-0">
              {t('cookie.message')}
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="text-xs" onClick={handleRejectCookies}>{t('cookie.reject')}</Button>
              <Button className="bg-red-700 hover:bg-red-800 text-white text-xs" size="sm" onClick={handleAcceptCookies}>{t('cookie.accept')}</Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`bg-white/95 backdrop-blur-sm shadow-sm border-b fixed ${showCookieBanner ? 'top-[52px]' : 'top-0'} left-0 right-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href={`/${locale}`} className="flex items-center text-gray-600 hover:text-red-700 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="text-sm">{t('discoverStyle.back')}</span>
              </Link>
              <div className="flex items-center">
                <Palette className="h-8 w-8 text-red-700 mr-2" aria-hidden="true" />
                <span className="text-xl font-bold text-gray-900">PJ-Design</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Social */}
              <div className="hidden lg:flex space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600 hover:text-red-700 cursor-pointer transition-colors" />
                </a>
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 uppercase">{locale}</span>
                </button>

                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3 ${
                          locale === lang.code ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t pt-4" aria-label="Mobile navigation">
              <div className="flex flex-col space-y-3">
                <Link href={`/${locale}`} className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
                <Link href={`/${locale}#sluzby`} className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</Link>
                <Link href={`/${locale}#portfolio`} className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.portfolio')}</Link>
                <Link href={`/${locale}#kontakt`} className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Interactive Section */}
      <main id="main-content">
        <section className={`min-h-screen ${showCookieBanner ? 'pt-[120px]' : 'pt-[80px]'} pb-20 bg-gray-50`}>
          <div className="w-full">
            {/* Title */}
            <div className="text-center mb-12 px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">{t('discoverStyle.title')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('discoverStyle.subtitle')}</p>
            </div>

            {/* Interactive Area - Responsive */}
            <div className="w-full px-4 lg:px-8">
              <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-12 max-w-[1800px] mx-auto">
                {/* Left Column - Style Buttons */}
                <div className="flex flex-row lg:flex-col gap-2 lg:gap-6 w-full lg:w-80 overflow-x-auto lg:overflow-visible">
                  {styles.slice(0, 5).map((style) => (
                    <button
                      key={style.key}
                      className={`
                        flex-shrink-0 lg:flex-shrink lg:w-full px-4 lg:px-8 py-3 lg:py-5 font-semibold transition-all duration-300 text-left text-sm lg:text-lg whitespace-nowrap lg:whitespace-normal rounded-lg
                        ${hoveredStyle === style.key
                          ? 'bg-red-700 text-white scale-105 shadow-2xl'
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-red-50 hover:border-red-700'
                        }
                      `}
                      onMouseEnter={() => handleStyleHover(style.key, style.image)}
                      onMouseLeave={handleStyleLeave}
                      onClick={() => handleStyleHover(style.key, style.image)}
                    >
                      {t(`discoverStyle.styles.${style.key}.name`)}
                    </button>
                  ))}
                </div>

                {/* Center - Image and Description */}
                <div className="flex flex-col gap-6 flex-1 w-full lg:max-w-none">
                  <div className="relative w-full h-[50vh] lg:h-[75vh] overflow-hidden border-2 border-gray-200 shadow-2xl rounded-lg">
                    <Image
                      key={currentImage}
                      src={currentImage}
                      alt={hoveredStyle ? t(`discoverStyle.styles.${hoveredStyle}.name`) : "Interior style preview"}
                      fill
                      className="object-cover transition-opacity duration-500"
                      priority
                    />
                  </div>

                  <div className="w-full min-h-[120px] bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    {hoveredStyle ? (
                      <div className="transition-all duration-300">
                        <h3 className="text-xl font-bold text-red-700 mb-3">
                          {t(`discoverStyle.styles.${hoveredStyle}.name`)}
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed">
                          {t(`discoverStyle.styles.${hoveredStyle}.description`)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-center">
                          {t('discoverStyle.hoverHint')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Style Buttons */}
                <div className="flex flex-row lg:flex-col gap-2 lg:gap-6 w-full lg:w-80 overflow-x-auto lg:overflow-visible">
                  {styles.slice(5, 10).map((style) => (
                    <button
                      key={style.key}
                      className={`
                        flex-shrink-0 lg:flex-shrink lg:w-full px-4 lg:px-8 py-3 lg:py-5 font-semibold transition-all duration-300 text-left text-sm lg:text-lg whitespace-nowrap lg:whitespace-normal rounded-lg
                        ${hoveredStyle === style.key
                          ? 'bg-red-700 text-white scale-105 shadow-2xl'
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-red-50 hover:border-red-700'
                        }
                      `}
                      onMouseEnter={() => handleStyleHover(style.key, style.image)}
                      onMouseLeave={handleStyleLeave}
                      onClick={() => handleStyleHover(style.key, style.image)}
                    >
                      {t(`discoverStyle.styles.${style.key}.name`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-20 px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('discoverStyle.cta.title')}</h2>
              <p className="text-xl text-gray-600 mb-8">{t('discoverStyle.cta.text')}</p>
              <Link href={`/${locale}#kontakt`}>
                <Button className="bg-red-700 hover:bg-red-800 text-white text-lg px-8 py-6 font-semibold">
                  {t('discoverStyle.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.contact.title')}</h3>
              <div className="space-y-2 text-sm text-red-100">
                <p>{t('footer.contact.name')}</p>
                <p><a href={`tel:${t('footer.contact.phone')}`} className="hover:text-white">{t('footer.contact.phone')}</a></p>
                <p><a href={`mailto:${t('footer.contact.email')}`} className="hover:text-white">{t('footer.contact.email')}</a></p>
                <p className="mt-4">{t('footer.contact.ico')}</p>
                <p>{t('footer.contact.address')}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.services.title')}</h3>
              <div className="space-y-2 text-sm text-red-100">
                <a href="https://pjreko.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.reconstruction')}</a>
                <a href="https://pjsprava.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.management')}</a>
                <a href="https://pjreality.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.reality')}</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.social.title')}</h3>
              <div className="space-y-2 text-sm text-red-100">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.social.instagram')}</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.social.pinterest')}</a>
              </div>
            </div>
          </div>

          <div className="border-t border-red-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-red-200">
            <p>{t('footer.copyright')}</p>
            <Link href={`/${locale}/privacy`} className="hover:text-white mt-4 md:mt-0">{t('footer.privacy')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
