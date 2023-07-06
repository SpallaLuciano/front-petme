import { Vaccine } from './health';
import { TypeId } from './id';

export interface Vaccination {
  id: TypeId;
  vaccine: Vaccine;
  healthId: TypeId;
  applicationDate: Date;
}
