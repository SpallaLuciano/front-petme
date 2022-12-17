import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthWrapper } from './auth';
import { Header } from './components';
import { Home, MyPets, MyProfile, PetDetail, Profile } from './pages';
import {
  fetchCoordinates,
  fetchPet,
  fetchProfiles,
  loadAuth,
  useAppDispatch,
} from './state';
import theme from './theme';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuth()).then(({ payload }) => {
      if (typeof payload === 'object' && payload.user) {
        dispatch(fetchProfiles());
        dispatch(fetchPet());
        dispatch(fetchCoordinates());
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-pets" element={<MyPets />} />
          <Route path="/pets/:petId" element={<PetDetail />} />
          <Route path="/profiles/:profileId" element={<Profile />} />
        </Route>
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
