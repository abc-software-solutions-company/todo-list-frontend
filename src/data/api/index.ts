import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthLogin, IAuthResponse, IAuthUpdate, IUserResponse} from './types/auth.type';
import {IFavoriteCreate, IFavoriteResponse, IFavoriteUpdate} from './types/favorite.type';
import {ITaskCreate, ITaskGet, ITaskReindex, ITaskResponse, ITaskUpdate} from './types/task.type';
import {IListCreate, IListGetOne, IListUpdate, ITodolistResponse} from './types/todolist.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => http.post<IAuthResponse>(API_ENDPOINTS.AUTH, data),
    verify: () => http.get<IUserResponse>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthUpdate) => http.patch<IUserResponse>(API_ENDPOINTS.AUTH, data)
  },
  todolist: {
    get: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST),
    getOne: ({id}: IListGetOne) => http.get<ITodolistResponse>(API_ENDPOINTS.LIST + '/' + id),
    getByUser: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/user'),
    getFavorite: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/favorite'),
    create: (data: IListCreate) => http.post<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    update: (data: IListUpdate) => http.patch<ITodolistResponse>(API_ENDPOINTS.LIST, data)
  },
  task: {
    get: () => http.get<ITaskResponse[]>(API_ENDPOINTS.TASK),
    getOne: ({id}: ITaskGet) => http.get<ITaskResponse>(API_ENDPOINTS.TASK + '/' + id),
    create: (data: ITaskCreate) => http.post<ITaskResponse>(API_ENDPOINTS.TASK, data),
    update: (data: ITaskUpdate) => http.patch<ITaskResponse>(API_ENDPOINTS.TASK, data),
    reindex: (data: ITaskReindex) => http.patch(API_ENDPOINTS.TASK + '/reindex', data)
  },
  favorite: {
    create: (data: IFavoriteCreate) => http.post<IFavoriteResponse>(API_ENDPOINTS.FAVORITE, data),
    update: (data: IFavoriteUpdate) => http.patch<IFavoriteResponse>(API_ENDPOINTS.FAVORITE, data)
  }
};

export default api;
