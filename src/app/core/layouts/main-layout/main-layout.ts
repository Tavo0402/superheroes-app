import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';

const components = [Header, ThemeToggle, ToastContainer];

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, ...components],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
