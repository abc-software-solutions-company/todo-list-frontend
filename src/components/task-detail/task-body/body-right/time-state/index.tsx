import classNames from 'classnames';
import {FC} from 'react';

import {getDate, getDateFormat} from '@/utils/get-date';

import {IBodyRightProps} from '..';

const TimeState: FC<IBodyRightProps> = ({taskData, className}) => {
  const createdDate = getDateFormat(new Date(taskData.createdDate));
  const updatedDate = getDate(new Date(taskData.updatedDate));
  return (
    <div className={classNames('time-state', className)}>
      <div className="created-date">
        <p className="date-value">{'Created at ' + createdDate}</p>
      </div>
      <div className="updated-date">
        <p className="date-value">{'Updated at ' + updatedDate}</p>
      </div>
    </div>
  );
};
export default TimeState;
