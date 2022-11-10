import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

const DueDate: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('due-date', className)}>
      <p className="title">Due date</p>
      <p>4/11/2022</p>
    </div>
  );
};
export default DueDate;
