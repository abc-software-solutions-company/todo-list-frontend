import {PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus, ITodolistResponse} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

interface IGetTodolistPayload {
  id: string;
}

export type IGetTodolistPayloadAction = PayloadAction<IGetTodolistPayload>;

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  todolist: {
    loading: boolean;
    data: ITodolistResponse;
    statusList: IStatus[];
    error: any;
  };
  kanbanTasks: ITaskResponse[];
  kanbanActive: boolean;
  statusFilter: number;
  selectedTask?: ITaskResponse;
  isOpenModal: {
    settings: boolean;
    task: boolean;
    delete: boolean;
    share: boolean;
  };
}
