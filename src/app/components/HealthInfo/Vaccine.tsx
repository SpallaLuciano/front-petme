import { Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useState } from 'react';
import { removeVaccineHealth, useAppDispatch, useAppSelector } from '../../state';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { VaccineForm } from './VaccineForm';
import { TypeId, Vaccination } from '../../interfaces';

export const Vaccine: FC<{ apliedVaccine: Vaccination; petId: TypeId }> = ({
  apliedVaccine,
  petId
}) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const { isCurrentUser } = useAppSelector((state) => {
    const isCurrentUser = state.pet.pets[petId].owner === state.auth.auth.user;

    return {
      isCurrentUser
    };
  });

  const date = format(new Date(apliedVaccine.applicationDate), 'PPP', { locale: es });

  const buttonEdit = (
    <IconButton onClick={() => setEdit(true)}>
      <EditIcon />
    </IconButton>
  );
  const buttonRemove = (
    <IconButton onClick={() => handleRemove()}>
      <DeleteIcon />
    </IconButton>
  );

  const handleRemove = () => {
    dispatch(removeVaccineHealth({ vaccinationId: apliedVaccine.id }));
    setEdit(false);
  };

  const handleClose = () => setEdit(false);

  return (
    <Paper
      style={{
        flexBasis: 0,
        flexGrow: 1,
        backgroundColor: '#F0E68C',
        padding: '8px',
        minWidth: '161px'
      }}
    >
      <Typography variant="h6">
        {apliedVaccine.vaccine.name} {isCurrentUser ? [buttonEdit, buttonRemove] : undefined}
      </Typography>
      <div style={{ gap: '8px', display: 'flex', flexWrap: 'wrap' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Fecha de aplicación:
        </Typography>
        <Typography variant="body2">{date}</Typography>
      </div>
      <Dialog sx={{ padding: '8px' }} open={edit} onClose={handleClose}>
        <DialogTitle>Editar vacuna</DialogTitle>
        <DialogContent>
          <VaccineForm petId={petId} vaccinationId={apliedVaccine.id} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};
