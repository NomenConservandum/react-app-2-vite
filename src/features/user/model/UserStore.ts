import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import type { User } from '@/entities/User/model/types';
import { userApi } from '@/entities/User/api/userApi';

export class UserStore {
  profile: User | null = null;
  
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  // Actions
  setProfile = (user: User) => {
    this.profile = user;
  };

  clearProfile = () => {
    this.profile = null;
  };

  // Async actions
  fetchProfile = async () => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      const user = await userApi.getMyProfile();
      runInAction(() => {
        this.profile = user;
      });
      return user;
    } catch (error: any) {
      this.rootStore.settingsStore.setError(error.message || 'Ошибка загрузки профиля');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };
}