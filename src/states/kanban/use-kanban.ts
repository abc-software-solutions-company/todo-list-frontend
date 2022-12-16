import {useDispatch, useSelector} from 'react-redux';

import {kanbanSlice, RootState} from '../store';
import {IKanbanColumn} from './types';

export default function useKanban() {
  const {columns} = useSelector((root: RootState) => root.kanban);
  const dispatch = useDispatch();

  const {actions} = kanbanSlice;

  const setColumns = (value: IKanbanColumn[]) => dispatch(actions.setColumns(value));

  return {
    kanban: columns,
    setColumns
  };
}
