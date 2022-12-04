import { GeneralStatus } from '../../enums';
import { Profile } from '../../interfaces';

export interface ProfileState {
  status: GeneralStatus;
  error: null | string;
  profiles: { [key: number]: Profile};
  user: number;
  profile: Profile | null;
}
