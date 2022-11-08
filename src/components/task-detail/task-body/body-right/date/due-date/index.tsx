import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

const DueDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  return (
    <div className={classNames('due-date', className)}>
      <p className="title">Due date</p>
      <p>4/11/2022</p>
    </div>
  );
};
export default DueDate;
