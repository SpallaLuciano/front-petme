import { PetKind } from '../enums';
import { TypeId } from './id';
import { Vaccination } from './vaccination';

export interface Visit {
  id: TypeId;
  datetime: string;
  description: string;
  type: string;
  address: string;
  place: string;
  petId: number;
}

export interface Health {
  id: TypeId;
  petId: TypeId;
  weight?: number;
  visits: Visit[];
  vaccinations: Vaccination[];
}

export interface Vaccine {
  id: TypeId;
  name: string;
  petKind: PetKind;
}
