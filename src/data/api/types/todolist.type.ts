import {Visibilities} from '@/utils/constant';

import {ITaskResponse} from './task.type';
import {IUserResponse} from './user.type';

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
}

export interface IStatus {
  id: number;
  name: string;
  color: string;
  index: number;
  tasks: ITaskResponse[];
}

export interface IFavoriteResponse {
  userId: string;
  todolistId: string;
  isActive: boolean;
}

export interface IMemberResponse {
  userId: string;
  user: IUserResponse;
  isActive: boolean;
}

export interface ITodolistResponse extends ITodolistGetOne, ITodolistCreate {
  userId: string;
  isActive: boolean;
  visibility: keyof typeof Visibilities;
  status: IStatus[];
  tasks: ITaskResponse[];
  favorites: IFavoriteResponse[];
  members: IMemberResponse[];
}

export interface ITodolistSync {
  email: string;
  name: string;
}
