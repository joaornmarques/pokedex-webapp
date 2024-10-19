export interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  stats: any[]; // Define the type for stats
  types: any[]; // Define the type for types
  image: string;
  added_at: number | null;
  notes: string | null;
}

