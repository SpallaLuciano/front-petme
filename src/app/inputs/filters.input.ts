import { OrderBy, PetGender, PetKind, PetSize } from '../enums';

export interface FiltersInput {
  ageBetween: [number, number];
  kind: PetKind[];
  size: PetSize[];
  gender: PetGender[];
  orderBy: OrderBy;
}
