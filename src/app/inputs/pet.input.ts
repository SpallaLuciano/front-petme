import { PetGender, PetKind, PetSize } from '../enums';

export interface PetInput {
  name: string;
  kind: PetKind;
  gender: PetGender;
  size: PetSize;
  birthdate: string;
  description: string;
};
