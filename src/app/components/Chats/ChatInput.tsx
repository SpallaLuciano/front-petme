import { IconButton, OutlinedInput } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage, useAppDispatch } from '../../state';
import { TypeId } from '../../interfaces';

export const ChatInput: FC<{ userId: TypeId }> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    dispatch(
      sendMessage({
        receiverId: userId,
        content,
        datetime: new Date()
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
      style={{ backgroundColor: 'white' }}
      endAdornment={
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      }
    />
  );
};
