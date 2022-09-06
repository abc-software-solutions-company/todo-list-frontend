import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface ITask {
  id?: string;
  name: string;
  isDone?: boolean;
  createdAt?: string;
  updatedAt?: string;
  listId?: number;
}

type Task = IAxiosResponse<ITask>;
type Tasks = IAxiosResponse<ITask[]>;

const getListTasks = (listId: string) => HttpRequest.get<Tasks>(`/lists/${listId}?_embed=tasks`);
const getTasks = (listId: string) => HttpRequest.get<Tasks>(`/list/${listId}`);
const getTask = (id: string) => HttpRequest.get<Task>(`/tasks/single/${id}`);
const createTask = (data: ITask) => HttpRequest.post<ITask>('/tasks', data);
const deleteTask = (id: string) => HttpRequest.destroy<ITask>(`/tasks/${id}`);
const updateTask = (id: string, data: ITask) => HttpRequest.patch<ITask>(`/tasks/${id}`, data);
const updateStatusTask = (id: string) => HttpRequest.put(`/tasks/${id}`, {});

export default {getTasks, getListTasks, getTask, createTask, deleteTask, updateTask, updateStatusTask};
