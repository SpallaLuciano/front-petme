import { Image } from './image.interface';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  rating: number;
  birthdate?: string;
  favs: number[];
  image: Image | null;
}
