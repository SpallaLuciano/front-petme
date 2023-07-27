import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from '../../validation-schema';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { sub } from 'date-fns/esm';
import { useAppDispatch, useAppSelector } from '../../state';
import { signUpSignUp } from '../../state/sign-up/sign-up.action-creators';
import style from './SignUpForm.module.scss';
import { SignUpInput } from '../../inputs';

export const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const maxDate = sub(new Date(), { years: 18 });
  const dispatch = useAppDispatch();
  const isSignedUp = useAppSelector((state) => state.signUp.signUp.isSignedUp);

  if (isSignedUp) {
    navigate('/signed-up');
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUpInput>({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      birthdate: null
    }
  });

  const signUp = async (signUp: SignUpInput) => {
    dispatch(signUpSignUp(signUp));
  };

  return (
    <form className={style.SignInForm} onSubmit={handleSubmit(signUp)} noValidate>
      <div className={style.Wrapper}>
        <TextField
          className={style.Inputs}
          label="Nombre"
          id="name"
          type="text"
          variant="filled"
          autoComplete="name"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
        <TextField
          className={style.Inputs}
          label="Apellido"
          id="lastname"
          type="text"
          variant="filled"
          autoComplete="lastname"
          {...register('lastname')}
          error={Boolean(errors.lastname)}
          helperText={errors.lastname && errors.lastname.message}
        />
        <Controller
          name="birthdate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  maxDate={maxDate}
                  defaultCalendarMonth={maxDate}
                  label="Fecha de nacimiento"
                  value={value}
                  onChange={onChange}
                  inputFormat="dd-MM-yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoComplete="birthdate"
                      error={Boolean(errors.birthdate)}
                      helperText={errors.birthdate && errors.birthdate.message}
                    />
                  )}
                />
              </LocalizationProvider>
            );
          }}
        />
        <TextField
          className={style.Inputs}
          label="Email"
          id="email"
          type="email"
          variant="filled"
          autoComplete="email"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
        <TextField
          className={style.Inputs}
          label="Contraseña"
          id="password"
          type="password"
          variant="filled"
          autoComplete="new-password"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
        />
        <TextField
          className={style.Inputs}
          label="Confirmar contraseña"
          id="rePassword"
          type="password"
          variant="filled"
          autoComplete="new-password"
          {...register('rePassword')}
          error={Boolean(errors.rePassword)}
          helperText={errors.rePassword && errors.rePassword.message}
        />
      </div>
      <Button variant="text" onClick={() => navigate('/sign-in')}>
        Cancelar
      </Button>
      <Button type="submit" variant="contained">
        Registrarme
      </Button>
    </form>
  );
};
