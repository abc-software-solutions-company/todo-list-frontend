import classNames from 'classnames';
import {FC} from 'react';

import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';
import PrioritySelect from './priority-select';

export const Priority: FC<IBaseProps> = ({className}) => {
  const {write} = useTask();
  return (
    <div className={classNames('priority', className)}>
      <Title text="Priority" />
      <div className="select">
        <PrioritySelect readOnly={!write} />
      </div>
    </div>
  );
};

export default Priority;
