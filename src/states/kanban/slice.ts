import {createSlice} from '@reduxjs/toolkit';

import {IInitialState, IKanbanColumn} from './types';

const initialState: IInitialState = {
  columns: [] as IKanbanColumn[]
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setColumns: (state, {payload}) => {
      state.columns = payload;
      console.log(state.columns);
    }
  }
});

export default kanbanSlice;
