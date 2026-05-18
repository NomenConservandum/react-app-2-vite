import { makeAutoObservable } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';

export class SettingsStore {
  isLoading: boolean = false;
  error: string | null = null;
  
  // Ссылка на корневой store (для доступа к другим store'ам если нужно)
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  // Actions
  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  clearError = () => {
    this.error = null;
  };
}