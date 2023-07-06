import { ResponseStatus } from './response';

export interface Alert {
  message: string | null;
  severity?: ResponseStatus | null;
  title: string | null;
}
