import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { loadAuth, signInAuth, signOut } from '../auth/auth.action-creators';
import {
  createProfile,
  fetchProfiles,
  likeProfile,
  rateProfile,
  removeImageProfile,
  removeRateProfile,
  updateImageProfile,
  updateProfile
} from './profile.action-creators';
import {
  loadAuthProfileFulfilled,
  fetchProfilesFulfilled,
  createUpdateProfileFulfilled,
  actionImageRemoveFulfilled,
  actionImageUpdatedFulfilled,
  actionRateProfileFulfilled,
  signOutAuthProfileFulfilled,
  actionLikeProfileFulfilled,
  signInAuthProfileFulfilled
} from './profile.actions';
import { ProfileState } from './profile.state';

const initialState: ProfileState = {
  status: GeneralStatus.IDLE,
  profiles: {},
  user: null,
  profile: null,
  error: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuth.fulfilled, loadAuthProfileFulfilled)
      .addCase(fetchProfiles.fulfilled, fetchProfilesFulfilled)
      .addCase(createProfile.fulfilled, createUpdateProfileFulfilled)
      .addCase(updateProfile.fulfilled, createUpdateProfileFulfilled)
      .addCase(updateImageProfile.fulfilled, actionImageUpdatedFulfilled)
      .addCase(removeImageProfile.fulfilled, actionImageRemoveFulfilled)
      .addCase(rateProfile.fulfilled, actionRateProfileFulfilled)
      .addCase(signOut.fulfilled, signOutAuthProfileFulfilled)
      .addCase(signInAuth.fulfilled, signInAuthProfileFulfilled)
      .addCase(likeProfile.fulfilled, actionLikeProfileFulfilled)
      .addCase(removeRateProfile.fulfilled, actionRateProfileFulfilled)
      .addMatcher(
        isAnyOf(
          fetchProfiles.pending,
          createProfile.pending,
          updateProfile.pending,
          updateImageProfile.pending,
          removeImageProfile.pending,
          rateProfile.pending,
          likeProfile.pending,
          removeRateProfile.pending
        ),
        actionPending
      )
      .addMatcher(
        isAnyOf(
          fetchProfiles.rejected,
          createProfile.rejected,
          updateProfile.rejected,
          updateImageProfile.rejected,
          removeImageProfile.rejected,
          rateProfile.rejected,
          likeProfile.rejected,
          removeRateProfile.rejected
        ),
        actionRejected
      );
  }
});

export default profileSlice.reducer;
