import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import tasksInternSlice from './slice';
import { separateTasksListByStatus } from './helper';

export default function useTasksIntern() {
  const tasksState = useSelector((root: RootState) => root.tasksIntern);
  const {tasksIntern, ...restState} = tasksState;
  const {data} = tasksIntern;
  const {actions} = tasksInternSlice;

  const dispatch = useDispatch();
  const getTasksIntern = () => dispatch(actions.getTasksInternRequest());
  const tasksSeparate = separateTasksListByStatus(data)

  return {tasksIntern: data, tasksSeparate, getTasksIntern, ...restState};
}
