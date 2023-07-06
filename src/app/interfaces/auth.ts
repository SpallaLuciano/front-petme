import { TypeId } from './id';

export interface Auth {
  token: string | null;
  user: TypeId | null;
  email: string | null;
  admin: boolean;
  validToken: boolean;
}
