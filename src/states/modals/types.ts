import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';
import { topbarPageName } from '@/components/topbar-hoa/page-name.type';

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;
export type ISetTopbarPageName = keyof typeof topbarPageName | null;

export interface IInitialState {
  selectedTask?: ITaskResponse;
  selectedTodolist?: ITodolistResponse;
  selectedStatusId?: number;
  isOpenModal: {
    createList: boolean;
    createTask: boolean;
    deleteTask: boolean;
    deleteList: boolean;
    settings: boolean;
    shareList: boolean;
    shareTask: boolean;
    updateUser: boolean;
    updateTask: boolean;
    createDocument: boolean;
    updateDocument: boolean;
    testModal: boolean;
  };
}


