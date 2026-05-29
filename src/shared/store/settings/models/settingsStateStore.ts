import { makeAutoObservable } from 'mobx';

export type ThemeMode = 'light' | 'dark';

export class SettingsStateStore {
  isLoading: boolean = false;
  error: string | null = null;
  themeMode: ThemeMode = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  get isDarkTheme(): boolean {
    return this.themeMode === 'dark';
  }

  get isLightTheme(): boolean {
    return this.themeMode === 'light';
  }
}