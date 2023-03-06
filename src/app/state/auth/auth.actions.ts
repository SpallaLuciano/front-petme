import jwt_decode from 'jwt-decode';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { GeneralStatus } from '../../enums';
import { Auth, TokenDecoded } from '../../interfaces';
import { AuthState } from './auth.state';
import { diffFromNow } from '../../utils';

export const signInAuthFulfilled = (state: AuthState, { payload }: PayloadAction<Auth>) => {
  state.auth = payload;
  state.status = GeneralStatus.SUCCESS;
};

export const signOutAuthFulfilled = (state: AuthState) => {
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

export const loadAuthFulfilled = (state: AuthState, { payload }: PayloadAction<TokenDecoded>) => {
  const diff = diffFromNow(parseISO(payload.expirationDate));

  state.auth.email = payload.email;
  state.auth.user = payload.user;
  state.auth.admin = payload.admin;
  state.auth.validToken = diff > 0;

  state.status = GeneralStatus.SUCCESS;
};

export const actionIsValidTokenCase: CaseReducer<AuthState> = (state: AuthState) => {
  const token = state.auth.token;

  if (token) {
    const data = jwt_decode<TokenDecoded>(token);

    const diff = diffFromNow(parseISO(data.expirationDate));

    state.auth.validToken = diff > 0;
  } else {
    state.auth.validToken = false;
  }
};
