import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IInitialState, IKanbanColumn} from './types';

const initialState: IInitialState = {
  columns: [] as IKanbanColumn[]
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<IKanbanColumn[]>) => {
      const {payload} = action;
      state.columns = payload;
      console.log('set columns for kanban');
    }
  }
});

export default kanbanSlice;
