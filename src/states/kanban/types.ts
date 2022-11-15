import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';

export interface IKanbanColumn extends IStatus {
  tasks: ITaskResponse[];
}

export interface IInitialState {
  columns: IKanbanColumn[];
}
