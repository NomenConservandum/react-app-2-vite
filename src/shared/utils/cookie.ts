import Cookies from 'js-cookie';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const setTokens = (accessToken: string, refreshToken?: string): void => {
  console.log('Setting token, length:', accessToken.length);
  
  // Убедимся, что токен сохраняется для всех путей
  Cookies.set(TOKEN_KEY, accessToken, {
    expires: 1, // 1 день
    secure: false, // В разработке используем false
    sameSite: 'lax', // Изменено с 'strict' на 'lax'
    path: '/', // Важно: для всех путей
  });
  
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires: 7,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
  }
  
  // Проверим, что токен сохранился
  const savedToken = Cookies.get(TOKEN_KEY);
  console.log('Token saved successfully:', !!savedToken);
};

export const getAccessToken = (): string | undefined => {
  const token = Cookies.get(TOKEN_KEY);
  console.log('Getting token from cookie:', token ? `present (${token.length} chars)` : 'not found');
  return token;
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = (): void => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};