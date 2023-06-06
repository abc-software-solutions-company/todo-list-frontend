import classNames from 'classnames';
import {FC} from 'react';

import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Left from './left';
import Right from './right';
import style from './style.module.scss';

const TaskToolbar: FC<IBaseProps> = ({className}) => {
  const {task} = useTask();
  const taskSymbol = task?.todolist.taskSymbol;
  const order = task?.order;

  return (
    <div className={classNames(style.toolbar, className)}>
      <div className="header">
        {taskSymbol && order && <p>{`${taskSymbol}-${order}:`}</p>}
        <Left className="left" />
        <Right className="right" />
      </div>
    </div>
  );
};
export default TaskToolbar;
