import {useDispatch, useSelector} from 'react-redux';

import {kanbanSlice, RootState} from '../store';
import {IKanbanColumn} from './types';

export default function useKanban() {
  const kanbanState = useSelector((root: RootState) => root.kanban);
  const {columns} = kanbanState;
  const {actions} = kanbanSlice;

  const dispatch = useDispatch();
  const setColumns = (value: IKanbanColumn[]) => dispatch(actions.setColumns(value));

  return {
    kanban: columns,
    setColumns
  };
}
