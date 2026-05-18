import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, PRIVATE_ROUTES, PUBLIC_ONLY_ROUTES } from '@/shared/config/routes';

// Функция для получения токена из cookies
function getTokenFromCookies(request: NextRequest): string | undefined {
  return request.cookies.get('accessToken')?.value;
}

// Функция для проверки, является ли маршрут защищенным
function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTES.some(route => pathname.startsWith(route));
}

// Функция для проверки, предназначен ли маршрут только для неавторизованных
function isPublicOnlyRoute(pathname: string): boolean {
  return PUBLIC_ONLY_ROUTES.some(route => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromCookies(request);
  const isAuthenticated = !!token;

  // Случай 1: Защищенный маршрут - проверяем авторизацию
  if (isPrivateRoute(pathname) && !isAuthenticated) {
    // Сохраняем URL, на который пытался перейти пользователь, для редиректа после логина
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Случай 2: Маршрут только для неавторизованных (логин, регистрация)
  if (isPublicOnlyRoute(pathname) && isAuthenticated) {
    // Редиректим авторизованных пользователей в профиль
    return NextResponse.redirect(new URL(ROUTES.PROFILE, request.url));
  }

  // Случай 3: Корневой путь '/' - редиректим в зависимости от статуса
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.PROFILE, request.url));
    } else {
      return NextResponse.redirect(new URL(ROUTES.LANDING, request.url));
    }
  }

  // Во всех остальных случаях продолжаем выполнение
  return NextResponse.next();
}

// Конфигурация: на каких путях запускать middleware
export const config = {
  matcher: [
    /*
     * Запускаем middleware на всех путях, кроме:
     * - _next/static (статические файлы)
     * - _next/image (оптимизация изображений)
     * - favicon.ico (иконка)
     * - public папка
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};