import {ITaskResponse} from '@/data/api/types/task.type';

export interface IInitialState {
  currentStatus: number;
  currentPriority: string;
  currentAssignee: string;
  statusFilterInList: number;
  statusFilterInMytask: number[];
  priorityFilterInList: string;
  priorityFilterInMytask: string[];
  featureFilterInList: boolean | undefined | string;
  featureFilterInMytask: boolean[] | undefined | string;
  assigneeFilterInList: string;
  assigneeFilterInMytask: string[];
  filterTasks: ITaskResponse[];
  nameFilter: string;
}
