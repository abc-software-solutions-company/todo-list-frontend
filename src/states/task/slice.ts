import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';

export type IAction = PayloadAction<{id: string}>;

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    task: {
      loading: false,
      data: undefined as unknown as ITaskResponse,
      error: null
    }
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTaskRequest: (state, {payload}: IAction) => {
      state.task.loading = true;
    },
    getTaskSuccess: (state, {payload}) => {
      state.task.loading = false;
      state.task.data = payload;
    },
    getTaskFailure: (state, {payload}) => {
      state.task.loading = false;
      state.task.error = payload;
    }
  }
});

export default taskSlice;
