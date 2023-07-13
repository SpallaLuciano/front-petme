import jwt_decode from 'jwt-decode';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { GeneralStatus } from '../../enums';
import { TokenDecoded, User } from '../../interfaces';
import { AuthState } from './auth.state';
import { diffFromNow } from '../../utils';
import socketClient from '../../utils/socket';
import { SignIn } from '../../outputs';

export const signInAuthFulfilled = (state: AuthState, { payload }: PayloadAction<SignIn>) => {
  const {
    token,
    user: { admin, id, email }
  } = payload;

  state.auth = {
    ...state.auth,
    admin,
    email,
    user: id,
    token
  };

  state.status = GeneralStatus.SUCCESS;
};

export const signOutAuthFulfilled = (state: AuthState) => {
  localStorage.removeItem('tkn');

  state.auth = {
    email: null,
    token: null,
    user: null,
    admin: false,
    validToken: false
  };
  state.status = GeneralStatus.SUCCESS;
  socketClient.disconnect();
};

export const loadAuthFulfilled = (state: AuthState, { payload }: PayloadAction<User>) => {
  state.auth.email = payload.email;
  state.auth.user = payload.id;
  state.auth.admin = payload.admin;
  state.auth.validToken = true;

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

  state.status = GeneralStatus.SUCCESS;
};
