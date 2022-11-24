import { ThemeProvider } from '@mui/material';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthWrapper } from './auth';
import { Header } from './components';
import { Home, MyPets, MyProfile } from './pages';
import {
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
  const user = useAppSelector((state) => {
    return state.auth.auth.user;
  });

  useEffect(() => {
    dispatch(loadAuth());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user));
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
        </Route>
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
