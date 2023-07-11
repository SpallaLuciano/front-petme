import { Visit, TypeId, VisitType, Vaccine } from '../interfaces';

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

export interface FetchVisitTypesAndVaccines {
  visitTypes: VisitType[];
  vaccines: Vaccine[];
}
