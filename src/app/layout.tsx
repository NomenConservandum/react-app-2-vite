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
  
  // Если есть сохраненная тема в cookies, используем её
  if (themeCookie?.value === 'dark' || themeCookie?.value === 'light') {
    return themeCookie.value;
  }
  
  // Если нет сохраненной темы, определяем по заголовку Accept-Language?
  // На сервере нет информации о предпочтениях темы браузера,
  // поэтому возвращаем светлую тему (или можно dark по умолчанию)
  // При первой загрузке клиент сам определит тему и сохранит в cookies
  return 'light';
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get('theme')?.value;
  // Сервер использует сохранённую тему, если есть
  const themeClass = savedTheme === 'dark' ? 'dark' : '';
  
  return (
    <html lang="ru" className={themeClass} suppressHydrationWarning>
      <head>
        {/* Инлайн-скрипт определяет тему до рендеринга */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 1. Проверяем сохранённую тему в localStorage
                  let theme = localStorage.getItem('theme');
                  if (!theme) {
                    // 2. Определяем системную тему
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    // Сохраняем для будущих посещений (опционально)
                    localStorage.setItem('theme', theme);
                    document.cookie = 'theme=' + theme + '; path=/; max-age=31536000';
                  }
                  // Применяем класс к html
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}