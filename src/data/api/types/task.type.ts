import {IListCreate} from './list.type';

export interface ITask {
  id: string;
  name: string;
  todoListId: string;
  userId: string;
  isDone: boolean;
  isActive: boolean;
}

// Type for request payload
export interface ITaskByList {
  todoListId: string;
}

export interface ITaskCreate extends ITaskByList {
  name: string;
}

export interface ITaskUpdate {
  id: string;
  name?: string;
  isDone?: boolean;
  isActive?: boolean;
}

export interface ITaskByListDetail extends IListCreate {
  task: ITask[];
}

// Type for response data
export type ITaskCreateResponse = ITask;

export type ITaskUpdateResponse = ITask;
