import { createAsyncThunk } from '@reduxjs/toolkit'; // no
import { Credentials, ResponseStatus, User } from '../../interfaces'; // no
import { RecoverPasswordInput } from '../../inputs'; // no
import { setAlert } from '../alert'; // no
import { SignIn } from '../../outputs'; // no
import { RequestError, get, post } from '../../utils'; // no

const endpoint = `/auth`;

export const signInAuth = createAsyncThunk<
  SignIn,
  Credentials,
  {
    rejectValue: string;
  }
>('auth/signIn', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { status, data } = await post<SignIn>(`${endpoint}/sign-in`, input, dispatch);

    localStorage.setItem('tkn', data.token);

    dispatch(
      setAlert({
        severity: status,
        title: 'Inicio de sesión exitoso',
        message: 'El usuario ingreso sesión exitosamente'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Error al iniciar sesión',
          message: 'Hubo un problema al iniciar sesión'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const recoverPassword = createAsyncThunk<
  boolean,
  RecoverPasswordInput,
  {
    rejectValue: string;
  }
>('auth/recoverPassword', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<boolean>(`${endpoint}/recover-password`, input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Inicio de sesión exitoso',
        message: 'El usuario ingreso sesión exitosamente'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Error al iniciar sesión',
          message: 'Hubo un problema al iniciar sesión'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const loadAuth = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>('auth/loadAuth', async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem('tkn');

    if (!token) {
      throw new Error();
    }

    const { data } = await get<User>('users', dispatch);

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        title: 'Error al cargar sesión',
        message: 'No se pudo cargar la sesión'
      })
    );

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
        severity: ResponseStatus.SUCCESS,
        title: 'Cierre de sesión exitoso',
        message: 'El usuario cerro sesión exitosamente'
      })
    );

    return true;
  } catch (error) {
    dispatch(
      setAlert({
        severity: ResponseStatus.ERROR,
        title: 'Error al cerrar sesión',
        message: 'Hubo un problema al cerrar la sesión'
      })
    );

    return rejectWithValue('error');
  }
});
