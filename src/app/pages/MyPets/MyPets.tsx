import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import { PetCard } from '../../components';
import { useAppSelector } from '../../state';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
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
  }).filter((value) => value !== undefined);

  const addButton =
    <IconButton color="primary"><AddCircleOutlinedIcon fontSize="large" /></IconButton>;

  const content =
    <Grid container className={style.MyPets} spacing={2}>
      {
        profilePets?.length ?
          profilePets :
          <Grid item>No tiene mascotas cargadas en este momento {addButton}</Grid>
      }
    </Grid>;

  return <div>
    <div className={style.Header}>
      <div>
        {addButton}
      </div>
      <h2>Mis Mascotas</h2>
    </div>
    {content}
  </div>;
};
