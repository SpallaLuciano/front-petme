import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../state';
import style from './EmailValidation.module.scss';
import { confirmEmailSignUp } from '../../state/sign-up/sign-up.action-creators';

export const EmailValidation: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  if (token) {
    dispatch(confirmEmailSignUp(token));
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
