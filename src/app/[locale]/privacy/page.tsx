"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href={`/${locale}`} className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-sm">{t('nav.home')}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{t('footer.privacy')}</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Spravce osobnich udaju</h2>
            <p>Pavel Jaros, ICO: 10846671, se sidlem Kaprova 52/6, Praha 1</p>
            <p>E-mail: pavel.jaros@kwcz.cz | Telefon: +420 777 558 730</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Rozsah zpracovavanych udaju</h2>
            <p>Zpracovavame nasledujici osobni udaje, ktere nam poskytnete prostrednictvim kontaktniho formulare:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Jmeno a prijmeni</li>
              <li>E-mailova adresa</li>
              <li>Telefonni cislo</li>
              <li>Obsah zpravy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Ucel zpracovani</h2>
            <p>Vase osobni udaje zpracovavame za ucelem:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Odpovedi na vas dotaz ci poptavku</li>
              <li>Komunikace ohledne nasich sluzeb</li>
              <li>Pripravy nabidky na zaklade vasi poptavky</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Pravni zaklad zpracovani</h2>
            <p>Zpracovani osobnich udaju probiha na zaklade vaseho souhlasu (cl. 6 odst. 1 pism. a) GDPR) a pro ucely plneni smlouvy ci jednani pred uzavrenim smlouvy (cl. 6 odst. 1 pism. b) GDPR).</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Doba uchovavani udaju</h2>
            <p>Osobni udaje uchovavame po dobu nezbytnou k vyrizeni vasi poptavky, maximalne vsak 3 roky od posledniho kontaktu.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Vase prava</h2>
            <p>V souvislosti se zpracovanim osobnich udaju mate nasledujici prava:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Pravo na pristup k osobnim udajum</li>
              <li>Pravo na opravu nepresnych udaju</li>
              <li>Pravo na vymazani udaju</li>
              <li>Pravo na omezeni zpracovani</li>
              <li>Pravo na prenositelnost udaju</li>
              <li>Pravo vznest namitku proti zpracovani</li>
              <li>Pravo odvolat souhlas se zpracovanim</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
            <p>Tento web pouziva cookies pro zakladni funkcnost webu. Analyticke a marketingove cookies pouzivame pouze s vasim souhlasem.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Kontakt</h2>
            <p>V pripade dotazu ohledne zpracovani osobnich udaju nas kontaktujte na e-mailu pavel.jaros@kwcz.cz.</p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Posledni aktualizace: 16. 2. 2026</p>
        </div>
      </main>

      <footer className="bg-black text-white py-8 border-t border-gray-900" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
