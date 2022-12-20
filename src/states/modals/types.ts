import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistKanbanResponse, ITodolistResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  selectedTask?: ITaskResponse;
  selectedTodolist?: ITodolistResponse | ITodolistKanbanResponse;
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
  };
}
