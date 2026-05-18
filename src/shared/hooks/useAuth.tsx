'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/lib/mobxStore';
import { Box, CircularProgress, Typography } from '@mui/material/';
import { ROUTES, PRIVATE_ROUTES, PUBLIC_ONLY_ROUTES } from '@/shared/config/routes';

export const useAuth = () => {
  const { authStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const isPrivateRoute = (path: string): boolean => {
    return PRIVATE_ROUTES.some(route => path.startsWith(route));
  };

  const isPublicOnlyRoute = (path: string): boolean => {
    return PUBLIC_ONLY_ROUTES.some(route => path.startsWith(route));
  };

  useEffect(() => {
    if (!authStore.isInitialized) return;

    if (isPrivateRoute(pathname) && !authStore.isAuth) {
      router.push(`${ROUTES.LOGIN}?from=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isPublicOnlyRoute(pathname) && authStore.isAuth) {
      router.push(ROUTES.PROFILE);
      return;
    }

    if (pathname === ROUTES.HOME) {
      if (authStore.isAuth) {
        router.push(ROUTES.PROFILE);
      } else {
        router.push(ROUTES.LANDING);
      }
    }
  }, [pathname, authStore.isAuth, authStore.isInitialized, router]);

  return {
    isAuth: authStore.isAuth,
    user: authStore.user,
    isLoading: !authStore.isInitialized,
  };
};

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Загрузка...</Typography>
        </Box>
      );
    }

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
}