import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components';
import { AppRoutes } from './Routes';
import { useAppDispatch } from './state';
import theme from './theme';
import { loadAuth } from './state/auth/auth.action-creators';
import { fetchProfiles } from './state/profile/profile.action-creators';
import { fetchPet } from './state/pet/pet.action-creators';
import { fetchCoordinates } from './state/coordinates/coordinates.action-creators';
import { fetchChats } from './state/chats/chats.action-creators';
import { fetchVaccinesHealth } from './state/health/health.action-creators';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAuth()).then(({ payload }) => {
      if (typeof payload === 'object' && payload.id) {
        dispatch(fetchProfiles());
        dispatch(fetchPet());
        dispatch(fetchVaccinesHealth());
        dispatch(fetchCoordinates());
        dispatch(fetchChats());
        navigate('/home');
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
