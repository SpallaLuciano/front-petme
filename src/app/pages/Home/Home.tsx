import { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { PetCard, PetFilters } from '../../components';
import {
  useAppDispatch,
  useAppSelector,
  fetchPet,
  fetchCoordinates
} from '../../state';
import style from './Home.module.scss';

export const Home: FC = () => {
  const dispatch = useAppDispatch();

  const { pets, coordinates, order } = useAppSelector((state) => {
    return {
      pets: state.pet.pets,
      order: state.pet.order,
      coordinates: state.coordinates.coordinates
    };
  });

  const fetchRequests = () => {
    dispatch(fetchPet());
    dispatch(fetchCoordinates());
  };

  useEffect(() => fetchRequests(), []);

  const petCards = order.map((key) => (
    <Grid key={pets[key].id} item xs={12} md={6} xl={4}>
      <PetCard pet={pets[key]} coordinates={coordinates} />
    </Grid>
  ));

  return (
    <Grid container className={style.Home}>
      <Grid item className={style.Filters} xs={12} md={3}>
        <PetFilters />
      </Grid>
      <Grid item className={style.Pets} container spacing={4} xs={12} md={9}>
        {petCards}
      </Grid>
    </Grid>
  );
};
