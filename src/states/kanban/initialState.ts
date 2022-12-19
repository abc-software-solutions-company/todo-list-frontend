import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState} from './types';

export const isOpenModal = {
  edit: false,
  delete: false,
  share: false
};

const initialState: IInitialState = {
  myList: {
    loading: false,
    data: [] as ITodolistResponse[],
    error: null
  },
  favoriteList: {
    loading: false,
    data: [] as ITodolistResponse[],
    error: null
  },
  selectedTodolist: undefined,
  isOpenModal
};

export default initialState;
