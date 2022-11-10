import {FC, useEffect} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

import useTask from './hooks/use-task';
import TaskBody from './task-body';
import TaskToolbar from './task-toolbar';

interface IProps {
  task: ITaskResponse;
}

const TaskDetail: FC<IProps> = ({task: {id, todolistId}}) => {
  const auth = useStateAuth();
  const {task, assest, initial} = useTask();

  useEffect(() => {
    initial(id);
    LocalStorage.listId.set(todolistId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: todolistId};
      socket.connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (!task) return null;

  if (!assest) return <h1 className="p-10 text-center text-red-500">Task not existed</h1>;

  return (
    <div className="sm:container">
      <TaskToolbar />
      <TaskBody />
    </div>
  );
};

export default TaskDetail;
