import { makeAutoObservable } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import Cookies from 'js-cookie';

export type ThemeMode = 'light' | 'dark';

export class ThemeStore {
  mode: ThemeMode = 'light';
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.initializeTheme();
  }

  private initializeTheme = () => {
    if (typeof window === 'undefined') return;
    
    // 1. Проверяем сохраненную тему в cookies (приоритет)
    const savedTheme = Cookies.get('theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.mode = savedTheme;
      this.applyTheme(savedTheme);
      return;
    }
    
    // 2. Проверяем сохраненную тему в localStorage
    const localTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      this.mode = localTheme;
      this.applyTheme(localTheme);
      return;
    }
    
    // 3. Проверяем тему браузера
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const browserTheme = prefersDark ? 'dark' : 'light';
    this.mode = browserTheme;
    this.applyTheme(browserTheme);
  };

  private applyTheme = (mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    
    // Обновляем класс на html элементе
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Сохраняем в localStorage и cookies
    localStorage.setItem('theme', mode);
    Cookies.set('theme', mode, { expires: 365, path: '/' });
  };

  toggleTheme = () => {
    const newMode = this.mode === 'light' ? 'dark' : 'light';
    this.mode = newMode;
    this.applyTheme(newMode);
  };

  setTheme = (mode: ThemeMode) => {
    this.mode = mode;
    this.applyTheme(mode);
  };
}