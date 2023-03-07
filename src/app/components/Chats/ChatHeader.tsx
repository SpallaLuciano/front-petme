import { Avatar, Icon, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../state';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import style from './Chats.module.scss';

export const ChatHeader: FC<{ chatId: number }> = ({ chatId }) => {
  const navigate = useNavigate();

  const { id, fullname, image, rating } = useAppSelector((state) => {
    const chat = state.chats.chats.find((chat) => chat.id === chatId);
    const userId = chat?.users.filter((user) => state.auth.auth.user !== user)[0];

    if (userId) {
      const { image, lastname, name, rating, id } = state.profile.profiles[userId];

      return {
        id,
        fullname: `${name} ${lastname}`,
        image: {
          url: image?.url,
          description: image?.description
        },
        rating
      };
    } else {
      return {
        id: '',
        fullname: '',
        image: {
          url: '',
          description: ''
        },
        rating: 0
      };
    }
  });

  return (
    <div className={style.Header}>
      <IconButton className={style.ArrowBack} onClick={() => navigate('/chats')}>
        <ArrowBackIcon />
      </IconButton>
      <div className={style.HeaderClick} onClick={() => navigate(`/profiles/${id}`)}>
        <Avatar alt={image.description} src={image.url}>
          {fullname}
        </Avatar>
        <Typography variant="body2" className={style.Name}>
          {fullname}
        </Typography>
        <div className={style.Rating}>
          <Icon>
            <StarIcon />
          </Icon>
          <Typography variant="body2">{rating}</Typography>
        </div>
      </div>
    </div>
  );
};
