import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import {
  createProfile,
  fetchProfile,
  updateImageProfile,
  updateProfile
} from './profile.action-creators';
import {
  actionRemoveProfileCase,
  actionProfilePending,
  actionProfileRejected,
  fetchCreateUpdateProfileFulfilled
} from './profile.actions';
import { ProfileState } from './profile.state';

const initialState: ProfileState = {
  status: GeneralStatus.IDLE,
  profile: null,
  error: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    actionRemoveProfile: actionRemoveProfileCase
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, fetchCreateUpdateProfileFulfilled)
      .addCase(createProfile.fulfilled, fetchCreateUpdateProfileFulfilled)
      .addCase(updateProfile.fulfilled, fetchCreateUpdateProfileFulfilled)
      .addCase(updateImageProfile.fulfilled, fetchCreateUpdateProfileFulfilled)
      .addMatcher(
        isAnyOf(
          fetchProfile.pending,
          createProfile.pending,
          updateProfile.pending,
          updateImageProfile.pending
        ),
        actionProfilePending
      )
      .addMatcher(
        isAnyOf(
          fetchProfile.rejected,
          createProfile.rejected,
          updateProfile.rejected,
          updateImageProfile.rejected
        ),
        actionProfileRejected
      );
  }
});

export default profileSlice.reducer;
export const removeProfile = profileSlice.actions.actionRemoveProfile;
