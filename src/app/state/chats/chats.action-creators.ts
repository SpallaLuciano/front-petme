import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat, Message } from '../../interfaces';
import { CHATS } from '../../mocks/chats.mock';
import { socket } from '../../socket';

export const fetchChats = createAsyncThunk<
  Chat[],
  void,
  {
    rejectValue: string;
  }
>('chats/fetchChats', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({
      data: CHATS
    });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const sendMessage = createAsyncThunk<
  Message,
  Message,
  {
    rejectValue: string;
  }
>('chats/sendMessage', async (message, { rejectWithValue }) => {
  try {
    socket.emit('message', message);
    return message;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const receiveMessage = createAsyncThunk<
  Message,
  void,
  {
    rejectValue: string;
  }
>('chats/receiveMessage', async (_, { rejectWithValue }) => {
  try {
    return new Promise<Message>((resolve) => {
      socket.on('message', (message: Message) => {
        resolve(message);
      });
    });
  } catch (error) {
    return rejectWithValue('error');
  }
});
