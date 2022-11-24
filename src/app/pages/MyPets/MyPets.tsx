import { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { PetCard } from '../../components';
import { useAppSelector } from '../../state';
import style from './MyPets.module.scss';

export const MyPets: FC = () => {
  const { pets, profile, coordinates } = useAppSelector((state) => {
    return {
      pets: state.pet.pets,
      petsStatus: state.pet.status,
      coordinates: state.coordinates.coordinates,
      profile: {
        pets: state.profile.profile?.pets
      }
    };
  });

  const profilePets = profile.pets?.map((key) => {
    if (pets[key]) {
      return <Grid key={key} item className={style.Pets} xs={12} sm={6} md={4} xl={3}>
        <PetCard pet={pets[key]} coordinates={coordinates} edit={true} />
      </Grid>;
    }
    return;
  });

  const content = profilePets?.length ?
    <Grid container className={style.MyPets} spacing={2}>
      {profilePets}
    </Grid> :
    <div>No tiene mascotas cargadas en este momento: Cargar Mascota</div>;

  return <div>
    <div className={style.Header}>
      <h2>Mis Mascotas</h2>
      <div>
        <Button variant="contained">Agregar</Button>
      </div>
    </div>
    {content}
  </div>;
};
