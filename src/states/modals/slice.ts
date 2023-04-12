import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';

import initialState, {isOpenModal} from './initialState';
import {ISetIsOpenModalPayload} from './types';

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsOpenModal: (state, {payload}: PayloadAction<ISetIsOpenModalPayload>) => {
      const newIsOpenModal = {...isOpenModal};
      Object.keys(newIsOpenModal).map(e => {
        if (e == payload) newIsOpenModal[e] = true;
      });
      state.isOpenModal = newIsOpenModal;
    },
    setSelectedTask: (state, {payload}: PayloadAction<ITaskResponse | undefined>) => {
      state.selectedTask = payload;
    },
    setSelectedTodolist: (state, {payload}: PayloadAction<ITodolistResponse | undefined>) => {
      state.selectedTodolist = payload;
    },
    setSelectedColumnId: (state, {payload}: PayloadAction<number | undefined>) => {
      state.selectedStatusId = payload;
    }
  }
});

export default modalsSlice;
