import { ITaskResponse } from '@/data/api/types/task.type';

export interface IInitialState {
  tasksIntern: {
    loading: boolean;
    data: ITaskResponse[];
    error: any;
  };
}
