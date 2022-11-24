import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, IconButton } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { updateImageProfile, useAppDispatch } from '../../state';
import style from './AvatarProfile.module.scss';

interface Props {
  url?: string;
  name?: string;
}

export const AvatarProfile: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
  
      const data = new FormData();

      data.append('file', file);

      dispatch(updateImageProfile(data));
    }
  };

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
          >
            <input
              accept="image/*"
              hidden
              id="upload-photo"
              type="file"
              onChange={handleFileUpload}
            />
            <PhotoCamera />
          </IconButton>
        </>
      }
    >
      <Avatar className={style.AvatarProfile} src={props?.url} alt={props.name} />
    </Badge>
  );
};
