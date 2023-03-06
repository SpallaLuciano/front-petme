import { Profile, GeneralState } from '../../interfaces';

export interface ProfileState extends GeneralState {
  profiles: { [key: number]: Profile };
  user: number;
  profile: Profile | null;
}
