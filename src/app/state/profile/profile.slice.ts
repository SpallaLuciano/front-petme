import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { signInAuth, loadAuth, signOut } from '../auth';
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
  signInAuthProfileFulfilled,
  loadAuthProfileFulfilled,
  fetchProfilesFulfilled,
  createUpdateProfileFulfilled,
  actionImageRemoveFulfilled,
  actionImageUpdatedFulfilled,
  actionRateProfileFulfilled,
  signOutAuthProfileFulfilled,
  actionLikeProfileFulfilled,
  actionRemoveRateProfileFulfilled
} from './profile.actions';
import { ProfileState } from './profile.state';

const initialState: ProfileState = {
  status: GeneralStatus.IDLE,
  profiles: {},
  user: 0,
  profile: null,
  error: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAuth.fulfilled, signInAuthProfileFulfilled)
      .addCase(loadAuth.fulfilled, loadAuthProfileFulfilled)
      .addCase(fetchProfiles.fulfilled, fetchProfilesFulfilled)
      .addCase(createProfile.fulfilled, createUpdateProfileFulfilled)
      .addCase(updateProfile.fulfilled, createUpdateProfileFulfilled)
      .addCase(updateImageProfile.fulfilled, actionImageUpdatedFulfilled)
      .addCase(removeImageProfile.fulfilled, actionImageRemoveFulfilled)
      .addCase(rateProfile.fulfilled, actionRateProfileFulfilled)
      .addCase(signOut.fulfilled, signOutAuthProfileFulfilled)
      .addCase(likeProfile.fulfilled, actionLikeProfileFulfilled)
      .addCase(removeRateProfile.fulfilled, actionRemoveRateProfileFulfilled)
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
