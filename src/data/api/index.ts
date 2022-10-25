import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthInfor, IAuthLogin, IAuthResponse, IAuthUpdate} from './types/auth.type';
import {IFavoriteCreate, IFavoriteResponse, IFavoriteUpdate} from './types/favorite.type';
import {IListCreate, IListGetOne, IListUpdate, ITodolistResponse} from './types/list.type';
import {ITaskCreate, ITaskReIndex, ITaskResponse, ITaskUpdate} from './types/task.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => http.post<IAuthResponse>(API_ENDPOINTS.AUTH + '/login', data),
    verify: () => http.get<IAuthInfor>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthUpdate) => http.patch<IAuthInfor>(API_ENDPOINTS.AUTH, data)
  },
  list: {
    get: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST),
    getOne: ({id}: IListGetOne) => http.get<ITodolistResponse>(API_ENDPOINTS.LIST + '/' + id),
    getByUser: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/user'),
    getFavorite: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/favorite'),
    create: (data: IListCreate) => http.post<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    update: (data: IListUpdate) => http.patch<ITodolistResponse>(API_ENDPOINTS.LIST, data)
  },
  task: {
    create: (data: ITaskCreate) => http.post<ITaskResponse>(API_ENDPOINTS.TASK, data),
    update: (data: ITaskUpdate) => http.patch<ITaskResponse>(API_ENDPOINTS.TASK + '/update', data),
    reIndex: (data: ITaskReIndex) => http.patch(API_ENDPOINTS.TASK + '/reIndex', data)
  },
  favorite: {
    create: (data: IFavoriteCreate) => http.post<IFavoriteResponse>(API_ENDPOINTS.FAVORITE, data),
    update: (data: IFavoriteUpdate) => http.patch<IFavoriteResponse>(API_ENDPOINTS.FAVORITE, data)
  }
};

export default api;
