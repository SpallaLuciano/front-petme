import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { loadAuth, signInAuth, signOut } from './auth.action-creators';
import {
  actionAuthPending,
  actionAuthRejected,
  signInAuthFulfilled,
  signOutAuthFulfilled,
  loadAuthFulfilled,
  actionIsValidTokenCase
} from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  status: GeneralStatus.IDLE,
  auth: {
    email: null,
    user: null,
    token: localStorage.getItem('token'),
    admin: false,
    validToken: false
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
      .addMatcher(isAnyOf(signInAuth.pending, loadAuth.pending, signOut.pending), actionAuthPending)
      .addMatcher(
        isAnyOf(signInAuth.rejected, loadAuth.rejected, signOut.rejected),
        actionAuthRejected
      );
  }
});

export default authSlice.reducer;

export const isValidToken = authSlice.actions.actionIsValidToken;
