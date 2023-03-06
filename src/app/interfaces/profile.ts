import { Image } from './image';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  rating: number;
  favs: number[];
  image: Image | null;
  birthdate?: string;
}
