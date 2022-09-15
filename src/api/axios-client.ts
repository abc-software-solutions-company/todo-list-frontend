import axios from 'axios';

import {setupInterceptorsTo} from './interceptors';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

setupInterceptorsTo(axiosClient);

export default axiosClient;
