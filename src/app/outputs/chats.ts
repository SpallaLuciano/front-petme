import { Chat, Message, TypeId } from '../interfaces';

export interface ChatMessageOutput {
  currentUser: TypeId;
  message: Message;
}

export interface FetchChatOutput {
  currentUser: TypeId;
  chats: Chat[];
}
