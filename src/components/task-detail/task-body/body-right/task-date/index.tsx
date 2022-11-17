import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import api from '@/data/api';
import useTask from '@/states/task/use-task';

import PickDateTime from './pick-date-time';

const TaskDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  const {task, write} = useTask();
  const handleSaveStartDate = (date: Date) => {
    api.task.update({id: task.id, startDate: date});
  };
  const handleSaveDueDate = (date: Date) => {
    api.task.update({id: task.id, dueDate: date});
  };
  return (
    <div className={classNames('date', className)}>
      <PickDateTime readonly={!write} className="start-date" title="Start Date" value={task.startDate} handleSave={handleSaveStartDate} />
      <PickDateTime
        minDateTime={task.startDate}
        readonly={!write}
        className="due-date"
        title="Due Date"
        value={task.dueDate || new Date()}
        handleSave={handleSaveDueDate}
      />
    </div>
  );
};
export default TaskDate;
