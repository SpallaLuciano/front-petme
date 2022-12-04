import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from '../../components/Carousel/Carousel';
import { DetailHeader } from '../../components/DetailHeader/DetailHeader';
import { useAppSelector } from '../../state';
import { getAge } from '../../utils';
import { getGenderIcon } from '../../utils/pet.utils';
import CakeIcon from '@mui/icons-material/Cake';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import DescriptionIcon from '@mui/icons-material/Description';
import style from './PetDetail.module.scss';

export const PetDetail: FC = () => {
  const { petId } = useParams();
  const pet = useAppSelector((state) => {
    if (petId) {
      return state.pet.pets[petId];
    }
  });

  const header = pet?.id ?
    <div className={style.Header}>
      <DetailHeader petId={pet?.id} />
    </div> :
    undefined;

  const images = pet?.images ? pet.images.map((image, index) => {
    return (
      <div className={style.ImageContainer} key={index} style={{
        backgroundImage: `url("${image.url}")`
      }}>
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
    {header}
    <Carousel>
      {images}
    </Carousel>
    {footer}
  </div>;
};
