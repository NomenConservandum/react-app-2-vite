'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/lib/mobxStore';
import { observer } from 'mobx-react-lite';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true - требует авторизации, false - только для неавторизованных
  redirectTo?: string;
}

export const AuthGuard = observer(({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}: AuthGuardProps) => {
  const { authStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authStore.isInitialized) return;

    if (requireAuth && !authStore.isAuth) {
      router.push(`${redirectTo}?from=${encodeURIComponent(pathname)}`);
    }

    if (!requireAuth && authStore.isAuth) {
      router.push('/profile');
    }
  }, [authStore.isAuth, authStore.isInitialized, requireAuth, router, pathname, redirectTo]);

  // Показываем загрузку только если store инициализируется
  if (!authStore.isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Если условие не выполняется, показываем children
  if (requireAuth && authStore.isAuth) {
    return <>{children}</>;
  }

  if (!requireAuth && !authStore.isAuth) {
    return <>{children}</>;
  }

  // Во всех остальных случаях показываем null (редирект произойдет в useEffect)
  return null;
});