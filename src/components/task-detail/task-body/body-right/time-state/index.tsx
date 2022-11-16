import classNames from 'classnames';
import {FC} from 'react';

import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {getDate, getDateFormat} from '@/utils/get-date';

const TimeState: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
  const {createdDate, updatedDate} = task;
  const created = getDateFormat(new Date(createdDate));
  const updated = getDate(new Date(updatedDate));

  return (
    <div className={classNames('time-state', className)}>
      <div className="created-date">
        <p className="date-value">{'Created at ' + created}</p>
      </div>
      <div className="updated-date">
        <p className="date-value">{'Updated at ' + updated}</p>
      </div>
    </div>
  );
};
export default TimeState;
