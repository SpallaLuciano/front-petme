import { GeneralStatus } from '../../enums';
import { Coordinates } from '../../interfaces';

export interface CoordinatesState {
  status: GeneralStatus;
  error: null | string;
  coordinates: Coordinates | null;
}
