import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state';
import { dateOrHour } from '../../utils';
import style from './Chats.module.scss';

export const ChatList: FC = () => {
  const navigate = useNavigate();

  const chats = useAppSelector((state) => {
    return state.chats.chats.map((chat) => {
      const user = chat.users.filter((user) => user !== state.auth.auth.user)[0];
      const profile = state.profile.profiles[user];

      return {
        ...chat,
        user: {
          image: profile.image,
          fullname: `${profile.name} ${profile.lastname}`
        }
      };
    });
  });

  const handleClick = (id: number) => {
    navigate(`/chats/${id}`);
  };

  const chatComponent = chats.map(({ id, messages, user }, key) => {
    const lastmessage = messages[messages.length - 1];

    return (
      <ListItemButton key={key} onClick={() => handleClick(id)}>
        <ListItemAvatar>
          <Avatar alt={user.image?.description} src={user.image?.url} />
        </ListItemAvatar>
        <ListItemText
          primary={user.fullname}
          secondary={
            <div className={style.ChatPreview}>
              <span>{lastmessage.content}</span>
              <span>{dateOrHour(lastmessage.date)}</span>
            </div>
          }
        />
      </ListItemButton>
    );
  });

  return <List component="nav">{chatComponent}</List>;
};
