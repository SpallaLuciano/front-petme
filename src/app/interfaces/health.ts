import { PetKind } from '../enums';
import { TypeId } from './id';
import { Vaccination } from './vaccination';
import { VisitType } from './visit-type';

export interface Visit {
  id: TypeId;
  date: Date;
  description: string;
  type: VisitType;
  address: string;
  place: string;
  health: TypeId;
}

export interface Health {
  id: TypeId;
  pet: TypeId;
  weight?: number;
  visits: Visit[];
  vaccinations: Vaccination[];
}

export interface Vaccine {
  id: TypeId;
  name: string;
  petKind: PetKind;
}
