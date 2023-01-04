import {Priorities, Visibilities} from '@/utils/constant';

import {ITaskResponse} from './task.type';

export interface ITodolistGetOne {
  id: string;
}

export interface ITodolistCreate {
  name: string;
}

export interface ITodolistUpdate extends ITodolistGetOne {
  name?: string;
  favorite?: boolean;
  visibility?: keyof typeof Visibilities;
  member?: {
    ids: string[];
  };
  isActive?: boolean;
  statusId?: number;
  statusIndex?: number;
}

export interface ITodolistSync {
  email: string;
  name: string;
}

export interface IStatus {
  id: number;
  name: string;
  color: string;
  index: number;
  tasks?: ITaskResponse[];
}

export interface IMember {
  user?: any;
  id: string;
  name: string;
  email?: string;
}

export interface ITask {
  id: string;
  name: string;
  isDone: boolean;
  statusId: number;
  index: number;
  priority: keyof typeof Priorities;
}

export interface ITodolistResponse {
  id: string;
  name: string;
  userId: string;
  favorite: boolean;
  visibility: keyof typeof Visibilities;
  status: IStatus[];
  tasks: ITaskResponse[];
  members: IMember[];
}
