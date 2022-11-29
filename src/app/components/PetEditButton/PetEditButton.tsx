import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { PetDialog } from '../PetDialog';
import style from './PetEditButton.module.scss';
import { PetForm } from '../PetForm/PetForm';

interface Props {
  id: number;
}

export const PetEditButton: FC<Props> = ({id}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <IconButton className={style.Edit} onClick={handleClickOpen}>
      <EditIcon />
    </IconButton>
    <PetDialog
      label="Editar Mascota"
      open={open}
      onClose={handleClose}
    >
      <div className={style.PetForm}>
        <PetForm id={id} onSave={handleClose} onCancel={handleClose} />
      </div>
    </PetDialog>
  </>;
};
