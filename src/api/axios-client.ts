import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.26:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;
