import { createAsyncThunk } from '@reduxjs/toolkit';
import { Registration, Confirmation, SignUpInput } from '../../inputs';
import { AxiosResponse } from 'axios';

export const signUpSignUp = createAsyncThunk<
  Registration,
  SignUpInput,
  {
    rejectValue: string;
  }
>('signUp/signUp', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<Registration>>({
      data: {
        isSignedUp: true,
        error: null
      }
    } as AxiosResponse<Registration>);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const confirmEmailSignUp = createAsyncThunk<
  Confirmation,
  string,
  {
    rejectValue: string;
  }
>('signUp/confirmEmail', async (_, { rejectWithValue }) => {
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
