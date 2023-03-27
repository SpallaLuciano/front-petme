import { FC } from 'react';
import { Alert } from '../Alert';
import { Avatar } from '../Avatar';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <>
      <div className={styles.Header}>
        <Logo />
        <Avatar />
      </div>
      <div>
        <Alert />
      </div>
    </>
  );
};
