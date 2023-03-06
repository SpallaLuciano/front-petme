import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { RecoverPasswordOutput, ResetPasswordOutput } from '../../outputs';
import { RecoverPasswordState } from './recover-password.state';

export const actionRecoverPasswordFulfilled = (
  state: RecoverPasswordState,
  { payload: { emailSend } }: PayloadAction<RecoverPasswordOutput>
) => {
  state.recoverPassword.emailSend = emailSend;
  state.status = GeneralStatus.SUCCESS;
};

export const actionResetPasswordFulfilled = (
  state: RecoverPasswordState,
  { payload: { resetPassword } }: PayloadAction<ResetPasswordOutput>
) => {
  state.recoverPassword.resetPassword = resetPassword;
  state.status = GeneralStatus.SUCCESS;
};
