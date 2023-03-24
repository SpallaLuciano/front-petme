import { Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Message } from '../../interfaces';
import { useAppSelector } from '../../state';
import style from './Chats.module.scss';

export const ChatMessage: FC<{ message: Message }> = ({ message: { content, date, user } }) => {
  const { profile, currentUser } = useAppSelector((state) => {
    const userProfile = state.profile.profiles[user];

    return {
      profile: {
        fullname: `${userProfile.name} ${userProfile.lastname}`
      },
      currentUser: state.auth.auth.user
    };
  });

  const isCurrentUser = currentUser === user;

  return (
    <Paper
      className={isCurrentUser ? style.PaperRight : style.Paper}
      style={
        isCurrentUser
          ? {
              backgroundColor: '#ffd2a4'
            }
          : undefined
      }
    >
      <Typography variant="body2" className={style.SenderName}>
        {isCurrentUser ? 'Tú' : profile.fullname}
      </Typography>
      <Typography variant="body1">{content}</Typography>
      <Typography variant="caption" color="textSecondary">
        {date.toLocaleString()}
      </Typography>
    </Paper>
  );
};
