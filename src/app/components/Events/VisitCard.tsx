import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Visit } from '../../interfaces';
import { visitProps } from '../../enums';
import { removeVisitHealth, useAppDispatch } from '../../state';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './Events.module.scss';
import { VisitForm } from './VisitForm/VisitForm';
import { useState } from 'react';

export const VisitCard: React.FC<{ visit: Visit; isOwner: boolean }> = ({ visit, isOwner }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { datetime, description, type, place, address } = visit;
  const date = format(new Date(datetime), 'PPP', { locale: es });

  const removeVisit = () => {
    dispatch(removeVisitHealth(visit.id));
  };

  return (
    <div className={style.CardContainer}>
      <Card sx={{ backgroundColor: visitProps[type].color }}>
        <CardContent>
          <div className={style.Right}>
            <Typography variant="subtitle1">{visitProps[type].label}</Typography>
            <Typography variant="body1">{date}</Typography>
          </div>
          <Typography variant="subtitle2">
            {address} - {place}
          </Typography>
          <Typography sx={{ withd: 'fit-content' }} variant="body1">
            {description}
          </Typography>
          {isOwner ? (
            <>
              <IconButton className={style.DeleteIcon} onClick={removeVisit}>
                <DeleteIcon />
              </IconButton>
              <IconButton className={style.DeleteIcon} onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
            </>
          ) : undefined}
        </CardContent>
      </Card>
      <Dialog sx={{ padding: '8px' }} open={open} onClose={handleClose}>
        <DialogTitle>Agregar una visita</DialogTitle>
        <DialogContent>
          <VisitForm visit={visit} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
