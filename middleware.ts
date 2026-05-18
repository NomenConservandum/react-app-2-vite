import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, PRIVATE_ROUTES, PUBLIC_ONLY_ROUTES } from '@/shared/config/routes';

function getTokenFromCookies(request: NextRequest): string | undefined {
  const token = request.cookies.get('accessToken')?.value;
  console.log('Middleware - path:', request.nextUrl.pathname);
  console.log('Middleware - token exists:', !!token);
  if (token) {
    console.log('Middleware - token preview:', token.substring(0, 50) + '...');
  }
  return token;
}

function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTES.some(route => pathname.startsWith(route));
}

function isPublicOnlyRoute(pathname: string): boolean {
  return PUBLIC_ONLY_ROUTES.some(route => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromCookies(request);
  const isAuthenticated = !!token;

  console.log('Middleware - isAuthenticated:', isAuthenticated);
  console.log('Middleware - isPrivateRoute:', isPrivateRoute(pathname));
  console.log('Middleware - isPublicOnlyRoute:', isPublicOnlyRoute(pathname));

  /*
  // Защищенные маршруты
  if (isPrivateRoute(pathname) && !isAuthenticated) {
    console.log('Middleware - redirect to login from:', pathname);
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  */

  // Маршруты только для неавторизованных
  if (isPublicOnlyRoute(pathname) && isAuthenticated) {
    console.log('Middleware - redirect to profile from:', pathname);
    return NextResponse.redirect(new URL(ROUTES.PROFILE, request.url));
  }

  console.log('Middleware - allow access to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};