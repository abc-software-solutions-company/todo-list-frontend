import axios from 'axios';

import {ROUTES} from '@/configs/routes.config';
import useLocalStorage from '@/utils/local-storage';

import {setupInterceptorsTo} from './interceptors';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {readToken} = useLocalStorage();

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  config => {
    config.headers = {...config.headers};
    if (typeof window !== 'undefined') {
      const accessToken = readToken();
      console.log(accessToken);

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
        localStorage.setItem('previousPage', window.location.href);
        window.location.href = ROUTES.HOME;
      }
    }
    console.log(err.response);
    return err;
  }
);

setupInterceptorsTo(axiosClient);

export default axiosClient;
