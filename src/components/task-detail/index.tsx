import {FC, useEffect} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

import useTask from '../../states/task/use-task';
import ErrorInformation from '../common/404';
import TaskBody from './task-body';
import TaskToolbar from './task-toolbar';

interface IProps {
  task: ITaskResponse;
  className?: string;
}

const TaskDetail: FC<IProps> = ({task: {id, todolistId}, className}) => {
  const auth = useStateAuth();
  const {task, haveAccessPermission, initial} = useTask();

  useEffect(() => {
    initial(id);
    LocalStorage.listId.set(todolistId);
  }, [id, todolistId]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: todolistId};
      socket.connect();
    }
  }, [auth]);

  if (!task) return null;
  if (!haveAccessPermission) return <ErrorInformation />;

  return (
    <div className={className}>
      <TaskToolbar />
      <TaskBody />
    </div>
  );
};

export default TaskDetail;
