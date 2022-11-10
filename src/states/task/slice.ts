import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';

export type IAction = PayloadAction<{id: string}>;

const taskSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    task: undefined as unknown as ITaskResponse,
    error: null
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTaskRequest: (state, {payload}: IAction) => {
      state.loading = true;
    },
    getTaskSuccess: (state, {payload}) => {
      state.loading = false;
      state.task = payload;
    },
    getTaskFailure: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default taskSlice;
