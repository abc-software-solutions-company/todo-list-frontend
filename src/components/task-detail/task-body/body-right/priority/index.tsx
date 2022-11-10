import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

import Title from '../../title';
import PrioritySelect from './priority-select';

export const Priority: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('priority', className)}>
      <Title text="Priority" />
      <div className="select">
        <PrioritySelect />
      </div>
    </div>
  );
};

export default Priority;
