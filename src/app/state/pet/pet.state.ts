import { FiltersInput } from '../../inputs';
import { Pet, GeneralState, TypeId } from '../../interfaces';

export interface PetState extends GeneralState {
  pets: { [key: TypeId]: Pet };
  oldestBirth: string;
  lastestUpdate: string;
  filters: FiltersInput;
  order: TypeId[];
}
