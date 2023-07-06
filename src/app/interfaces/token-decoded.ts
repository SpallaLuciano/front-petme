import { TypeId } from './id';

export interface TokenDecoded {
  id: TypeId;
  admin: boolean;
  expirationDate: string;
}
