import { FC } from 'react';
import { SignUpForm } from '../../components';
import style from './SignUp.module.scss';

export const SignUp: FC = () => {
  return (
    <div className={style.Container}>
      <h1>Registrarme</h1>
      <SignUpForm />
    </div>
  );
};
