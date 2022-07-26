export type Result = Array<{name: string}>;

export const baseUrl = 'https://swapi.dev/api/';

export const kinds = [
  '',
  'people',
  'starships',
  'species',
  'planets',
  // Inserted to demo an error state.
  'error'
] as const;

export type Kind = typeof kinds[number];
