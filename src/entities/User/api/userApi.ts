import { api } from '@/shared/api/axiosInstance';
import type { User } from '../model/types';

export const userApi = {
  // Получение профиля текущего пользователя
  getMyProfile: async (): Promise<User> => {
    const response = await api.get('/api/User/myprofile');
    return response.data;
  },

  // Обновление профиля (если нужно)
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/api/User/profile', data);
    return response.data;
  },
};