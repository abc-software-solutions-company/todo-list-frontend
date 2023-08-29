/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse, ITaskUpdate} from '@/data/api/types/task.type';

export type IAction = PayloadAction<{id: string}>;

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    task: {
      loading: false,
      isDelecting: undefined as unknown as boolean,
      data: undefined as unknown as ITaskResponse,
      error: null
    }
  },
  reducers: {
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
    },
    // DESTROY
    destroyRequest: (state, action: PayloadAction<ITaskUpdate>) => {
      state.task.isDelecting = true;
    },
    destroySuccess: state => {
      state.task.isDelecting = false;
      state.task.data = undefined as any;
    },
    destroyFailure: (state, {payload}: PayloadAction<any>) => {
      state.task.isDelecting = false;
      state.task.data = undefined as any;
      state.task.error = payload;
    }
  }
});

export default taskSlice;
