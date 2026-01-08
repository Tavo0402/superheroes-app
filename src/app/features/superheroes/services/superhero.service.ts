import { inject, Injectable } from '@angular/core';

import {
  SUPERHERO_METADATA_URL,
  SUPERHERO_URL,
} from '../../../shared/backend_url/backend_url.constants';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Superhero } from '../models/superhero.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../../environments/environment';
import { SuperheroCreate } from '../models/superhero-create.model';
import { SuperheroUpdate } from '../models/superhero-update.model';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private readonly apiUrl = `${environment.apiUrl}`;
  private http = inject(HttpClient);

  getAll(): Observable<Superhero[]> {
    return this.http
      .get<ApiResponse<Superhero[]>>(`${this.apiUrl}${SUPERHERO_URL}`)
      .pipe(map((response) => response.data));
  }

  getById(id: number): Observable<Superhero> {
    return this.http
      .get<ApiResponse<Superhero>>(`${this.apiUrl}${SUPERHERO_URL}/${id}`)
      .pipe(map((response) => response.data));
  }

  getMetadata(): Observable<any> {
    return this.http
      .get<ApiResponse<any>>(`${this.apiUrl}${SUPERHERO_METADATA_URL}`)
      .pipe(map((response) => response.data));
  }

  createSuperhero(superhero: SuperheroCreate): Observable<Superhero> {
    return this.http
      .post<ApiResponse<Superhero>>(`${this.apiUrl}${SUPERHERO_URL}`, superhero)
      .pipe(map((response) => response.data));
  }

  updateSuperhero(id: number, superhero: SuperheroUpdate): Observable<Superhero> {
    return this.http
      .put<ApiResponse<Superhero>>(`${this.apiUrl}${SUPERHERO_URL}/${id}`, superhero)
      .pipe(map((response) => response.data));
  }

  deleteSuperhero(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.apiUrl}${SUPERHERO_URL}/${id}`)
      .pipe(map((response) => response.data));
  }
}
