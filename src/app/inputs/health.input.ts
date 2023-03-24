export interface AddVisitInput {
  visit: VisitInput;
  petId: number;
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
  petId: number;
}

export interface ApliedVaccineInput {
  petId: number;
  vaccineId: number;
  date: string | null;
}

export interface RemovedVaccineInput {
  petId: number;
  vaccineId: number;
}
