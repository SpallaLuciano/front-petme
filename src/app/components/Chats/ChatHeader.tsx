import { Avatar, Icon, Typography } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../state';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import style from './Chats.module.scss';
import { Backward } from '../Backward';
import { TypeId } from '../../interfaces';

export const ChatHeader: FC<{ profileId: TypeId }> = ({ profileId }) => {
  const navigate = useNavigate();

  const { id, fullname, image, rating } = useAppSelector((state) => {
    if (profileId) {
      const { image, lastname, name, rating, id } = state.profile.profiles[profileId];

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
      <Backward />
      <div className={style.HeaderClick} onClick={() => navigate(`/profiles/${id}`)}>
        <Avatar alt={image.description} src={image.url}>
          {fullname.charAt(0)}
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
