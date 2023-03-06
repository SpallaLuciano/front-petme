import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import {
  recoverPasswordRecoverPassword,
  resetPasswordRecoverPassword
} from './recover-password.action-creators';
import {
  actionRecoverPasswordFulfilled,
  actionResetPasswordFulfilled
} from './recover-password.actions';
import { RecoverPasswordState } from './recover-password.state';

const initialState: RecoverPasswordState = {
  status: GeneralStatus.IDLE,
  recoverPassword: {
    emailSend: false,
    resetPassword: false
  },
  error: null
};

export const recoverPasswordSlice = createSlice({
  name: 'recoverPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recoverPasswordRecoverPassword.fulfilled, actionRecoverPasswordFulfilled)
      .addCase(resetPasswordRecoverPassword.fulfilled, actionResetPasswordFulfilled)
      .addMatcher(
        isAnyOf(recoverPasswordRecoverPassword.pending, resetPasswordRecoverPassword.pending),
        actionPending
      )
      .addMatcher(
        isAnyOf(recoverPasswordRecoverPassword.rejected, resetPasswordRecoverPassword.rejected),
        actionRejected
      );
  }
});

export default recoverPasswordSlice.reducer;
