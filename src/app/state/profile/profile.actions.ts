import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Auth, Image, Profile, TokenDecoded } from '../../interfaces';
import { ProfileState } from './profile.state';

export const actionProfilePending =
  (state: ProfileState) => {
    state.error = null;
    state.status = GeneralStatus.LOADING;
  };

export const signInAuthProfileFulfilled =
  (state: ProfileState, { payload }: PayloadAction<Auth>) => {
    state.user = payload.user || 0;
    state.status = GeneralStatus.SUCCESS;
  };

export const signOutAuthProfileFulfilled =
  (state: ProfileState) => {
    state.user = 0;
    state.profile = null;
    state.status = GeneralStatus.SUCCESS;
  };

export const loadAuthProfileFulfilled =
  (state: ProfileState, { payload }: PayloadAction<TokenDecoded>) => {
    state.user = payload.user;
    state.status = GeneralStatus.SUCCESS;
  };

export const fetchProfilesFulfilled = 
  (state: ProfileState, { payload }: PayloadAction<Profile[]>) => {
    payload.forEach((profile) => {
      state.profiles[profile.id] = profile;
    });
    if (state.user) {
      state.profile = state.profiles[state.user];
    }
    state.status = GeneralStatus.SUCCESS;
  };


export const createUpdateProfileFulfilled =
  (state: ProfileState, { payload }: PayloadAction<Profile>) => {
    state.profiles[payload.id] = payload;
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
    if (state.profiles) {
      state.profiles[state.user].image = payload;
      state.status = GeneralStatus.SUCCESS;
    }
  };

export const actionImageRemoveFulfilled =
(state: ProfileState) => {
  if (state.profiles) {
    state.profiles[state.user].image = null;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionRateProfileFulfilled =
(state: ProfileState, { payload }: PayloadAction<{
  profileId: number,
  rating: number
}>) => {
  state.profiles[payload.profileId].rating = payload.rating;
  state.status = GeneralStatus.SUCCESS;
};