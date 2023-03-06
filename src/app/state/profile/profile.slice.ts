import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { signInAuth, loadAuth } from '../auth';
import {
  createProfile,
  fetchProfiles,
  rateProfile,
  removeImageProfile,
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
  actionRateProfileFulfilled
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
      .addMatcher(
        isAnyOf(
          fetchProfiles.pending,
          createProfile.pending,
          updateProfile.pending,
          updateImageProfile.pending,
          removeImageProfile.pending,
          rateProfile.pending
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
          rateProfile.rejected
        ),
        actionRejected
      );
  }
});

export default profileSlice.reducer;
