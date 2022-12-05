import {createSlice} from '@reduxjs/toolkit';

import initialState from './initialState';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMyTasksRequest: state => {
      state.myTasks.loading = true;
    },
    getMyTasksSuccess: (state, {payload}) => {
      state.myTasks.loading = false;
      state.myTasks.data = payload;
    },
    getMyTasksFailure: (state, {payload}) => {
      state.myTasks.loading = false;
      state.myTasks.data = payload;
    }
  }
});

export default tasksSlice;
