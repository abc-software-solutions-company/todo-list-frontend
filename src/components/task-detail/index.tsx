import {FC, useEffect} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

import useTask from '../../states/task/use-task';
import TaskBody from './task-body';
import TaskToolbar from './task-toolbar';

interface IProps {
  task: ITaskResponse;
}

const TaskDetail: FC<IProps> = ({task: {id, todolistId}}) => {
  const auth = useStateAuth();
  const {task, initial} = useTask();

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

  return (
    <div className="sm:container">
      <TaskToolbar />
      <TaskBody />
    </div>
  );
};

export default TaskDetail;
