// Константы маршрутов для централизованного использования
export const ROUTES = {
  // Публичные маршруты
  HOME: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Защищенные маршруты
  PROFILE: '/profile',
  QUOTES: '/quotes',
  QUOTES_RANDOM: '/quotes/random',
  QUOTES_CREATE: '/quotes/create',
  
  // Ошибки
  NOT_FOUND: '/404',
} as const;

// Маршруты, требующие авторизации
export const PRIVATE_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.QUOTES,
  ROUTES.QUOTES_RANDOM,
  ROUTES.QUOTES_CREATE,
] as const;

// Маршруты для неавторизованных пользователей
export const PUBLIC_ONLY_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;