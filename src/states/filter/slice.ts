import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import initialState from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, {payload}: PayloadAction<number>) => {
      state.statusFilter = payload;
    }
  }
});

export default filterSlice;
