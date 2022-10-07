import {ITask} from './task.type';

export interface ITodo {
  id?: string | undefined;
  name?: string | undefined;
  createdAt?: string;
  updatedAt?: string;
  tasks?: ITask[];
  userId?: string;
}
