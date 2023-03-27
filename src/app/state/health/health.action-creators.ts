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
import { setAlert } from '../alert';

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
>('health/updateVisit', async ({ visitId, visitInput }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<AddUpdateVisitOutput>>({
      data: { visit: { id: visitId, ...visitInput, petId: 1 } }
    } as AxiosResponse);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Modificación de visita',
        message: 'Se modificó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Modificación de visita',
        message: 'Hubo un error al modificar la visita'
      })
    );
    return rejectWithValue('error');
  }
});

export const removeVisitHealth = createAsyncThunk<
  DeleteVisitOutput,
  number,
  {
    rejectValue: string;
  }
>('health/removeVisit', async (visitId, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<DeleteVisitOutput>>({
      data: {
        deleted: true,
        visitId,
        petId: 1
      }
    } as AxiosResponse);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Eliminación de visita',
        message: 'Se elminó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminación de visita',
        message: 'Hubo un problema al eliminar la visita'
      })
    );
    return rejectWithValue('error');
  }
});

export const addVisitHealth = createAsyncThunk<
  AddUpdateVisitOutput,
  AddVisitInput,
  {
    rejectValue: string;
  }
>('health/addVisit', async ({ visit, petId }, { rejectWithValue, dispatch }) => {
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

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Creación de visita',
        message: 'Se creó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Creación de visita',
        message: 'Hubo un problema al crear la visita'
      })
    );
    return rejectWithValue('error');
  }
});

export const updateWeightHealth = createAsyncThunk<
  WeightOutput,
  WeightInput,
  {
    rejectValue: string;
  }
>('health/updateWeight', async ({ petId, weight }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<WeightOutput>>({
      data: {
        petId,
        weight
      }
    } as AxiosResponse);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Actualizar el peso',
        message: 'Se actualizó con éxito el peso'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actualizar el peso',
        message: 'Hubo un problema al actualizar el peso'
      })
    );
    return rejectWithValue('error');
  }
});

export const updateVaccineHealth = createAsyncThunk<
  ApliedVaccineOutput,
  ApliedVaccineInput,
  {
    rejectValue: string;
  }
>('health/updateVaccine', async (input, { rejectWithValue, dispatch }) => {
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

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Actualización de vacuna',
        message: 'Se actualizó la vacuna con exito'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actualización de vacuna',
        message: 'Hubo un problema al actualizar la vacuna'
      })
    );

    return rejectWithValue('error');
  }
});

export const removeVaccineHealth = createAsyncThunk<
  RemovedVaccineOutput,
  RemovedVaccineInput,
  {
    rejectValue: string;
  }
>('health/removeVaccine', async ({ petId, vaccineId }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve<AxiosResponse<RemovedVaccineOutput>>({
      data: {
        petId,
        vaccineId,
        deleted: true
      }
    } as AxiosResponse);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Eliminado de vacuna',
        message: 'Se eliminó con éxito la vacuna'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminado de vacuna',
        message: 'Hubo un problema al eliminar la vacuna'
      })
    );

    return rejectWithValue('error');
  }
});
