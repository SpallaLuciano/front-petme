import style from './PetCard.module.scss';
import { Coordinates, Pet } from '../../interfaces';
import { Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { QuestionMark, FavoriteBorder, LocationOn } from '@mui/icons-material';
import { getAge, getDistanceFromLatLon } from '../../utils';
import { getFavoriteIcon, getGenderIcon, getSizeKind } from '../../utils/pet.utils';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { removePet, useAppDispatch } from '../../state';

interface Props {
  pet: Pet;
  coordinates: Coordinates | null;
  edit?: boolean;
}

export const PetCard: FC<Props> = ({ pet, coordinates, edit = false }) => {
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState(<QuestionMark />);
  const [favorite, setFavorite] = useState(<FavoriteBorder />);
  const [age, setAge] = useState<string>('');
  const [distance, setDistance] = useState(0);
  const [sizeKind, setSizeKind] = useState('');

  useEffect(() => {
    setGender(getGenderIcon(pet.gender));
    setFavorite(getFavoriteIcon(pet.name === 'Milo'));
    setAge(getAge(pet.birthDate));
    setSizeKind(getSizeKind(pet.kind, pet.size));
  }, []);

  useEffect(() => {
    if (coordinates && pet.coordinates) {
      const radialDistance = getDistanceFromLatLon(coordinates, pet.coordinates);
      setDistance(Math.ceil(radialDistance));
    }
  }, [coordinates]);

  const remove = () => {
    dispatch(removePet(pet.id));
  };

  const likeButton = edit ?
    undefined:
    <IconButton>{favorite}</IconButton>;

  const editButton = edit ?
    <IconButton className={style.Edit}>
      <EditIcon />
    </IconButton> :
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

  return (
    <Card className={style.PetCard}>
      <div className={style.Image}>
        {removeButton}
        <CardMedia component="img" height="300" image={pet.images[0].url} alt={pet.name} />
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
