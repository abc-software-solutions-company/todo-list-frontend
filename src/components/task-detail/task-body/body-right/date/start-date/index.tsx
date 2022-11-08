import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

const StartDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  return (
    <div className={classNames('start-date', className)}>
      <p className="title">Start date</p>
      <p>3/11/2022</p>
    </div>
  );
};
export default StartDate;
