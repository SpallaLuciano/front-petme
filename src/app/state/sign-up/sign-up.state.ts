import { GeneralStatus } from '../../enums';
import { SignUp } from '../../interfaces';

export interface SignUpState {
  status: GeneralStatus;
  error: null | string;
  signUp: SignUp;
}
