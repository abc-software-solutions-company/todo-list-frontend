import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

const StartDate: FC<IBaseProps> = ({className}) => {
  return (
    <div className={classNames('start-date', className)}>
      <p className="title">Start date</p>
      <p>3/11/2022</p>
    </div>
  );
};
export default StartDate;
