import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import {TaskBodyLeft} from '../task-body-left';
import {TaskBodyRight} from '../task-body-right';
import style from './style.module.scss';

interface ITaskBodyProps {
  className?: string;
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

const TaskBody: FC<ITaskBodyProps> = ({taskData, updateTaskData, className}) => {
  const onChangeStatus = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskData.id, statusId: Number(event.target.value)})
      .then(updateTaskData)
      .then(socketUpdateList)
      .catch(() => {});
  };

  return (
    <div className={classNames(style['task-body'], className)}>
      <TaskBodyLeft taskData={taskData} updateTaskData={updateTaskData} />
      <TaskBodyRight onChange={onChangeStatus} taskData={taskData} />
    </div>
  );
};
export default TaskBody;
