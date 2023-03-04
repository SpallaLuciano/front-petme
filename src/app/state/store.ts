import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import coordinatesReducer from './coordinates/coordinates.slice';
import petReducer from './pet/pet.slice';
import profileReducer from './profile/profile.slice';
import signUpReducer from './sign-up/sign-up.slice';
import recoverPasswordReducer from './recover-password/recover-password.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coordinates: coordinatesReducer,
    pet: petReducer,
    profile: profileReducer,
    signUp: signUpReducer,
    recoverPassword: recoverPasswordReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
