import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, ConfirmationDialog, DetailHeader } from '../../components';
import { removePetImage, useAppDispatch, useAppSelector } from '../../state';
import { getAge, getGenderIcon } from '../../utils';
import CakeIcon from '@mui/icons-material/Cake';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import DescriptionIcon from '@mui/icons-material/Description';
import CancelIcon from '@mui/icons-material/Cancel';
import { Image } from '../../interfaces';
import style from './PetDetail.module.scss';

export const PetDetail: FC = () => {
  const { petId } = useParams();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const dispatch = useAppDispatch();
  const { pet, edit } = useAppSelector((state) => {
    if (petId) {
      const pet = state.pet.pets[petId];
      if (pet) {
        return { pet, edit: state.profile.user  === pet.owner };
      }
    }
    return {};
  });

  const dialogTitle = 'Eliminar Imagen';
  const dialogDescription = '¿Está seguro que desea eliminar esta imagen?\n';

  const handleButtonClick = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const remove = (id: number) => {
    dispatch(removePetImage(id));
    setOpen(false);
  };

  const removeButton = (image: Image) => {
    if (edit) {
      return (
        <div className={style.RemoveContainer}>
          <IconButton className={style.Remove} onClick={() => handleButtonClick(image.id)}>
            <CancelIcon fontSize='large' />
          </IconButton>
        </div>
      );
    } else {
      return undefined;
    }
  };

  const header = pet?.id ?
    <div className={style.Header}>
      <DetailHeader petId={pet?.id} />
    </div> :
    undefined;

  const images = pet?.images ? pet.images.map((image, index) => {
    const removeBtn = removeButton(image);
    return (
      <div className={style.ImageContainer} key={index} style={{
        backgroundImage: `url("${image.url}")`
      }}>
        {removeBtn}
        <img className={style.Image} src={image.url} />
      </div>
    );
  }) : [];

  const dateFormated = pet ? 
    format(new Date(pet.birthdate), 'PPP', { locale: es }) :
    '';

  const footer = pet ?
    (
      <List className={style.List}>
        <ListItem>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText
            primary={pet.description}
          />
        </ListItem>
        <ListItem className={style.ListItem}>
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText
            primary={pet.kind}
          />
        </ListItem>
        <ListItem className={style.ListItem}>
          <ListItemIcon>
            {getGenderIcon(pet.gender)}
          </ListItemIcon>
          <ListItemText
            primary={
              pet.gender
            }
          />
        </ListItem>
        <ListItem className={style.ListItem}>
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText
            primary={dateFormated}
            secondary={
              getAge(pet.birthdate)
            }
          />
        </ListItem>
        <ListItem className={style.ListItem}>
          <ListItemIcon>
            <StraightenIcon />
          </ListItemIcon>
          <ListItemText
            primary={pet.size}
          />
        </ListItem>
      </List>
    ) :
    undefined;

  return <div className={style.Container}>
    <ConfirmationDialog
      open={open}
      description={dialogDescription}
      title={dialogTitle}
      onClose={() => setOpen(false)}
      onConfirmation={() => remove(id)}
    />
    {header}
    <Carousel>
      {images}
    </Carousel>
    {footer}
  </div>;
};
