/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

import initialState, {isOpenModal} from './initialState';
import {IGetBoardPayloadAction, ISetIsOpenModalPayload} from './types';

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardRequest: (state, {payload}: IGetBoardPayloadAction) => {
      state.board.loading = true;
    },
    getBoardSuccess: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.board.loading = false;
      state.board.data = payload;
      state.statusList = payload.status;
      state.listID = payload.id;
    },
    getBoardFailure: (state, {payload}) => {
      state.board.loading = false;
      state.board.error = true;
    },

    setBoard: (state, {payload}) => {
      state.statusList = payload;
    },
    setStatusFilter: (state, {payload}: PayloadAction<number>) => {
      state.statusFilter = payload;
    },
    setStatusList: (state, {payload}: PayloadAction<ITodolistResponse>) => {
      state.statusList = payload.status;
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

export default boardSlice;
