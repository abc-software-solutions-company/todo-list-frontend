import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

import {ITask} from '../types/task.type';

type Task = IAxiosResponse<ITask>;
type Tasks = IAxiosResponse<ITask[]>;

const getListTasks = (todoListId: string) => HttpRequest.get<Tasks>(`/lists/${todoListId}?_embed=tasks`);
const getTasks = (todoListId: string) => HttpRequest.get<Tasks>(`/list/${todoListId}`);
const getTask = (id: string) => HttpRequest.get<Task>(`/tasks/single/${id}`);
const createTask = (data: ITask) => HttpRequest.post<ITask>('/tasks', data);
const deleteTask = (id: string) => HttpRequest.destroy<ITask>(`/tasks/${id}`);
const updateTask = (id: string, data: ITask) => HttpRequest.patch<ITask>(`/tasks/${id}`, data);
const updateStatusTask = (id: string) => HttpRequest.put(`/tasks/${id}`, {});

// eslint-disable-next-line import/no-anonymous-default-export
export default {getTasks, getListTasks, getTask, createTask, deleteTask, updateTask, updateStatusTask};
