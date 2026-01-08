import { Routes } from '@angular/router';
import { SuperheroesDetailsPage } from './pages/superheroes-details.page/superheroes-details.page';
import { SuperheroesListPage } from './pages/superheroes-list.page/superheroes-list.page';
import { SuperheroesNewPage } from './pages/superheroes-new.page/superheroes-new.page';
import { SuperheroesEditPage } from './pages/superheroes-edit.page/superheroes-edit.page';
import { NotFoundPage } from '../not-found/pages/not-found.page/not-found.page';

export const superheroesRoutes: Routes = [
  { path: '', component: SuperheroesListPage },
  { path: 'new', component: SuperheroesNewPage },
  { path: 'not-found', component: NotFoundPage },
  { path: ':id/edit', component: SuperheroesEditPage },
  { path: ':id', component: SuperheroesDetailsPage },
];
