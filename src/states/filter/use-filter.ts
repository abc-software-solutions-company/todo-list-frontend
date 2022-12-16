import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import filterSlice from './slice';

export default function useFilter() {
  const filterState = useSelector((root: RootState) => root.filter);
  const {statusFilterInList, statusFilterInMytask} = filterState;
  const {actions} = filterSlice;

  const dispatch = useDispatch();
  const setStatusFilterInList = (value: number) => dispatch(actions.setStatusFilterInList(value));
  const setStatusFilterInMyTask = (value: number[]) => dispatch(actions.setStatusFilterInMyTask(value));

  return {statusFilterInList, statusFilterInMytask, setStatusFilterInList, setStatusFilterInMyTask};
}
