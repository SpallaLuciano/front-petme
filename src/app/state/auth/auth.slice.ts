import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { signInAuth } from './auth.action-creators';
import {
  actionSignOutCase,
  actionAuthPending,
  actionAuthRejected,
  signInAuthFulfilled,
  actionLoadAuthCase,
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
    actionSignOut: actionSignOutCase,
    actionLoadAuth: actionLoadAuthCase,
    actionIsValidToken: actionIsValidTokenCase
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAuth.fulfilled, signInAuthFulfilled)
      .addMatcher(isAnyOf(signInAuth.pending), actionAuthPending)
      .addMatcher(isAnyOf(signInAuth.rejected), actionAuthRejected);
  }
});

export default authSlice.reducer;

export const signOut = authSlice.actions.actionSignOut;
export const loadAuth = authSlice.actions.actionLoadAuth;
export const isValidToken = authSlice.actions.actionIsValidToken;
