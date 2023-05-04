export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface Response<T> {
  status: ResponseStatus;
  data?: T;
  message?: string;
  error?: Error;
}
