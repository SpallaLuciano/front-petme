import { GeneralState, Health, TypeId, Vaccine, VisitType } from '../../interfaces';

export interface HealthState extends GeneralState {
  health: Record<TypeId, Health>;
  vaccines: Vaccine[];
  visitTypes: VisitType[];
}
