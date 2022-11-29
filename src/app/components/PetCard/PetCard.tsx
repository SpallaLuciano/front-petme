import style from './PetCard.module.scss';
import { Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import {  LocationOn } from '@mui/icons-material';
import { getAge, getDistanceFromLatLon } from '../../utils';
import { getGenderIcon, getSizeKind } from '../../utils/pet.utils';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { removePet, useAppDispatch, useAppSelector } from '../../state';
import { PetEditButton } from '../PetEditButton';

interface Props {
  id: number;
  edit?: boolean;
}

export const PetCard: FC<Props> = ({ id, edit = false }) => {
  const {
    pet,
    age,
    distance,
    favorite,
    gender,
    sizeKind
  } = useAppSelector((state) => {
    let distance: number | null = null;
    const pet = state.pet.pets[id];

    if (state.coordinates.coordinates && pet.coordinates) {
      const radialDistance = getDistanceFromLatLon(state.coordinates.coordinates, pet.coordinates);
      distance = Math.ceil(radialDistance);
    }

    return {
      pet: pet,
      gender: getGenderIcon(pet.gender),
      favorite: state.profile.profile?.favs.includes(id),
      age: getAge(pet.birthdate),
      sizeKind: getSizeKind(pet.kind, pet.size),
      distance: distance
    };
  });
  const dispatch = useAppDispatch();

  const remove = () => {
    dispatch(removePet(pet.id));
  };

  const likeButton = edit ?
    undefined:
    <IconButton>{favorite}</IconButton>;

  const editButton = edit ?
    <PetEditButton id={pet.id} /> :
    undefined;

  const removeButton = edit ? 
    <IconButton className={style.Remove} onClick={remove}>
      <CancelIcon fontSize='large' />
    </IconButton> :
    undefined;

  const infoButton = 
    <IconButton className={style.Edit}>
      <InfoIcon />
    </IconButton>;
  
  const cardMedia = pet.images[0] && pet.images[0].url ?
    <CardMedia component="img" height="300" image={pet.images[0].url} alt={pet.name} />
    : <div className={style.NoImage}>Sin imagen</div>;

  return (
    <Card className={style.PetCard}>
      <div className={style.Image}>
        {removeButton}
        {cardMedia}
      </div>
      <CardContent>
        <Grid className={style.PetGrid} container>
          <Grid className={style.UpperItem} item xs={12}>
            <span>
              {pet.name} {gender} {editButton}
            </span>
            <div>
              {infoButton}
              {likeButton}
            </div>
          </Grid>
          <Grid className={style.LowerItem} item xs={12}>
            <span>
              {age} <LocationOn />
              {distance} km
            </span>
            <span>{sizeKind}</span>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
