import { FC, useState } from 'react';
import { VisitCard } from './VisitCard';
import style from './Events.module.scss';
import { useAppSelector } from '../../state';
import { AddCard } from './AddCard';
import { VisitForm } from './VisitForm/VisitForm';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { sortVisitsByDate } from '../../utils';
import { TypeId } from '../../interfaces';

export const EventsList: FC<{ petId: TypeId }> = ({ petId }) => {
  const [open, setOpen] = useState(false);
  const { visits, isOwner } = useAppSelector((state) => {
    const isOwner = state.pet.pets[petId].owner === state.profile.profile?.id;

    return {
      visits: state.health.health[petId].visits,
      isOwner
    };
  });

  const handleClose = () => {
    setOpen(false);
  };

  const visitCards = [...visits]
    .sort(sortVisitsByDate)
    .map((visit) => <VisitCard visit={visit} isOwner={isOwner} />);

  return (
    <div className={style.List}>
      <AddCard onClick={() => setOpen(true)} />
      {visitCards}
      <Dialog sx={{ padding: '8px' }} open={open} onClose={handleClose}>
        <DialogTitle>Agregar una visita</DialogTitle>
        <DialogContent>
          <VisitForm petId={petId} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
