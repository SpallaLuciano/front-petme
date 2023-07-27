import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { RecoverPasswordState } from './recover-password.state';

export const actionRecoverPasswordFulfilled = (
  state: RecoverPasswordState,
  { payload }: PayloadAction<boolean>
) => {
  state.recoverPassword.emailSend = payload;
  state.status = GeneralStatus.SUCCESS;
};

export const actionResetPasswordFulfilled = (
  state: RecoverPasswordState,
  { payload }: PayloadAction<boolean>
) => {
  state.recoverPassword.resetPassword = payload;
  state.status = GeneralStatus.SUCCESS;
};
