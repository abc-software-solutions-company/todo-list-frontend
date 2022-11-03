import {IStatus, ITodolistResponse} from './list.type';

export interface IAttachment {
  name: string;
  link: string;
}

export interface IAttachmentResponse extends IAttachment {
  id: number;
  isActive: boolean;
  createdDate: string;
}

export interface ITaskAttachmentResponse {
  taskId: string;
  attachmentId: number;
  isActive: boolean;
  attachment: IAttachmentResponse;
}

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
  attachments?: {
    add?: IAttachment;
    remove?: {id: number};
    edit?: {id: number; name: string};
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
  taskAttachments: ITaskAttachmentResponse[];
  description: string;
  todolistId: string;
  statusId: number;
  userId: string;
  isDone: boolean;
  status: IStatus;
  todolist: ITodolistResponse;
  isActive: boolean;
}
