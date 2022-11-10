import {IBaseResponse} from '@/types';

import {IUserResponse} from './auth.type';
import {IStatus, ITodolistResponse} from './todolist.type';

export interface IAttachment {
  name: string;
  link: string;
}

export interface IAttachmentCreate {
  name: string;
  link: string;
}

export interface IAttachmentUpdate {
  id: number;
  name?: string;
  link?: string;
  isActive?: boolean;
}

export interface IAttachmentResponse extends IAttachmentCreate {
  id: number;
  isActive: boolean;
  user: IUserResponse;
  createdDate: string;
}

//------------------------------

export interface ICommentCreate {
  comment: string;
  attachmentId?: number;
}

export interface ICommentUpdate {
  id: number;
  comment?: string;
  isActive?: boolean;
  attachmentId?: number;
}

export interface ICommentResponse extends ICommentCreate, IBaseResponse {
  id: number;
  attachmentId?: number;
  attachments: IAttachmentResponse;
  user: IUserResponse;
  taskId: string;
  isActive: boolean;
}

//------------------------------

export interface ITaskGet {
  id: string;
}

export interface ITaskCreate {
  todolistId: string;
  name: string;
}

export interface ITaskUpdate extends ITaskGet {
  name?: string;
  isDone?: boolean;
  priority?: string;
  attachment?: {
    create?: IAttachmentCreate;
    update?: IAttachmentUpdate;
  };
  comment?: {
    create?: ICommentCreate;
    update?: ICommentUpdate;
  };
  description?: string;
  isActive?: boolean;
  statusId?: number;
}

export interface ITaskReindex {
  taskFirstId?: string;
  taskReorderId: string;
  taskSecondId?: string;
}

export interface ITaskResponse extends ITaskGet, IBaseResponse {
  name: string;
  description: string;
  todolistId: string;
  statusId: number;
  userId: string;
  isDone: boolean;
  status: IStatus;
  priority: string;
  attachments: IAttachmentResponse[];
  comments: ICommentResponse[];
  todolist: ITodolistResponse;
  isActive: boolean;
}
