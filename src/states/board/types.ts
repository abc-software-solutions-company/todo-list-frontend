import {PayloadAction} from '@reduxjs/toolkit';

import {IStatus} from '@/data/api/types/todolist.type';

import {isOpenModal} from './initialState';

interface IGetBoardPayload {
  id: string;
}

export type IGetBoardPayloadAction = PayloadAction<IGetBoardPayload>;

export type ISetIsOpenModalPayload = keyof typeof isOpenModal | null;

export interface IInitialState {
  board: {
    loading: boolean;
    data: any;
    error: boolean;
  };
  statusList: IStatus[];
  statusFilter: number;
  isOpenModal: {
    settings: boolean;
    task: boolean;
    delete: boolean;
    share: boolean;
  };
}
