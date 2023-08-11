import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITaskResponse} from '@/data/api/types/task.type';

import initialState from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilterInList: (state, {payload}: PayloadAction<number>) => {
      state.statusFilterInList = payload;
    },
    setCurrentStatus: (state, {payload}: PayloadAction<number>) => {
      state.currentStatus = payload;
    },
    setStatusFilterInMyTask: (state, {payload}: PayloadAction<number[]>) => {
      state.statusFilterInMytask = payload;
    },
    setCurrentPriority: (state, {payload}: PayloadAction<string>) => {
      state.currentPriority = payload;
    },
    setCurrentType: (state, {payload}: PayloadAction<string>) => {
      state.currentType = payload;
    },
    setPriorityFilterInList: (state, {payload}: PayloadAction<string>) => {
      state.priorityFilterInList = payload;
    },
    setCurrentAssignee: (state, {payload}: PayloadAction<string>) => {
      state.currentAssignee = payload;
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
    },
    setFilterTasks: (state, {payload}: PayloadAction<ITaskResponse[]>) => {
      state.filterTasks = payload;
    },
    setNameFilterTask: (state, {payload}: PayloadAction<string>) => {
      state.nameFilter = payload.toLowerCase();
    },
    getFilterTaskByName: state => {
      state.filterTasks = state.filterTasks?.filter(e => e.name.toLowerCase().includes(state.nameFilter));
    }
  }
});

export default filterSlice;
