import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Superhero } from '../../features/superheroes/models/superhero.model';

export function normalizeKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(normalizeKeys);
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc: any, [k, v]) => {
      const nk = k.charAt(0).toLowerCase() + k.slice(1);
      acc[nk] = normalizeKeys(v);
      return acc;
    }, {});
  }
  return obj;
}

export function mapPowerstats(hero: Superhero) {
  const ps = (hero as any)?.powerstats ?? {};
  return Object.fromEntries(Object.entries(ps).map(([k, v]) => [k, Number(v)]));
}

export function mapBiography(hero: Superhero) {
  return {
    ...hero.biography,
    aliases: hero.biography.aliases?.join(', '),
  };
}

export function mapAppearance(hero: Superhero) {
  return {
    ...hero.appearance,
    height: hero.appearance.height?.join(', '),
    weight: hero.appearance.weight?.join(', '),
    eyeColor: toTitleCase(hero.appearance.eyeColor),
    hairColor: toTitleCase(hero.appearance.hairColor),
  };
}

export function bindFormFromHero(form: FormGroup, hero: Superhero) {
  const h = normalizeKeys(hero as any);
  form.patchValue({
    name: (h.name ?? '') as any,
    imageUrl: (h.imageUrl ?? '') as any,
    powerstats: mapPowerstats(h as any),
    biography: mapBiography(h as any),
    appearance: mapAppearance(h as any),
    work: h.work ?? {},
    connections: h.connections ?? {},
  });
}

export function mapToApi(formValue: any) {
  return {
    ...formValue,
    biography: {
      ...formValue.biography,
      aliases: formValue.biography.aliases?.split(',').map((a: string) => a.trim()),
    },
    appearance: {
      ...formValue.appearance,
      height: formValue.appearance.height?.split(',').map((h: string) => h.trim()),
      weight: formValue.appearance.weight?.split(',').map((w: string) => w.trim()),
    },
  };
}

export function buildSuperheroForm(fb: FormBuilder) {
  return fb.group({
    name: ['', Validators.required],
    imageUrl: ['', Validators.required],

    powerstats: fb.group({
      intelligence: [0],
      strength: [0],
      speed: [0],
      durability: [0],
      power: [0],
      combat: [0],
    }),

    biography: fb.group({
      fullName: [''],
      alterEgos: [''],
      aliases: [''],
      placeOfBirth: [''],
      firstAppearance: [''],
      publisher: [''],
      alignment: [''],
    }),

    appearance: fb.group({
      gender: ['', Validators.required],
      race: ['', Validators.required],
      eyeColor: ['', Validators.required],
      hairColor: ['', Validators.required],
      height: [''],
      weight: [''],
    }),

    work: fb.group({
      occupation: [''],
      base: [''],
    }),

    connections: fb.group({
      groupAffiliation: [''],
      relatives: [''],
    }),
  });
}

function toTitleCase(value?: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
