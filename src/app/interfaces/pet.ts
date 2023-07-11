import { PetGender, PetKind, PetSize } from '../enums/pet.enum';
import { Coordinates } from './coordinates';
import { Health } from './health';
import { TypeId } from './id';
import { Image } from './image';
import { Profile } from './profile';
import { Requirement } from './requirement';

export interface Pet {
  id: TypeId;
  name: string;
  owner: Profile;
  kind: PetKind;
  gender: PetGender;
  birthdate: string;
  size: PetSize;
  description: string;
  images: Image[];
  requirements: Requirement[];
  health: Health;
  coordinates?: Coordinates;
  createdAt: string;
  updatedAt: string;
}

export type PetFilters = PetKind | PetGender | PetSize | PetKind;
