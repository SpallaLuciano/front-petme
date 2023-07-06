import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Chat as ChatComponent } from '../../components';
import style from './Chats.module.scss';

export const Chat: FC = () => {
  const { userId } = useParams();

  return (
    <div className={style.ChatContainer}>
      <ChatComponent userId={String(userId)} />
    </div>
  );
};
