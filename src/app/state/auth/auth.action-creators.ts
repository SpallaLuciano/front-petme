import jwt_decode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, Credentials, TokenDecoded } from '../../interfaces';
import { Confirmation, RecoverPasswordInput } from '../../inputs';
import { AxiosResponse } from 'axios';
import { setAlert } from '../alert';

export const signInAuth = createAsyncThunk<
  Auth,
  Credentials,
  {
    rejectValue: string;
  }
>('auth/signIn', async (_input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve({
      data: {
        // eslint-disable-next-line max-len
        token:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2hvQGVtYWlsLmNvbSIsInVzZXIiOjEsImFkbWluIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOiIyMDIzLTEyLTMxVDIzOjU5OjU5LjAwMC0wMzowMCJ9.gaH19rl0860GwOAEtyix1uFw4yv6kRttvIeHh0zX519g5VvCwHj44gbX4KmlvyxJI85SuPkwRfTWGGPuPFElt2uPbuYLnmm11UIOn2EPsCKK272atpBeLy-fWm4znacDLjTR1ZWNYTXLqHPoM_yaDUi7se6pPIVOGDFjyrDhTtLq3Cab96dyT7_LnkqAKdu87pehbT69Ywi63K_EsZrzksLO4SLQ_tfiDRax41oGQt_4EKFfclJNjxoKPqir09J1vGVLyqgmIjUImwQpkEld0DD6PkJADZaL86e7x5s_MH5wy1ynnGTfOBV91fKT9lXtuN04zggUYlLbY6e5guB3vw',
        user: 1,
        email: 'lucho@email.com',
        admin: false,
        validToken: true,
        isSignedUp: false,
        isEmailValidated: false
      }
    });

    localStorage.setItem('token', data.token);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Inicio de sesión exitoso',
        message: 'El usuario ingreso sesión exitosamente'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Inicio de sesión exitoso',
        message: 'El usuario ingreso sesión exitosamente'
      })
    );
    return rejectWithValue('error');
  }
});

export const recoverPassword = createAsyncThunk<
  Confirmation,
  RecoverPasswordInput,
  {
    rejectValue: string;
  }
>('auth/recoverPassword', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<Confirmation>>({
      data: {
        isConfirmed: true,
        error: null
      }
    } as AxiosResponse<Confirmation>);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const loadAuth = createAsyncThunk<
  TokenDecoded,
  void,
  {
    rejectValue: string;
  }
>('auth/loadAuth', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      return jwt_decode<TokenDecoded>(token);
    }
    throw new Error();
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const signOut = createAsyncThunk<
  boolean,
  void,
  {
    rejectValue: string;
  }
>('auth/signOut', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(
      setAlert({
        severity: 'success',
        title: 'Cierre de sesión exitoso',
        message: 'El usuario cerro sesión exitosamente'
      })
    );

    return true;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Inicio de sesión exitoso',
        message: 'El usuario ingreso sesión exitosamente'
      })
    );

    return rejectWithValue('error');
  }
});
