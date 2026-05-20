import { SettingsState } from './models/settingsState';
import { SettingsSync } from './models/settingsSync';
import { SettingsAsync } from './models/settingsAsync';
import type { RootStore } from '../index';
import type { ThemeMode } from './models/settingsState';

export class SettingsStore {
  state: SettingsState;
  sync: SettingsSync;
  async: SettingsAsync;

  constructor(rootStore: RootStore) {
    this.state = new SettingsState();
    this.sync = new SettingsSync(this.state);
    this.async = new SettingsAsync(this.state, this.sync, rootStore);
    
    // Инициализация темы после создания async
    this.async.initializeTheme();
    this.async.watchSystemTheme();
    
    // Привязываем методы
    this.setLoading = this.setLoading.bind(this);
    this.setError = this.setError.bind(this);
    this.clearError = this.clearError.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }

  // Прокси для удобства использования
  get isLoading() { return this.state.isLoading; }
  get error() { return this.state.error; }
  get themeMode() { return this.state.themeMode; }
  get isDarkTheme() { return this.state.isDarkTheme; }
  get isLightTheme() { return this.state.isLightTheme; }

  // Прокси для методов
  setLoading(isLoading: boolean) {
    return this.sync.setLoading(isLoading);
  }

  setError(error: string | null) {
    return this.sync.setError(error);
  }

  clearError() {
    return this.sync.clearError();
  }

  toggleTheme() {
    return this.async.toggleTheme();
  }

  setTheme(mode: ThemeMode) {
    return this.async.setTheme(mode);
  }
}