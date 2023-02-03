import { FC } from 'react';
import style from './SignedUp.module.scss';

export const SignedUp: FC = () => {
  return (
    <div className={style.Container}>
      <main>
        <h1>Se registró con éxito</h1>
        <p>Para continuar confirme su dirección de correo a través del mail enviado a su casilla</p>
      </main>
    </div>
  );
};
