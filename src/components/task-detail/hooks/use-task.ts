import {useDispatch, useSelector} from 'react-redux';

import {RootState, taskSlice} from '@/states/store';

export default function useTask() {
  const state = useSelector((root: RootState) => root.task);
  const dispatch = useDispatch();
  const initial = (id: string) => dispatch(taskSlice.actions.getTaskRequest({id}));
  const update = () => dispatch(taskSlice.actions.getTaskRequest({id: state.task.id}));
  return {task: state.task, state, initial, update};
}
