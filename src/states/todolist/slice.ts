import {createSlice} from '@reduxjs/toolkit';

import {ITodolistResponse} from '@/data/api/types/list.type';

const todolistSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    todolist: undefined as unknown as ITodolistResponse,
    error: null
  },
  reducers: {
    getTodolistRequest: state => {
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
