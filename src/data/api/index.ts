import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthLogin, IAuthResponse, IAuthUpdate} from './types/auth.type';
import {ISeo} from './types/commom';
import {IDocumentAttribute, IDocumentCreate, IUpdateDocument} from './types/documents.type';
import {INotificationResponse} from './types/notification.type';
import {ITaskCreate, ITaskGet, ITaskReindexAll, ITaskResponse, ITaskUpdate} from './types/task.type';
import {
  ITodolistCreate,
  ITodolistGetOne,
  ITodolistResponse,
  ITodolistSync,
  ITodolistUpdate
} from './types/todolist.type';
import {IUserResponse} from './types/user.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => http.post<IAuthResponse>(API_ENDPOINTS.AUTH, data),
    verify: () => http.get<IUserResponse>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthUpdate) => http.patch<IUserResponse>(API_ENDPOINTS.AUTH, data)
  },
  user: {
    getIndentify: () => http.get<IUserResponse[]>(API_ENDPOINTS.USER + '/identify'),
    update: (data: IUserResponse) => http.patch<IUserResponse>(API_ENDPOINTS.USER, data)
  },
  todolist: {
    get: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST),
    seoOne: ({id}: ITodolistGetOne) => http.get<ISeo>(API_ENDPOINTS.LIST + '/seo/' + id),
    getOne: ({id}: ITodolistGetOne) => http.get<ITodolistResponse>(API_ENDPOINTS.LIST + '/' + id),
    getOneKanban: ({id}: ITodolistGetOne) => http.get<ITodolistResponse>(API_ENDPOINTS.LIST + '/board/' + id),

    getByUser: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/user'),
    getFavorite: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/favorite'),
    getMyTasks: () => http.get<ITodolistResponse[]>(API_ENDPOINTS.LIST + '/my-tasks'),
    create: (data: ITodolistCreate) => http.post<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    update: (data: ITodolistUpdate) => http.patch<ITodolistResponse>(API_ENDPOINTS.LIST, data),
    sync: (data: ITodolistSync) => http.post<IAuthResponse>(API_ENDPOINTS.LIST + '/sync', data)
  },
  task: {
    get: () => http.get<ITaskResponse[]>(API_ENDPOINTS.TASK),
    getOne: ({id}: ITaskGet) => http.get<ITaskResponse>(API_ENDPOINTS.TASK + '/' + id),
    create: (data: ITaskCreate) => http.post<ITaskResponse>(API_ENDPOINTS.TASK, data),
    update: (data: ITaskUpdate) => http.patch<ITaskResponse>(API_ENDPOINTS.TASK, data),
    reindexAll: (data: ITaskReindexAll) => http.patch(API_ENDPOINTS.TASK + '/reindex-all', data)
  },
  notification: {
    get: () => http.get<INotificationResponse[]>(API_ENDPOINTS.NOTIFICATION),
    update: (id: string) => http.patch(API_ENDPOINTS.NOTIFICATION + '/' + id),
    updateAll: () => http.patch<INotificationResponse[]>(API_ENDPOINTS.NOTIFICATION)
  },
  documents: {
    getListDocument: (id: string) => http.get<IDocumentAttribute[]>(API_ENDPOINTS.DOCUMENT + '/tree/' + id),
    getOneDocument: (id: string) => http.get<IDocumentAttribute>(API_ENDPOINTS.DOCUMENT + '/' + id),
    updateDocument: (data: IUpdateDocument) => http.patch<IDocumentAttribute>(API_ENDPOINTS.DOCUMENT + '/update', data),
    handleFavorite: (id: string) => http.patch<IDocumentAttribute>(API_ENDPOINTS.DOCUMENT + '/handle-favorite/' + id),
    create: (data: IDocumentCreate) => http.post<IDocumentAttribute>(API_ENDPOINTS.DOCUMENT, data)
  }
};

export default api;
