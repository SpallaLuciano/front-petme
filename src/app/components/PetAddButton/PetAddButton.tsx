import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { PetDialog } from '../PetDialog';
import { PetForm } from '../PetForm/PetForm';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import style from './PetAddButton.module.scss';


export const PetAddButton: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <IconButton color="primary" onClick={handleClickOpen}>
      <AddCircleOutlinedIcon fontSize="large" />
    </IconButton>
    <PetDialog
      label="Crear Mascota"
      open={open}
      onClose={handleClose}
    >
      <div className={style.PetForm}>
        <PetForm onSave={handleClose} onCancel={handleClose} />
      </div>
    </PetDialog>
  </>;
};
