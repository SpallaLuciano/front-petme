import { PetGender, PetKind, PetSize } from '../enums';

export interface PetInput {
  name: string;
  kind: PetKind;
  gender: PetGender;
  size: PetSize;
  birthdate: string;
  description: string;
}

export interface AddVisitInput {
  visit: VisitInput;
  petId: number;
}

export interface VisitInput {
  datetime: string;
  description: string;
  type: string;
  place: string;
  address: string;
}
