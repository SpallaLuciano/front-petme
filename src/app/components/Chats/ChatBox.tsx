import { FC, useEffect } from 'react';
import { TypeId } from '../../interfaces';
import { ChatMessage } from './ChatMessage';
import { useAppSelector } from '../../state';
import style from './Chats.module.scss';

export const ChatBox: FC<{ profileId: TypeId; onMessage: () => void }> = ({
  profileId,
  onMessage
}) => {
  const messages = useAppSelector((state) => state.chats.chats[profileId]?.messages || []);

  useEffect(() => {
    onMessage();
  }, [messages.length]);

  const componentMessages = messages.map((message) => {
    return <ChatMessage key={message.id} message={message} />;
  });

  return <div className={style.ChatBox}>{componentMessages}</div>;
};
