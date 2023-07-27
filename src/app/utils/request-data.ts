import { httpAxios } from './axios';
import { Response, ResponseStatus, SuccessResponse } from './response';
import { setAlert } from '../state/alert/alert.slice';
import { RequestError } from './error';

export async function post<T>(endpoint: string, body: unknown, dispatch) {
  const { data } = await httpAxios.post<Response<T>>(
    `${process.env.REACT_APP_BACKEND_HOST}/${endpoint}`,
    body
  );

  return handleResponse(data, dispatch);
}

export async function get<T>(endpoint: string, dispatch) {
  const { data } = await httpAxios.get<Response<T>>(
    `${process.env.REACT_APP_BACKEND_HOST}/${endpoint}`
  );

  return handleResponse(data, dispatch);
}

export async function remove<T>(endpoint: string, dispatch) {
  const { data } = await httpAxios.delete<Response<T>>(
    `${process.env.REACT_APP_BACKEND_HOST}/${endpoint}`
  );

  return handleResponse(data, dispatch);
}

export async function put<T>(endpoint: string, body: unknown, dispatch) {
  const { data } = await httpAxios.put<Response<T>>(
    `${process.env.REACT_APP_BACKEND_HOST}/${endpoint}`,
    body
  );

  return handleResponse(data, dispatch);
}

function handleResponse<T>(response: Response<T>, dispatch): SuccessResponse<T> {
  if (response.status !== ResponseStatus.SUCCESS) {
    const { status, message } = response;
    dispatch(
      setAlert({
        severity: status,
        title: 'Error de operacion',
        message: message
      })
    );

    throw new RequestError(message);
  }

  return response;
}
