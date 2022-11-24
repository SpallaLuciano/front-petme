import jwt_decode from 'jwt-decode';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { GeneralStatus } from '../../enums';
import { Auth } from '../../interfaces';
import { AuthState } from './auth.state';
import { diffFromNow } from '../../utils';

interface TokenDecoded {
  email: string;
  user: number;
  admin: boolean;
  expirationDate: string;
};

export const actionAuthPending =
  (state: AuthState) => {
    state.error = null;
    state.status = GeneralStatus.LOADING;
  };

export const signInAuthFulfilled =
  (state: AuthState, { payload }: PayloadAction<Auth>) => {
    state.auth = payload;
    state.status = GeneralStatus.SUCCESS;
  };

export const actionAuthRejected =
  (state: AuthState, { payload }: PayloadAction<unknown>) => {
    state.error = payload as string;
    state.status = GeneralStatus.FAILED;
  };

export const actionSignOutCase: CaseReducer<AuthState> =
  (state) => {
    localStorage.removeItem('token');

    state.auth = {
      email: null,
      token: null,
      user: null,
      admin: false,
      validToken: false
    };
    state.status = GeneralStatus.SUCCESS;
  };

export const actionLoadAuthCase: CaseReducer<AuthState> =
  (state: AuthState) => {
    const token = state.auth.token;
    
    if (token) {
      const data = jwt_decode<TokenDecoded>(token) ;

      const diff = diffFromNow(parseISO(data.expirationDate));

      state.auth.email = data.email;
      state.auth.user = data.user;
      state.auth.admin = data.admin;
      state.auth.validToken = diff > 0;
    } else {
      state.auth.email = null;
      state.auth.user = null;
      state.auth.admin = false;
      state.auth.validToken = false;
    }
  };

export const actionIsValidTokenCase: CaseReducer<AuthState> =
  (state: AuthState) => {
    const token = state.auth.token;

    if (token) {
      const data = jwt_decode<TokenDecoded>(token);

      const diff = diffFromNow(parseISO(data.expirationDate));

      state.auth.validToken = diff > 0;
    } else {
      state.auth.validToken = false;
    }
  };
