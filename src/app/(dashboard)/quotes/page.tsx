import type { Metadata } from 'next';
import QuotesListPageClient from './client-page';

export const metadata: Metadata = {
  title: 'Лента цитат | Quote App',
  description: 'Читайте и делитесь вдохновляющими цитатами с сообществом',
};

export default function QuotesListPage() {
  return <QuotesListPageClient />;
}