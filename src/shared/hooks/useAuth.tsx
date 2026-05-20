'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/lib/mobxStore';
import { ROUTES, PRIVATE_ROUTES, PUBLIC_ONLY_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes';

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

  const isPublicRoute = (path: string): boolean => {
    return PUBLIC_ROUTES.some(route => path === route);
  };

  useEffect(() => {
    if (!authStore.isInitialized) return;

    // Если пользователь авторизован и пытается зайти на страницы для неавторизованных
    if (authStore.isAuth && isPublicOnlyRoute(pathname)) {
      router.replace(ROUTES.PROFILE);
      return;
    }

    // Защищенные маршруты
    if (isPrivateRoute(pathname) && !authStore.isAuth) {
      router.replace(`${ROUTES.LOGIN}?from=${encodeURIComponent(pathname)}`);
      return;
    }

    // Лендинг (корневая страница для неавторизованных)
    if (pathname === ROUTES.LANDING && authStore.isAuth) {
      router.replace(ROUTES.PROFILE);
      return;
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