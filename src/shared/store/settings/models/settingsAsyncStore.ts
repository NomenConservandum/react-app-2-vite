import type { SettingsStateStore, ThemeMode } from './settingsStateStore';
import type { SettingsSyncStore } from './settingsSyncStore';

export class SettingsAsyncStore {
  constructor(
    private state: SettingsStateStore,
    private sync: SettingsSyncStore
  ) {}

  initializeTheme() {
    if (typeof window === 'undefined') return;
    const cookiesTheme = document.cookie.match(/theme=([^;]+)/)?.[1] as ThemeMode | null;
    if (cookiesTheme && (cookiesTheme === 'light' || cookiesTheme === 'dark')) {
      this.sync.setThemeMode(cookiesTheme);
      this.sync.applyTheme(cookiesTheme);
      return;
    }
    const localTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      this.sync.setThemeMode(localTheme);
      this.sync.applyTheme(localTheme);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    this.sync.setThemeMode(systemTheme);
    this.sync.applyTheme(systemTheme);
  }

  toggleTheme() {
    const newMode = this.state.themeMode === 'light' ? 'dark' : 'light';
    this.sync.setThemeMode(newMode);
    this.sync.applyTheme(newMode);
  }

  setTheme(mode: ThemeMode) {
    this.sync.setThemeMode(mode);
    this.sync.applyTheme(mode);
  }

  watchSystemTheme() {
    if (typeof window === 'undefined') return;
    const hasUserPreference = localStorage.getItem('theme') !== null || document.cookie.match(/theme=[^;]+/);
    if (!hasUserPreference) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        this.setTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
    }
  }
}