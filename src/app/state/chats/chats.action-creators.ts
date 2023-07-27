import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat, Message } from '../../interfaces';
import { FetchChatOutput } from '../../outputs';
import { RootState } from '../store';
import { SendMessageInput } from '../../inputs';
import { get } from '../../utils';
import socketClient from '../../utils/socket';
import { receiveMessage } from './chats.slice';

const endpoint = 'chats';

export const fetchChats = createAsyncThunk<
  FetchChatOutput,
  void,
  {
    rejectValue: string;
    requestStatus: 'fulfilled';
  }
>('chats/fetchChats', async (_, { rejectWithValue, dispatch, getState }) => {
  try {
    const appState = getState() as RootState;
    const id = appState.profile.profile?.id;
    const token = appState.auth.auth.token;

    if (!id || !token) {
      throw new Error();
    }

    const { data } = await get<Chat[]>(endpoint, dispatch);
    socketClient.onMessage((message: Message) => {
      dispatch(receiveMessage({ message, id }));
    });

    return { chats: data, currentUser: id };
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
    return socketClient.sendMessage(message);
  } catch (error) {
    return rejectWithValue('error');
  }
});
