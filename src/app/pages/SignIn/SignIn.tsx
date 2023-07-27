import { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { SignInForm } from '../../components';
import logo from '../../assets/pets.png';
import styles from './SignIn.module.scss';
import { useAppSelector } from '../../state';
import { useNavigate } from 'react-router-dom';

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.auth.user);

  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  }, [auth]);

  return (
    <Grid className={styles.grid} container>
      <Grid className={styles.item} item xs={12} lg={6}>
        <img loading="lazy" src={logo} alt="Dog icons created by Freepik - Flaticon" />
      </Grid>
      <Grid className={styles.item} item xs={12} lg={6}>
        <h1>Iniciar Sesión</h1>
        <SignInForm />
      </Grid>
    </Grid>
  );
};
