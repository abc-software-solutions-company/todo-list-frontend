import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

import initialState, {isOpenModal} from './initialState';
import {ISetIsOpenModalPayload} from './types';

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMyListRequest: state => {
      state.myList.loading = true;
    },
    getMyListSuccess: (state, {payload}) => {
      state.myList.loading = false;
      state.myList.data = payload;
    },
    getMyListFailure: (state, {payload}) => {
      state.myList.loading = false;
      state.myList.error = payload;
    },
    getFavoriteListRequest: state => {
      state.favoriteList.loading = true;
    },
    getFavoriteListSuccess: (state, {payload}) => {
      state.favoriteList.loading = false;
      state.favoriteList.data = payload;
    },
    getFavoriteListFailure: (state, {payload}) => {
      state.favoriteList.loading = false;
      state.favoriteList.error = payload;
    },
    setSelectedTodolist: (state, {payload}: PayloadAction<ITodolistResponse | undefined>) => {
      state.selectedTodolist = payload;
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

export default listsSlice;
