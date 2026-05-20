'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/store';
import { observer } from 'mobx-react-lite';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const AuthGuard = observer(({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}: AuthGuardProps) => {
  const { userStore } = useStore();  // Изменено с authStore на userStore
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!userStore.isInitialized) return;

    if (requireAuth && !userStore.isAuth) {
      router.push(`${redirectTo}?from=${encodeURIComponent(pathname)}`);
    }

    if (!requireAuth && userStore.isAuth) {
      router.push('/profile');
    }
  }, [userStore.isAuth, userStore.isInitialized, requireAuth, router, pathname, redirectTo]);

  if (!userStore.isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (requireAuth && userStore.isAuth) {
    return <>{children}</>;
  }

  if (!requireAuth && !userStore.isAuth) {
    return <>{children}</>;
  }

  return null;
});