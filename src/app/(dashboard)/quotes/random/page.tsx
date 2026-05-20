import type { Metadata } from 'next';
import RandomQuoteClient from './client-page';

export const metadata: Metadata = {
  title: 'Случайная цитата | Quote App',
  description: 'Получите порцию вдохновения со случайной цитатой от сообщества Quote App',
  robots: 'index, follow',
  openGraph: {
    title: 'Случайная цитата | Quote App',
    description: 'Получите порцию вдохновения со случайной цитатой',
    type: 'website',
  },
};

export default function RandomQuotePage() {
  return <RandomQuoteClient />;
}