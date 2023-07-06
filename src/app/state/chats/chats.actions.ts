import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Chat, Message } from '../../interfaces';
import { FetchChatOutput } from '../../outputs';
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

export const actionSendMessageFulfilled = (
  state: ChatsState,
  { payload }: PayloadAction<boolean>
) => {
  if (payload) {
    state.status = GeneralStatus.SUCCESS;
  } else {
    state.status = GeneralStatus.FAILED;
  }
};

export const actionReceiveMessageFulfilled = (
  state: ChatsState,
  { payload }: PayloadAction<Message>
) => {
  state.chats[payload.chat] ??= {
    id: payload.chat,
    messages: [],
    users: [payload.sender, payload.receiber]
  };
  state.chats[payload.chat].messages.push(payload);
  state.status = GeneralStatus.SUCCESS;
};

export const actionCreateChatFulfilled = (state: ChatsState, { payload }: PayloadAction<Chat>) => {
  state.chats[payload.id] = payload;
  state.status = GeneralStatus.SUCCESS;
};
