import { createAsyncThunk } from '@reduxjs/toolkit';
import PETS from '../../mocks/pets.mock';
import { Pet } from '../../interfaces';

interface PetInput {
  name: string;
}

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
      const { data } = await Promise.resolve({ data: PETS[0] });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updatePet = createAsyncThunk<
  Pet,
  Partial<PetInput>,
  {
    rejectValue: string
  }
>(
  'pet/update',
  async (input, {rejectWithValue}) => {
    try {
      const { data } = await Promise.resolve({ data: PETS[0] });

      return data;
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
      const { data } = await Promise.resolve({ data: { id: 1, removed: true } });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
