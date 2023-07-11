import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Comment, Profile, User } from '../../interfaces';
import { LikeOutput, SignIn } from '../../outputs';
import { ProfileState } from './profile.state';

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
  { payload: { recipient, rating, ...comment } }: PayloadAction<Comment>
) => {
  const comments = state.profiles[recipient].comments;

  comments.push({ recipient, rating, ...comment });

  const newRating = comments.reduce((acc, comment) => (acc += comment.rating), 0) / comments.length;

  state.profiles[recipient].rating = newRating;

  state.status = GeneralStatus.SUCCESS;
};

export const actionLikeProfileFulfilled = (
  state: ProfileState,
  { payload: { like, petId } }: PayloadAction<LikeOutput>
) => {
  if (state.profile) {
    const likes = state.profile?.favs;

    if (like) {
      likes.push(petId);
    } else {
      state.profile.favs = likes.filter((id) => id !== petId);
    }
  }

  state.status = GeneralStatus.SUCCESS;
};

export const actionRemoveRateProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Comment>
) => {
  if (payload) {
    const { author, id } = payload;
    const newComments = state.profiles[author].comments.filter((comment) => comment.id !== id);

    const newRating =
      newComments.reduce((acc, comment) => (acc += comment.rating), 0) / newComments.length;

    state.profiles[author].rating = isNaN(newRating) ? 0 : newRating;
    state.profiles[author].comments = newComments;
  }

  state.status = GeneralStatus.SUCCESS;
};
