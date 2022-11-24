import styles from './PetCard.module.scss';
import { Coordinates, Pet } from '../../interfaces';
import { Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { QuestionMark, FavoriteBorder, LocationOn } from '@mui/icons-material';
import { getAge, getDistanceFromLatLon } from '../../utils';
import { getFavoriteIcon, getGenderIcon, getSizeKind } from '../../utils/pet.utils';

interface Props {
  pet: Pet;
  coordinates: Coordinates | null;
}

export const PetCard: FC<Props> = ({ pet, coordinates }) => {
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

  return (
    <Card className={styles.PetCard}>
      <CardMedia component="img" height="300" image={pet.images[0].url} alt={pet.name} />
      <CardContent>
        <Grid className={styles.PetGrid} container>
          <Grid className={styles.UpperItem} item xs={12}>
            <span>
              {pet.name} {gender}
            </span>
            <IconButton color="error">{favorite}</IconButton>
          </Grid>
          <Grid className={styles.LowerItem} item xs={12}>
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
