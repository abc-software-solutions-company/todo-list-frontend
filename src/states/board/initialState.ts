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
    data: [],
    error: false
  },
  statusList: [],
  statusFilter: 0,
  isOpenModal
};

export default initialState;
