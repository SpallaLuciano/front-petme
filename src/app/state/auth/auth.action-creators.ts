import jwt_decode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Credentials, TokenDecoded, Response } from '../../interfaces';
import { Confirmation, RecoverPasswordInput } from '../../inputs';
import axios from 'axios';
import { setAlert } from '../alert';
import { SignIn } from '../../outputs';

const endpoint = `${process.env.BACKEND_HOST}/auth`;

export const signInAuth = createAsyncThunk<
  SignIn,
  Credentials,
  {
    rejectValue: string;
  }
>('auth/signIn', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data: response } = await axios.post<Response<SignIn>>(`${endpoint}/sign-in`, input);

    const { data } = response;

    if (!data) {
      throw new Error();
    }

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
>('auth/recoverPassword', async (input, { rejectWithValue }) => {
  try {
    const { data: response } = await axios.post(`${endpoint}/recover-password`, input);

    const { data } = response;

    if (!data) {
      throw new Error();
    }

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
