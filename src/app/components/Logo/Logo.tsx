import styles from './Logo.module.scss';
import logo from '../../assets/pets.png';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

export const Logo: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.Logo} onClick={onClick}>
      <img loading="lazy" src={logo} alt="Dog icons created by Freepik - Flaticon" />
      <span>PetMe</span>
    </div>
  );
};
