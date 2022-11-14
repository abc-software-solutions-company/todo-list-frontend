import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import DueDate from './due-date';
import StartDate from './start-date';

const TaskDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  return (
    <div className={classNames('date', className)}>
      <StartDate startDate={new Date(2012, 0, 1)} className="mobile" />
      <DueDate dueDate={new Date(Date.now())} className="mobile" />
    </div>
  );
};
export default TaskDate;
