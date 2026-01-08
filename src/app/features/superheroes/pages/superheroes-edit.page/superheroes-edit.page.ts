import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superhero.model';
import { SuperheroMetadata } from '../../models/superhero-metadata';
import { NgFor, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import {
  bindFormFromHero,
  mapToApi,
  buildSuperheroForm,
} from '../../../../shared/utils/superhero-form.utils';
import { ToastService } from '../../../../core/services/toast.service';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-superheroes-edit.page',
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './superheroes-edit.page.html',
  styleUrl: './superheroes-edit.page.css',
})
export class SuperheroesEditPage {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private superheroService = inject(SuperheroService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private modalService = inject(ModalService);

  superheroId!: number;
  superhero!: Superhero;
  metadata!: SuperheroMetadata;
  loading = true;
  apiUrl = environment.apiUrl;

  readonly form = buildSuperheroForm(this.fb);

  ngOnInit() {
    this.superheroId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  private loadData() {
    forkJoin({
      hero: this.superheroService.getById(this.superheroId),
      metadata: this.superheroService.getMetadata(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ hero, metadata }) => {
        this.superhero = hero;
        this.metadata = metadata;
        this.bindForm(this.superhero);
        this.loading = false;
      });
  }

  private bindForm(hero: Superhero) {
    bindFormFromHero(this.form, hero);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = mapToApi(this.form.getRawValue());

    this.superheroService
      .updateSuperhero(this.superheroId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastService
          .success$('Superhero updated successfully!')
          .subscribe(() => this.router.navigate(['/superheroes']));
      });
  }

  async deleteSuperhero() {
    const confirmed = await this.modalService.confirm({
      title: 'Profile deletion',
      message: `Are you sure you want to delete "${this.superhero.name}" profile?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      danger: true,
    });

    if (!confirmed) return;

    this.superheroService
      .deleteSuperhero(this.superheroId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastService
          .success$('Superhero deleted successfully!')
          .subscribe(() => this.router.navigate(['/superheroes']));
      });
  }
}
