import { Profile } from '../interfaces';

export interface SignIn {
  token: string;
  user: {
    id: string;
    email: string;
    admin: boolean;
    validated: boolean;
    active: boolean;
    profile: Profile;
  };
}
