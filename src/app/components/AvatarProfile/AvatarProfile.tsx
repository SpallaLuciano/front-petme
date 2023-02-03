import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, IconButton } from '@mui/material';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { ImageMenu } from '../ImageMenu';
import style from './AvatarProfile.module.scss';

interface Props {
  url?: string;
  name?: string;
}

export const AvatarProfile: FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    console.log(open, anchorEl);
  }, [anchorEl]);

  return (
    <Badge
      className={style.Badge}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <>
          <IconButton
            aria-label="upload picture"
            component="label"
            size="large"
            className={style.IconButton}
            onClick={handleClick}
          >
            <PhotoCamera />
          </IconButton>
          <ImageMenu open={open} onClose={handleClose} anchorEl={anchorEl} />
        </>
      }
    >
      <Avatar className={style.AvatarProfile} src={props?.url} alt={props.name} />
    </Badge>
  );
};
