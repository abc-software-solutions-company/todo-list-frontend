import {useDispatch, useSelector} from 'react-redux';

import {useStateAuth} from '@/states/auth';
import {RootState, taskSlice} from '@/states/store';

export default function useTask() {
  const taskState = useSelector((root: RootState) => root.task);
  const {task: taskData, ...rest} = taskState;
  const task = taskData.data;
  const auth = useStateAuth();
  const dispatch = useDispatch();
  const {actions} = taskSlice;

  const initial = (id: string) => dispatch(actions.getTaskRequest({id}));
  const update = () => dispatch(actions.getTaskRequest({id: task.id}));
  const assest = Boolean(task) ? task.todolist.visibility !== 'PRIVATE' || Boolean(auth && auth.id === task.todolist.userId) : false;
  const write = Boolean(task) ? task.todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === task.todolist.userId) : false;

  return {task, ...rest, assest, write, initial, update};
}
