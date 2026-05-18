import type { Metadata } from 'next';
import LoginPageClient from './client-page';

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Войдите в свой аккаунт Quote App',
};

export default function LoginPage() {
  return <LoginPageClient />;
}