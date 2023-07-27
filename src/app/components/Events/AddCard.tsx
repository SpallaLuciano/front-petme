import { Button } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

export const AddCard: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: '#2E8B57', color: 'aliceblue' }}
      startIcon={<AddIcon style={{ color: 'aliceblue' }} />}
    >
      Agregar visita
    </Button>
  );
};
