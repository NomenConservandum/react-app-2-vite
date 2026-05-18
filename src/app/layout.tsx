import type { Metadata } from 'next';
import { Providers } from './providers';
import { baseMetadata } from '@/shared/config/metadata';

export const metadata: Metadata = baseMetadata;

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