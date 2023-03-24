import { IconButton } from '@mui/material';
import { FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const Backward: FC = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </IconButton>
  );
};
