import classNames from 'classnames';
import {FC} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

export const Reporter: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
  const {user} = task;
  return (
    <div className={classNames('reporter', className)}>
      <Title text="Reporter" />
      <div className="flex w-full items-center gap-x-2.5">
        <AssigneeIcon name={user?.name} bg="bg-sky-500" />
        <div className="name">{user?.name || ''}</div>
      </div>
    </div>
  );
};

export default Reporter;
