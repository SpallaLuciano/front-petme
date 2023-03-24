import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import {
  addVisitHealth,
  fetchVisitsHealth,
  removeVaccineHealth,
  removeVisitHealth,
  updateVaccineHealth,
  updateVisitHealth,
  updateWeightHealth
} from './health.action-creators';
import {
  actionAddVisitHealthFulfilled,
  actionFetchVisitsHealthFulfilled,
  actionRemoveVisitHealthFulfilled,
  actionUpdateWeightHealthFulfilled,
  actionUpdateVaccineHealthFulfilled,
  actionRemoveVaccineHealthFulfilled
} from './health.actions';
import { HealthState } from './health.state';

const initialState: HealthState = {
  status: GeneralStatus.IDLE,
  health: {},
  vaccines: [],
  error: null
};

export const signUpSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitsHealth.fulfilled, actionFetchVisitsHealthFulfilled)
      .addCase(updateVisitHealth.fulfilled, actionAddVisitHealthFulfilled)
      .addCase(addVisitHealth.fulfilled, actionAddVisitHealthFulfilled)
      .addCase(removeVisitHealth.fulfilled, actionRemoveVisitHealthFulfilled)
      .addCase(updateWeightHealth.fulfilled, actionUpdateWeightHealthFulfilled)
      .addCase(updateVaccineHealth.fulfilled, actionUpdateVaccineHealthFulfilled)
      .addCase(removeVaccineHealth.fulfilled, actionRemoveVaccineHealthFulfilled)
      .addMatcher(
        isAnyOf(
          updateVisitHealth.pending,
          addVisitHealth.pending,
          removeVisitHealth.pending,
          fetchVisitsHealth.pending,
          updateWeightHealth.pending,
          updateVaccineHealth.pending,
          removeVaccineHealth.pending
        ),
        actionPending
      )
      .addMatcher(
        isAnyOf(
          updateVisitHealth.rejected,
          addVisitHealth.rejected,
          removeVisitHealth.rejected,
          fetchVisitsHealth.rejected,
          updateWeightHealth.rejected,
          updateVaccineHealth.rejected,
          removeVaccineHealth.rejected
        ),
        actionRejected
      );
  }
});

export default signUpSlice.reducer;
