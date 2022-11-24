import { Avatar as AvatarMUI } from '@mui/material';
import { useAppSelector } from '../../state/hooks';
import { useState, MouseEvent, FC } from 'react';
import { AvatarMenu } from '../AvatarMenu';
import style from './Avatar.module.scss';

export const Avatar: FC = () => {
  const { profile } = useAppSelector((state) => {
    return { 
      profile: {
        name: state.profile.profile?.name,
        imageUrl: state.profile.profile?.image?.url
      },
    };
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const avatar = (
    <div className={style.Avatar}>
      <span onClick={handleClick}>
        {profile?.name ? profile.name : 'Iniciar sesión'}
      </span>
      <AvatarMUI
        onClick={handleClick}
        alt={profile.name}
        src={profile.imageUrl}
      >
        {profile?.name ? profile.name.substring(0, 1) : undefined}
      </AvatarMUI>
    </div>
  );
  const menu = (
    <AvatarMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
  );

  return (
    <>
      {avatar}
      {menu}
    </>
  );
};
