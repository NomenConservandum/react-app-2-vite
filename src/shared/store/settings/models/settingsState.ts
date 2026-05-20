import { makeAutoObservable } from 'mobx';

export type ThemeMode = 'light' | 'dark';

export class SettingsState {
  isLoading: boolean = false;
  error: string | null = null;
  themeMode: ThemeMode = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  // Геттеры (computed values)
  get isDarkTheme(): boolean {
    return this.themeMode === 'dark';
  }

  get isLightTheme(): boolean {
    return this.themeMode === 'light';
  }
}