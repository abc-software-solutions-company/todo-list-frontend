import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface ITodo {
  id?: string;
  listName: string;
  createdDate?: string;
  updatedDate?: string;
}

type List = IAxiosResponse<ITodo>;
type Lists = IAxiosResponse<ITodo[]>;

const getTodoLists = () => HttpRequest.get<Lists>('/todo-lists');
const createTodoList = (data: ITodo) => HttpRequest.post<ITodo>('/todo-lists', data);
const updateTodoList = (id: string, data: ITodo) => HttpRequest.patch<ITodo>(`/todo-lists/${id}`, data);
const deleteTodoList = (id: string) => HttpRequest.destroy<ITodo>(`todo-lists/${id}`);
const readTodoList = (id: string) => HttpRequest.get<List>(`/todo-lists/${id}`);

export default {getTodoLists, createTodoList, updateTodoList, deleteTodoList, readTodoList};
