import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpInput } from '../../inputs';
import { get, post } from '../../utils';
import { setAlert } from '../alert';

export const signUpSignUp = createAsyncThunk<
  boolean,
  SignUpInput,
  {
    rejectValue: string;
  }
>(
  'signUp/signUp',
  async ({ birthdate, email, lastname, name, password }, { rejectWithValue, dispatch }) => {
    try {
      if (!birthdate) {
        dispatch(
          setAlert({
            title: 'Registro fallido',
            message: 'Fecha de nacimiento es requerida'
          })
        );

        return rejectWithValue('error');
      }
      const { data, status } = await post<boolean>(
        'users',
        {
          email,
          password,
          profile: {
            name,
            lastname,
            birthdate: new Date(birthdate).toISOString()
          }
        },
        dispatch
      );

      dispatch(
        setAlert({
          title: 'Registro exitoso',
          message: 'El usuario se registro con exito',
          severity: status
        })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          title: 'Registro fallido',
          message: 'Hubo un problema al registrar al usuario'
        })
      );

      return rejectWithValue('error');
    }
  }
);

export const confirmEmailSignUp = createAsyncThunk<
  boolean,
  string,
  {
    rejectValue: string;
  }
>('signUp/confirmEmail', async (token, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await get<boolean>(`auth/verify-email/${token}`, dispatch);

    dispatch(
      setAlert({
        title: 'Confirmacion exitosa',
        message: 'El email se confirmo con exito',
        severity: status
      })
    );

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
