import classNames from 'classnames';
import {FC, HTMLAttributes, useState} from 'react';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';

import PickDateTime from './pick-date-time';

const TaskDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  const {task, write} = useTask();
  const toast = useToast();

  const [minDate, setMinDate] = useState<Date>(task.startDate);

  const handleSaveDueDate = (date: Date) => {
    api.task.update({id: task.id, dueDate: date});
  };

  const handleSaveStartDate = (date: Date) => {
    const start = new Date(date.toISOString());
    const due = new Date(task.dueDate ? task.dueDate.toString() : '1/1/1990');

    if (start > due && task.dueDate) {
      toast.show({type: 'danger', title: 'Error', content: 'Start Date cannot over Due Date'});
      return;
    }

    api.task.update({id: task.id, startDate: date}).then(() => setMinDate(date));
  };

  return (
    <div className={classNames('date', className)}>
      <PickDateTime readonly={!write} className="start-date" title="Start Date" value={task.startDate} handleSave={handleSaveStartDate} />
      <PickDateTime minDate={minDate} readonly={!write} className="due-date" title="Due Date" value={task.dueDate} handleSave={handleSaveDueDate} />
    </div>
  );
};
export default TaskDate;
