import { FC } from 'react';
import style from './RecoverPassword.module.scss';

export const RecoverPasswordSend: FC = () => {
  return (
    <div className={style.Container}>
      <main>
        <h1>Correo enviado</h1>
        <p>Verifica tu casilla de correo para continuar.</p>
      </main>
    </div>
  );
};
