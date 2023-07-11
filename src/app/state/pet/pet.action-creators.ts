import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pet, TypeId } from '../../interfaces';
import { PetInput, UpdatePetImage } from '../../inputs';
import { setAlert } from '../alert';
import { get, handleError, post, put, remove, RequestError } from '../../utils';

const endpoint = 'pets';

export const fetchPet = createAsyncThunk<
  Pet[],
  Partial<PetInput> | undefined,
  {
    rejectValue: string;
  }
>('pet/fetch', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await get<Pet[]>(endpoint, dispatch);

    return data;
  } catch (error) {
    handleError(error);

    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Error al cargar mascotas',
          message: 'Hubo un problema al cargar las mascotas'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const createPet = createAsyncThunk<
  Pet,
  PetInput,
  {
    rejectValue: string;
  }
>('pet/create', async (input, { rejectWithValue, dispatch }) => {
  try {
    input = { ...input, birthdate: new Date(input.birthdate).toISOString() };

    const { data, status } = await post<Pet>(endpoint, input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Creación de mascota',
        message: 'Se creó con éxito la mascota'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Error al crear la mascota',
          message: 'Hubo un problema al crear la mascota'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const updatePet = createAsyncThunk<
  Pet,
  { pet: Partial<PetInput>; id: TypeId },
  {
    rejectValue: string;
  }
>('pet/update', async ({ id, pet }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await put<Pet>(`${endpoint}/${id}`, pet, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Actualización de mascota',
        message: 'Se actualizó con éxito la mascota'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Actualización de mascota',
          message: 'Hubo un problema al actualizar la mascota'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const removePet = createAsyncThunk<
  Pet,
  TypeId,
  {
    rejectValue: string;
  }
>('pet/remove', async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await remove<Pet>(`${endpoint}/${id}`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminado de mascota',
        message: 'Se eliminó con éxito la mascota'
      })
    );

    data.id = id;

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Eliminado de mascota',
          message: 'Hubo un problema al eliminar la mascota'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const removePetImage = createAsyncThunk<
  Pet,
  TypeId,
  {
    rejectValue: string;
  }
>('pet/removeImage', async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await remove<Pet>(`${endpoint}/image/${id}`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminado de imagen de mascota',
        message: 'Se eliminó con éxito la imagen de mascota'
      })
    );

    return data;
  } catch (error) {
    handleError(error);

    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Eliminado de imagen de mascota',
          message: 'Hubo un problema al eliminar la imagen de mascota'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const updateImagePet = createAsyncThunk<
  Pet,
  UpdatePetImage,
  {
    rejectValue: string;
  }
>('pet/updateImage', async ({ image, petId }, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Pet>(`${endpoint}/image/${petId}`, image, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Actualización de imagen de mascota',
        message: 'Se actualizó con éxito la imagen de mascota'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Actualización de imagen de mascota',
          message: 'Hubo un problema al actualizar la imagen de mascota'
        })
      );
    }

    return rejectWithValue('error');
  }
});
