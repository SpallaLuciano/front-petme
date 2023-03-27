import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Auth, Comment, Image, Profile, TokenDecoded } from '../../interfaces';
import { LikeOutput, RemoveProfileCommentOutput } from '../../outputs';
import { ProfileState } from './profile.state';

export const signInAuthProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Auth>
) => {
  state.user = payload.user || 0;
  state.status = GeneralStatus.SUCCESS;
};

export const signOutAuthProfileFulfilled = (state: ProfileState) => {
  state.user = 0;
  state.profile = null;
  state.status = GeneralStatus.SUCCESS;
};

export const loadAuthProfileFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<TokenDecoded>
) => {
  state.user = payload.user;
  state.status = GeneralStatus.SUCCESS;
};

export const fetchProfilesFulfilled = (
  state: ProfileState,
  { payload }: PayloadAction<Profile[]>
) => {
  payload.forEach((profile) => {
    state.profiles[profile.id] = profile;
  });
  if (state.user) {
    state.profile = state.profiles[state.user];
  }
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
  { payload }: PayloadAction<Image>
) => {
  if (state.profiles) {
    state.profiles[state.user].image = payload;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionImageRemoveFulfilled = (state: ProfileState) => {
  if (state.profiles) {
    state.profiles[state.user].image = null;
    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionRateProfileFulfilled = (
  state: ProfileState,
  { payload: { to, rating, ...comment } }: PayloadAction<Comment>
) => {
  const comments = state.profiles[to].comments;

  comments.push({ to, rating, ...comment });

  const newRating = comments.reduce((acc, comment) => (acc += comment.rating), 0) / comments.length;

  state.profiles[to].rating = newRating;

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
  { payload: { commentId, deleted, profileId } }: PayloadAction<RemoveProfileCommentOutput>
) => {
  if (deleted) {
    const newComments = state.profiles[profileId].comments.filter(
      (comment) => comment.id !== commentId
    );

    const newRating =
      newComments.reduce((acc, comment) => (acc += comment.rating), 0) / newComments.length;

    state.profiles[profileId].rating = isNaN(newRating) ? 0 : newRating;
    state.profiles[profileId].comments = newComments;
  }

  state.status = GeneralStatus.SUCCESS;
};
