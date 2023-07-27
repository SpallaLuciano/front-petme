import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state';
import { dateOrHour } from '../../utils';
import style from './Chats.module.scss';
import { TypeId } from '../../interfaces';

export const ChatList: FC = () => {
  const navigate = useNavigate();

  const chats = useAppSelector((state) => {
    const chats = Object.values(state.chats.chats);

    return chats.map((chat) => {
      const user = chat.users.filter((user) => user !== state.profile.profile?.id)[0];
      const profile = state.profile.profiles[user];

      return {
        ...chat,
        profile: {
          id: user,
          image: profile?.image,
          fullname: `${profile?.name} ${profile?.lastname}`
        }
      };
    });
  });

  const handleClick = (id: TypeId) => {
    navigate(`/chats/${id}`);
  };

  const chatComponent = chats.map(({ messages, profile }, key) => {
    const lastmessage = messages[messages.length - 1];

    return (
      <ListItemButton key={key} onClick={() => handleClick(profile.id)}>
        <ListItemAvatar>
          <Avatar alt={profile.image?.description} src={profile.image?.url} />
        </ListItemAvatar>
        <ListItemText
          primary={profile.fullname}
          secondary={
            <div className={style.ChatPreview}>
              <span>{lastmessage.content}</span>
              <span>{dateOrHour(lastmessage.datetime)}</span>
            </div>
          }
        />
      </ListItemButton>
    );
  });

  return <List component="nav">{chatComponent}</List>;
};
