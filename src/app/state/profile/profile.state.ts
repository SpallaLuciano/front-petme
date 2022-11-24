import { GeneralStatus } from '../../enums';
import { Profile } from '../../interfaces';

export interface ProfileState {
  status: GeneralStatus;
  error: null | string;
  profile: Profile | null;
}
