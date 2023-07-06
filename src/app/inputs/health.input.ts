import { TypeId } from '../interfaces';

export interface AddVisitInput {
  visit: VisitInput;
  petId: TypeId;
}

export interface VisitInput {
  datetime: string;
  description: string;
  type: string;
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
  date?: Date | null;
}

export interface CreateVaccinationInput {
  vaccineId: TypeId;
  healthId: TypeId;
  date?: Date | null;
}

export interface RemovedVaccineInput {
  vaccinationId: TypeId;
}
