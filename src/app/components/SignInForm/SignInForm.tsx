import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Credentials } from '../../interfaces';
import { useAppDispatch, signInAuth, fetchPet, fetchProfile } from '../../state';
import style from './SignInForm.module.scss';
import { signInValidationSchema } from '../../validation-schema';

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();

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
        dispatch(fetchProfile(payload.user));
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
      <Button variant="text">Olvidé mi contraseña</Button>
      <Button variant="text">Registrarme</Button>
    </form>
  );
};
