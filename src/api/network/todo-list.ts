import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface ITodoList {
  id?: string;
  listName: string;
  createdDate?: string;
  updatedDate?: string;
}

type List = IAxiosResponse<ITodoList>;
type Lists = IAxiosResponse<ITodoList[]>;

const getTodoLists = () => HttpRequest.get<Lists>('/todo-lists');
const createTodoList = (data: ITodoList) => HttpRequest.post<ITodoList>('/todo-lists', data);
const deleteTodoList = (id: number) => HttpRequest.destroy<ITodoList>(`todo-lists/${id}`);
const readTodoList = (id: number) => HttpRequest.get<List>(`/todo-lists/${id}`);

export default {getTodoLists, createTodoList, deleteTodoList, readTodoList};
