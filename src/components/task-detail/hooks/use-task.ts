import {useDispatch, useSelector} from 'react-redux';

import {useStateAuth} from '@/states/auth';
import {RootState, taskSlice} from '@/states/store';

export default function useTask() {
  const {task} = useSelector((root: RootState) => root.task);
  const auth = useStateAuth();
  const dispatch = useDispatch();
  const initial = (id: string) => dispatch(taskSlice.actions.getTaskRequest({id}));
  const update = () => dispatch(taskSlice.actions.getTaskRequest({id: task.id}));
  const assest = Boolean(task) ? task.todolist.visibility !== 'PRIVATE' || Boolean(auth && auth.id === task.todolist.userId) : false;
  const write = Boolean(task) ? task.todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === task.todolist.userId) : false;
  return {task, assest, write, initial, update};
}
