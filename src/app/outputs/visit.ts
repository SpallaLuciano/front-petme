import { TypeId } from '../interfaces';

export interface CreateVisitOutput {
  id: TypeId;
  datetime: Date;
  description: string;
  address: string;
  place: string;
}
