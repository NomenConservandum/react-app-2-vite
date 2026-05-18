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
    
    // Инициализация: проверяем есть ли токен при загрузке
    this.initializeAuth();
  }

  private initializeAuth = async () => {
    const token = getAccessToken();
    if (token) {
      this.accessToken = token;
      this.isAuth = true;
      // Проверяем валидность токена
      try {
        await this.checkAuth();
      } catch (error) {
        this.logout();
      }
    }
    runInAction(() => {
      this.isInitialized = true;
    });
  };

  // ... остальные методы остаются без изменений
  setAuth = (data: AuthResponse) => {
    this.user = data.user;
    this.accessToken = data.accessToken;
    this.isAuth = true;
    setTokens(data.accessToken, data.refreshToken);
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
    runInAction(() => {
      this.user = response.user;
      this.accessToken = response.accessToken;
      this.isAuth = true;
      // Токены уже сохраняются в setAuth через setTokens
    });
    return response;
  } catch (error: any) {
    this.rootStore.settingsStore.setError(error.message || 'Ошибка входа');
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
      this.rootStore.settingsStore.setError(error.message || 'Ошибка регистрации');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  checkAuth = async () => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      const user = await authApi.check();
      runInAction(() => {
        this.user = user;
        this.isAuth = true;
      });
    } catch (error) {
      this.logout();
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };
}