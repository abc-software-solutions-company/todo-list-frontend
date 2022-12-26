/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus, ITodolistResponse} from '@/data/api/types/todolist.type';

import initialState, {isOpenModal} from './initialState';
import {IGetTodolistPayloadAction, ISetIsOpenModalPayload} from './types';

const todolistSlice = createSlice({
  name: 'todolist-',
  initialState,
  reducers: {
    getTodolistRequest: (state, {payload}: IGetTodolistPayloadAction) => {
      state.todolist.loading = true;
    },
    getTodolistSuccess: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.todolist.loading = false;
      state.todolist.data = payload;
      const dataKanban = {};

      payload.status.map(lists => {
        const columnData = {
          [lists.name]: lists.tasks?.map(e => JSON.stringify(e))
        };
        Object.assign(dataKanban, columnData);
      });
      state.todolistKanban = dataKanban;
    },
    getTodolistFailure: (state, {payload}) => {
      state.todolist.loading = false;
      state.todolist.error = true;
    },
    setTodolist: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.todolist.data = payload;
    },
    setTodolistKanban: (state, {payload}) => {
      state.todolistKanban = payload;
    },
    setStatusFilter: (state, {payload}: PayloadAction<number>) => {
      state.statusFilter = payload;
    },
    setStatusList: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.statusList = payload.status;
    },
    setStatusActive: (state, {payload}: PayloadAction<number>) => {
      state.statusActive = payload;
    },
    setSelectedTask: (state, {payload}: PayloadAction<ITaskResponse | undefined>) => {
      state.selectedTask = payload;
    },
    setIsOpenModal: (state, {payload}: PayloadAction<ISetIsOpenModalPayload>) => {
      const newIsOpenModal = {...isOpenModal};
      Object.keys(newIsOpenModal).map(e => {
        if (e == payload) newIsOpenModal[e] = true;
      });
      state.isOpenModal = newIsOpenModal;
    }
  }
});

export default todolistSlice;
