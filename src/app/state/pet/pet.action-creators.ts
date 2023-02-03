import { createAsyncThunk } from '@reduxjs/toolkit';
import PETS from '../../mocks/pets.mock';
import { Image, Pet } from '../../interfaces';
import { PetInput } from '../../inputs';

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
>('pet/create', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({
      data: {
        id: PETS.length,
        owner: 1,
        ...input,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updatePet = createAsyncThunk<
  Pet,
  { pet: Partial<PetInput>; id: number },
  {
    rejectValue: string;
  }
>('pet/update', async ({ id, pet }, { rejectWithValue }) => {
  try {
    const petFound: Pet | undefined = PETS.find((pet) => pet.id === id);

    if (petFound) {
      const { data } = await Promise.resolve({
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
      });

      return data;
    } else {
      throw new Error('Pet not found');
    }
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const removePet = createAsyncThunk<
  { id: number; removed: boolean },
  number,
  {
    rejectValue: string;
  }
>('pet/remove', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: { id: input, removed: true } });

    return data;
  } catch (error) {
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
>('pet/removeImage', async (input, { rejectWithValue }) => {
  try {
    const pet = PETS.find((pet) => pet.images.find((image) => image.id === input));

    if (pet) {
      return { pet: pet.id, image: input, removed: true };
    } else {
      throw new Error('Not Found');
    }
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateImagePet = createAsyncThunk<
  { image: Image; petId: number },
  { image: FormData; petId: number },
  {
    rejectValue: string;
  }
>('pet/updateImage', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    if (PETS[0].images[0]) {
      const { data } = await Promise.resolve({
        data: {
          image: { ...PETS[0].images[0] },
          petId: payload.petId
        }
      });

      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    return rejectWithValue('error');
  }
});
