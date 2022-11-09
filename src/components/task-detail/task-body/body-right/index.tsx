import classNames from 'classnames';
import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import Comment from '../body-left/comment';
import Status from '../status';
// import Assignee from './assignee';
// import Date from './date';
// import Point from './point';
import Priority from './priority';
import style from './style.module.scss';
import TimeState from './time-state';

export interface IBodyRightProps {
  className?: string;
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

const BodyRight: FC<IBodyRightProps> = ({className, ...rest}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-right'], 'body-right')}>
        <Status {...rest} className="divide item" />
        {/* <Assignee className="divide item mobile" /> */}
        <Priority {...rest} className="divide item mobile" />
        {/* <Point className="divide item mobile" /> */}
        {/* <Date className="divide item" /> */}
        <Comment {...rest} className="divide item lg:hidden" />
        <TimeState taskData={rest.taskData} className="item" />
      </div>
    </div>
  );
};

export default BodyRight;
