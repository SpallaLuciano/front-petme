import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { fetchCoordinates } from './coordinates.action-creators';
import {
  actionCoordinatesPending,
  actionCoordinatesRejected,
  fetchCoordinatesFulfilled,
  actionRemoveCoordinatesCase
} from './coordinates.actions';
import { CoordinatesState } from './coordinates.state';

const initialState: CoordinatesState = {
  status: GeneralStatus.IDLE,
  coordinates: null,
  error: null
};

export const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    actionRemoveCoordinates: actionRemoveCoordinatesCase
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.fulfilled, fetchCoordinatesFulfilled)
      .addMatcher(isAnyOf(fetchCoordinates.pending), actionCoordinatesPending)
      .addMatcher(isAnyOf(fetchCoordinates.rejected), actionCoordinatesRejected);
  }
});

export default coordinatesSlice.reducer;
export const removeCoordinates = coordinatesSlice.actions.actionRemoveCoordinates;
