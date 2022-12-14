import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import filterSlice from './slice';

export default function useFilter() {
  const filterState = useSelector((root: RootState) => root.filter);
  const {statusFilter} = filterState;
  const {actions} = filterSlice;

  const dispatch = useDispatch();
  const setStatusFilter = (value: number) => dispatch(actions.setStatusFilter(value));

  return {statusFilter, setStatusFilter};
}
