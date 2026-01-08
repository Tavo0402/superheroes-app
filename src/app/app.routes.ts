import { Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { NotFoundPage } from './features/not-found/pages/not-found.page/not-found.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'superheroes',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'superheroes',
        loadChildren: () =>
          import('./features/superheroes/superheroes.routes').then((m) => m.superheroesRoutes),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
