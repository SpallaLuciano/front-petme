import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Coordinates } from '../../interfaces';
import { CoordinatesState } from './coordinates.state';

export const actionCoordinatesPending =
  (state: CoordinatesState) => {
    state.error = null;
    state.status = GeneralStatus.LOADING;
  };

export const fetchCoordinatesFulfilled =
  (state: CoordinatesState, { payload }: PayloadAction<Coordinates>) => {
    state.coordinates = payload;
    state.status = GeneralStatus.SUCCESS;
  };

export const actionCoordinatesRejected =
  (state: CoordinatesState, { payload }: PayloadAction<unknown>) => {
    state.error = payload as string;
    state.status = GeneralStatus.FAILED;
  };

export const actionRemoveCoordinatesCase: CaseReducer<CoordinatesState> =
  (state) => {
    state.coordinates = null;
    state.status = GeneralStatus.SUCCESS;
  };
