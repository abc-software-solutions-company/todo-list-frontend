import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IInitialState, IKanbanColumn} from './types';

const initialState: IInitialState = {
  columns: []
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IKanbanColumn[]>) => {
      const {payload} = action;
      state.columns = payload;
    }
  }
});

export default kanbanSlice;
