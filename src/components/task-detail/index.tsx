import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import {RootState, taskSlice} from '@/states/store';
import LocalStorage from '@/utils/local-storage';

import TaskBody from './task-body';
import TaskToolbar from './task-toolbar';

interface IProps {
  task: ITaskResponse;
}

const TaskDetail: FC<IProps> = ({task}) => {
  const [taskData, setTaskData] = useState<ITaskResponse>();
  const auth = useStateAuth();
  const taskState = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

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
    if (taskData) {
      dispatch(taskSlice.actions.getTaskRequest({id: taskData.id}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskData]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: task.todolistId};
      socket.connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  console.log('🚀 ~ file: index.tsx ~ line 22 ~ taskState', taskState);

  if (!taskData) return null;
  LocalStorage.listId.set(taskData.todolistId);

  return (
    <div className="sm:container">
      <TaskToolbar {...{taskData, updateTaskData}} />
      <TaskBody {...{taskData, updateTaskData}} />
    </div>
  );
};

export default TaskDetail;
