import { Component, computed, inject } from '@angular/core';
import { Theme, ThemeService } from '../../../services/theme.service';
import { NgIf } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theme-toggle',
  imports: [NgIf, NgbDropdownModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;

  icon = computed(() => {
    switch (this.currentTheme()) {
      case 'light':
        return 'bi-sun-fill';
      case 'dark':
        return 'bi-moon-stars-fill';
      default:
        return 'bi-circle-half';
    }
  });

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
