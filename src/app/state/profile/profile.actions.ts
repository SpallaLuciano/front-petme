import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Profile } from '../../interfaces';
import { ProfileState } from './profile.state';

export const actionProfilePending =
  (state: ProfileState) => {
    state.error = null;
    state.status = GeneralStatus.LOADING;
  };

export const fetchCreateUpdateProfileFulfilled =
  (state: ProfileState, { payload }: PayloadAction<Profile>) => {
    state.profile = payload;
    state.status = GeneralStatus.SUCCESS;
  };

export const actionProfileRejected =
  (state: ProfileState, { payload }: PayloadAction<unknown>) => {
    state.error = payload as string;
    state.status = GeneralStatus.FAILED;
  };

export const actionRemoveProfileCase: CaseReducer<ProfileState> =
  (state) => {
    state.profile = null;
    state.status = GeneralStatus.SUCCESS;
  };
