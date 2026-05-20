import type { Metadata } from 'next';
import ProfilePageClient from './client-page';

export const metadata: Metadata = {
  title: 'Личный кабинет | Quote App',
  description: 'Управление профилем, просмотр и создание цитат',
  robots: 'noindex, follow',
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}