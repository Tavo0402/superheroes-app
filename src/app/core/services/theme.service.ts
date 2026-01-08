import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.applyTheme(theme);
    });
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) ?? 'auto';
  }

  private applyTheme(theme: Theme) {
    const resolvedTheme =
      theme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
  }
}
