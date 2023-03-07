import { Chat, GeneralState } from '../../interfaces';

export interface ChatsState extends GeneralState {
  chats: { [key: string]: Chat };
}
