import { PetGender, PetKind, PetSize } from '../enums/pet.enum';
import { Coordinates } from './coordinates.interface';
import { Image } from './image.interface';

export interface Pet {
  id: number;
  name: string;
  owner: number;
  kind: PetKind;
  gender: PetGender;
  birthdate: string;
  size: PetSize;
  description: string;
  images: Image[];
  coordinates?: Coordinates;
  createdAt: string;
  updatedAt: string;
}

export type PetFilters = PetKind | PetGender | PetSize | PetKind;
