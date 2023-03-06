import { FiltersInput } from '../../inputs';
import { Pet, GeneralState } from '../../interfaces';

export interface PetState extends GeneralState {
  pets: { [key: string]: Pet };
  oldestBirth: string;
  lastestUpdate: string;
  filters: FiltersInput;
  order: string[];
}
