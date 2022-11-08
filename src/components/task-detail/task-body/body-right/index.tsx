import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import Status from '../status';
import Assignee from './assignee';
import Date from './date';
import Point from './point';
import Priority from './priority';
import style from './style.module.scss';
import TimeState from './time-state';

export interface IBodyRightProps {
  className?: string;
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

const BodyRight: FC<IBodyRightProps> = props => {
  const {taskData} = props;
  return (
    <div className={style['body-right']}>
      <Status {...props} className="divide item" />
      <Assignee className="divide item mobile" />
      <Priority {...props} className="divide item mobile" />
      <Point className="item mobile" />
      <Date className="divide item" />
      <TimeState taskData={taskData} className="item" />
    </div>
  );
};

export default BodyRight;
