import { GeneralState, Health, TypeId, Vaccine } from '../../interfaces';

export interface HealthState extends GeneralState {
  health: Record<TypeId, Health>;
  vaccines: Vaccine[];
}
