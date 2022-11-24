import { Image } from './image.interface';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  birthdate: string;
  favs: number[];
  pets: number[];
  image: Image;
}
