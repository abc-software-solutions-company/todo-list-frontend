/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistKanbanResponse} from '@/data/api/types/todolist.type';

import initialState, {isOpenModal} from './initialState';
import {IGetTodolistKanbanPayloadAction, ISetIsOpenModalPayload} from './types';

const todolistKanbanSlice = createSlice({
  name: 'todolist-kanban',
  initialState,
  reducers: {
    getTodolistKanbanRequest: (state, {payload}: IGetTodolistKanbanPayloadAction) => {
      state.todolistKanban.loading = true;
    },
    getTodolistKanbanSuccess: (state, {payload}) => {
      state.todolistKanban.loading = false;
      state.todolistKanban.data = payload;
    },
    getTodolistKanbanFailure: (state, {payload}) => {
      state.todolistKanban.loading = false;
      state.todolistKanban.error = true;
    },
    setTodolistKanban: (state, {payload}: PayloadAction<ITodolistKanbanResponse>) => {
      state.todolistKanban.data = payload;
    },
    setStatusFilter: (state, {payload}: PayloadAction<number>) => {
      state.statusFilter = payload;
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

export default todolistKanbanSlice;
