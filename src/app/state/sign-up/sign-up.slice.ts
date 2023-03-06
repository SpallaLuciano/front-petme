import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { confirmEmailSignUp, signUpSignUp } from './sign-up.action-creators';
import { confirmEmailSignUpFulfilled, signUpSignUpFulfilled } from './sign-up.actions';
import { SignUpState } from './sign-up.state';

const initialState: SignUpState = {
  status: GeneralStatus.IDLE,
  signUp: {
    isSignedUp: false,
    isEmailValidated: false
  },
  error: null
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpSignUp.fulfilled, signUpSignUpFulfilled)
      .addCase(confirmEmailSignUp.fulfilled, confirmEmailSignUpFulfilled)
      .addMatcher(isAnyOf(signUpSignUp.pending, confirmEmailSignUp.pending), actionPending)
      .addMatcher(isAnyOf(signUpSignUp.rejected, confirmEmailSignUp.rejected), actionRejected);
  }
});

export default signUpSlice.reducer;
