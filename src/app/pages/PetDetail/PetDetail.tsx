import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel, ConfirmationDialog, DetailHeader, ImagePetForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../state';
import { getAge, getGenderIcon } from '../../utils';
import CakeIcon from '@mui/icons-material/Cake';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Image, TypeId } from '../../interfaces';
import style from './PetDetail.module.scss';
import { Requirements } from '../../components/Requirement/Requirements';
import { removePetImage, updateImagePet } from '../../state/pet/pet.action-creators';

export const PetDetail: FC = () => {
  const { petId } = useParams();
  const [open, setOpen] = useState(false);
  const [allRequired, setAllRequired] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pet, edit } = useAppSelector((state) => {
    if (petId) {
      const pet = state.pet.pets[petId];
      if (pet) {
        return { pet, edit: state.profile.profile?.id === pet.owner.id };
      }
    }
    return {};
  });

  const dialogTitle = 'Eliminar Imagen';
  const dialogDescription = '¿Está seguro que desea eliminar esta imagen?\n';

  const handleButtonClick = (id: TypeId) => {
    setId(id);
    setOpen(true);
  };

  const remove = (id: TypeId) => {
    dispatch(removePetImage(id));
    setOpen(false);
  };

  const removeButton = (image: Image) => {
    if (edit) {
      return (
        <div className={style.RemoveContainer}>
          <IconButton className={style.Remove} onClick={() => handleButtonClick(image.id)}>
            <CancelIcon fontSize="large" />
          </IconButton>
        </div>
      );
    } else {
      return undefined;
    }
  };

  const header = pet?.id ? (
    <div className={style.Header}>
      <DetailHeader petId={pet?.id} />
    </div>
  ) : undefined;

  const images = pet?.images
    ? pet.images.map((image, index) => {
        const removeBtn = removeButton(image);
        return (
          <div
            className={style.ImageContainer}
            key={index}
            style={{
              backgroundImage: `url("${image.url}")`
            }}
          >
            {removeBtn}
            <img loading="lazy" className={style.Image} src={image.url} />
          </div>
        );
      })
    : [];

  const dateFormated = pet ? format(new Date(pet.birthdate), 'PPP', { locale: es }) : '';

  const footer = pet ? (
    <List className={style.List}>
      <ListItem>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary={pet.description} />
      </ListItem>
      <ListItem className={style.ListItem}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary={pet.kind} />
      </ListItem>
      <ListItem className={style.ListItem}>
        <ListItemIcon>{getGenderIcon(pet.gender)}</ListItemIcon>
        <ListItemText primary={pet.gender} />
      </ListItem>
      <ListItem className={style.ListItem}>
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText primary={dateFormated} secondary={getAge(pet.birthdate)} />
      </ListItem>
      <ListItem className={style.ListItem}>
        <ListItemIcon>
          <StraightenIcon />
        </ListItemIcon>
        <ListItemText primary={pet.size} />
      </ListItem>
    </List>
  ) : undefined;

  const confirmationTitle = 'Agregar imagen';
  const confirmationDescription = '¿Está seguro que desea agregar la imagen?';
  const handleUpload = (image: FormData) => {
    if (pet?.id) {
      dispatch(
        updateImagePet({
          image,
          petId: pet.id
        })
      );
    }
  };

  const petImageButton = (
    <ImagePetForm
      buttonChildren={<AddIcon />}
      title={confirmationTitle}
      description={confirmationDescription}
      imageUpload={handleUpload}
      multiple={false}
    />
  );

  const addImageButton = edit ? () => petImageButton : undefined;

  const carousel =
    pet?.images && pet.images.length ? (
      <Carousel rightButton={addImageButton}>{images}</Carousel>
    ) : edit ? (
      petImageButton
    ) : (
      <div>Sin imágenes</div>
    );

  const requirements = !!pet?.requirements.length ? (
    <Accordion className={style.Requirements}>
      <AccordionSummary>
        <Typography>Requerimientos para adoptar</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Requirements petId={Number(petId)} setAllRequired={setAllRequired} />
      </AccordionDetails>
    </Accordion>
  ) : undefined;

  return (
    <div className={style.Container}>
      {edit ? undefined : (
        <Tooltip title="Necesita cumplir con todos los requerimientos">
          <span style={{ position: 'fixed', bottom: '10%', right: '10%', zIndex: 1 }}>
            <Fab
              style={{
                backgroundColor: '#0084ff'
              }}
              variant="extended"
              disabled={!allRequired && !!pet?.requirements.length}
              onClick={() => navigate(`/chats/${pet?.owner}`)}
            >
              <ChatIcon />
              Chatear
            </Fab>
          </span>
        </Tooltip>
      )}
      <ConfirmationDialog
        open={open}
        description={dialogDescription}
        title={dialogTitle}
        onClose={() => setOpen(false)}
        onConfirmation={() => remove(id)}
      />
      {header}
      {carousel}
      {requirements}
      {footer}
    </div>
  );
};
