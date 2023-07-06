import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddVisitInput,
  CreateVaccinationInput,
  UpdateVaccineInput,
  RemovedVaccineInput,
  VisitInput,
  WeightInput
} from '../../inputs';
import { setAlert } from '../alert';
import { RequestError, get, post, put, remove } from '../../utils';
import { Health, TypeId, Vaccination, Vaccine, ResponseStatus } from '../../interfaces';

export const fetchVaccinesHealth = createAsyncThunk<
  Vaccine[],
  void,
  {
    rejectValue: string;
  }
>('health/fetchVaccines', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await get<Vaccine[]>('vaccines', dispatch);

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Cargar de vacunas',
          message: 'Hubo un error al cargar las vacunas'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const updateVisitHealth = createAsyncThunk<
  Health,
  { visitId: TypeId; visitInput: VisitInput },
  {
    rejectValue: string;
  }
>('health/updateVisit', async ({ visitId, visitInput }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await put<Health>(`visits/${visitId}`, visitInput, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Modificación de visita',
        message: 'Se modificó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Modificación de visita',
          message: 'Hubo un error al modificar la visita'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const removeVisitHealth = createAsyncThunk<
  Health,
  TypeId,
  {
    rejectValue: string;
  }
>('health/removeVisit', async (visitId, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await remove<Health>(`visit/${visitId}`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminación de visita',
        message: 'Se elminó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Eliminación de visita',
          message: 'Hubo un problema al eliminar la visita'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const addVisitHealth = createAsyncThunk<
  Health,
  AddVisitInput,
  {
    rejectValue: string;
  }
>('health/addVisit', async ({ visit, petId }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Health>(`visit/${petId}`, visit, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Creación de visita',
        message: 'Se creó con éxito la visita'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Creación de visita',
          message: 'Hubo un problema al crear la visita'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const updateWeightHealth = createAsyncThunk<
  Health,
  WeightInput,
  {
    rejectValue: string;
  }
>('health/updateWeight', async ({ healthId, weight }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await put<Health>(`health/${healthId}`, { weight }, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Actualizar el peso',
        message: 'Se actualizó con éxito el peso'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Actualizar el peso',
          message: 'Hubo un problema al actualizar el peso'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const addVaccineHealth = createAsyncThunk<
  Vaccination,
  CreateVaccinationInput,
  {
    rejectValue: string;
  }
>('health/addVaccine', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Vaccination>('vaccination', input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Registrar vacunación',
        message: 'Se registró con éxito la vacunación'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Registrar vacunación',
          message: 'Hubo un problema al registrar la vacunación'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const updateVaccineHealth = createAsyncThunk<
  Vaccination,
  UpdateVaccineInput,
  {
    rejectValue: string;
  }
>('health/updateVaccine', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await put<Vaccination>(
      `vaccination/${input.vaccinationId}`,
      { vaccineId: input.vaccineId, datetime: input.date },
      dispatch
    );

    dispatch(
      setAlert({
        severity: status,
        title: 'Actualización de vacunación',
        message: 'Se actualizó la vacunación con exito'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Actualización de vacunación',
          message: 'Hubo un problema al actualizar la vacunación'
        })
      );
    }
    return rejectWithValue('error');
  }
});

export const removeVaccineHealth = createAsyncThunk<
  Vaccination,
  RemovedVaccineInput,
  {
    rejectValue: string;
  }
>('health/removeVaccine', async ({ vaccinationId }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await remove<Vaccination>(`vaccines/${vaccinationId}`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminado de vacunación',
        message: 'Se eliminó con éxito la vacunación'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          severity: ResponseStatus.ERROR,
          title: 'Eliminado de vacunación',
          message: 'Hubo un problema al eliminar la vacunación'
        })
      );
    }
    return rejectWithValue('error');
  }
});
