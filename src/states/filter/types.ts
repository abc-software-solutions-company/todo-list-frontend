import {ITaskResponse} from '@/data/api/types/task.type';

export interface IInitialState {
  statusFilterInList: number;
  statusFilterInMytask: number[];
  priorityFilterInList: string;
  priorityFilterInMytask: string[];
  featureFilterInList: boolean | undefined | string;
  featureFilterInMytask: boolean[] | undefined | string;
  assigneeFilterInList: string;
  assigneeFilterInMytask: string[];
  filterTasks: ITaskResponse[];
}
