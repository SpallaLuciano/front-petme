import { createAsyncThunk } from '@reduxjs/toolkit';
import PETS from '../../mocks/pets.mock';
import { Pet } from '../../interfaces';
import { PetInput } from '../../inputs';

export const fetchPet = createAsyncThunk<
  Pet[],
  Partial<PetInput> | undefined,
  {
    rejectValue: string
  }
>(
  'pet/fetch',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: PETS });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const createPet = createAsyncThunk<
  Pet,
  PetInput,
  {
    rejectValue: string
  }
>(
  'pet/create',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: {
        id: PETS.length,
        owner: 1,
        ...input,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updatePet = createAsyncThunk<
  Pet,
  { pet: Partial<PetInput>, id: number },
  {
    rejectValue: string
  }
>(
  'pet/update',
  async ({ id, pet }, {rejectWithValue}) => {
    try {
      const petFound = PETS.find((pet) => pet.id === id);

      if (petFound) {
        const { data }: { data: Pet } = await Promise.resolve({ data: {
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
        }});
  
        return data;
      } else {
        throw new Error('Pet not found');
      }
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const removePet = createAsyncThunk<
  { id: number, removed: boolean },
  number,
  {
    rejectValue: string
  }
>(
  'pet/remove',
  async (input, {rejectWithValue}) => {
    try {
      const { data } = await Promise.resolve({ data: { id: input, removed: true } });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
