import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RecoverPasswordInput } from '../../inputs';
import { useAppDispatch, useAppSelector, recoverPasswordRecoverPassword } from '../../state';
import { recoverPasswordValidationSchema } from '../../validation-schema';
import style from './RecoverPasswordForm.module.scss';

export const RecoverPasswordForm: FC = () => {
  const { emailSend } = useAppSelector((state) => state.recoverPassword.recoverPassword);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecoverPasswordInput>({
    resolver: yupResolver(recoverPasswordValidationSchema)
  });

  const recoverPassword = (recoverInput: RecoverPasswordInput) => {
    dispatch(recoverPasswordRecoverPassword(recoverInput));
  };

  if (emailSend) {
    navigate('/recover-password-send');
  }

  return (
    <form className={style.Form} onSubmit={handleSubmit(recoverPassword)} noValidate>
      <TextField
        className={style.Email}
        label="Email"
        id="email"
        type="email"
        variant="filled"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};
