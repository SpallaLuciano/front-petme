import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { differenceInYears } from 'date-fns';
import { GeneralStatus, OrderBy, PetGender, PetKind, PetSize } from '../../enums';
import { Pet, TypeId } from '../../interfaces';
import { sortByNewest, sortByOldest } from '../../utils';
import { PetState } from './pet.state';

export const fetchPetFulfilled = (state: PetState, { payload }: PayloadAction<Pet[]>) => {
  state.oldestBirth = new Date().toISOString();
  const order: TypeId[] = [];

  const pets = payload.reduce((acc, pet) => {
    order.push(pet.id);
    acc[pet.id] = pet;

    if (state.oldestBirth > pet.birthdate) {
      state.oldestBirth = pet.birthdate;
    }

    return acc;
  }, {} as Record<string, Pet>);

  state.pets = pets;
  state.order = order;

  sortPets(state);

  state.filters.ageBetween = [0, differenceInYears(new Date(), new Date(state.oldestBirth))];

  state.status = GeneralStatus.SUCCESS;
};

export const assignPet = (state: PetState, { payload }: PayloadAction<Pet>) => {
  if (!state.pets[payload.id]) {
    state.order.push(payload.id);
  }
  state.pets[payload.id] = payload;
  state.status = GeneralStatus.SUCCESS;
};

export const removePetFulfilled = (state: PetState, { payload }: PayloadAction<Pet>) => {
  delete state.pets[payload.id];
  state.order = state.order.filter((id) => id !== payload.id);

  state.status = GeneralStatus.SUCCESS;
};

export const actionUpdateFilterAgeBetweenCase: CaseReducer<
  PetState,
  PayloadAction<[number, number]>
> = (state, { payload }) => {
  state.filters.ageBetween = payload;
  filterPets(state);
};

export const actionUpdateFilterGenderCase: CaseReducer<PetState, PayloadAction<PetGender>> = (
  state,
  { payload }
) => {
  state.filters.gender.push(payload);
  filterPets(state);
};

export const actionUpdateFilterSizeCase: CaseReducer<PetState, PayloadAction<PetSize>> = (
  state,
  { payload }
) => {
  state.filters.size.push(payload);
  filterPets(state);
};

export const actionUpdateFilterKindCase: CaseReducer<PetState, PayloadAction<PetKind>> = (
  state,
  { payload }
) => {
  state.filters.kind.push(payload);
  filterPets(state);
};

export const actionResetFilterAgeBetweenCase: CaseReducer<PetState, PayloadAction> = (state) => {
  state.filters.ageBetween = [0, differenceInYears(new Date(), new Date(state.oldestBirth))];
  filterPets(state);
};

export const actionRemoveFilterGenderCase: CaseReducer<PetState, PayloadAction<PetGender>> = (
  state,
  { payload }
) => {
  state.filters.gender = state.filters.gender.filter((value) => value !== payload);
  filterPets(state);
};

export const actionRemoveFilterSizeCase: CaseReducer<PetState, PayloadAction<PetSize>> = (
  state,
  { payload }
) => {
  state.filters.size = state.filters.size.filter((value) => value !== payload);
  filterPets(state);
};

export const actionRemoveFilterKindCase: CaseReducer<PetState, PayloadAction<PetKind>> = (
  state,
  { payload }
) => {
  state.filters.kind = state.filters.kind.filter((value) => value != payload);
  filterPets(state);
};

export const actionUpdateOrderByCase: CaseReducer<PetState, PayloadAction<OrderBy>> = (
  state,
  { payload }
) => {
  state.filters.orderBy = payload;
  sortPets(state);
};

const sortPets = (state: PetState) => {
  if (state.filters.orderBy === OrderBy.NEWEST) {
    state.order.sort((a, b) => {
      return sortByNewest(state.pets[a].updatedAt, state.pets[b].updatedAt);
    });
  }
  if (state.filters.orderBy === OrderBy.OLDEST) {
    state.order.sort((a, b) => {
      return sortByOldest(state.pets[a].updatedAt, state.pets[b].updatedAt);
    });
  }
};

const filterPets = (state: PetState) => {
  state.order = Object.keys(state.pets).filter((key) => {
    if (state.filters.gender.length && !state.filters.gender.includes(state.pets[key].gender)) {
      return false;
    }
    if (state.filters.kind.length && !state.filters.kind.includes(state.pets[key].kind)) {
      return false;
    }
    if (state.filters.size.length && !state.filters.size.includes(state.pets[key].size)) {
      return false;
    }
    const yearsOld = differenceInYears(new Date(), new Date(state.pets[key].birthdate));
    if (yearsOld < state.filters.ageBetween[0] || yearsOld > state.filters.ageBetween[1]) {
      return false;
    }
    return true;
  });

  sortPets(state);
};
