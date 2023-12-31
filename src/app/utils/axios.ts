import axios, { AxiosRequestConfig } from 'axios';

export const httpAxios = axios.create();
httpAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('tkn');

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});
