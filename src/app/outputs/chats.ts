import { Chat, Message } from '../interfaces';

export interface ChatMessageOutput {
  currentUser: number;
  message: Message;
}

export interface FetchChatOutput {
  currentUser: number;
  chats: Chat[];
}
