'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/lib/mobxStore';
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

    // Защищенные маршруты
    if (isPrivateRoute(pathname) && !authStore.isAuth) {
      router.push(`${ROUTES.LOGIN}?from=${encodeURIComponent(pathname)}`);
      return;
    }

    // Маршруты только для неавторизованных
    if (isPublicOnlyRoute(pathname) && authStore.isAuth) {
      router.push(ROUTES.PROFILE);
      return;
    }

    // Корневой путь - редирект
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
  return function ComponentWithAuth(props: P) {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Загрузка...</div>
        </div>
      );
    }

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}