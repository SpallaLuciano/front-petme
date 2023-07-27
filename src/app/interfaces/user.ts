import { TypeId } from './id';
import { Profile } from './profile';

export interface User {
  id: TypeId;
  email: string;
  admin: boolean;
  validated: boolean;
  active: boolean;
  profile: Profile;
}
