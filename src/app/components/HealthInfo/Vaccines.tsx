import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../state';
import { VaccineForm } from './VaccineForm';
import { Vaccine } from './Vaccine';
import { TypeId } from '../../interfaces';

export const Vaccines: FC<{ petId: TypeId }> = ({ petId }) => {
  const [open, setOpen] = useState(false);

  const { isCurrentUser, health } = useAppSelector((state) => {
    const pet = state.pet.pets[petId];
    const isCurrentUser = pet.owner.id === state.profile.profile?.id;
    const health = state.health.health[petId];

    return { isCurrentUser, health };
  });

  const handleClose = () => {
    setOpen(false);
  };

  const editButton = (
    <IconButton onClick={() => setOpen(true)}>
      <AddIcon />
    </IconButton>
  );

  const apliedVaccines = health.vaccinations.map((apliedVaccine) => {
    return <Vaccine apliedVaccine={apliedVaccine} petId={petId} />;
  });

  return (
    <div>
      <Typography variant="h5">
        Vacunas aplicadas {isCurrentUser ? editButton : undefined}
      </Typography>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {apliedVaccines.length ? apliedVaccines : 'No tiene vacunas aplicadas'}
        {isCurrentUser}
      </div>
      <Dialog sx={{ padding: '8px' }} open={open} onClose={handleClose}>
        <DialogTitle>Agregar una vacuna</DialogTitle>
        <DialogContent>
          <VaccineForm petId={petId} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
