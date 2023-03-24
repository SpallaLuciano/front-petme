import { PetKind } from '../enums';

export interface Visit {
  id: number;
  datetime: string;
  description: string;
  type: string;
  address: string;
  place: string;
  petId: number;
}

export interface Health {
  petId: number;
  weight?: number;
  visits: Visit[];
  vaccines: ApliedVaccine[];
}

export interface ApliedVaccine {
  id: number;
  date: string;
}

export interface Vaccine {
  id: number;
  name: string;
  petKind: PetKind;
}
