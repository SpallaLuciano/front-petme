import { Avatar } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PetCard, Rating } from '../../components';
import { useAppSelector } from '../../state';
import style from './Profile.module.scss';

export const Profile: FC = () => {
  const { profileId } = useParams();
  const { profile, pets } = useAppSelector((state) => {
    const profile = state.profile.profiles[Number(profileId) || 0];
    const pets = Object.values(state.pet.pets).filter((pet) => pet.owner === profile.id);

    return {
      profile: {
        fullname: `${profile?.name || ''} ${profile?.lastname || ''}`,
        image: profile?.image?.url || undefined
      },
      pets
    };
  });

  const petCards = pets.map((pet) => (
    <div key={pet.id} className={style.PetCardContainer}>
      <PetCard id={pet.id} />
    </div>
  ));

  return (
    <div>
      <div className={style.HeadContainer}>
        <div className={style.Avatar}>
          <Avatar className={style.AvatarProfile} src={profile.image} alt={profile.fullname} />
        </div>
        <h1>{profile.fullname}</h1>
        <div>
          <h2>Calificación</h2>
          <Rating profileId={Number(profileId)} />
        </div>
      </div>
      <div>
        <h2>Animales</h2>
        <div className={style.CardsContainer}>
          {petCards}
        </div>
      </div>
    </div>
  );
};
