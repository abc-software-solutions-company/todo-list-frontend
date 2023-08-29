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
  const destroy = (id: string) => dispatch(actions.destroyRequest({id, isActive: false}));

  const assest = Boolean(task)
    ? task.todolist.visibility !== 'PRIVATE' ||
      Boolean(auth && auth.id === task.todolist.userId) ||
      Boolean(auth && task.todolist.members.map(e => e.user?.id).includes(auth?.id))
    : false;
  const write = Boolean(task)
    ? task.todolist.visibility === 'PUBLIC' ||
      Boolean(auth && auth.id === task.todolist.userId) ||
      Boolean(auth && task.todolist.members.map(e => e.user?.id).includes(auth?.id))
    : false;

  return {task, ...taskData, ...rest, assest, write, initial, update, destroy};
}
