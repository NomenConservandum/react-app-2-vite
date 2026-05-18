import Cookies from 'js-cookie';

// Ключи для хранения в cookies
const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Сохранение токенов
export const setTokens = (accessToken: string, refreshToken: string): void => {
  Cookies.set(TOKEN_KEY, accessToken, { 
    expires: 1, // 1 день
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 7, // 7 дней
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

// Получение access токена
export const getAccessToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

// Получение refresh токена
export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

// Удаление токенов (при выходе)
export const removeTokens = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};