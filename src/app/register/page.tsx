import type { Metadata } from 'next';
import RegisterPageClient from './client-page';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ROUTES } from '@/shared/config/routes';

export const metadata: Metadata = {
  title: 'Регистрация | Quote App',
  description: 'Создайте новый аккаунт в Quote App',
};

export default async function RegisterPage() {
  // Проверка на сервере: если пользователь уже авторизован, редиректим
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  
  if (token) {
    redirect(ROUTES.PROFILE);
  }
  
  return <RegisterPageClient />;
}