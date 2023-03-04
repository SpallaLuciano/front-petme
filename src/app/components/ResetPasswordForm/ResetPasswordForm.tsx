import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordInput } from '../../inputs';
import { useAppDispatch } from '../../state';
import { resetPasswordRecoverPassword } from '../../state/recover-password/recover-password.action-creators';
import { resetPasswordValidationSchema } from '../../validation-schema';
import style from './ResetPasswordForm.module.scss';

export const ResetPasswordForm: FC<{ token: string | undefined; disabled: boolean }> = ({
  token,
  disabled
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(resetPasswordValidationSchema)
  });

  const resetPassword = (input: ResetPasswordInput) => {
    input.token = token;

    dispatch(resetPasswordRecoverPassword(input));
  };

  return (
    <form className={style.Form} onSubmit={handleSubmit(resetPassword)}>
      <div className={style.Fields}>
        <TextField
          fullWidth
          label="Contraseña"
          id="password"
          type="password"
          variant="filled"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
          disabled={disabled}
        />
        <TextField
          fullWidth
          label="Confirmar contraseña"
          id="rePassword"
          type="password"
          variant="filled"
          {...register('rePassword')}
          error={Boolean(errors.rePassword)}
          helperText={errors.rePassword && errors.rePassword.message}
          disabled={disabled}
        />
      </div>
      <Button type="submit" variant="contained" disabled={disabled}>
        Actualizar
      </Button>
    </form>
  );
};
