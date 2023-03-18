import { Card, CardActionArea, Typography } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import style from './Events.module.scss';

export const AddCard: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card className={style.AddCard}>
      <CardActionArea className={style.ActionAddCard} onClick={onClick}>
        <div className={style.AddButtonContent}>
          <AddIcon /> <Typography variant="body1">Agregar visita</Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};
