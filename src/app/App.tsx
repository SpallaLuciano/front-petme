import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components';
import { AppRoutes } from './Routes';
import {
  fetchChats,
  fetchCoordinates,
  fetchPet,
  fetchProfiles,
  fetchVisitsHealth,
  loadAuth,
  receiveMessage,
  useAppDispatch
} from './state';
import theme from './theme';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAuth()).then(({ payload }) => {
      if (typeof payload === 'object' && payload.user) {
        dispatch(fetchProfiles());
        dispatch(fetchPet());
        dispatch(fetchVisitsHealth());
        dispatch(fetchCoordinates());
        dispatch(fetchChats());
        dispatch(receiveMessage());
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
