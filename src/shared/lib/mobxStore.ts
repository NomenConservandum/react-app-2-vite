import { AuthStore } from '@/features/auth/model/AuthStore';
import { QuotesStore } from '@/features/quotes/model/QuotesStore';
import { UserStore } from '@/features/user/model/UserStore';
import { SettingsStore } from '@/features/settings/model/SettingsStore';
import { ThemeStore } from '@/features/theme/model/ThemeStore';
import React from 'react';

export class RootStore {
  authStore: AuthStore;
  quotesStore: QuotesStore;
  userStore: UserStore;
  settingsStore: SettingsStore;
  themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.quotesStore = new QuotesStore(this);
    this.userStore = new UserStore(this);
    this.settingsStore = new SettingsStore(this);
    this.themeStore = new ThemeStore(this);
  }
}

// Создаем единственный экземпляр корневого store
export const rootStore = new RootStore();

// Создаем React Context для передачи store в компоненты
export const StoreContext = React.createContext<RootStore>(rootStore);

// Хук для использования store в компонентах
export const useStore = () => React.useContext(StoreContext);