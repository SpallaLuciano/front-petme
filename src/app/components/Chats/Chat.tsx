import { FC, useRef } from 'react';
import { ChatBox } from './ChatBox';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import style from './Chats.module.scss';
import { TypeId } from '../../interfaces';

export const Chat: FC<{ profileId: TypeId }> = ({ profileId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = containerRef.current;

    if (container) {
      console.log(container.scrollHeight, container.offsetHeight);

      container.scrollTop = container.scrollHeight - container.offsetHeight;
    }
  };

  return (
    <div className={style.ChatContainer} ref={containerRef}>
      <div className={style.HeaderTop}>
        <ChatHeader profileId={profileId} />
      </div>
      <div className={style.Content}>
        <ChatBox profileId={profileId} onMessage={scrollToBottom} />
      </div>
      <div className={style.InputBottom}>
        <ChatInput profileId={profileId} />
      </div>
    </div>
  );
};
