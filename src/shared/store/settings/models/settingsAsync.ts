import { runInAction } from 'mobx';
import { SettingsState, ThemeMode } from './settingsState';
import { SettingsSync } from './settingsSync';
import type { RootStore } from '../../index';

export class SettingsAsync {
  constructor(
    private state: SettingsState,
    private sync: SettingsSync,
    private rootStore: RootStore
  ) {}

  // Инициализация темы при загрузке приложения
  initializeTheme = () => {
    if (typeof window === 'undefined') return;
    
    // 1. Проверяем сохраненную тему в cookies (приоритет)
    const cookiesTheme = document.cookie.match(/theme=([^;]+)/)?.[1] as ThemeMode | null;
    if (cookiesTheme && (cookiesTheme === 'light' || cookiesTheme === 'dark')) {
      this.sync.setThemeMode(cookiesTheme);
      this.sync.applyTheme(cookiesTheme);
      return;
    }
    
    // 2. Проверяем сохраненную тему в localStorage
    const localTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      this.sync.setThemeMode(localTheme);
      this.sync.applyTheme(localTheme);
      return;
    }
    
    // 3. Определяем тему системы/браузера
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    this.sync.setThemeMode(systemTheme);
    this.sync.applyTheme(systemTheme);
  };

  // Переключение темы (вызывается из UI)
  toggleTheme = () => {
    const newMode = this.state.themeMode === 'light' ? 'dark' : 'light';
    this.sync.setThemeMode(newMode);
    this.sync.applyTheme(newMode);
  };

  // Установка конкретной темы
  setTheme = (mode: ThemeMode) => {
    this.sync.setThemeMode(mode);
    this.sync.applyTheme(mode);
  };

  // Отслеживание изменения системной темы (опционально)
  watchSystemTheme = () => {
    if (typeof window === 'undefined') return;
    
    // Слушаем изменения системной темы только если пользователь явно не выбирал тему
    const hasUserPreference = localStorage.getItem('theme') !== null || 
                               document.cookie.match(/theme=[^;]+/);
    
    if (!hasUserPreference) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        this.setTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
    }
  };
}