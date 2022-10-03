import axios from 'axios';

import {ROUTES} from '@/configs/routes.config';
import LocalStorage from '@/utils/local-storage';

import {setupInterceptorsTo} from './interceptors';

// eslint-disable-next-line react-hooks/rules-of-hooks

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
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

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err?.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
        LocalStorage.accessToken.remove();
      }
    }
    return Promise.reject(err);
  }
);

setupInterceptorsTo(axiosClient);

export default axiosClient;
