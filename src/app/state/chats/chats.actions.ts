import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { FetchChatOutput } from '../../outputs';
import { ChatsState } from './chats.state';
import { Chat } from '../../interfaces';

export const actionFetchChatsFulfilled = (
  state: ChatsState,
  { payload: { chats, currentUser } }: PayloadAction<FetchChatOutput>
) => {
  const stateChats: Record<string, Chat> = {};

  chats.forEach((chat) => {
    const userId = chat.users.find((user) => user !== currentUser);

    stateChats[String(userId)] = chat;
  });
  state.chats = stateChats;

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

export const actionSignOutFulfilled = (state: ChatsState) => {
  state.chats = {};
  state.error = null;
  state.status = GeneralStatus.SUCCESS;
};
