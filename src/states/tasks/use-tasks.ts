import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import tasksSlice from './slice';

export default function useTasks() {
  const tasksState = useSelector((root: RootState) => root.tasks);
  const {myTasks, ...restState} = tasksState;
  const {data} = myTasks;
  const {actions} = tasksSlice;

  const dispatch = useDispatch();
  const getMyTasks = () => dispatch(actions.getMyTasksRequest());

  return {myTasks: data, getMyTasks, ...restState};
}
