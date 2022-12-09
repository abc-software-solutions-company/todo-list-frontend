import classNames from 'classnames';
import {FC} from 'react';

import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

export const Reporter: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
  const {user} = task;
  return (
    <div className={classNames('reporter', className)}>
      <Title text="Reporter" />
      <div className="name">{user?.name || ''}</div>
    </div>
  );
};

export default Reporter;
