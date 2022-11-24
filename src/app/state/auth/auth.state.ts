import { GeneralStatus } from '../../enums';
import { Auth } from '../../interfaces';

export interface AuthState {
  status: GeneralStatus;
  error: null | string;
  auth: Auth;
}
