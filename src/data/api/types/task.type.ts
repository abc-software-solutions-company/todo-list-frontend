import {IBaseResponse} from '@/types';

import {IStatus, ITodolistResponse} from './todolist.type';
import {IUserResponse} from './user.type';

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
  statusId?: number;
}

export interface ITaskUpdate extends ITaskGet {
  name?: string;
  index?: number;
  isDone?: boolean;
  priority?: string;
  storyPoint?: string;
  startDate?: Date;
  dueDate?: Date;
  attachment?: {
    create?: IAttachmentCreate;
    update?: IAttachmentUpdate;
  };
  comment?: {
    create?: ICommentCreate;
    update?: ICommentUpdate;
  };
  assignee?: {
    ids?: string[];
  };
  description?: string;
  isActive?: boolean;
  statusId?: number;
}

export interface ITaskReindexAll {
  todolistId: string;
}

export interface ITaskUsers {
  user: IUserResponse;
}
export interface IAssigneeResponse {
  userId: string;
  taskId: string;
  user: IUserResponse;
  isActive: boolean;
}

export interface ITaskResponse extends ITaskGet, IBaseResponse {
  name: string;
  description: string;
  todolistId: string;
  statusId: number;
  userId: string;
  user?: IUserResponse;
  isDone: boolean;
  status: IStatus;
  storyPoint: string;
  startDate: Date;
  dueDate: Date;
  priority: string;
  index: number;
  attachments: IAttachmentResponse[];
  comments: ICommentResponse[];
  assignees: IAssigneeResponse[];
  todolist: ITodolistResponse;
  isActive: boolean;
}
