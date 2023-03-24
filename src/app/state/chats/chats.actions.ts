import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Chat } from '../../interfaces';
import { ChatMessageOutput, FetchChatOutput } from '../../outputs';
import { ChatsState } from './chats.state';

export const actionFetchChatsFulfilled = (
  state: ChatsState,
  { payload: { chats, currentUser } }: PayloadAction<FetchChatOutput>
) => {
  chats.forEach((chat) => {
    const userId = chat.users.find((user) => user !== currentUser);

    state.chats[String(userId)] = chat;
  });

  state.status = GeneralStatus.SUCCESS;
};

export const actionSendAndReceiveMessageFulfilled = (
  state: ChatsState,
  { payload: { currentUser, message } }: PayloadAction<ChatMessageOutput>
) => {
  state.chats[message.chat] ??= {
    id: message.chat,
    messages: [],
    users: [currentUser, message.user]
  };
  state.chats[message.chat].messages.push(message);
  state.status = GeneralStatus.SUCCESS;
};

export const actionCreateChatFulfilled = (state: ChatsState, { payload }: PayloadAction<Chat>) => {
  state.chats[payload.id] = payload;
  state.status = GeneralStatus.SUCCESS;
};
