import { FC } from 'react';
import { Grid } from '@mui/material';
import { PetCard, PetFilters } from '../../components';
import { useAppSelector } from '../../state';
import style from './Home.module.scss';

export const Home: FC = () => {
  const { order } = useAppSelector((state) => {
    return {
      order: state.pet.order,
    };
  });

  const petCards = order.map((key) => (
    <Grid key={key} item xs={12} md={6} xl={4}>
      <PetCard id={Number(key)} />
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
