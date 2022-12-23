import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

export const isOpenModal = {
  settings: false,
  task: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  todolist: {
    loading: false,
    data: [undefined] as unknown as ITodolistResponse,
    error: null
  },
  todolistKanban: [],
  statusList: [],
  statusActive: 0,
  kanbanActive: false,
  statusFilter: 0,
  selectedTask: undefined,
  isOpenModal
};

export default initialState;
