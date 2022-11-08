import classNames from 'classnames';
import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import BodyLeft from './body-left';
import BodyRight from './body-right';
import style from './style.module.scss';

interface ITaskBodyProps {
  className?: string;
  taskData: ITaskResponse;
  updateTaskData: () => void;
}

const TaskBody: FC<ITaskBodyProps> = ({className, taskData, updateTaskData}) => {
  return (
    <div className={classNames(style['task-body'], className)}>
      <BodyLeft taskData={taskData} onSuccess={updateTaskData} />
      <BodyRight taskData={taskData} onSuccess={updateTaskData} />
    </div>
  );
};

export default TaskBody;
