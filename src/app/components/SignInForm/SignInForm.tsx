import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Credentials } from '../../interfaces';
import { useAppDispatch, signInAuth, fetchPet, fetchProfiles } from '../../state';
import style from './SignInForm.module.scss';
import { signInValidationSchema } from '../../validation-schema';
import { useNavigate } from 'react-router-dom';

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Credentials>({
    resolver: yupResolver(signInValidationSchema)
  });

  const signIn = (credentials: Credentials) => {
    dispatch(signInAuth(credentials)).then(({ payload }) => {
      if (typeof payload === 'object' && payload.user) {
        dispatch(fetchProfiles());
        dispatch(fetchPet());
      }
    });
  };

  return (
    <form className={style.SignInForm} onSubmit={handleSubmit(signIn)} noValidate>
      <TextField
        label="Email"
        id="email"
        type="email"
        variant="filled"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <TextField
        label="Contraseña"
        id="password"
        type="password"
        variant="filled"
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <Button type="submit" variant="contained">
        Iniciar sesión
      </Button>
      <Button variant="text" onClick={() => navigate('/recover-password')}>
        Olvidé mi contraseña
      </Button>
      <Button variant="text" onClick={() => navigate('/sign-up')}>
        Registrarme
      </Button>
    </form>
  );
};
