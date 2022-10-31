export interface IImageResponse {
  id: number;
  link: string;
  isActive: boolean;
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
    add?: string[];
    remove?: number[];
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
  isActive: boolean;
}
