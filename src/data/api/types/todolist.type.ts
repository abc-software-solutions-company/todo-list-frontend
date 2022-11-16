import {Visibilities} from '@/utils/constant';

import {ITaskResponse} from './task.type';

export interface IListGetOne {
  id: string;
}

export interface IListCreate {
  name: string;
}

export interface IListUpdate extends IListGetOne {
  name?: string;
  favorite?: boolean;
  isActive?: boolean;
  visibility?: keyof typeof Visibilities;
}

export interface IStatus {
  id: number;
  name: string;
  color: string;
  index: number;
}
interface IFavoriteResponse {
  userId: string;
  todolistId: string;
  isActive: boolean;
}

export interface ITodolistResponse extends IListGetOne, IListCreate {
  userId: string;
  isActive: boolean;
  visibility: keyof typeof Visibilities;
  status: IStatus[];
  tasks: ITaskResponse[];
  favorites: IFavoriteResponse[];
}
