import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { SignUpState } from './sign-up.state';

export const actionSignUpPending = (state: SignUpState) => {
  state.error = null;
  state.status = GeneralStatus.LOADING;
};

export const signUpSignUpFulfilled = (state: SignUpState) => {
  state.signUp.isSignedUp = true;
  state.status = GeneralStatus.SUCCESS;
};

export const confirmEmailSignUpFulfilled = (state: SignUpState) => {
  state.signUp.isEmailValidated = true;
  state.status = GeneralStatus.SUCCESS;
};

export const actionSignUpRejected = (state: SignUpState, { payload }: PayloadAction<unknown>) => {
  state.error = payload as string;
  state.status = GeneralStatus.FAILED;
};
