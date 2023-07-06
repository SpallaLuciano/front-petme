import { PetGender, PetKind, PetSize } from '../enums';
import { TypeId } from '../interfaces';

export interface PetInput {
  name: string;
  kind: PetKind;
  gender: PetGender;
  size: PetSize;
  birthdate: string;
  description: string;
}

export interface UpdatePetImage {
  image: FormData;
  petId: TypeId;
}
