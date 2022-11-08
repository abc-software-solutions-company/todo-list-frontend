import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

import DueDate from './due-date';
import StartDate from './start-date';

const Date: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  return (
    <div className={classNames('date', className)}>
      <StartDate className="mobile" />
      <DueDate className="mobile" />
    </div>
  );
};
export default Date;
