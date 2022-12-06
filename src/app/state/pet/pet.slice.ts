import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus, OrderBy } from '../../enums';
import {
  createPet,
  fetchPet,
  removePet,
  removePetImage,
  updateImagePet,
  updatePet
} from './pet.action-creators';
import {
  actionPetPending,
  actionPetRejected,
  fetchPetFulfilled,
  createUpdatePetFulfilled,
  removePetFulfilled,
  actionUpdateFilterAgeBetweenCase,
  actionUpdateFilterGenderCase,
  actionUpdateFilterKindCase,
  actionUpdateFilterSizeCase,
  actionRemoveFilterGenderCase,
  actionRemoveFilterKindCase,
  actionRemoveFilterSizeCase,
  actionResetFilterAgeBetweenCase,
  actionUpdateOrderByCase,
  removePetImageFulfilled,
  updateImagePetFulfilled
} from './pet.actions';
import { PetState } from './pet.state';

const initialState: PetState = {
  status: GeneralStatus.IDLE,
  pets: {},
  error: null,
  oldestBirth: new Date().toISOString(),
  lastestUpdate: new Date().toISOString(),
  filters: {
    ageBetween: [0, 0],
    kind: [],
    gender: [],
    size: [],
    orderBy: OrderBy.NEWEST,
  },
  order: []
};

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    actionUpdateAgeBetweenFilter: actionUpdateFilterAgeBetweenCase,
    actionUpdateGenderFilter: actionUpdateFilterGenderCase,
    actionUpdateKindFilter: actionUpdateFilterKindCase,
    actionUpdateSizeFilter: actionUpdateFilterSizeCase,
    actionResetFilterAgeBetween: actionResetFilterAgeBetweenCase,
    actionRemoveFilterGender:   actionRemoveFilterGenderCase,
    actionRemoveFilterKind:   actionRemoveFilterKindCase,
    actionRemoveFilterSize:   actionRemoveFilterSizeCase,
    actionUpdateOrderBy: actionUpdateOrderByCase
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPet.fulfilled, fetchPetFulfilled)
      .addCase(createPet.fulfilled, createUpdatePetFulfilled)
      .addCase(updatePet.fulfilled, createUpdatePetFulfilled)
      .addCase(removePet.fulfilled, removePetFulfilled)
      .addCase(removePetImage.fulfilled, removePetImageFulfilled)
      .addCase(updateImagePet.fulfilled, updateImagePetFulfilled)
      .addMatcher(
        isAnyOf(
          fetchPet.pending,
          createPet.pending,
          updatePet.pending,
          removePet.pending,
          removePetImage.pending,
          updateImagePet.pending
        ),
        actionPetPending
      )
      .addMatcher(
        isAnyOf(
          fetchPet.rejected,
          createPet.rejected,
          updatePet.rejected,
          removePet.rejected,
          removePetImage.rejected,
          updateImagePet.rejected
        ),
        actionPetRejected
      );
  }
});

export default petSlice.reducer;

export const updateGenderFilter = petSlice.actions.actionUpdateGenderFilter;
export const updateSizeFilter = petSlice.actions.actionUpdateSizeFilter;
export const updateKindFilter = petSlice.actions.actionUpdateKindFilter;
export const updateAgeBetweenFilter = petSlice.actions.actionUpdateAgeBetweenFilter;
export const resetFilterAgeBetween = petSlice.actions.actionResetFilterAgeBetween;
export const removeFilterGender = petSlice.actions.actionRemoveFilterGender;
export const removeFilterKind = petSlice.actions.actionRemoveFilterKind;
export const removeFilterSize = petSlice.actions.actionRemoveFilterSize;
export const updateOrderBy = petSlice.actions.actionUpdateOrderBy;
