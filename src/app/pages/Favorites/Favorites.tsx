import { FC } from 'react';
import { Grid } from '@mui/material';
import { PetAddButton, PetCard } from '../../components';
import { useAppSelector } from '../../state';
import style from './Favorites.module.scss';

export const Favorites: FC = () => {
  const { pets, favPets } = useAppSelector((state) => {
    return {
      pets: state.pet.pets,
      petsStatus: state.pet.status,
      favPets: state.profile.profile?.favs || []
    };
  });

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

  const addButton = <PetAddButton />;

  const content = (
    <Grid container className={style.MyPets} spacing={2}>
      {favoritePets?.length ? (
        favoritePets
      ) : (
        <Grid item>No tiene mascotas cargadas en este momento {addButton}</Grid>
      )}
    </Grid>
  );

  return (
    <div>
      <div className={style.Header}>
        <div>{addButton}</div>
        <h2>Mis Mascotas</h2>
      </div>
      {content}
    </div>
  );
};
