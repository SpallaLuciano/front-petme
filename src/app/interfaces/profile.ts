import { TypeId } from './id';
import { Image } from './image';

export interface Profile {
  id: TypeId;
  name: string;
  lastname: string;
  rating: number;
  comments: Comment[];
  favs: TypeId[];
  image: Image | null;
  birthdate?: string;
}

export interface Comment {
  id: TypeId;
  author: TypeId;
  recipient: TypeId;
  comment: string;
  datetime: string;
  rating: number;
}
