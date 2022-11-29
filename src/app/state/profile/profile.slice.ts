import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { createPet } from '../pet';
import {
  createProfile,
  fetchProfile,
  removeImageProfile,
  updateImageProfile,
  updateProfile
} from './profile.action-creators';
import {
  actionRemoveProfileCase,
  actionProfilePending,
  actionProfileRejected,
  fetchCreateUpdateProfileFulfilled,
  actionImageRemoveFulfilled,
  actionImageUpdatedFulfilled,
  actionCreatePetFullfilled
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
      .addCase(updateImageProfile.fulfilled, actionImageUpdatedFulfilled)
      .addCase(removeImageProfile.fulfilled, actionImageRemoveFulfilled)
      .addCase(createPet.fulfilled, actionCreatePetFullfilled)
      .addMatcher(
        isAnyOf(
          fetchProfile.pending,
          createProfile.pending,
          updateProfile.pending,
          updateImageProfile.pending,
          removeImageProfile.pending
        ),
        actionProfilePending
      )
      .addMatcher(
        isAnyOf(
          fetchProfile.rejected,
          createProfile.rejected,
          updateProfile.rejected,
          updateImageProfile.rejected,
          removeImageProfile.rejected
        ),
        actionProfileRejected
      );
  }
});

export default profileSlice.reducer;
export const removeProfile = profileSlice.actions.actionRemoveProfile;
