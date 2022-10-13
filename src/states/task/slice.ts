import {createSlice} from '@reduxjs/toolkit';

import {ITask} from '@/api/types/task.type';

const slice = createSlice({
  name: 'global',
  initialState: {
    loading: false,
    tasks: [] as ITask[],
    error: null
  },
  reducers: {
    getTasksRequest: state => {
      state.loading = true;
    },
    getTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default slice;
