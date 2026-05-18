import type { Metadata } from 'next';
import ClientLandingPage from './client-page';

export const metadata: Metadata = {
  title: 'Добро пожаловать',
  description: 'Присоединяйтесь к сообществу Quote App - делитесь цитатами и вдохновляйтесь',
  openGraph: {
    title: 'Quote App - Добро пожаловать',
    description: 'Присоединяйтесь к сообществу Quote App',
  },
};

export default function LandingPage() {
  return <ClientLandingPage />;
}