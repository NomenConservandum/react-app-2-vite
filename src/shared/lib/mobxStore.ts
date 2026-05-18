import { AuthStore } from '@/features/auth/model/AuthStore';
import { QuotesStore } from '@/features/quotes/model/QuotesStore';
import { UserStore } from '@/features/user/model/UserStore';
import { SettingsStore } from '@/features/settings/model/SettingsStore';
import React from 'react';

// Корневой класс Store - собирает все дочерние store'ы
// Реализует паттерн Service Locator
export class RootStore {
  authStore: AuthStore;
  quotesStore: QuotesStore;
  userStore: UserStore;
  settingsStore: SettingsStore;

  constructor() {
    // Передаем this (корневой store) во все дочерние store'ы
    // Это позволяет им взаимодействовать друг с другом
    this.authStore = new AuthStore(this);
    this.quotesStore = new QuotesStore(this);
    this.userStore = new UserStore(this);
    this.settingsStore = new SettingsStore(this);
  }
}

// Создаем единственный экземпляр корневого store
export const rootStore = new RootStore();

// Создаем React Context для передачи store в компоненты
export const StoreContext = React.createContext<RootStore>(rootStore);

// Хук для использования store в компонентах
export const useStore = () => React.useContext(StoreContext);