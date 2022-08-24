import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface ITodoList {
  id?: string;
  listName: string;
  createdDate?: string;
  updatedDate?: string;
}

type Lists = IAxiosResponse<ITodoList[]>;

const getTodoLists = () => HttpRequest.get<Lists>('/todo-lists');
const createTodoList = (data: ITodoList) => HttpRequest.post<ITodoList>('/todo-lists', data);

export default {getTodoLists, createTodoList};
