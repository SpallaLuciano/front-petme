import { TypeId } from '../interfaces';

export interface SendMessageInput {
  receiverId: TypeId;
  content: string;
  datetime: Date;
}
