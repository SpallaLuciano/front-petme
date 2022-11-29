import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthWrapper } from './auth';
import { Header } from './components';
import { GeneralStatus } from './enums';
import { Home, MyPets, MyProfile, PetDetail } from './pages';
import {
  fetchCoordinates,
  fetchPet,
  fetchProfile,
  loadAuth,
  removeProfile,
  signOut,
  useAppDispatch,
  useAppSelector
} from './state';
import theme from './theme';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user, authStatus } = useAppSelector((state) => {
    return {
      user: state.auth.auth.user,
      authStatus: state.auth.status
    };
  });

  useEffect(() => {
    dispatch(loadAuth());
  }, []);

  useEffect(() => {
    if (user) {
      if (authStatus === GeneralStatus.SUCCESS) {
        dispatch(fetchProfile(user));
        dispatch(fetchPet({}));
        dispatch(fetchCoordinates());
      }
    } else {
      dispatch(signOut);
      dispatch(removeProfile);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-pets" element={<MyPets />} />
          <Route path="/pet-detail" element={<PetDetail />} />
        </Route>
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
