import { TypeId } from '../interfaces';

export interface AddVisitInput {
  visit: VisitInput;
  petId: TypeId;
}

export interface VisitInput {
  date: string;
  description: string;
  visitType: string;
  place: string;
  address: string;
}

export interface WeightInput {
  weight: number;
  healthId: TypeId;
}

export interface UpdateVaccineInput {
  vaccinationId: TypeId;
  vaccineId?: TypeId;
  applicationDate?: string | null;
}

export interface CreateVaccinationInput {
  vaccineId: TypeId;
  healthId: TypeId;
  applicationDate?: string | null;
}

export interface RemovedVaccineInput {
  vaccinationId: TypeId;
}
