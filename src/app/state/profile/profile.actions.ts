import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Profile, User } from '../../interfaces';
import { SignIn } from '../../outputs';
import { ProfileState } from './profile.state';
import { CommentOutput } from '../../outputs/profile';

export const signInAuthProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<SignIn>
) => {
  if (payload) {
    state.user = payload.user.id || null;
    state.profile = payload.user.profile;
    state.status = GeneralStatus.SUCCESS;
  } else {
    state.status = GeneralStatus.FAILED;
  }
};

export const signOutAuthProfileFulfilled = (state: ProfileState) => {
  state.user = null;
  state.profile = null;
  state.status = GeneralStatus.SUCCESS;
};

export const loadAuthProfileFulfilled = (state: ProfileState, { payload }: PayloadAction<User>) => {
  state.user = payload.id;
  state.profile = payload.profile;

  state.status = GeneralStatus.SUCCESS;
};

export const fetchProfilesFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile[]>
) => {
  payload.forEach((profile) => {
    state.profiles[profile.id] = profile;

    if (state.profile?.id === profile.id) {
      state.profile = profile;
    }
  });

  state.status = GeneralStatus.SUCCESS;
};

export const createUpdateProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile>
) => {
  state.profiles[payload.id] = payload;
  state.status = GeneralStatus.SUCCESS;
};

export const actionRemoveProfileCase: CaseReducer<ProfileState> = (state) => {
  state.profile = null;
  state.status = GeneralStatus.SUCCESS;
};

export const actionImageUpdatedFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile>
) => {
  if (state.profiles && state.user) {
    state.profile = payload;
    state.profiles[state.user] = payload;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionImageRemoveFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile>
) => {
  if (state.profiles && state.user) {
    state.profile = payload;
    state.profiles[state.user] = payload;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionRateProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<CommentOutput>
) => {
  const comments = payload.recipient.comments;

  const newRating = comments.reduce((acc, comment) => (acc += comment.rating), 0) / comments.length;
  payload.recipient.rating = newRating;

  state.profiles[payload.recipient.id] = payload.recipient;
  state.profiles[payload.author.id] = payload.author;

  state.status = GeneralStatus.SUCCESS;
};

export const actionLikeProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile>
) => {
  state.profile = payload;
  state.profiles[payload.id] = payload;

  state.status = GeneralStatus.SUCCESS;
};
