import {RootState} from '../store';

export const statusFiltered = (root: RootState, statusFilter: number) =>
  root.todolist.todolist.data.tasks.filter(e => !statusFilter || e.statusId === statusFilter);
