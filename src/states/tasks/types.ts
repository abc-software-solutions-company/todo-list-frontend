import {ITodolistResponse} from '@/data/api/types/todolist.type';

export interface IInitialState {
  myTasks: {
    loading: boolean;
    data: ITodolistResponse[];
    error: any;
  };
}
