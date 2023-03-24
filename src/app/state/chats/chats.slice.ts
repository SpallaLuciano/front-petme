import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { createChat, fetchChats, receiveMessage, sendMessage } from './chats.action-creators';
import {
  actionCreateChatFulfilled,
  actionFetchChatsFulfilled,
  actionSendAndReceiveMessageFulfilled
} from './chats.actions';
import { ChatsState } from './chats.state';

const initialState: ChatsState = {
  status: GeneralStatus.IDLE,
  chats: {},
  error: null
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, actionFetchChatsFulfilled)
      .addCase(sendMessage.fulfilled, actionSendAndReceiveMessageFulfilled)
      .addCase(receiveMessage.fulfilled, actionSendAndReceiveMessageFulfilled)
      .addCase(createChat.fulfilled, actionCreateChatFulfilled)
      .addMatcher(
        isAnyOf(
          fetchChats.pending,
          sendMessage.pending,
          receiveMessage.pending,
          createChat.pending
        ),
        actionPending
      )
      .addMatcher(
        isAnyOf(
          fetchChats.rejected,
          sendMessage.rejected,
          receiveMessage.rejected,
          createChat.rejected
        ),
        actionRejected
      );
  }
});

export default chatsSlice.reducer;
