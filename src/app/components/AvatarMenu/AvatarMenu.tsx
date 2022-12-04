import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { signOut } from '../../state/auth';
import { SignInForm } from '../SignInForm';
import { FC, useEffect } from 'react';

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

export const AvatarMenu: FC<Props> = ({ open = false, onClose, anchorEl }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { signed } = useAppSelector((state) => {
    return {
      signed: Boolean(state.auth.auth?.user),
    };
  });

  const sOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    onClose();
  }, [signed]);

  const MenuSignedIn = [
    <MenuItem key="home" onClick={() => navigate('')}>
      Inicio
    </MenuItem>,
    <MenuItem key="my-profile" onClick={() => navigate('my-profile')}>
      Mi Perfil
    </MenuItem>,
    <MenuItem key="my-pets" onClick={() => navigate('my-pets')}>
      Mis Mascotas
    </MenuItem>,
    <MenuItem key="signout" onClick={sOut}>
      Cerrar Sesión
    </MenuItem>,
  ];

  const MenuSign = (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {signed ? MenuSignedIn : <SignInForm />}
    </Menu>
  );

  return MenuSign;
};
