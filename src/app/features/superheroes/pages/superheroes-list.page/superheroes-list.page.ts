import { Component, inject } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superhero.model';
import { NgFor, NgIf } from '@angular/common';
import { mergeMap, retryWhen, scan, Subscription, take, timer } from 'rxjs';
import { SuperheroCard } from '../../components/superhero-card/superhero-card';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ToastService } from '../../../../core/services/toast.service';

const components = [SuperheroCard, LoadingSpinner];
@Component({
  selector: 'app-superheroes-list',
  imports: [NgIf, NgFor, ...components],
  templateUrl: './superheroes-list.page.html',
  styleUrl: './superheroes-list.page.css',
})
export class SuperheroesListPage {
  private superheroService = inject(SuperheroService);

  superheroes: Superhero[] = [];
  loading: boolean = false;
  suscription: Subscription = new Subscription();

  ngOnInit() {
    this.suscription.add(this.getAllSuperheroes());
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  getAllSuperheroes() {
    this.loading = true;
    this.superheroService
      .getAll()
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            scan((count) => count + 1, 0),
            mergeMap((count) => timer(Math.pow(2, count) * 1000)),
            take(3)
          )
        )
      )
      .subscribe({
        next: (data) => {
          this.superheroes = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error después de reintentos:', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
