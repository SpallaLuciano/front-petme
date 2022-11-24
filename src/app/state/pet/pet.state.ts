import { GeneralStatus } from '../../enums';
import { FiltersInput } from '../../inputs';
import { Pet } from '../../interfaces';

export interface PetState {
  status: GeneralStatus;
  error: null | string;
  pets: { [key: string]: Pet };
  oldestBirth: string;
  lastestUpdate: string;
  filters: FiltersInput;
  order: string[];
}
