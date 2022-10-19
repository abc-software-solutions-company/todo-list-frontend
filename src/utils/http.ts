import axios, {AxiosError} from 'axios';

import {ROUTES} from '@/configs/routes.config';
import LocalStorage from '@/utils/local-storage';

// eslint-disable-next-line react-hooks/rules-of-hooks

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    api_key: process.env.NEXT_PUBLIC_API_KEY || ''
  }
});

http.interceptors.request.use(
  config => {
    config.headers = {...config.headers};
    if (typeof window !== 'undefined') {
      const accessToken = LocalStorage.accessToken.get();
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => err
);

http.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError<any, any>) => {
    if (error.response?.data === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  }
);

export default http;
