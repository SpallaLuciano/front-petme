import { Visit, GeneralState } from '../../interfaces';

export interface HealthState extends GeneralState {
  health: {
    [key: string]: {
      visits: Visit[];
    };
  };
}
