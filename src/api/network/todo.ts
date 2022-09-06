import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

import {ITask} from './task';

export interface ITodo {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  tasks?: ITask[];
}

type List = IAxiosResponse<ITodo>;
type Lists = IAxiosResponse<ITodo[]>;

const getTodos = () => HttpRequest.get<Lists>('/lists');
const getTodo = (id: string) => HttpRequest.get<List>(`lists/${id}`);
const createTodo = (data: ITodo) => HttpRequest.post<ITodo>('/lists', data);
const updateTodo = (id: string, data: ITodo) => HttpRequest.patch<ITodo>(`/lists/${id}`, data);
const deleteTodo = (id: string) => HttpRequest.destroy<ITodo>(`lists/${id}`);

export default {getTodos, getTodo, createTodo, updateTodo, deleteTodo};
