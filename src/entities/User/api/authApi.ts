import { api } from '@/shared/api/axiosInstance';
import type { User, RegisterUserData, LoginUser, AuthResponse } from '../model/types';

export const authApi = {
  register: async (data: RegisterUserData): Promise<void> => {
    await api.post('/api/Auth/Registration', data);
  },

  login: async (data: LoginUser): Promise<AuthResponse> => {
    const response = await api.post('/api/Auth/Login', data);
    console.log('Login response:', response.data);
    return response.data;
  },

  check: async (): Promise<User> => {
    try {
      const response = await api.get('/api/Auth/Check');
      console.log('Check response (Auth/Check):', response.data);
      return response.data;
    } catch (error) {
      console.log('Auth/Check failed:', error);
      throw error;
    }
  },

  getMyProfile: async (): Promise<User> => {
    try {
      const response = await api.get('/api/User/myprofile');
      console.log('Profile response (User/myprofile):', response.data);
      return response.data;
    } catch (error) {
      console.error('User/myprofile failed:', error);
      throw error;
    }
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.get('/api/Auth/RefreshTokens', {
      params: { oldRefreshToken: refreshToken }
    });
    return response.data;
  },
};