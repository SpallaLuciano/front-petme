import { Avatar } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../state';
import style from './DetailHeader.module.scss';

interface Props {
  petId: number;
};

export const DetailHeader: FC<Props> = ({ petId }) => {
  const { petName, profile } = useAppSelector((state) => {
    const pet = state.pet.pets[petId];
    const profile = state.profile.profiles[pet.owner];

    return {
      petName: pet.name || '',
      profile: {
        name: profile.name,
        image: profile.image
      }
    };
  });

  return (
    <div className={style.Container}>
      <h1>{petName}</h1>
      <div className={style.Profile}>
        <Avatar
          alt={profile.name}
          src={profile.image?.url}
        >
          {profile.name ? profile.name.substring(0, 1) : undefined}
        </Avatar>
        <h2>{profile.name}</h2>
      </div>
    </div>
  );
};