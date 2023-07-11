import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Chat, Message } from '../../interfaces';
import { FetchChatOutput } from '../../outputs';
// import { socket } from '../../utils';
import { RootState } from '../store';
import { SendMessageInput } from '../../inputs';
import { get } from '../../utils';

const endpoint = 'chats';

export const fetchChats = createAsyncThunk<
  FetchChatOutput,
  void,
  {
    rejectValue: string;
  }
>('chats/fetchChats', async (_, { rejectWithValue, dispatch, getState }) => {
  try {
    const { data } = await get<Chat[]>(endpoint, dispatch);
    const id = (getState() as RootState).profile.profile?.id || '';

    return { chats: data, currentUser: id };
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
  boolean,
  SendMessageInput,
  {
    rejectValue: string;
  }
>('chats/sendMessage', async (message, { rejectWithValue }) => {
  try {
    // socket.emit('new-message', message);

    return true;
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
>('chats/receiveMessage', async (_, { rejectWithValue, getState }) => {
  try {
    const currentUser = (getState() as RootState).auth.auth.user;

    if (!currentUser) throw new Error('error');

    return new Promise<Message>((resolve) => {
      // socket.on('message', (message: Message) => {
      //   resolve(message);
      // });
      resolve(true as unknown as Message);
    });
  } catch (error) {
    return rejectWithValue('error');
  }
});
