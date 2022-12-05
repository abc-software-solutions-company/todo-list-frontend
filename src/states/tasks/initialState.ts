import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

const initialState: IInitialState = {
  myTasks: {
    loading: false,
    data: undefined as unknown as ITodolistResponse[],
    error: null
  }
};

export default initialState;
