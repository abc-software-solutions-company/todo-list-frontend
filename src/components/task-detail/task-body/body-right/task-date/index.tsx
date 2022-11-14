import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import useTask from '@/components/task-detail/hooks/use-task';
import api from '@/data/api';

import PickDateTime from './pick-date-time';

const TaskDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  const {task} = useTask();
  const handleSaveStartDate = (date: Date) => {
    api.task.update({id: task.id, startDate: date});
  };
  const handleSaveDueDate = (date: Date) => {
    api.task.update({id: task.id, dueDate: date});
  };
  return (
    <div className={classNames('date', className)}>
      <PickDateTime className="start-date" title="Start Date" value={task.startDate} handleSave={handleSaveStartDate} />
      <PickDateTime className="due-date" title="Due Date" value={task.dueDate} handleSave={handleSaveDueDate} />
    </div>
  );
};
export default TaskDate;
