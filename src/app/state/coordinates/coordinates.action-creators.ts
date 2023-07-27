import { createAsyncThunk } from '@reduxjs/toolkit';
import { Coordinates } from '../../interfaces';

export const fetchCoordinates = createAsyncThunk<
  Coordinates,
  void,
  {
    rejectValue: string;
  }
>('coordinates/fetch', async (input, { rejectWithValue }) => {
  try {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }: GeolocationPosition) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      }, reject);
    });
  } catch (error) {
    return rejectWithValue('error');
  }
});
