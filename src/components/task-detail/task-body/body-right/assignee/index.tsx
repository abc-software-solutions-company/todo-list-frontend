import classNames from 'classnames';
import {FC} from 'react';

import TaskAssignee from '@/components/common/task-assignee';
import Title from '@/components/task-detail/task-body/title';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

const Assignee: FC<IBaseProps> = ({className}) => {
  const {task, update: onSuccess, write} = useTask();
  const assigneeList = task.todolist.members.map(e => e.user);

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      <TaskAssignee {...{task, onSuccess, assigneeList}} readonly={write} />
    </div>
  );
};

export default Assignee;
