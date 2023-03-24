import { FC } from 'react';
import { useAppSelector } from '../../state';
import { ChatBox } from './ChatBox';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import style from './Chats.module.scss';

export const Chat: FC<{ userId: number }> = ({ userId }) => {
  const chat = useAppSelector((state) => state.chats.chats[userId]);

  return (
    <div className={style.ChatContainer}>
      <div className={style.HeaderTop}>
        <ChatHeader userId={userId} />
      </div>
      <div className={style.Content}>
        <ChatBox messages={chat?.messages || []} />
      </div>
      <div className={style.InputBottom}>
        <ChatInput userId={userId} />
      </div>
    </div>
  );
};
