import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecoverPasswordInput, ResetPasswordInput } from '../../inputs';
import { post } from '../../utils';

const endpoint = 'auth';

export const recoverPasswordRecoverPassword = createAsyncThunk<
  boolean,
  RecoverPasswordInput,
  {
    rejectValue: string;
  }
>('recoverPassword/recoverPassword', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await post<boolean>(`${endpoint}/recover-password`, input, dispatch);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const resetPasswordRecoverPassword = createAsyncThunk<
  boolean,
  ResetPasswordInput,
  {
    rejectValue: string;
  }
>('resetPassword/recoverPassword', async ({ token, password }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await post<boolean>(
      `${endpoint}/recover-password/${token}`,
      { password },
      dispatch
    );

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
