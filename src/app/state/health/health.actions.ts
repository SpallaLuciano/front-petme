import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { HealthState } from './health.state';
import { Health, Pet, TypeId, Vaccination } from '../../interfaces';
import { FetchVisitTypesAndVaccines } from '../../outputs';

export const actionAddHealthFulfilled = (
  state: HealthState,
  { payload }: PayloadAction<Health>
) => {
  state.health[payload.pet] = payload;

  state.status = GeneralStatus.SUCCESS;
};

export const actionFetchVisitsVaccinesFulfilled = (
  state: HealthState,
  { payload: { vaccines, visitTypes } }: PayloadAction<FetchVisitTypesAndVaccines>
) => {
  state.vaccines = vaccines;
  state.visitTypes = visitTypes;

  state.status = GeneralStatus.SUCCESS;
};

export const actionFetchPetsFulfilled = (state: HealthState, { payload }: PayloadAction<Pet[]>) => {
  state.health = payload.reduce<Record<TypeId, Health>>((acc, pet) => {
    acc[pet.id] = pet.health;

    return acc;
  }, {});

  state.status = GeneralStatus.SUCCESS;
};

export const actionAddVaccinationFulfilled = (
  state: HealthState,
  { payload }: PayloadAction<Vaccination>
) => {
  state.health[payload.healthId].vaccinations.push(payload);

  state.status = GeneralStatus.SUCCESS;
};

export const actionUpdateVaccinationFulfilled = (
  state: HealthState,
  { payload }: PayloadAction<Vaccination>
) => {
  const index = state.health[payload.healthId].vaccinations.findIndex(
    (vaccination) => vaccination.id === payload.id
  );
  state.health[payload.healthId].vaccinations[index] = payload;

  state.status = GeneralStatus.SUCCESS;
};

export const actionRemoveVaccinationFulfilled = (
  state: HealthState,
  { payload }: PayloadAction<Vaccination>
) => {
  const vaccinations = state.health[payload.healthId].vaccinations.filter(
    (vaccination) => vaccination.id !== payload.id
  );

  state.health[payload.healthId].vaccinations = vaccinations;

  state.status = GeneralStatus.SUCCESS;
};
