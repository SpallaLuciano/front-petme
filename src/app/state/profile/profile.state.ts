import { Profile, GeneralState, TypeId } from '../../interfaces';

export interface ProfileState extends GeneralState {
  profiles: { [key: TypeId]: Profile };
  user: TypeId | null;
  profile: Profile | null;
}
