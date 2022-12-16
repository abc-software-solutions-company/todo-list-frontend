import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ITodolistResponse} from '@/data/api/types/todolist.type';

import {IInitialState, IKanbanColumn} from './types';

const initialState: IInitialState = {
  columns: [] as IKanbanColumn[]
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setColumns: (state, {payload}: PayloadAction<ITodolistResponse | undefined>) => {
      const tasks = payload?.tasks;
      const statusArr = payload?.status;
      const dataColumn: IKanbanColumn[] = [];

      if (statusArr && tasks) {
        statusArr.map(status => {
          dataColumn.push({tasks: tasks.filter(task => task.statusId == status.id), ...status});
        });
        state.columns = dataColumn;
      }
      console.log(state.columns);
    }
  }
});

export default kanbanSlice;
