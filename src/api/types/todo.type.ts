import {ITask} from './task.type';

export interface ITodo {
  id?: string | undefined;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  tasks?: ITask[];
}
