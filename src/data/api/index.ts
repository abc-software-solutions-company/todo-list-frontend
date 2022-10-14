import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthInfor, IAuthLogin, IAuthResponse} from './types/auth.type';
import {
  IList,
  IListCreate,
  IListCreateResponse,
  IListOne,
  IListOneResponse,
  IListUpdate,
  IListUpdateResponse
} from './types/list.type';
import {
  ITaskByList,
  ITaskByListDetail,
  ITaskCreate,
  ITaskCreateResponse,
  ITaskUpdate,
  ITaskUpdateResponse
} from './types/task.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => http.post<IAuthResponse>(API_ENDPOINTS.AUTH + '/login', data),
    verify: () => http.get<IAuthInfor>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthLogin) => http.patch<IAuthInfor>(API_ENDPOINTS.AUTH, data)
  },
  list: {
    getOne: ({id}: IListOne) => http.get<IListOneResponse>(API_ENDPOINTS.LIST + '/' + id),
    user: () => http.get<IList[]>(API_ENDPOINTS.LIST),
    create: (data: IListCreate) => http.post<IListCreateResponse>(API_ENDPOINTS.TASK, data),
    update: (data: IListUpdate) => http.patch<IListUpdateResponse>(API_ENDPOINTS.LIST + '/update', data)
  },
  task: {
    getByList: ({todoListId}: ITaskByList) => http.get<ITaskByListDetail>(API_ENDPOINTS.LIST + '/' + todoListId),
    create: (data: ITaskCreate) => http.post<ITaskCreateResponse>(API_ENDPOINTS.TASK, data),
    update: (data: ITaskUpdate) => http.patch<ITaskUpdateResponse>(API_ENDPOINTS.LIST, data)
  }
};

export default api;
