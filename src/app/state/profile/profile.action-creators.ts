import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE } from '../../mocks/profile.mock';
import { Image, Profile } from '../../interfaces';

interface ProfileInput {
  name: string;
  lastname: string;
  birthdate: string;
}

export const fetchProfile = createAsyncThunk<
  Profile,
  number,
  {
    rejectValue: string
  }
>(
  'profile/fetch',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: PROFILE });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const createProfile = createAsyncThunk<
  Profile,
  ProfileInput,
  {
    rejectValue: string
  }
>(
  'profile/create',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: PROFILE });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updateProfile = createAsyncThunk<
  Profile,
  Partial<Profile>,
  {
    rejectValue: string
  }
>(
  'profile/update',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: { ...PROFILE, ...input } });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updateImageProfile = createAsyncThunk<
  Image,
  FormData,
  {
    rejectValue: string
  }
>(
  'profile/imageUpdate',
  async (image, { rejectWithValue }) => {
    try {
      console.log(image);
      const { data } = await Promise.resolve({ data: { ...PROFILE.image }});

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const removeImageProfile = createAsyncThunk<
  string,
  void,
  {
    rejectValue: string
  }
>(
  'profile/imageRemove',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: 'Remove fulfilled' });

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
