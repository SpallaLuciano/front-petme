import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../../components';
import { useAppSelector } from '../../state';
import style from './RecoverPassword.module.scss';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const { token } = useParams();
  const resetPassword = useAppSelector(
    (state) => state.recoverPassword.recoverPassword.resetPassword
  );

  const message = (
    <div>
      <p>Se actualizó la contraseña con éxtio. Intenta iniciar sesión.</p>
      <Button onClick={() => navigate('/home')}>Inicio</Button>
    </div>
  );

  return (
    <div className={style.Container}>
      <main>
        <h1>Actualiza la contraseña</h1>
        <ResetPasswordForm disabled={resetPassword} token={token} />
        {resetPassword ? message : undefined}
      </main>
    </div>
  );
};
