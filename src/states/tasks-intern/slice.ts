import {createSlice} from '@reduxjs/toolkit';

import initialState from './initialState';

const tasksInternSlice = createSlice({
  name: 'tasksIntern',
  initialState,
  reducers: {
    getTasksInternRequest: state => {
      state.tasksIntern.loading = true;
    },
    getTasksInternSuccess: (state, {payload}) => {
      state.tasksIntern.loading = false;
      state.tasksIntern.data = payload;
    },
    getTasksInternFailure: (state, {payload}) => {
      state.tasksIntern.loading = false;
      state.tasksIntern.data = payload;
    }
  }
});

export default tasksInternSlice;
