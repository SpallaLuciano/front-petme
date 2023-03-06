import { FC } from 'react';
import { useAppSelector } from '../../state';
import { ChatBox } from './ChatBox';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import style from './Chats.module.scss';

export const Chat: FC<{ chatId: number }> = ({ chatId }) => {
  const chat = useAppSelector((state) => state.chats.chats.find((chat) => chat.id === chatId));

  return (
    <div className={style.ChatContainer}>
      <ChatHeader chatId={chatId} />
      <ChatBox messages={chat?.messages || []} />
      <ChatInput chatId={chatId} />
    </div>
  );
};
