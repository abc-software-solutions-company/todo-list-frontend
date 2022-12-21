import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

export const isOpenModal = {
  settings: false,
  task: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  todolistKanban: {
    loading: false,
    data: [undefined] as unknown as ITodolistKanbanResponse,
    error: null
  },
  statusFilter: 0,
  statusActive: 0,
  selectedTask: undefined,
  isOpenModal
};

export default initialState;
