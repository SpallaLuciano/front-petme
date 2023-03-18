import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import {
  addVisitHealth,
  fetchVisitsHealth,
  removeVisitHealth,
  updateVisitHealth
} from './health.action-creators';
import {
  actionAddVisitHealthFulfilled,
  actionFetchVisitsHealthFulfilled,
  actionRemoveVisitHealthFulfilled
} from './health.actions';
import { HealthState } from './health.state';

const initialState: HealthState = {
  status: GeneralStatus.IDLE,
  health: {},
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
      .addMatcher(
        isAnyOf(
          updateVisitHealth.pending,
          addVisitHealth.pending,
          removeVisitHealth.pending,
          fetchVisitsHealth.pending
        ),
        actionPending
      )
      .addMatcher(
        isAnyOf(
          updateVisitHealth.rejected,
          addVisitHealth.rejected,
          removeVisitHealth.rejected,
          fetchVisitsHealth.rejected
        ),
        actionRejected
      );
  }
});

export default signUpSlice.reducer;
