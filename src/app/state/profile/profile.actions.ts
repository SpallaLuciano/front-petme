import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Image, Pet, Profile } from '../../interfaces';
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

export const actionImageUpdatedFulfilled =
  (state: ProfileState, { payload }: PayloadAction<Image>) => {
    if (state.profile) {
      state.profile.image = payload;
      state.status = GeneralStatus.SUCCESS;
    }
  };

export const actionImageRemoveFulfilled =
(state: ProfileState) => {
  if (state.profile) {
    state.profile.image = null;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionCreatePetFullfilled =
(state: ProfileState, { payload }: PayloadAction<Pet>) => {
  if (state.profile) {
    state.profile?.pets.push(payload.id);
  }
};
