import { Superhero } from './superhero.model';

export type SuperheroCreate = Omit<Superhero, 'id'>;
