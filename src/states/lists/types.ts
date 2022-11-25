import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  myList: {
    loading: boolean;
    data: ITodolistResponse[];
    error: any;
  };
  favoriteList: {
    loading: boolean;
    data: ITodolistResponse[];
    error: any;
  };
  selectedTodolist?: ITodolistResponse;
  isOpenModal: {
    edit: boolean;
    delete: boolean;
    share: boolean;
  };
}
