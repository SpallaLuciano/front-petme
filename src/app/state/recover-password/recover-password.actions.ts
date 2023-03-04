import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { GeneralState } from '../../interfaces';
import { RecoverPasswordOutput, ResetPasswordOutput } from '../../outputs';
import { RecoverPasswordState } from './recover-password.state';

export const actionPending = (state: GeneralState) => {
  state.error = null;
  state.status = GeneralStatus.LOADING;
};

export const actionRejected = (state: GeneralState, { payload }: PayloadAction<unknown>) => {
  state.error = payload as string;
  state.status = GeneralStatus.FAILED;
};

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
