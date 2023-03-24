import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Chat, Message } from '../../interfaces';
import { CHATS } from '../../mocks/chats.mock';
import { ChatMessageOutput, FetchChatOutput } from '../../outputs';
import { socket } from '../../socket';
import { RootState } from '../store';

export const fetchChats = createAsyncThunk<
  FetchChatOutput,
  void,
  {
    rejectValue: string;
  }
>('chats/fetchChats', async (_, { rejectWithValue, getState }) => {
  try {
    const currentUser = (getState() as RootState).auth.auth.user;

    if (!currentUser) throw new Error('error');

    const { data } = await Promise.resolve({
      data: CHATS
    });

    return { chats: data, currentUser };
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const createChat = createAsyncThunk<
  Chat,
  number,
  {
    rejectValue: string;
  }
>('chats/createChat', async (userId, { rejectWithValue, getState }) => {
  try {
    const currentUser = (getState() as RootState).auth.auth.user;

    const { data } = await Promise.resolve<AxiosResponse<Chat>>({
      data: {
        id: 5,
        messages: [],
        users: [currentUser, userId]
      }
    } as AxiosResponse);

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const sendMessage = createAsyncThunk<
  ChatMessageOutput,
  Message,
  {
    rejectValue: string;
  }
>('chats/sendMessage', async (message, { rejectWithValue, getState }) => {
  try {
    const currentUser = (getState() as RootState).auth.auth.user;

    if (!currentUser) throw new Error('error');

    socket.emit('message', message);
    return { message, currentUser };
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const receiveMessage = createAsyncThunk<
  ChatMessageOutput,
  void,
  {
    rejectValue: string;
  }
>('chats/receiveMessage', async (_, { rejectWithValue, getState }) => {
  try {
    const currentUser = (getState() as RootState).auth.auth.user;

    if (!currentUser) throw new Error('error');

    return new Promise<ChatMessageOutput>((resolve) => {
      socket.on('message', (message: Message) => {
        resolve({ message, currentUser });
      });
    });
  } catch (error) {
    return rejectWithValue('error');
  }
});
