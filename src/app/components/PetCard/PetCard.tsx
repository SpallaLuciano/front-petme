import style from './PetCard.module.scss';
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { LocationOn } from '@mui/icons-material';
import {
  getAge,
  getDistanceFromLatLon,
  getFavoriteIcon,
  getGenderIcon,
  getSizeKind
} from '../../utils';
import {} from '../../utils/pet.utils';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch, useAppSelector } from '../../state';
import { PetEditButton } from '../PetEditButton';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { likeProfile } from '../../state/profile/profile.action-creators';
import { TypeId } from '../../interfaces';
import { removePet } from '../../state/pet/pet.action-creators';

interface Props {
  id: TypeId;
}

export const PetCard: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pet, age, distance, favorite, gender, sizeKind, profile } = useAppSelector((state) => {
    let distance: number | null = null;
    const pet = state.pet.pets[id];

    if (state.coordinates.coordinates && pet.coordinates) {
      const radialDistance = getDistanceFromLatLon(state.coordinates.coordinates, pet.coordinates);
      distance = Math.ceil(radialDistance);
    }

    return {
      pet: pet,
      gender: getGenderIcon(pet.gender),
      favorite: getFavoriteIcon(state.profile.profile?.favs.includes(id) || false),
      age: getAge(pet.birthdate),
      sizeKind: getSizeKind(pet.kind, pet.size),
      distance: distance,
      profile: state.profile.profile?.id
    };
  });
  const [open, setOpen] = useState(false);
  const dialogTitle = 'Eliminar Mascota';
  const dialogDescription = '¿Está seguro que desea eliminar esta mascota?\n' + pet.name;

  const edit = profile === pet.owner.id;

  const navigateDetail = () => navigate(`/pets/${id}`);

  const remove = () => {
    dispatch(removePet(pet.id));
    setOpen(false);
  };

  const handleLike = () => {
    dispatch(likeProfile({ petId: pet.id }));
  };

  const likeButton = edit ? undefined : <IconButton onClick={handleLike}>{favorite}</IconButton>;

  const editButton = edit ? <PetEditButton id={pet.id} /> : undefined;

  const removeButton = edit ? (
    <>
      <ConfirmationDialog
        open={open}
        description={dialogDescription}
        title={dialogTitle}
        onClose={() => setOpen(false)}
        onConfirmation={remove}
      />
      <IconButton className={style.Remove} onClick={() => setOpen(true)}>
        <CancelIcon fontSize="large" />
      </IconButton>
    </>
  ) : undefined;

  const infoButton = (
    <IconButton className={style.Edit} onClick={navigateDetail}>
      <InfoIcon />
    </IconButton>
  );

  const cardMedia = pet.images[0]?.url ? (
    <CardMedia component="img" height="300" image={pet.images[0].url} alt={pet.name} />
  ) : (
    <div className={style.NoImage}>Sin imagen</div>
  );

  return (
    <Card className={style.PetCard}>
      <div className={style.Image}>
        {removeButton}
        <CardActionArea onClick={navigateDetail}>{cardMedia}</CardActionArea>
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
