import type { Metadata } from 'next';

// Базовая метаинформация для всего приложения
export const baseMetadata: Metadata = {
  title: {
    default: 'Quote App',
    template: '%s | Quote App',
  },
  description: 'Платформа для обмена цитатами и вдохновляющими мыслями',
  keywords: ['quotes', 'inspiration', 'motivation', 'цитаты', 'вдохновение'],
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://localhost:3000',
    siteName: 'Quote App',
    title: 'Quote App',
    description: 'Платформа для обмена цитатами',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quote App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quote App',
    description: 'Платформа для обмена цитатами',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};