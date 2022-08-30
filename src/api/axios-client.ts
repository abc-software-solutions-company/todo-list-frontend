import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.14:3100',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;
