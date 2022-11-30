import {useRouter} from 'next/router';
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
}

const TaskDetail: FC<IProps> = ({task: {id, todolistId}}) => {
  const router = useRouter();
  const auth = useStateAuth();
  const {task, assest, initial} = useTask();

  useEffect(() => {
    initial(id);
    LocalStorage.listId.set(todolistId);
  }, []);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: todolistId};
      socket.connect();
    }
  }, [auth]);

  if (!task) return null;
  if (!router.asPath.includes(task.id)) return null;
  if (!assest) return <ErrorInformation />;

  return (
    <div className="sm:container">
      <TaskToolbar />
      <TaskBody />
    </div>
  );
};

export default TaskDetail;
