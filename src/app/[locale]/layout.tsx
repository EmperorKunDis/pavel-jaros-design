import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../global.css";
import ClientBody from "../ClientBody";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {routing} from '../../../i18n/routing';
import {notFound} from 'next/navigation';
import {ErrorBoundary} from '../../components/ErrorBoundary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});

  const title = "PJ Design — Interiérový design | Pavel Jaroš";
  const description = "Tvoříme interiéry s duší a příběhem. Návrhy, 3D vizualizace a kompletní realizace interiérů na míru. Karlovarský kraj a celá ČR.";

  return {
    title,
    description,
    keywords: ['interiérový design', 'návrh interiéru', '3D vizualizace', 'realizace interiérů', 'Karlovarský kraj', 'PJ Design', 'Pavel Jaroš', 'design na míru'],
    authors: [{name: 'Pavel Jaroš'}],
    creator: 'Pavel Jaroš',
    publisher: 'PJ Design',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://pjdesign.cz'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'cs': '/cs',
        'en': '/en',
        'de': '/de',
        'pl': '/pl',
        'sk': '/sk',
        'ru': '/ru',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://pjdesign.cz/${locale}`,
      siteName: 'PJ Design',
      images: [
        {
          url: '/images/PavelDesignBezPozadi.png',
          width: 1200,
          height: 630,
          alt: 'PJ Design — Interiérový design',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/PavelDesignBezPozadi.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const dynamic = 'force-static';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "name": "PJ Design — Pavel Jaroš",
    "image": "/images/PavelDesignBezPozadi.png",
    "telephone": "+420 777 558 730",
    "email": "pavel.jaros@kwcz.cz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaprova 52/6",
      "addressLocality": "Praha 1",
      "addressCountry": "CZ"
    },
    "url": `https://pjdesign.cz/${locale}`,
    "description": "Tvoříme interiéry s duší a příběhem. Návrhy, 3D vizualizace a kompletní realizace interiérů na míru.",
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Karlovarský kraj"
      },
      {
        "@type": "Country",
        "name": "Česká republika"
      }
    ],
    "knowsAbout": ["Interior Design", "3D Visualization", "Turnkey Realization", "Design Consultation"],
    "memberOf": {
      "@type": "Organization",
      "name": "PJ Group"
    }
  };

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <ClientBody>{children}</ClientBody>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
