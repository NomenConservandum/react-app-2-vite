import { api } from '@/shared/api/axiosInstance';
import type { User, RegisterUserData, LoginUser, AuthResponse } from '../model/types';

export const authApi = {
  // Регистрация
  register: async (data: RegisterUserData): Promise<void> => {
    await api.post('/api/Auth/Registration', data);
  },

  // Логин
  login: async (data: LoginUser): Promise<AuthResponse> => {
    const response = await api.post('/api/Auth/Login', data);
    return response.data;
  },

  // Проверка авторизации
  check: async (): Promise<User> => {
    const response = await api.get('/api/Auth/Check');
    return response.data;
  },

  // Обновление токена
  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post('/api/Auth/Refresh', { refreshToken });
    return response.data;
  },
};