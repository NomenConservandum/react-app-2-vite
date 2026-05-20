import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import type { User, LoginUser, RegisterUserData } from '@/entities/User/model/types';
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

  private initializeAuth = async () => {
    const token = getAccessToken();
    if (token) {
      this.accessToken = token;
      try {
        const user = await authApi.getMyProfile();
        runInAction(() => {
          this.user = user;
          this.isAuth = true;
        });
      } catch (error) {
        console.error('Auth initialization failed:', error);
        this.logout();
      }
    }
    runInAction(() => {
      this.isInitialized = true;
    });
  };

  setAuth = (response: any) => {
    let token = null;
    let userData = null;
    if (typeof response === 'string') {
      token = response;
    } else if (response.accessToken) {
      token = response.accessToken;
      userData = response.user;
    } else if (response.token) {
      token = response.token;
      userData = response.user;
    }
    if (token) {
      this.accessToken = token;
      this.isAuth = true;
      setTokens(token, token);
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
      runInAction(() => {
        this.setAuth(response);
      });
      // После логина сразу получаем профиль (если не пришёл в ответе)
      if (!this.user && this.accessToken) {
        const user = await authApi.getMyProfile();
        runInAction(() => {
          this.user = user;
        });
      }
      return response;
    } catch (error: any) {
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
}