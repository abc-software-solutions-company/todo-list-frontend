import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthLogin, IAuthResponse, IAuthUpdate} from './types/auth.type';
import {ITaskCreate, ITaskGet, ITaskReindexAll, ITaskResponse, ITaskUpdate} from './types/task.type';
import {ISyncTodolist, ITodolistCreate, ITodolistGetOne, ITodolistResponse, ITodolistUpdate} from './types/todolist.type';
import {IUserResponse} from './types/user.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => http.post<IAuthResponse>(API_ENDPOINTS.AUTH, data),
    verify: () => http.get<IUserResponse>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthUpdate) => http.patch<IUserResponse>(API_ENDPOINTS.AUTH, data)
  },
  user: {
    getIndentify: () => http.get<IUserResponse[]>(API_ENDPOINTS.USER + '/identify')
  },
  todolist: {
    get: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST),
    getOne: ({id}: ITodolistGetOne) => http.get<ITodolistResponse>(API_ENDPOINTS.LIST + '/' + id),
    getByUser: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/user'),
    getFavorite: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/favorite'),
    create: (data: ITodolistCreate) => http.post<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    update: (data: ITodolistUpdate) => http.patch<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    syncTodolist: (data: ISyncTodolist) => http.post<IAuthResponse>(API_ENDPOINTS.LIST + '/sync-todolist', data)
  },
  task: {
    get: () => http.get<ITaskResponse[]>(API_ENDPOINTS.TASK),
    getOne: ({id}: ITaskGet) => http.get<ITaskResponse>(API_ENDPOINTS.TASK + '/' + id),
    create: (data: ITaskCreate) => http.post<ITaskResponse>(API_ENDPOINTS.TASK, data),
    update: (data: ITaskUpdate) => http.patch<ITaskResponse>(API_ENDPOINTS.TASK, data),
    reindexAll: (data: ITaskReindexAll) => http.patch(API_ENDPOINTS.TASK + '/reindex-all', data)
  }
};

export default api;
