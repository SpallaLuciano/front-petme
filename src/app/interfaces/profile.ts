import { Image } from './image';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  rating: number;
  comments: Comment[];
  favs: number[];
  image: Image | null;
  birthdate?: string;
}

export interface Comment {
  id: number;
  from: number;
  to: number;
  comment: string;
  datetime: string;
  rating: number;
}
