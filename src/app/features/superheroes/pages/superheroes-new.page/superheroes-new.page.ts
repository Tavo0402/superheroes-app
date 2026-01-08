import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';
import {
  bindFormFromHero,
  buildSuperheroForm,
  mapToApi,
} from '../../../../shared/utils/superhero-form.utils';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superhero.model';
import superheroes from '../../../../data/superheroes.json';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-superheroes-new.page',
  imports: [ReactiveFormsModule, NgFor, RouterLink, AsyncPipe],
  templateUrl: './superheroes-new.page.html',
  styleUrl: './superheroes-new.page.css',
})
export class SuperheroesNewPage {
  private fb = inject(FormBuilder);
  private superheroService = inject(SuperheroService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);

  readonly form = buildSuperheroForm(this.fb);

  metadata$ = this.superheroService
    .getMetadata()
    .pipe(shareReplay(1), takeUntilDestroyed(this.destroyRef));

  ngOnInit() {
    this.superheroService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((existingHeroes: any[]) => {
        const existingNames = new Set(existingHeroes.map((h: any) => h.name || h.Name));
        const availableHeroes = (superheroes as any[]).filter(
          (h: any) => !existingNames.has(h.Name || h.name)
        );

        if (availableHeroes.length > 0) {
          this.bindForm(availableHeroes[0] as unknown as Superhero);
        }
      });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = mapToApi(this.form.getRawValue());

    this.superheroService
      .createSuperhero(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastService
          .success$('Superhero created successfully!')
          .subscribe(() => this.router.navigate(['/superheroes']));
      });
  }

  private bindForm(hero: Superhero) {
    bindFormFromHero(this.form, hero);
  }
}
