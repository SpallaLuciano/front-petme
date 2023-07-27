import { Chat, GeneralState, TypeId } from '../../interfaces';

export interface ChatsState extends GeneralState {
  chats: { [key: TypeId]: Chat };
}
