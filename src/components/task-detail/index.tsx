import {FC, useEffect, useState} from 'react';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

import TaskBody from './task-body';
import TaskToolbar from './task-toolbar';

interface IProps {
  task: ITaskResponse;
}

const TaskDetail: FC<IProps> = ({task}) => {
  const [taskData, setTaskData] = useState<ITaskResponse>();
  const auth = useStateAuth();

  const updateTaskData = () => {
    api.task.getOne({id: task.id}).then(res => {
      setTaskData(res.data);
    });
  };

  useEffect(() => {
    updateTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: task.todoListId};
      socket.connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (!taskData) return null;
  LocalStorage.listId.set(taskData.todoListId);

  return (
    <div className="container">
      <TaskToolbar {...{taskData, updateTaskData}} />
      <TaskBody {...{taskData, updateTaskData}} />
    </div>
  );
};

export default TaskDetail;
