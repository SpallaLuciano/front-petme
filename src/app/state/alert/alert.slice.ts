import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Alert } from '../../interfaces';
import { AlertState } from './alert.state';
import { ResponseStatus } from '../../utils/response';

const initialState: AlertState = {
  alert: {
    message: null,
    severity: null,
    title: null
  },
  error: null,
  status: GeneralStatus.IDLE
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, { payload }: PayloadAction<Alert>) => {
      state.alert.severity = payload.severity || ResponseStatus.ERROR;
      state.alert.message = payload.message;
      state.alert.title = payload.title;

      state.status = GeneralStatus.SUCCESS;
    },
    clearAlert: (state) => {
      state.alert = {
        message: null,
        severity: null,
        title: null
      };

      state.status = GeneralStatus.SUCCESS;
    }
  }
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
