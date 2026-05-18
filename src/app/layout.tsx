import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { cookies } from 'next/headers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1976d2',
};

export const metadata: Metadata = {
  title: {
    default: 'Quote App',
    template: '%s | Quote App',
  },
  description: 'Платформа для обмена цитатами и вдохновляющими мыслями',
  keywords: ['цитаты', 'вдохновение', 'мотивация', 'quotes', 'inspiration'],
  authors: [{ name: 'Quote App Team' }],
  creator: 'Quote App',
  publisher: 'Quote App',
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
  openGraph: {
    title: 'Quote App',
    description: 'Платформа для обмена цитатами',
    url: 'https://quote-app.com',
    siteName: 'Quote App',
    locale: 'ru_RU',
    type: 'website',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// Функция для получения темы из cookies (серверная)
async function getThemeFromCookies(): Promise<'light' | 'dark'> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  return themeCookie?.value === 'dark' ? 'dark' : 'light';
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeFromCookies();
  const themeClass = theme === 'dark' ? 'dark' : '';
  
  return (
    <html lang="ru" className={themeClass} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}