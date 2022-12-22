import {PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus, ITodolistKanbanResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

interface IGetTodolistKanbanPayload {
  id: string;
}

export type IGetTodolistKanbanPayloadAction = PayloadAction<IGetTodolistKanbanPayload>;

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  todolistKanban: {
    loading: boolean;
    data: ITodolistKanbanResponse;
    statusList: IStatus[];
    error: any;
  };
  statusFilter: number;
  statusActive: number;
  selectedTask?: ITaskResponse;
  isOpenModal: {
    settings: boolean;
    task: boolean;
    delete: boolean;
    share: boolean;
  };
}
