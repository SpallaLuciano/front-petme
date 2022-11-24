import { FC } from 'react';
import { Grid } from '@mui/material';
import { SignInForm } from '../../components';
import logo from '../../assets/pets.png';
import styles from './SignIn.module.scss';

export const SignIn: FC = () => {
  return (
    <Grid className={styles.grid} container>
      <Grid className={styles.item} item xs={12} lg={6}>
        <img src={logo} alt="Dog icons created by Freepik - Flaticon" />
      </Grid>
      <Grid className={styles.item} item xs={12} lg={6}>
        <h1>Iniciar Sesión</h1>
        <SignInForm />
      </Grid>
    </Grid>
  );
};
