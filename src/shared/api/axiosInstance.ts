import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from '@/shared/utils/cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Создаем экземпляр axios с базовыми настройками
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Интерсептор запросов: добавляем токен авторизации
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор ответов: обработка ошибок и обновление токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если ошибка не 401 или запрос уже повторялся
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    originalRequest._retry = true;
    
    // Если уже идет процесс обновления, добавляем запрос в очередь
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }
    
    isRefreshing = true;
    
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }
      
      // Запрос на обновление токена
      const response = await axios.post(`${API_URL}/api/Auth/Refresh`, {
        refreshToken,
      });
      
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      setTokens(accessToken, newRefreshToken);
      
      // Обновляем заголовок для оригинального запроса
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      
      // Обрабатываем очередь запросов
      processQueue(null, accessToken);
      
      return api(originalRequest);
    } catch (refreshError) {
      // Если обновление не удалось, очищаем токены и переходим на страницу логина
      removeTokens();
      processQueue(refreshError, null);
      
      // Перенаправляем на страницу логина, если это клиентская среда
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);