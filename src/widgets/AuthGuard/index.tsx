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
    if (!userStore.state.isInitialized) return;

    if (requireAuth && !userStore.state.isAuth) {
      router.push(`${redirectTo}?from=${encodeURIComponent(pathname)}`);
    }

    if (!requireAuth && userStore.state.isAuth) {
      router.push('/profile');
    }
  }, [userStore.state.isAuth, userStore.state.isInitialized, requireAuth, router, pathname, redirectTo]);

  if (!userStore.state.isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (requireAuth && userStore.state.isAuth) {
    return <>{children}</>;
  }

  if (!requireAuth && !userStore.state.isAuth) {
    return <>{children}</>;
  }

  return null;
});