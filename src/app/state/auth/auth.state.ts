import { Auth, GeneralState } from '../../interfaces';

export interface AuthState extends GeneralState {
  auth: Auth;
}
