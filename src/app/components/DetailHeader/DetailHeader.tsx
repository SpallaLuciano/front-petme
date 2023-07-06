import { Avatar, Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state';
import { Backward } from '../Backward';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import style from './DetailHeader.module.scss';
import { likeProfile } from '../../state/profile/profile.action-creators';
import { TypeId } from '../../interfaces';

interface Props {
  petId: TypeId;
}

export const DetailHeader: FC<Props> = ({ petId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { petName, profile, isCurrentUser } = useAppSelector((state) => {
    const pet = state.pet.pets[petId];
    const profile = state.profile.profiles[pet.owner];

    return {
      petName: pet.name || '',
      profile: {
        id: profile.id,
        name: profile.name,
        image: profile.image
      },
      isCurrentUser: profile.id === state.auth.auth.user
    };
  });

  const handleLike = () => {
    dispatch(likeProfile({ petId }));
  };

  return (
    <div className={style.Container}>
      <div>
        <Backward />
        <h1>{petName}</h1>
      </div>
      <div className={style.Profile} onClick={() => navigate(`/profiles/${profile.id}`)}>
        <Avatar alt={profile.name} src={profile.image?.url}>
          {profile.name ? profile.name.substring(0, 1) : undefined}
        </Avatar>
        <h2>{profile.name}</h2>
      </div>
      <div className={style.Buttons}>
        {isCurrentUser ? undefined : (
          <>
            <Button
              style={{ backgroundColor: 'red' }}
              className={style.Button}
              variant="contained"
              onClick={handleLike}
              startIcon={<FavoriteIcon />}
            >
              Favoritos
            </Button>
          </>
        )}
        <Button
          style={{ backgroundColor: '#4caf50' }}
          className={style.Button}
          variant="contained"
          onClick={() => navigate('health')}
          startIcon={<LocalHospitalIcon />}
        >
          Salud
        </Button>
      </div>
    </div>
  );
};
