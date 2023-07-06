import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import {
  addVaccineHealth,
  addVisitHealth,
  fetchVaccinesHealth,
  removeVaccineHealth,
  removeVisitHealth,
  updateVaccineHealth,
  updateVisitHealth,
  updateWeightHealth
} from './health.action-creators';
import {
  actionAddHealthFulfilled,
  actionFetchPetsFulfilled,
  actionFetchVisitsVaccinesFulfilled,
  actionAddVaccinationFulfilled,
  actionRemoveVaccinationFulfilled,
  actionUpdateVaccinationFulfilled
} from './health.actions';
import { HealthState } from './health.state';
import { fetchPet } from '../pet';

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
      .addCase(fetchPet.fulfilled, actionFetchPetsFulfilled)
      .addCase(fetchVaccinesHealth.fulfilled, actionFetchVisitsVaccinesFulfilled)
      .addCase(updateVisitHealth.fulfilled, actionAddHealthFulfilled)
      .addCase(addVisitHealth.fulfilled, actionAddHealthFulfilled)
      .addCase(removeVisitHealth.fulfilled, actionAddHealthFulfilled)
      .addCase(updateWeightHealth.fulfilled, actionAddHealthFulfilled)
      .addCase(addVaccineHealth.fulfilled, actionAddVaccinationFulfilled)
      .addCase(updateVaccineHealth.fulfilled, actionUpdateVaccinationFulfilled)
      .addCase(removeVaccineHealth.fulfilled, actionRemoveVaccinationFulfilled)
      .addMatcher(
        isAnyOf(
          updateVisitHealth.pending,
          addVisitHealth.pending,
          removeVisitHealth.pending,
          fetchVaccinesHealth.pending,
          updateWeightHealth.pending,
          updateVaccineHealth.pending,
          removeVaccineHealth.pending,
          addVaccineHealth.pending
        ),
        actionPending
      )
      .addMatcher(
        isAnyOf(
          updateVisitHealth.rejected,
          addVisitHealth.rejected,
          removeVisitHealth.rejected,
          fetchVaccinesHealth.rejected,
          updateWeightHealth.rejected,
          updateVaccineHealth.rejected,
          removeVaccineHealth.rejected,
          addVaccineHealth.rejected
        ),
        actionRejected
      );
  }
});

export default signUpSlice.reducer;
