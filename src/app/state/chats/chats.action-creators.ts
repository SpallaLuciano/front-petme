import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat } from '../../interfaces';
import { CHATS } from '../../mocks/chats.mock';

export const fetchChats = createAsyncThunk<Chat[], number>('chats/fetchChats', async (userId) => {
  const { data } = await Promise.resolve({
    data: CHATS.filter((chat) => chat.users.includes(userId))
  });

  return data;
});
