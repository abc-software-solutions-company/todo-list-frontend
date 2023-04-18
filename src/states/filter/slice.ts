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
    }
  }
});

export default filterSlice;
