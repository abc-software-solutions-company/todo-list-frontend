import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';

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
    data: [undefined] as unknown as ITodolistKanbanResponse,
    statusList: [],
    error: null
  },
  kanbanActive: false,
  statusFilter: 0,
  statusActive: 0,
  selectedTask: undefined,
  isOpenModal
};

export default initialState;
