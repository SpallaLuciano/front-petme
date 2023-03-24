import { Health, Vaccine, Visit, ApliedVaccine } from '../interfaces';

export interface DeleteVisitOutput {
  deleted: boolean;
  visitId: number;
  petId: number;
}

export interface AddUpdateVisitOutput {
  visit: Visit;
}

export interface FetchHealthOutput {
  vaccines: Vaccine[];
  healths: Health[];
}

export interface WeightOutput {
  weight: number;
  petId: number;
}

export interface ApliedVaccineOutput {
  apliedVaccine: ApliedVaccine;
  petId: number;
}

export interface RemovedVaccineOutput {
  vaccineId: number;
  deleted: boolean;
  petId: number;
}
