import { Component, Input } from '@angular/core';
import { Superhero } from '../../models/superhero.model';
import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-superhero-card',
  imports: [RouterModule],
  templateUrl: './superhero-card.html',
  styleUrl: './superhero-card.css',
})
export class SuperheroCard {
  @Input({ required: true }) superhero!: Superhero;
  apiUrl = environment.apiUrl;
}
