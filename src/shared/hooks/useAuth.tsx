'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/shared/store';
import { ROUTES, PRIVATE_ROUTES, PUBLIC_ONLY_ROUTES } from '@/shared/config/routes';

export const useAuth = () => {
  const { userStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const isPrivateRoute = (path: string): boolean => {
    return PRIVATE_ROUTES.some(route => path.startsWith(route));
  };

  const isPublicOnlyRoute = (path: string): boolean => {
    return PUBLIC_ONLY_ROUTES.some(route => path.startsWith(route));
  };

  useEffect(() => {
    if (!userStore.state.isInitialized) return;

    // Защищенные маршруты
    if (isPrivateRoute(pathname) && !userStore.state.isAuth) {
      router.push(`${ROUTES.LOGIN}?from=${encodeURIComponent(pathname)}`);
      return;
    }

    // Маршруты только для неавторизованных
    if (isPublicOnlyRoute(pathname) && userStore.state.isAuth) {
      router.push(ROUTES.PROFILE);
      return;
    }

    // Корневой путь - редирект
    if (pathname === ROUTES.HOME) {
      if (userStore.state.isAuth) {
        router.push(ROUTES.PROFILE);
      } else {
        router.push(ROUTES.LANDING);
      }
    }
  }, [pathname, userStore.state.isAuth, userStore.state.isInitialized, router]);

  return {
    isAuth: userStore.state.isAuth,
    user: userStore.state.user,
    isLoading: !userStore.state.isInitialized,
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