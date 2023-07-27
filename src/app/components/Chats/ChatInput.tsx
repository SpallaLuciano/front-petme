import { IconButton, OutlinedInput } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch } from '../../state';
import { TypeId } from '../../interfaces';
import { sendMessage } from '../../state/chats/chats.action-creators';

export const ChatInput: FC<{ profileId: TypeId }> = ({ profileId }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    dispatch(
      sendMessage({
        receiverId: profileId,
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
