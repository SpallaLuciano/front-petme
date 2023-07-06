export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export type Response<T> = SuccessResponse<T> | FailureResponse;

export interface SuccessResponse<T> {
  status: ResponseStatus.SUCCESS;
  data: T;
}

export interface FailureResponse {
  status: ResponseStatus.ERROR | ResponseStatus.WARNING;
  message: string;
}
