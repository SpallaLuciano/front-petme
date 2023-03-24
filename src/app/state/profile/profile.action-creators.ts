import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILES } from '../../mocks/profile.mock';
import { Image, Profile } from '../../interfaces';

interface ProfileInput {
  name: string;
  lastname: string;
  birthdate: string;
}

export const fetchProfiles = createAsyncThunk<
  Profile[],
  void,
  {
    rejectValue: string;
  }
>('profile/fetch', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: PROFILES });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const createProfile = createAsyncThunk<
  Profile,
  ProfileInput,
  {
    rejectValue: string;
  }
>('profile/create', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: PROFILES[0] });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateProfile = createAsyncThunk<
  Profile,
  Partial<Profile>,
  {
    rejectValue: string;
  }
>('profile/update', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: { ...PROFILES[0], ...input } });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const updateImageProfile = createAsyncThunk<
  Image,
  FormData,
  {
    rejectValue: string;
  }
>('profile/imageUpdate', async (image, { rejectWithValue }) => {
  try {
    if (PROFILES[0].image) {
      const { data } = await Promise.resolve({ data: { ...PROFILES[0].image } });

      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const removeImageProfile = createAsyncThunk<
  string,
  void,
  {
    rejectValue: string;
  }
>('profile/imageRemove', async (arg, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: 'Remove fulfilled' });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const rateProfile = createAsyncThunk<
  { profileId: number; rating: number },
  { profileId: number; rate: number },
  {
    rejectValue: string;
  }
>('profile/rateProfile', async ({ profileId, rate }, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({
      data: {
        profileId: profileId,
        rating: (PROFILES.find((profile) => profile.id === profileId)?.rating || rate) + rate / 2
      }
    });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
