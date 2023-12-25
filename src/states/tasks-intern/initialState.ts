
import { ITaskResponse } from '@/data/api/types/task.type';
import {IInitialState} from './types';

const initialState: IInitialState = {
  tasksIntern: {
    loading: false,
    data: undefined as unknown as ITaskResponse[],
    error: null
  }
};

export default initialState;
