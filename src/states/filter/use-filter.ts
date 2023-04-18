import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import filterSlice from './slice';

export default function useFilter() {
  const filterState = useSelector((root: RootState) => root.filter);
  const {statusFilterInList, statusFilterInMytask, priorityFilterInList, priorityFilterInMytask} = filterState;
  const {actions} = filterSlice;

  const dispatch = useDispatch();
  const setStatusFilterInList = (value: number) => dispatch(actions.setStatusFilterInList(value));
  const setStatusFilterInMyTask = (value: number[]) => dispatch(actions.setStatusFilterInMyTask(value));
  const setPriorityFilterInList = (value: string) => dispatch(actions.setPriorityFilterInList(value));
  const setPriorityFilterInMyTask = (value: string[]) => dispatch(actions.setPriorityFilterInMyTask(value));

  return {
    statusFilterInList,
    statusFilterInMytask,
    setStatusFilterInList,
    setStatusFilterInMyTask,
    priorityFilterInList,
    priorityFilterInMytask,
    setPriorityFilterInList,
    setPriorityFilterInMyTask
  };
}
