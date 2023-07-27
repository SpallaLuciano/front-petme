import { TypeId } from './id';

export interface Image {
  id: TypeId;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
