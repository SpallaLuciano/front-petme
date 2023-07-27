import { Coordinates, GeneralState } from '../../interfaces';

export interface CoordinatesState extends GeneralState {
  coordinates: Coordinates | null;
}
