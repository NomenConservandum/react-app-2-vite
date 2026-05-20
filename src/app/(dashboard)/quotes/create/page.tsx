import type { Metadata } from 'next';
import CreateQuoteClient from './client-page';

export const metadata: Metadata = {
  title: 'Создать цитату | Quote App',
  description: 'Поделитесь своей мудростью с сообществом Quote App',
  robots: 'noindex, follow', // Не индексируем страницу создания, так как это личный контент
  openGraph: {
    title: 'Создать цитату | Quote App',
    description: 'Поделитесь своей мудростью с сообществом',
    type: 'website',
  },
};

export default function CreateQuotePage() {
  return <CreateQuoteClient />;
}