import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface ITask {
  id?: string;
  taskName: string;
  isDone?: boolean;
}

type Tasks = IAxiosResponse<ITask[]>;

const getTasks = (id: string) => HttpRequest.get<Tasks>(`/tasks/${id}`);
const createTask = (data: ITask) => HttpRequest.post<ITask>('/tasks', data);
const deleteTask = (id: string) => HttpRequest.destroy<ITask>(`/tasks/${id}`);
const updateTask = (id: string, data: ITask) => HttpRequest.patch<ITask>(`/tasks/${id}`, data);
const updateActive = (id: string) => HttpRequest.put(`/tasks/${id}`, {});

export default {getTasks, createTask, deleteTask, updateTask, updateActive};
