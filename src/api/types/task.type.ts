export interface ITask {
  id?: string | undefined;
  name: string;
  isDone?: boolean;
  createdAt?: string;
  updatedAt?: string;
  todoListId?: string;
}
