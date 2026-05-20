import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

export class ThemeStore {
  mode: 'light' | 'dark' = 'light';

  constructor() {
    makeAutoObservable(this);
    this.initializeTheme();
  }

  private initializeTheme = () => {
    if (typeof window === 'undefined') return;
    // Читаем актуальный класс с html (уже установлен скриптом)
    const isDark = document.documentElement.classList.contains('dark');
    this.mode = isDark ? 'dark' : 'light';
    // Синхронизируем cookies/localStorage (на случай, если скрипт их не записал)
    const saved = localStorage.getItem('theme');
    if (!saved) localStorage.setItem('theme', this.mode);
    if (!Cookies.get('theme')) Cookies.set('theme', this.mode, { expires: 365 });
  };

  toggleTheme = () => {
    const newMode = this.mode === 'light' ? 'dark' : 'light';
    this.mode = newMode;
    this.applyTheme(newMode);
  };

  private applyTheme = (mode: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
    Cookies.set('theme', mode, { expires: 365 });
  };
}