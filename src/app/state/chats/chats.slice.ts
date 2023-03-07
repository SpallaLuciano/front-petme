import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { fetchChats } from './chats.action-creators';
import { actionFetchChatsFulfilled } from './chats.actions';
import { ChatsState } from './chats.state';

const initialState: ChatsState = {
  status: GeneralStatus.IDLE,
  chats: [],
  error: null
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, actionFetchChatsFulfilled)
      .addMatcher(isAnyOf(fetchChats.pending), actionPending)
      .addMatcher(isAnyOf(fetchChats.rejected), actionRejected);
  }
});

export default chatsSlice.reducer;
