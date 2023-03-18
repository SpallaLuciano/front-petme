import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Visit } from '../../interfaces';
import { AddUpdateVisitOutput, DeleteVisitOutput } from '../../outputs';
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
  { payload }: PayloadAction<Visit[]>
) => {
  payload.forEach((visit) => {
    state.health[visit.petId] ??= {
      visits: []
    };

    state.health[visit.petId].visits.push(visit);
  });
};
