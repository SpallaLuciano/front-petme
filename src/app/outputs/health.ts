import { Visit, TypeId } from '../interfaces';

export interface DeleteVisitOutput {
  deleted: boolean;
  visitId: TypeId;
  petId: TypeId;
}

export interface AddUpdateVisitOutput {
  visit: Visit;
}

export interface WeightOutput {
  weight: number;
  petId: TypeId;
}

export interface RemovedVaccineOutput {
  vaccineId: TypeId;
  deleted: boolean;
  petId: TypeId;
}
