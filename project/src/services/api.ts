import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from '../utils/token';

const BASE_URL = 'https://11.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;

export const createApiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    config.headers = config.headers ?? {};

    if (config && token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
