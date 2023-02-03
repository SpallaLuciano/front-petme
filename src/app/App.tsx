import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { Header } from './components';
import { AppRoutes } from './Routes';
import { fetchCoordinates, fetchPet, fetchProfiles, loadAuth, useAppDispatch } from './state';
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
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
