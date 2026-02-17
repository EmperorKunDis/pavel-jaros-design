"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Menu, X, Phone, MapPin, Mail, Globe, AlertCircle, CheckCircle2, Loader2, Lightbulb, Key, MessageSquare, Sparkles, Eye, Clock } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../i18n/routing';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Cookie consent check
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

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertyType: '',
    budget: '',
    message: '',
    consent: false,
    _gotcha: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const languages = [
    { code: 'cs', name: 'Cestina', flag: '\u{1F1E8}\u{1F1FF}' },
    { code: 'en', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
    { code: 'de', name: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}' },
    { code: 'pl', name: 'Polski', flag: '\u{1F1F5}\u{1F1F1}' },
    { code: 'sk', name: 'Slovencina', flag: '\u{1F1F8}\u{1F1F0}' },
    { code: 'ru', name: 'Russkij', flag: '\u{1F1F7}\u{1F1FA}' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    setLanguageMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!formData.name || !formData.email || !formData.message) {
      setFormError(t('contact.form.error'));
      return;
    }

    if (!formData.consent) {
      setFormError(t('contact.form.error'));
      return;
    }

    setFormLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/TVUJ_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          propertyType: formData.propertyType,
          budget: formData.budget,
          message: formData.message,
          _gotcha: formData._gotcha,
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          propertyType: '',
          budget: '',
          message: '',
          consent: false,
          _gotcha: '',
        });
      } else {
        setFormError(t('contact.form.error'));
      }
    } catch {
      setFormError(t('contact.form.error'));
    } finally {
      setFormLoading(false);
    }
  };

  const navLinks = [
    { href: '#', label: t('nav.home') },
    { href: '#sluzby', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: `/${locale}/discover-style`, label: t('nav.discoverStyle'), isLink: true },
    { href: '#o-me', label: t('nav.about') },
    { href: '#kontakt', label: t('nav.contact') },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Skip to content link - B5 Accessibility */}
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
              <Button variant="outline" size="sm" className="text-xs">{t('cookie.reject')}</Button>
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
            <div className="flex items-center">
              <Image
                src="/logo/PJGroupLogo.png"
                alt="PJ Design Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
              <a href="#" className="text-gray-700 hover:text-red-700 transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t('nav.home')}</a>
              <a href="#sluzby" className="text-gray-700 hover:text-red-700 transition-colors">{t('nav.services')}</a>
              <a href="#portfolio" className="text-gray-700 hover:text-red-700 transition-colors">{t('nav.portfolio')}</a>
              <Link href={`/${locale}/discover-style`} className="text-gray-700 hover:text-red-700 transition-colors">{t('nav.discoverStyle')}</Link>
              <a href="#o-me" className="text-gray-700 hover:text-red-700 transition-colors">{t('nav.about')}</a>
              <a href="#kontakt" className="text-gray-700 hover:text-red-700 transition-colors">{t('nav.contact')}</a>
            </nav>

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

              <Button
                className="hidden sm:inline-flex bg-red-700 hover:bg-red-800 text-white font-semibold"
                onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('nav.cta')}
              </Button>

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

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t pt-4" aria-label="Mobile navigation">
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t('nav.home')}</a>
                <a href="#sluzby" className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</a>
                <a href="#portfolio" className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.portfolio')}</a>
                <Link href={`/${locale}/discover-style`} className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.discoverStyle')}</Link>
                <a href="#o-me" className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</a>
                <a href="#kontakt" className="text-gray-700 hover:text-red-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</a>
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white font-semibold w-full mt-2"
                  onClick={() => { setMobileMenuOpen(false); document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  {t('nav.cta')}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className={`relative min-h-screen flex items-center ${showCookieBanner ? 'pt-[120px]' : 'pt-[80px]'}`}>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
              alt="Modern interior design living room"
              fill
              className="object-cover object-center opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-200 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <p className="text-sm md:text-base mb-8 text-gray-300">
                {t('hero.badges')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white text-lg px-8 py-6 font-semibold"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-700 text-lg px-8 py-6 font-semibold"
                  onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tiles Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 bg-white hover:border-red-700 hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <Sparkles className="h-10 w-10 text-red-700 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t('tiles.tile1.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('tiles.tile1.text')}</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white hover:border-red-700 hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <Eye className="h-10 w-10 text-red-700 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t('tiles.tile2.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('tiles.tile2.text')}</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white hover:border-red-700 hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <Clock className="h-10 w-10 text-red-700 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t('tiles.tile3.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('tiles.tile3.text')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio Teaser Section */}
        <section id="portfolio" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('portfolio.title')}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="overflow-hidden group cursor-pointer bg-white border-gray-200 hover:shadow-lg transition-all">
                <CardContent className="p-0 relative">
                  <div className="relative h-80">
                    <Image
                      src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074"
                      alt={t('portfolio.project1.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-red-700">{t('portfolio.project1.name')}</h3>
                    <p className="text-gray-600">{t('portfolio.project1.location')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden group cursor-pointer bg-white border-gray-200 hover:shadow-lg transition-all">
                <CardContent className="p-0 relative">
                  <div className="relative h-80">
                    <Image
                      src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070"
                      alt={t('portfolio.project2.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-red-700">{t('portfolio.project2.name')}</h3>
                    <p className="text-gray-600">{t('portfolio.project2.location')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden group cursor-pointer bg-white border-gray-200 hover:shadow-lg transition-all">
                <CardContent className="p-0 relative">
                  <div className="relative h-80">
                    <Image
                      src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070"
                      alt={t('portfolio.project3.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-red-700">{t('portfolio.project3.name')}</h3>
                    <p className="text-gray-600">{t('portfolio.project3.location')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-8 py-3 font-semibold">
                {t('portfolio.viewAll')}
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="sluzby" className="py-20 bg-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all bg-transparent">
                <CardContent className="p-8 text-center">
                  <Lightbulb className="h-16 w-16 text-white mx-auto mb-6" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-4 text-white">{t('services.design.title')}</h3>
                  <p className="text-red-100 leading-relaxed">{t('services.design.text')}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all bg-transparent">
                <CardContent className="p-8 text-center">
                  <Key className="h-16 w-16 text-white mx-auto mb-6" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-4 text-white">{t('services.turnkey.title')}</h3>
                  <p className="text-red-100 leading-relaxed">{t('services.turnkey.text')}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all bg-transparent">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-white mx-auto mb-6" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-4 text-white">{t('services.consultation.title')}</h3>
                  <p className="text-red-100 leading-relaxed">{t('services.consultation.text')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="o-me" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/PavelDesignBezPozadi.png"
                  alt="Pavel Jaros - Interior Designer"
                  fill
                  className="object-contain object-center"
                />
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-red-700">{t('philosophy.title')}</h2>
                <div className="text-xl text-gray-700 leading-relaxed space-y-4">
                  {t('philosophy.text').split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-gray-700 leading-relaxed">{t('philosophy.pjgroup')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('process.title')}</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    {i}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{t(`process.step${i}.title`)}</h3>
                    <p className="text-gray-600 leading-relaxed">{t(`process.step${i}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontakt" className="py-20 bg-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">{t('contact.subtitle')}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-red-200" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresa</h3>
                    <p className="text-red-100">{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-red-200" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                    <a href={`tel:${t('contact.phone')}`} className="text-red-100 hover:text-white">{t('contact.phone')}</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-red-200" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                    <a href={`mailto:${t('contact.email')}`} className="text-red-100 hover:text-white">{t('contact.email')}</a>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-red-200 mb-2">{t('contact.ico')}</p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  {formError && (
                    <div className="bg-red-900/50 border border-red-400 rounded-md p-4 flex items-center gap-3" role="alert">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm">{formError}</p>
                    </div>
                  )}

                  {formSuccess && (
                    <div className="bg-green-900/50 border border-green-400 rounded-md p-4 flex items-center gap-3" role="status">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm">{t('contact.form.success')}</p>
                    </div>
                  )}

                  {/* Honeypot anti-spam field */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder={t('contact.form.name')}
                      className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={formLoading}
                      aria-label={t('contact.form.name')}
                    />
                    <Input
                      placeholder={t('contact.form.email')}
                      type="email"
                      className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={formLoading}
                      aria-label={t('contact.form.email')}
                    />
                  </div>
                  <Input
                    placeholder={t('contact.form.phone')}
                    className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    disabled={formLoading}
                    aria-label={t('contact.form.phone')}
                  />
                  <select
                    className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 focus:border-white focus:outline-none"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    aria-label={t('contact.form.service')}
                  >
                    <option value="" className="text-gray-900">{t('contact.form.service')}</option>
                    <option value="online" className="text-gray-900">{t('contact.form.serviceOnline')}</option>
                    <option value="design" className="text-gray-900">{t('contact.form.serviceDesign')}</option>
                    <option value="turnkey" className="text-gray-900">{t('contact.form.serviceTurnkey')}</option>
                  </select>
                  <Input
                    placeholder={t('contact.form.propertyType')}
                    className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    disabled={formLoading}
                    aria-label={t('contact.form.propertyType')}
                  />
                  <Input
                    placeholder={t('contact.form.budget')}
                    className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    disabled={formLoading}
                    aria-label={t('contact.form.budget')}
                  />
                  <Textarea
                    placeholder={t('contact.form.message')}
                    rows={4}
                    className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={formLoading}
                    aria-label={t('contact.form.message')}
                  />

                  <label className="flex items-start cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      className="mr-3 mt-0.5"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      required
                      disabled={formLoading}
                    />
                    <span className="text-red-100">{t('contact.form.gdpr')}</span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full bg-white text-red-700 hover:bg-gray-100 font-semibold py-3 text-lg"
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact Column */}
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

            {/* Services Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.services.title')}</h3>
              <div className="space-y-2 text-sm text-red-100">
                <a href="https://pjreko.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.reconstruction')}</a>
                <a href="https://pjsprava.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.management')}</a>
                <a href="https://pjreality.cz" target="_blank" rel="noopener noreferrer" className="block hover:text-white">{t('footer.services.reality')}</a>
              </div>
            </div>

            {/* Social Column */}
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
