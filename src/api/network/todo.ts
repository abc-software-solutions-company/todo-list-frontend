import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

import {ITodo} from '../types/todo.type';

type List = IAxiosResponse<ITodo>;
type Lists = IAxiosResponse<ITodo[]>;

const getTodos = (userId: string) => HttpRequest.get<Lists>(`/lists?userId=${userId}`);
const getTodo = (id: string) => HttpRequest.get<List>(`lists/${id}`);
const createTodo = (data: ITodo) => HttpRequest.post<ITodo>('/lists', data);
const updateTodo = (id: string, data: ITodo) => HttpRequest.patch<ITodo>(`/lists/${id}`, data);
const deleteTodo = (id: string) => HttpRequest.destroy<ITodo>(`lists/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getTodos, getTodo, createTodo, updateTodo, deleteTodo};
