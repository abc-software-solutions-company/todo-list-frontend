import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

export const isOpenModal = {
  settings: false,
  task: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  board: {
    loading: false,
    data: [undefined] as unknown as ITodolistResponse,
    error: false
  },
  listID: '',
  statusList: [],
  statusFilter: 0,
  isOpenModal
};

export default initialState;
