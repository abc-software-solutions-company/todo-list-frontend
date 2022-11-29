import classNames from 'classnames';
import {FC} from 'react';

import TaskAssignee from '@/components/common/task-assignee';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  const {task, update: onSuccess} = useTask();
  const assigneeList = task.todolist.members;

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      <TaskAssignee {...{task, onSuccess, assigneeList}} />
    </div>
  );
};

export default Assignee;
