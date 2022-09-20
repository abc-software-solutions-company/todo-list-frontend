import * as HttpRequest from '@/api/http-request';
import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IAxiosResponse} from '@/types';

import {ITodo} from '../types/todo.type';

type List = IAxiosResponse<ITodo>;
type Lists = IAxiosResponse<ITodo[]>;

const getTodos = (userId: string) => HttpRequest.get<Lists>(`${API_ENDPOINTS.TODO}?userId=${userId}`);
const getTodo = (id: string) => HttpRequest.get<List>(`${API_ENDPOINTS.TODO}/${id}`);
const getLastTodo = () => HttpRequest.get<List>(`${API_ENDPOINTS.TODO}/query/last`);
const createTodo = (data: ITodo) => HttpRequest.post<ITodo>(`${API_ENDPOINTS.TODO}`, data);
const updateTodo = (id: string, data: ITodo) => HttpRequest.patch<ITodo>(`${API_ENDPOINTS.TODO}/${id}`, data);
const deleteTodo = (id: string) => HttpRequest.destroy<ITodo>(`${API_ENDPOINTS.TODO}/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getTodos, getTodo, createTodo, updateTodo, deleteTodo, getLastTodo};
