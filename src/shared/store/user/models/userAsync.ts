import { UserState } from './userState';
import { UserSync } from './userSync';
import { authApi } from '@/entities/User/api/authApi';
import { getAccessToken } from '@/shared/utils/cookie';
import type { RootStore } from '../..';
import type { LoginUser, RegisterUserData } from '@/entities/User/model/types';

export class UserAsync {
  constructor(
    private state: UserState,
    private sync: UserSync,
    private rootStore: RootStore
  ) {}

  initializeAuth = async () => {
    const token = getAccessToken();
    if (token) {
      this.state.accessToken = token;
      this.state.isAuth = true;
      try {
        await this.checkAuth();
      } catch (error) {
        this.sync.logout();
      }
    }
    this.sync.setInitialized(true);
  };

  login = async (credentials: LoginUser) => {
    try {
      this.rootStore.settingsStore.sync.setLoading(true);
      const response = await authApi.login(credentials);
      this.sync.setAuth(response);
      if (!this.state.user && this.state.accessToken) {
        const user = await authApi.getMyProfile();
        this.sync.setUser(user);
      }
      return response;
    } catch (error: any) {
      this.rootStore.settingsStore.sync.setError(error.response?.data?.title || 'Ошибка входа');
      throw error;
    } finally {
      this.rootStore.settingsStore.sync.setLoading(false); 
    }
  };

  register = async (data: RegisterUserData) => {
    try {
      this.rootStore.settingsStore.sync.setLoading(true);
      await authApi.register(data);
    } catch (error: any) {
      this.rootStore.settingsStore.sync.setError(error.response?.data?.title || 'Ошибка регистрации');
      throw error;
    } finally {
      this.rootStore.settingsStore.sync.setLoading(false);
    }
  };

  checkAuth = async () => {
    try {
      this.rootStore.settingsStore.sync.setLoading(true);
      const user = await authApi.getMyProfile();
      this.sync.setUser(user);
      this.state.isAuth = true;
      return user;
    } catch (error) {
      this.sync.logout();
      throw error;
    } finally {
      this.rootStore.settingsStore.sync.setLoading(false);
    }
  };
}