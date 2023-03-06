import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralState } from '../interfaces';
import { GeneralStatus } from '../enums';

export const actionPending = (state: GeneralState) => {
  state.error = null;
  state.status = GeneralStatus.LOADING;
};

export const actionRejected = (state: GeneralState, { payload }: PayloadAction<unknown>) => {
  state.error = payload as string;
  state.status = GeneralStatus.FAILED;
};
