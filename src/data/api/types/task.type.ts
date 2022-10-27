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
  description: string;
  todoListId: string;
  statusId: number;
  userId: string;
  isDone: boolean;
  isActive: boolean;
}
