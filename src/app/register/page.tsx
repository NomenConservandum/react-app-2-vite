import type { Metadata } from 'next';
import RegisterPageClient from './client-page';

export const metadata: Metadata = {
  title: 'Регистрация | Quote App',
  description: 'Создайте новый аккаунт в Quote App и начните делиться цитатами',
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}