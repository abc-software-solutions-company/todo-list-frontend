import axios from 'axios';

import TaskAPI from '@/api/network/todo';
import UserAPI from '@/api/network/user';
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
        // Lấy đường dẫn hiện tại
        const currentPath = window.location.href;
        // Kiểm tra xem đây có phải là đường dẫn đến list detail không
        const isListDetail = currentPath.includes(`${ROUTES.LIST}/`);
        // Nếu là đường dẫn đến list detail
        if (isListDetail) {
          // Lấy ID list ra
          const listID = currentPath.split('/')[4];
          // Nếu ID list không hợp lệ (undenfined hoặc số lượng kí tự  không phù hợp {không đủ 5})
          if (listID == undefined || listID.length != 5) {
            console.log('😓😓 ListID không phù hợp');
          } else {
            // Nếu đúng định dạng listID thì tiến hành kiểm tra xem phòng có tồn tại hay ko?
            TaskAPI.getTodo(listID).then(res => {
              // Nếu lấy list thành công thì in ra thử, sẽ tạo anonymous user chỗ này
              console.log(res.data);
              // Sau đó ta sẽ gọi API để tạo anonymous user
              // Có thể tạo tên theo cú pháp anonymous + "Random Character" + "Random Emoji"
              UserAPI.createUser({userName: 'anonymous 😎'});
            });
            console.log('🤩🤩🤩 list ID đúng định dạng');
          }
        }

        // console.log(listID == );

        // window.location.href = ROUTES.LOGIN;
        LocalStorage.accessToken.remove();
      }
    }
    return Promise.reject(err);
  }
);

setupInterceptorsTo(axiosClient);

export default axiosClient;
