import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

export type IAction = PayloadAction<{id: string}>;

const todolistSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    todolist: undefined as unknown as ITodolistResponse,
    error: null
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTodolistRequest: (state, {payload}: IAction) => {
      state.loading = true;
    },
    getTodolistSuccess: (state, {payload}) => {
      state.loading = false;
      state.todolist = payload;
    },
    getTodolistFailure: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default todolistSlice;
