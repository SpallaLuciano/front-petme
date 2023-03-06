import { FC } from 'react';
import { Message } from '../../interfaces';
import { ChatMessage } from './ChatMessage';
import style from './Chats.module.scss';

export const ChatBox: FC<{ messages: Message[] }> = ({ messages }) => {
  const formatedMessages = messages.map((message) => {
    return (
      <div>
        <ChatMessage message={message} />
      </div>
    );
  });

  return <div className={style.ChatBox}>{formatedMessages}</div>;
};
