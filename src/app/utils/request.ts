import { httpAxios } from './axios';
import { Response, ResponseStatus, SuccessResponse } from '../interfaces';
import { setAlert } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type DispatchType = ThunkDispatch<unknown, unknown, AnyAction>;

export class RequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function post<T>(endpoint: string, body: unknown, dispatch: DispatchType) {
  const { data } = await httpAxios.post<Response<T>>(
    `${process.env.BACKEND_HOST}/${endpoint}`,
    body
  );

  return handleResponse(data, dispatch);
}

export async function get<T>(endpoint: string, dispatch: DispatchType) {
  const { data } = await httpAxios.get<Response<T>>(`${process.env.BACKEND_HOST}/${endpoint}`);

  return handleResponse(data, dispatch);
}

export async function remove<T>(endpoint: string, dispatch: DispatchType) {
  const { data } = await httpAxios.delete<Response<T>>(`${process.env.BACKEND_HOST}/${endpoint}`);

  return handleResponse(data, dispatch);
}

export async function put<T>(endpoint: string, body: unknown, dispatch: DispatchType) {
  const { data } = await httpAxios.put<Response<T>>(
    `${process.env.BACKEND_HOST}/${endpoint}`,
    body
  );

  return handleResponse(data, dispatch);
}

function handleResponse<T>(response: Response<T>, dispatch: DispatchType): SuccessResponse<T> {
  if (response.status !== ResponseStatus.SUCCESS) {
    const { status, message } = response;
    dispatch(
      setAlert({
        severity: status,
        title: 'Error al iniciar sesión',
        message: message
      })
    );

    throw new RequestError(message);
  }

  return response;
}
