/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';

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
      state.todolist.statusList = payload.status;
      state.kanbanTasks = payload.tasks;
    },
    getTodolistFailure: (state, {payload}) => {
      state.todolist.loading = false;
      state.todolist.error = true;
    },
    setTodolist: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.todolist.data = payload;
    },
    setStatusFilter: (state, {payload}: PayloadAction<number>) => {
      state.statusFilter = payload;
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
