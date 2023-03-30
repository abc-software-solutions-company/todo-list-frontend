import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

export const isOpenModal = {
  settings: false,
  task: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  loading: false,
  data: [undefined] as unknown as ITodolistResponse,
  error: null,
  statusList: [],
  statusActive: 0,
  statusFilter: 0,
  selectedTask: undefined,
  isOpenModal
};

export default initialState;
