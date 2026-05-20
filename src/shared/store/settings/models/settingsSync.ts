import { SettingsState, ThemeMode } from './settingsState';
import Cookies from 'js-cookie';

export class SettingsSync {
  constructor(private state: SettingsState) {}

  setLoading = (isLoading: boolean) => {
    this.state.isLoading = isLoading;
  };

  setError = (error: string | null) => {
    this.state.error = error;
  };

  clearError = () => {
    this.state.error = null;
  };

  setThemeMode = (mode: ThemeMode) => {
    this.state.themeMode = mode;
  };

  applyTheme = (mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', mode);
    Cookies.set('theme', mode, { expires: 365, path: '/' });
  };
}