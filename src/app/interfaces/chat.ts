import { TypeId } from './id';

export interface Message {
  id: TypeId;
  chat: Chat | string;
  sender: TypeId;
  receiver: TypeId;
  content: string;
  datetime: Date;
}

export interface Chat {
  id: TypeId;
  messages: Message[];
  users: [TypeId, TypeId]; // Profiles
}
