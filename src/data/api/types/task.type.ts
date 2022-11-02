import {IStatus, ITodolistResponse} from './list.type';

export interface IImage {
  name: string;
  link: string;
}

export interface IImageResponse extends IImage {
  id: number;
  isActive: boolean;
  createdDate: string;
}

export interface ITaskImageResponse {
  taskId: string;
  imageId: number;
  isActive: boolean;
  image: IImageResponse;
}

export interface ITaskGet {
  id: string;
}

export interface ITaskCreate {
  todoListId: string;
  name: string;
}

export interface ITaskUpdate extends ITaskGet {
  name?: string;
  isDone?: boolean;
  images?: {
    add?: IImage[];
    remove?: number[];
    edit?: {id: number; name: string}[];
  };
  description?: string;
  isActive?: boolean;
  statusId?: number;
}

export interface ITaskReIndex {
  taskFirstId?: string;
  taskReorderId: string;
  taskSecondId?: string;
}

export interface ITaskResponse extends ITaskGet {
  name: string;
  taskImages: ITaskImageResponse[];
  description: string;
  todoListId: string;
  statusId: number;
  userId: string;
  isDone: boolean;
  status: IStatus;
  todoList: ITodolistResponse;
  isActive: boolean;
}
