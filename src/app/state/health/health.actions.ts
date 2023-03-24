import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import {
  AddUpdateVisitOutput,
  DeleteVisitOutput,
  FetchHealthOutput,
  WeightOutput
} from '../../outputs';
import { ApliedVaccineOutput, RemovedVaccineOutput } from '../../outputs/health';
import { HealthState } from './health.state';

export const actionAddVisitHealthFulfilled = (
  state: HealthState,
  { payload: { visit } }: PayloadAction<AddUpdateVisitOutput>
) => {
  const visitArray = state.health[visit.petId].visits;
  const index = visitArray.findIndex((oldVisit) => oldVisit.id === visit.id);

  if (index === -1) {
    visitArray.push(visit);
  } else {
    visitArray[index] = visit;
  }

  state.status = GeneralStatus.SUCCESS;
};

export const actionRemoveVisitHealthFulfilled = (
  state: HealthState,
  { payload: { deleted, petId, visitId } }: PayloadAction<DeleteVisitOutput>
) => {
  if (deleted) {
    state.health[petId].visits = state.health[petId].visits.filter((visit) => visit.id !== visitId);

    state.status = GeneralStatus.SUCCESS;
  }
};

export const actionFetchVisitsHealthFulfilled = (
  state: HealthState,
  { payload: { healths, vaccines } }: PayloadAction<FetchHealthOutput>
) => {
  state.vaccines = vaccines;
  healths.forEach((health) => {
    state.health[health.petId] = health;
  });

  state.status = GeneralStatus.SUCCESS;
};

export const actionUpdateWeightHealthFulfilled = (
  state: HealthState,
  { payload: { petId, weight } }: PayloadAction<WeightOutput>
) => {
  state.health[petId].weight = weight;
  state.status = GeneralStatus.SUCCESS;
};

export const actionUpdateVaccineHealthFulfilled = (
  state: HealthState,
  { payload: { apliedVaccine, petId } }: PayloadAction<ApliedVaccineOutput>
) => {
  const apliedVaccines = state.health[petId].vaccines;
  const index = apliedVaccines.findIndex((vac) => vac.id === apliedVaccine.id);

  if (index === -1) {
    apliedVaccines.push(apliedVaccine);
  } else {
    apliedVaccines[index] = apliedVaccine;
  }

  state.status = GeneralStatus.SUCCESS;
};

export const actionRemoveVaccineHealthFulfilled = (
  state: HealthState,
  { payload: { deleted, vaccineId, petId } }: PayloadAction<RemovedVaccineOutput>
) => {
  if (deleted) {
    state.health[petId].vaccines = state.health[petId].vaccines.filter(
      (vac) => vac.id !== vaccineId
    );
  }

  state.status = GeneralStatus.SUCCESS;
};
