import { IconButton, OutlinedInput } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage, useAppDispatch, useAppSelector } from '../../state';

export const ChatInput: FC<{ chatId: number }> = ({ chatId }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const user = useAppSelector((state) => state.auth.auth.user);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    dispatch(
      sendMessage({
        chat: chatId,
        content,
        date: new Date(),
        user: user || -1
      })
    );
    setContent('');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <OutlinedInput
      fullWidth
      value={content}
      onChange={handleInputChange}
      onKeyDown={onKeyDown}
      endAdornment={
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      }
    />
  );
};
