import { Visit } from '../interfaces';

export interface DeleteVisitOutput {
  deleted: boolean;
  visitId: number;
  petId: number;
}

export interface AddUpdateVisitOutput {
  visit: Visit;
}
