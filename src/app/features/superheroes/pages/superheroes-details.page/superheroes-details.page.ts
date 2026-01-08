import { Component, inject, Renderer2 } from '@angular/core';
import { Superhero } from '../../models/superhero.model';
import { NgIf, NgFor, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SuperheroService } from '../../services/superhero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-superheroes-details.page',
  imports: [NgIf, NgFor, KeyValuePipe, TitleCasePipe, RouterModule],
  templateUrl: './superheroes-details.page.html',
  styleUrl: './superheroes-details.page.css',
})
export class SuperheroesDetailsPage {
  private superheroService = inject(SuperheroService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private renderer = inject(Renderer2);

  superhero!: Superhero;
  superheroId!: number;
  loading: boolean = false;
  subscription: Subscription = new Subscription();
  apiUrl = environment.apiUrl;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.superheroId = Number(params.get('id'));
      if (isNaN(this.superheroId)) {
        console.error('Invalid superhero ID');
        this.router.navigate(['/not-found']);
        return;
      }
    });
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.subscription.add(this.getSuperheroDetails(this.superheroId));
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.subscription.unsubscribe();
  }

  getSuperheroDetails(id: number) {
    this.loading = true;
    this.superheroService.getById(id).subscribe({
      next: (data) => {
        this.superhero = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error: ', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
