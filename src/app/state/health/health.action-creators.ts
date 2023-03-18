import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { AddVisitInput, VisitInput } from '../../inputs';
import { Visit } from '../../interfaces';
import { VISITS } from '../../mocks/visits.mock';
import { AddUpdateVisitOutput, DeleteVisitOutput } from '../../outputs';

export const fetchVisitsHealth = createAsyncThunk<
  Visit[],
  void,
  {
    rejectValue: string;
  }
>('health/fetchVisit', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<Visit[]>>({
      data: VISITS
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
