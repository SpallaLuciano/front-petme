import { PayloadAction } from '@reduxjs/toolkit';
import { GeneralStatus } from '../../enums';
import { Chat } from '../../interfaces';
import { ChatsState } from './chats.state';

export const actionFetchChatsFulfilled = (
  state: ChatsState,
  { payload }: PayloadAction<Chat[]>
) => {
  state.chats = payload;
  state.status = GeneralStatus.SUCCESS;
};
