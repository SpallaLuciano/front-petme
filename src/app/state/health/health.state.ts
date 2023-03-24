import { GeneralState, Health, Vaccine } from '../../interfaces';

export interface HealthState extends GeneralState {
  health: {
    [key: string]: Health;
  };
  vaccines: Vaccine[];
}
