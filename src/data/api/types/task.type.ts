export interface ITaskCreate {
  todoListId: string;
  name: string;
}

export interface ITaskUpdate {
  id: string;
  name?: string;
  isDone?: boolean;
  isActive?: boolean;
}

export interface ITaskReIndex {
  taskFirstId?: string;
  taskReorderId: string;
  taskSecondId?: string;
}

export interface ITaskResponse {
  id: string;
  name: string;
  todoListId: string;
  userId: string;
  isDone: boolean;
  isActive: boolean;
}
