import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  myList: {
    loading: boolean;
    data: ITodolistKanbanResponse[];
    error: any;
  };
  favoriteList: {
    loading: boolean;
    data: ITodolistKanbanResponse[];
    error: any;
  };
  isOpenModal: {
    edit: boolean;
    delete: boolean;
    share: boolean;
  };
}
