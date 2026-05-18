import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import type { User, LoginUser, RegisterUserData, AuthResponse } from '@/entities/User/model/types';
import { authApi } from '@/entities/User/api/authApi';
import { setTokens, removeTokens, getAccessToken } from '@/shared/utils/cookie';

export class AuthStore {
  user: User | null = null;
  isAuth: boolean = false;
  accessToken: string | null = null;
  isInitialized: boolean = false;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.initializeAuth();
  }

  checkTokenAndAuth = async () => {
    const token = getAccessToken();
    console.log('checkTokenAndAuth - token exists:', !!token);
    
    if (token) {
      this.accessToken = token;
      this.isAuth = true;
      try {
        await this.checkAuth();
        console.log('checkTokenAndAuth - auth check passed');
      } catch (error) {
        console.log('checkTokenAndAuth - auth check failed, logging out');
        this.logout();
      }
    } else {
      console.log('checkTokenAndAuth - no token, setting initialized');
    }
    
    runInAction(() => {
      this.isInitialized = true;
    });
  };

  private initializeAuth = async () => {
    await this.checkTokenAndAuth();
  };

  setAuth = (response: any) => {
    // Адаптируемся к разным форматам ответа
    let token = null;
    let userData = null;
    
    // Если ответ - строка (просто токен)
    if (typeof response === 'string') {
      token = response;
    }
    // Если ответ содержит поле accessToken
    else if (response.accessToken) {
      token = response.accessToken;
      userData = response.user;
    }
    // Если ответ содержит поле token
    else if (response.token) {
      token = response.token;
      userData = response.user;
    }
    
    if (token) {
      this.accessToken = token;
      this.isAuth = true;
      setTokens(token, token); // Если нет refresh token, используем тот же
    }
    
    if (userData) {
      this.user = userData;
    }
  };

  logout = () => {
    this.user = null;
    this.accessToken = null;
    this.isAuth = false;
    removeTokens();
  };

  login = async (credentials: LoginUser) => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      const response = await authApi.login(credentials);
      
      console.log('Login response in store:', response); // Для отладки
      
      runInAction(() => {
        this.setAuth(response);
      });
      
      return response;
    } catch (error: any) {
      console.log('Login error:', error);
      this.rootStore.settingsStore.setError(error.response?.data?.title || error.message || 'Ошибка входа');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  register = async (data: RegisterUserData) => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      await authApi.register(data);
    } catch (error: any) {
      this.rootStore.settingsStore.setError(error.response?.data?.title || 'Ошибка регистрации');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  checkAuth = async () => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      console.log('checkAuth - attempting to get user profile');
      
      // Пробуем использовать getMyProfile вместо check
      const user = await authApi.getMyProfile();
      
      console.log('checkAuth - user received:', user);
      
      runInAction(() => {
        this.user = user;
        this.isAuth = true;
      });
      
      return user;
    } catch (error: any) {
      console.log('checkAuth - error:', error.response?.status, error.response?.data);
      
      // Если getMyProfile не работает, пробуем check
      try {
        console.log('checkAuth - trying Auth/Check as fallback');
        const user = await authApi.check();
        runInAction(() => {
          this.user = user;
          this.isAuth = true;
        });
        return user;
      } catch (fallbackError) {
        console.log('checkAuth - both endpoints failed');
        this.logout();
        throw fallbackError;
      }
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };
}