import type { Metadata } from 'next';
import { Providers } from './providers';
import { baseMetadata } from '@/shared/config/metadata';

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}