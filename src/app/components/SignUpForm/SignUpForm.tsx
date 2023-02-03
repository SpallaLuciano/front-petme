import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUp } from '../../inputs';
import { signUpValidationSchema } from '../../validation-schema';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { sub } from 'date-fns/esm';
import { useAppDispatch, useAppSelector } from '../../state';
import { signUpAuth } from '../../state/auth';
import style from './SignUpForm.module.scss';

export const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const maxDate = sub(new Date(), { years: 18 });
  const dispatch = useAppDispatch();
  const isSignedUp = useAppSelector((state) => state.auth.auth.isSignedUp);

  if (isSignedUp) {
    navigate('/signed-up');
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUp>({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      birthdate: null
    }
  });

  const signUp = async (signUp: SignUp) => {
    dispatch(signUpAuth(signUp));
  };

  return (
    <form className={style.SignInForm} onSubmit={handleSubmit(signUp)} noValidate>
      <div className={style.Wrapper}>
        <div className={style.Column}>
          <TextField
            className={style.Inputs}
            label="Nombre"
            id="name"
            type="text"
            variant="filled"
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
            {...register('lastname')}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname && errors.lastname.message}
          />
          {/* <Controller
            name="birthdate"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    maxDate={maxDate}
                    defaultCalendarMonth={maxDate}
                    className={style.Inputs}
                    onChange={onChange}
                    value={value}
                    inputFormat='dd-MM-yyyy'
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        defaultValue={null}
                        label="Fecha de nacimiento"
                        error={Boolean(errors.birthdate)}
                        helperText={errors.birthdate && errors.birthdate.message}
                      />
                    }
                  />
                </LocalizationProvider>
              );
            }}
          /> */}
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
                        error={Boolean(errors.birthdate)}
                        helperText={errors.birthdate && errors.birthdate.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              );
            }}
          />
        </div>
        <div className={style.Column}>
          <TextField
            className={style.Inputs}
            label="Email"
            id="email"
            type="email"
            variant="filled"
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
            {...register('rePassword')}
            error={Boolean(errors.rePassword)}
            helperText={errors.rePassword && errors.rePassword.message}
          />
        </div>
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
