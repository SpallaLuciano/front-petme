import { TypeId } from './id';

export interface Message {
  chat: TypeId;
  sender: TypeId;
  receiber: TypeId;
  content: string;
  datetime: Date;
}

export interface Chat {
  id: TypeId;
  messages: Message[];
  users: [TypeId, TypeId];
}
