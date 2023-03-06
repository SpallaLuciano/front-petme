import { IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatList } from '../../components';
import style from './Chats.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Chats: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={style.Container}>
      <div className={style.ChatList}>
        <div className={style.Back}>
          <IconButton className={style.ArrowBack} onClick={() => navigate('/home')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body1">Volver al inicio</Typography>
        </div>
        <ChatList />
      </div>
    </div>
  );
};
