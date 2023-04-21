import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import initialState from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilterInList: (state, {payload}: PayloadAction<number>) => {
      state.statusFilterInList = payload;
    },
    setStatusFilterInMyTask: (state, {payload}: PayloadAction<number[]>) => {
      state.statusFilterInMytask = payload;
    },
    setPriorityFilterInList: (state, {payload}: PayloadAction<string>) => {
      state.priorityFilterInList = payload;
    },
    setPriorityFilterInMyTask: (state, {payload}: PayloadAction<string[]>) => {
      state.priorityFilterInMytask = payload;
    },
    setFeatureFilterInList: (state, {payload}: PayloadAction<boolean | undefined | string>) => {
      state.featureFilterInList = payload;
    },
    setFeatureFilterInMyTask: (state, {payload}: PayloadAction<boolean[] | undefined | string>) => {
      state.featureFilterInMytask = payload;
    },
    setAssigneeFilterInList: (state, {payload}: PayloadAction<string>) => {
      state.assigneeFilterInList = payload;
    },
    setAssigneeFilterInMyTask: (state, {payload}: PayloadAction<string[]>) => {
      state.assigneeFilterInMytask = payload;
    }
  }
});

export default filterSlice;
