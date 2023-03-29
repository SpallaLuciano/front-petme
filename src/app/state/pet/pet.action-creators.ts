import { createAsyncThunk } from '@reduxjs/toolkit';
import PETS from '../../mocks/pets.mock';
import { Image, Pet } from '../../interfaces';
import { PetInput } from '../../inputs';
import { AxiosResponse } from 'axios';
import { setAlert } from '../alert';

export const fetchPet = createAsyncThunk<
  Pet[],
  Partial<PetInput> | undefined,
  {
    rejectValue: string;
  }
>('pet/fetch', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: PETS });

    return data;
  } catch (error) {
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
    const { data } = await Promise.resolve({
      data: {
        id: PETS.length,
        owner: 1,
        ...input,
        images: [],
        requirements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Creación de mascota',
        message: 'Se creó con éxito la mascota'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Creación de mascota',
        message: 'Hubo un problema al crear la mascota'
      })
    );

    return rejectWithValue('error');
  }
});

export const updatePet = createAsyncThunk<
  Pet,
  { pet: Partial<PetInput>; id: number },
  {
    rejectValue: string;
  }
>('pet/update', async ({ id, pet }, { rejectWithValue, dispatch }) => {
  try {
    const petFound = PETS.find((pet) => pet.id === id);

    if (petFound) {
      const { data } = await Promise.resolve<AxiosResponse<Pet>>({
        data: {
          id: petFound.id,
          birthdate: petFound.birthdate,
          gender: petFound.gender,
          images: petFound.images,
          kind: petFound.kind,
          name: petFound.name,
          size: petFound.size,
          description: petFound.description,
          ...pet,
          owner: petFound.owner,
          createdAt: petFound.createdAt,
          updatedAt: new Date().toISOString()
        }
      } as AxiosResponse);

      dispatch(
        setAlert({
          severity: 'success',
          title: 'Actualización de mascota',
          message: 'Se actualizó con éxito la mascota'
        })
      );

      return data;
    } else {
      throw new Error('Pet not found');
    }
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actualización de mascota',
        message: 'Hubo un problema al actualizar la mascota'
      })
    );

    return rejectWithValue('error');
  }
});

export const removePet = createAsyncThunk<
  { id: number; removed: boolean },
  number,
  {
    rejectValue: string;
  }
>('pet/remove', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve({ data: { id: input, removed: true } });

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Eliminado de mascota',
        message: 'Se eliminó con éxito la mascota'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminado de mascota',
        message: 'Hubo un problema al eliminar la mascota'
      })
    );

    return rejectWithValue('error');
  }
});

export const removePetImage = createAsyncThunk<
  {
    image: number;
    pet: number;
    removed: boolean;
  },
  number,
  {
    rejectValue: string;
  }
>('pet/removeImage', async (input, { rejectWithValue, dispatch }) => {
  try {
    const pet = PETS.find((pet) => pet.images.find((image) => image.id === input));

    if (pet) {
      dispatch(
        setAlert({
          severity: 'success',
          title: 'Eliminado de imagen de mascota',
          message: 'Se eliminó con éxito la imagen de mascota'
        })
      );

      return { pet: pet.id, image: input, removed: true };
    } else {
      throw new Error('Not Found');
    }
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminado de imagen de mascota',
        message: 'Hubo un problema al eliminar la imagen de mascota'
      })
    );

    return rejectWithValue('error');
  }
});

export const updateImagePet = createAsyncThunk<
  { image: Image; petId: number },
  { image: FormData; petId: number },
  {
    rejectValue: string;
  }
>('pet/updateImage', async (payload, { rejectWithValue, dispatch }) => {
  try {
    if (PETS[0].images[0]) {
      const { data } = await Promise.resolve({
        data: {
          image: { ...PETS[0].images[0] },
          petId: payload.petId
        }
      });

      dispatch(
        setAlert({
          severity: 'success',
          title: 'Actualización de imagen de mascota',
          message: 'Se actualizó con éxito la imagen de mascota'
        })
      );

      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actualización de imagen de mascota',
        message: 'Hubo un problema al actualizar la imagen de mascota'
      })
    );

    return rejectWithValue('error');
  }
});
