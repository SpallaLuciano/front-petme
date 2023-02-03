import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../state';
import { confirmEmailAuth } from '../../state/auth';
import style from './EmailValidation.module.scss';

export const EmailValidation: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  if (token) {
    dispatch(confirmEmailAuth(token));
  }

  return (
    <div className={style.Container}>
      <main>
        <h1>confirmación exitosa</h1>
        <p>Se confirmó con éxito su correo, ahora puede iniciar sesión</p>
        <Button variant="contained" onClick={() => navigate('/sign-in')}>
          Inicio
        </Button>
      </main>
    </div>
  );
};
