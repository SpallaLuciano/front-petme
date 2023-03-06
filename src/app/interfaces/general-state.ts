import { GeneralStatus } from '../enums';

export interface GeneralState {
  status: GeneralStatus;
  error: null | string;
}
