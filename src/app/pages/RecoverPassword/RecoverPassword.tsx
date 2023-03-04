import { FC } from 'react';
import { RecoverPasswordForm } from '../../components';
import style from './RecoverPassword.module.scss';

export const RecoverPassword: FC = () => {
  return (
    <div className={style.Container}>
      <main>
        <h1>Olvidé mi contraseña</h1>
        <p>Ingresa la dirección de correo para cambiar la contraseña</p>
        <RecoverPasswordForm />
      </main>
    </div>
  );
};
