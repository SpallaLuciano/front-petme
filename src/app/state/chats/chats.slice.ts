import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { actionPending, actionRejected } from '../actions';
import { fetchChats, sendMessage } from './chats.action-creators';
import {
  actionFetchChatsFulfilled,
  actionSendMessageFulfilled,
  actionSignOutFulfilled
} from './chats.actions';
import { ChatsState } from './chats.state';
import { Message, TypeId } from '../../interfaces';
import { signOut } from '../auth/auth.action-creators';

const initialState: ChatsState = {
  status: GeneralStatus.IDLE,
  chats: {},
  error: null
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    receiveMessage: (
      state,
      { payload: { message, id } }: PayloadAction<{ message: Message; id: TypeId }>
    ) => {
      const chatProfileId = message.receiver === id ? message.sender : message.receiver;

      if (typeof message.chat === 'object') {
        if (!state.chats[chatProfileId]) {
          state.chats[chatProfileId] ??= message.chat;
          state.chats[chatProfileId].messages = [{ ...message, chat: message.chat.id }];
        } else {
          state.chats[chatProfileId].messages.push({ ...message, chat: message.chat.id });
        }
      }

      state.status = GeneralStatus.SUCCESS;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, actionFetchChatsFulfilled)
      .addCase(sendMessage.fulfilled, actionSendMessageFulfilled)
      .addCase(signOut.fulfilled, actionSignOutFulfilled)
      .addMatcher(isAnyOf(fetchChats.pending, sendMessage.pending), actionPending)
      .addMatcher(isAnyOf(fetchChats.rejected, sendMessage.rejected), actionRejected);
  }
});

export default chatsSlice.reducer;
export const { receiveMessage } = chatsSlice.actions;
