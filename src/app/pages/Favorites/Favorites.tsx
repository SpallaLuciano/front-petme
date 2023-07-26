import { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { PetCard } from '../../components';
import { useAppSelector } from '../../state';
import style from './Favorites.module.scss';
import { useNavigate } from 'react-router-dom';

export const Favorites: FC = () => {
  const navigate = useNavigate();
  const { pets, favPets } = useAppSelector((state) => {
    return {
      pets: state.pet.pets,
      petsStatus: state.pet.status,
      favPets: state.profile.profile?.favs || []
    };
  });

  const addFavs = (
    <Button variant="contained" onClick={() => navigate('/home')}>
      Ir al inicio
    </Button>
  );

  const favoritePets = Object.values(pets)
    .filter((pet) => favPets.includes(pet.id))
    .map((pet) => {
      if (pet) {
        return (
          <Grid key={pet.id} item className={style.Pets} xs={12} sm={6} md={4} xl={3}>
            <PetCard id={pet.id} />
          </Grid>
        );
      }
    })
    .filter((value) => value !== undefined);

  const content = (
    <Grid container className={style.MyPets} spacing={2}>
      {favoritePets?.length ? (
        favoritePets
      ) : (
        <Grid item>No tiene mascotas agregadas a favoritos en este momento {addFavs}</Grid>
      )}
    </Grid>
  );

  return (
    <div>
      <div className={style.Header}>
        <h2>Mis Favoritos</h2>
      </div>
      {content}
    </div>
  );
};
