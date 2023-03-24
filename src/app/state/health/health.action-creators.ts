import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  AddVisitInput,
  ApliedVaccineInput,
  RemovedVaccineInput,
  VisitInput,
  WeightInput
} from '../../inputs';
import { HEALTH, VACCINES } from '../../mocks/health.mock';
import {
  AddUpdateVisitOutput,
  DeleteVisitOutput,
  FetchHealthOutput,
  WeightOutput
} from '../../outputs';
import { ApliedVaccineOutput, RemovedVaccineOutput } from '../../outputs/health';

export const fetchVisitsHealth = createAsyncThunk<
  FetchHealthOutput,
  void,
  {
    rejectValue: string;
  }
>('health/fetchVisit', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<FetchHealthOutput>>({
      data: {
        healths: HEALTH,
        vaccines: VACCINES
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateVisitHealth = createAsyncThunk<
  AddUpdateVisitOutput,
  { visitId: number; visitInput: VisitInput },
  {
    rejectValue: string;
  }
>('health/updateVisit', async ({ visitId, visitInput }, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<AddUpdateVisitOutput>>({
      data: { visit: { id: visitId, ...visitInput, petId: 1 } }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const removeVisitHealth = createAsyncThunk<
  DeleteVisitOutput,
  number,
  {
    rejectValue: string;
  }
>('health/removeVisit', async (visitId, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<DeleteVisitOutput>>({
      data: {
        deleted: true,
        visitId,
        petId: 1
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const addVisitHealth = createAsyncThunk<
  AddUpdateVisitOutput,
  AddVisitInput,
  {
    rejectValue: string;
  }
>('health/addVisit', async ({ visit, petId }, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<AddUpdateVisitOutput>>({
      data: {
        visit: {
          id: 20,
          ...visit,
          petId
        }
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateWeightHealth = createAsyncThunk<
  WeightOutput,
  WeightInput,
  {
    rejectValue: string;
  }
>('health/updateWeight', async ({ petId, weight }, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<WeightOutput>>({
      data: {
        petId,
        weight
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateVaccineHealth = createAsyncThunk<
  ApliedVaccineOutput,
  ApliedVaccineInput,
  {
    rejectValue: string;
  }
>('health/updateVaccine', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<ApliedVaccineOutput>>({
      data: {
        apliedVaccine: {
          id: input.vaccineId,
          date: input.date
        },
        petId: input.petId
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const removeVaccineHealth = createAsyncThunk<
  RemovedVaccineOutput,
  RemovedVaccineInput,
  {
    rejectValue: string;
  }
>('health/removeVaccine', async ({ petId, vaccineId }, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<RemovedVaccineOutput>>({
      data: {
        petId,
        vaccineId,
        deleted: true
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
