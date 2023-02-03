import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import {
  confirmEmailAuth,
  loadAuth,
  signInAuth,
  signOut,
  signUpAuth
} from './auth.action-creators';
import {
  actionAuthPending,
  actionAuthRejected,
  signInAuthFulfilled,
  signOutAuthFulfilled,
  loadAuthFulfilled,
  actionIsValidTokenCase,
  signUpAuthFulfilled,
  confirmEmailAuthFulfilled
} from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  status: GeneralStatus.IDLE,
  auth: {
    email: null,
    user: null,
    token: localStorage.getItem('token'),
    admin: false,
    validToken: false,
    isSignedUp: false,
    isEmailValidated: false
  },
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    actionIsValidToken: actionIsValidTokenCase
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, signOutAuthFulfilled)
      .addCase(loadAuth.fulfilled, loadAuthFulfilled)
      .addCase(signInAuth.fulfilled, signInAuthFulfilled)
      .addCase(signUpAuth.fulfilled, signUpAuthFulfilled)
      .addCase(confirmEmailAuth.fulfilled, confirmEmailAuthFulfilled)
      .addMatcher(
        isAnyOf(
          signUpAuth.pending,
          signInAuth.pending,
          loadAuth.pending,
          signOut.pending,
          confirmEmailAuth.pending
        ),
        actionAuthPending
      )
      .addMatcher(
        isAnyOf(
          signUpAuth.rejected,
          signInAuth.rejected,
          loadAuth.rejected,
          signOut.rejected,
          confirmEmailAuth.rejected
        ),
        actionAuthRejected
      );
  }
});

export default authSlice.reducer;

export const isValidToken = authSlice.actions.actionIsValidToken;
