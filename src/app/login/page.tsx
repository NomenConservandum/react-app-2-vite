import type { Metadata } from 'next';
import LoginPageClient from './client-page';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ROUTES } from '@/shared/config/routes';

export const metadata: Metadata = {
  title: 'Вход | Quote App',
  description: 'Войдите в свой аккаунт Quote App',
};

export default async function LoginPage() {
  // Проверка на сервере: если пользователь уже авторизован, редиректим
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  
  if (token) {
    redirect(ROUTES.PROFILE);
  }
  
  return <LoginPageClient />;
}