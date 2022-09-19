import * as HttpRequest from '@/api/http-request';
import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IAxiosResponse} from '@/types';

import {ITask} from '../types/task.type';

type Task = IAxiosResponse<ITask>;
type Tasks = IAxiosResponse<ITask[]>;

const getListTasks = (todoListId: string) => HttpRequest.get<Tasks>(`${API_ENDPOINTS.TODO}/${todoListId}`);
const getTasks = (todoListId: string) => HttpRequest.get<Tasks>(`${API_ENDPOINTS.TODO}/${todoListId}`);
const getTask = (id: string) => HttpRequest.get<Task>(`${API_ENDPOINTS.TASK}/single/${id}`);
const createTask = (data: ITask) => HttpRequest.post<ITask>(`${API_ENDPOINTS.TASK}`, data);
const deleteTask = (id: string) => HttpRequest.destroy<ITask>(`${API_ENDPOINTS.TASK}/${id}`);
const updateTask = (id: string, data: ITask) => HttpRequest.patch<ITask>(`${API_ENDPOINTS.TASK}/${id}`, data);
const updateStatusTask = (id: string) => HttpRequest.put(`${API_ENDPOINTS.TASK}/${id}`, {});

// eslint-disable-next-line import/no-anonymous-default-export
export default {getTasks, getListTasks, getTask, createTask, deleteTask, updateTask, updateStatusTask};
