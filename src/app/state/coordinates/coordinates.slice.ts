import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { fetchCoordinates } from './coordinates.action-creators';
import { fetchCoordinatesFulfilled, actionRemoveCoordinatesCase } from './coordinates.actions';
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
      .addMatcher(isAnyOf(fetchCoordinates.pending), actionPending)
      .addMatcher(isAnyOf(fetchCoordinates.rejected), actionRejected);
  }
});

export default coordinatesSlice.reducer;
export const removeCoordinates = coordinatesSlice.actions.actionRemoveCoordinates;
