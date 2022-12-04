import { Image } from './image.interface';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  birthdate?: string;
  favs: number[];
  image: Image | null;
}
