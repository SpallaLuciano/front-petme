import { GeneralStatus } from '../../enums';
import { SignUpState } from './sign-up.state';

export const signUpSignUpFulfilled = (state: SignUpState) => {
  state.signUp.isSignedUp = true;
  state.status = GeneralStatus.SUCCESS;
};

export const confirmEmailSignUpFulfilled = (state: SignUpState) => {
  state.signUp.isEmailValidated = true;
  state.status = GeneralStatus.SUCCESS;
};
