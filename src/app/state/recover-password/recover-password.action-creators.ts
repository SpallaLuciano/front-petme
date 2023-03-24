import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RecoverPasswordInput, ResetPasswordInput } from '../../inputs';
import { RecoverPasswordOutput, ResetPasswordOutput } from '../../outputs';

export const recoverPasswordRecoverPassword = createAsyncThunk<
  RecoverPasswordOutput,
  RecoverPasswordInput,
  {
    rejectValue: string;
  }
>('recoverPassword/recoverPassword', async (recoverPasswordInput, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<RecoverPasswordOutput>>({
      data: {
        emailSend: true
      }
    } as AxiosResponse<RecoverPasswordOutput>);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const resetPasswordRecoverPassword = createAsyncThunk<
  ResetPasswordOutput,
  ResetPasswordInput,
  {
    rejectValue: string;
  }
>('resetPassword/recoverPassword', async (resetPasswordInput, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<ResetPasswordOutput>>({
      data: {
        resetPassword: true
      }
    } as AxiosResponse<ResetPasswordOutput>);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
