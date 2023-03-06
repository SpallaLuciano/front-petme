import { IconButton, OutlinedInput } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export const ChatInput: FC<{ chatId: number }> = ({ chatId }) => {
  const [content, setContent] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    console.log(chatId, content);
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
