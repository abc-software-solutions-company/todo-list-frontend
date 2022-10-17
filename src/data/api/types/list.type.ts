import {ITask} from './task.type';

export interface IListCreate {
  name: string;
}

export interface IList extends IListCreate {
  id: string;
  userId: string;
  isActive: boolean;
}

export interface IListOne {
  id: string;
}
export interface IListUpdate {
  id: string;
  name?: string;
  isActive?: boolean;
  isDone?: boolean;
}

// Type for response data

export interface IListOneResponse extends IList {
  tasks: ITask[];
}

export type IListCreateResponse = IList;

export interface IListUpdateResponse extends IList {
  isDone: boolean;
}
