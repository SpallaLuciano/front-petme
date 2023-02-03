import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { AvatarProfile, ProfileForm } from '../../components';
import { useAppSelector } from '../../state';
import style from './MyProfile.module.scss';

export const MyProfile: FC = () => {
  const { image } = useAppSelector((state) => {
    return {
      image: state.profile.profile?.image
    };
  });
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className={style.Container}>
      <div className={style.Avatar}>
        <AvatarProfile {...image} />
      </div>
      <div className={style.GridItemFormHeader}>
        <span>Mi perfil</span>
        <IconButton onClick={handleEdit}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </div>
      <div className={style.ProfileForm}>
        <ProfileForm edit={edit} setEdit={setEdit} />
      </div>
    </div>
  );
};
