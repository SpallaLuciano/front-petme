import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Chat, Message } from '../../interfaces';
import { ChatsState } from './chats.state';

export const actionFetchChatsFulfilled = (
  state: ChatsState,
  { payload }: PayloadAction<Chat[]>
) => {
  payload.forEach((chat) => {
    state.chats[chat.id] = chat;
  });

  state.status = GeneralStatus.SUCCESS;
};

export const actionSendAndReceiveMessageFulfilled = (
  state: ChatsState,
  { payload }: PayloadAction<Message>
) => {
  state.chats[payload.chat].messages.push(payload);
  state.status = GeneralStatus.SUCCESS;
};
