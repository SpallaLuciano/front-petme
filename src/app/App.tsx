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
      if (typeof payload === 'object' && payload.id) {
        dispatch(fetchProfiles());
        dispatch(fetchPet());
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
